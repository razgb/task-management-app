import Task, { TaskType } from "@/pages/tasks/components/Task.tsx";
import useAccessibility from "@/stores/accessibility/useAccessibility.tsx";
import { useMemo, useState } from "react";
import { TaskSkeletonLoadMultiple } from "./sub-components/TaskSkeletonLoad.tsx";
import { useMutation, useQueryClient } from "react-query";
import { updateTaskStatusInFirebase } from "@/pages/tasks/functions/async/updateTaskStatusInFirebase.ts";
import useModal from "@/stores/modal/useModal.tsx";
import { useLoading } from "@/stores/loading/useLoading.tsx";

export type TaskGroupColumnType = {
  variant: "draft" | "in-progress" | "complete";
  loading: boolean;
  tasks: TaskType[] | undefined;
};

type MutationParameterType = { id: string; newStatus: TaskType["status"] };

export default function TaskColumn({
  variant,
  loading,
  tasks,
}: TaskGroupColumnType) {
  const { accessibility } = useAccessibility();
  const {
    removeRoundEdges,
    highContrastMode,
    reduceAnimations,
    increaseLetterSpacing,
    fontSizeMap,
    accessibilityTextColor,
  } = accessibility;
  const { openModal } = useModal();
  const queryClient = useQueryClient();
  const { addToLoadingQueue, removeFromLoadingQueue } = useLoading();

  const { mutate } = useMutation({
    mutationFn: async ({ id, newStatus }: MutationParameterType) => {
      addToLoadingQueue("task-status");

      try {
        await updateTaskStatusInFirebase(id, newStatus);
      } catch {
        throw new Error(
          "Error syncing task status with server, check internet connection and try again.",
        );
      } finally {
        removeFromLoadingQueue("task-status");
      }
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["tasks"] });
    },
    onError: (err) => {
      if (err instanceof Error) {
        openModal("error", err.message);
        return;
      }

      openModal(
        "error",
        `Error syncing task status with server, check internet connection and try again.`,
      );
    },
    retryDelay: 500,
    retry: 2,
  });

  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

  const output = useMemo(
    () => proccessTaskData(tasks, loading, variant),
    [tasks, loading, variant],
  );

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDraggingOver(true);
  }

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDraggingOver(false);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDraggingOver(false);
    const droppedTask = event.dataTransfer?.getData("application/json"); // get from api
    if (!droppedTask) return;

    const parsedTask: TaskType = JSON.parse(droppedTask);
    if (parsedTask.status === variant) return; // prevent unnecessary update.

    // closures: drop function has access to parent drop container's variant.
    mutate({
      id: parsedTask.id,
      newStatus: variant,
    });
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`flex h-full flex-col gap-4 overflow-hidden p-4 ${isDraggingOver ? "bg-secondary-100" : ""} `}
      style={{
        borderRadius: removeRoundEdges ? 0 : "",
        transition: reduceAnimations ? "none" : "",
      }}
    >
      <h2
        style={{
          fontSize: `${fontSizeMap["2xl"]}px`,
          letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
          color: highContrastMode ? accessibilityTextColor : "",
        }}
        className="font-bold capitalize text-text"
      >
        {variant}
      </h2>

      {/* prettier-ignore */}
      <div className="flex pr-2 flex-1 flex-col overflow-y-scroll gap-4
        scrollbar-thin scrollbar-track-transparent scrollbar-thumb-scrollbar">
        {output}
      </div>
    </div>
  );
}

/**
 * Turns raw task data from firebase into an array of JSX
 * <Task/> elements that are relevant to their respective
 * parent column's variant property.
 */
function proccessTaskData(
  tasks: TaskType[] | undefined,
  loading: boolean,
  column: TaskGroupColumnType["variant"],
) {
  let output: null | React.ReactNode | Iterable<React.ReactNode> = null;

  if (loading) {
    output = <TaskSkeletonLoadMultiple />;
  } else if (!loading && tasks) {
    output = tasks
      .filter((task) => task.status === column)
      .map((task) => {
        return (
          <Task
            authorID={task.authorID}
            key={task.id}
            id={task.id}
            subTasks={task.subTasks}
            title={task.title}
            description={task.description}
            status={task.status}
            createdAt={task.createdAt}
            updatedAt={task.updatedAt}
            hideGrabIcon={false}
          />
        );
      });
  } else return null;

  return output;
}
