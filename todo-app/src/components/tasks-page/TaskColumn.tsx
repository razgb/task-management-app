import Task, { TaskType } from "../dashboard/Task.tsx";
import useAccessibility from "../../stores/accessibility/useAccessibility.tsx";
import { useEffect, useMemo, useState } from "react";
import { TaskSkeletonLoadMultiple } from "./sub-components/TaskSkeletonLoad.tsx";
import { useMutation, useQueryClient } from "react-query";
import { updateTaskStatusInFirebase } from "../../pages/tasks/features/updateTaskStatusInFirebase.ts";
import useModal from "../../stores/modal/useModal.tsx";

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
  } = accessibility;
  const { openModal } = useModal();
  const queryClient = useQueryClient();

  const { error, isError, isLoading, failureCount, mutate } = useMutation({
    mutationFn: async ({ id, newStatus }: MutationParameterType) => {
      await updateTaskStatusInFirebase(id, newStatus);
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["tasks"] });
    },
    retry: 3,
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

  useEffect(() => {
    if (failureCount && failureCount < 3) {
      openModal(
        "error",
        "Error syncing task status change, check internet connection and try again.",
      );
    }
  });

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
          color: highContrastMode ? "#fff" : "",
        }}
        className="font-bold capitalize"
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
  }

  return output;
}
