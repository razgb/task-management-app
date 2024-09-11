import { handleDragStart } from "@/pages/tasks/functions/client/dragAndDropFunctions";
import { handleCheckEvents } from "@/pages/tasks/functions/handlers/handleCheckEvent";
import useAccessibility from "@/stores/accessibility/useAccessibility";
import { useLoading } from "@/stores/loading/useLoading";
import useModal from "@/stores/modal/useModal";
import useTaskExpanded from "@/stores/taskExpanded/useTaskExpanded";
import { Move, Square, SquareCheck } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { handleSubTaskSwap } from "../../functions/handlers/handleSubTaskSwap";
import { SubTaskType } from "../TaskExpanded";

export type ToDoItemProps = {
  title: string;
  onDelete: (subTask: SubTaskType) => void;
};

export default function ToDoItem({ title, onDelete }: ToDoItemProps) {
  const { accessibility } = useAccessibility();
  const {
    reduceAnimations,
    removeRoundEdges,
    increaseLetterSpacing,
    highContrastMode,
    fontSizeMap,
    accessibilityTextColor,
  } = accessibility;
  const queryClient = useQueryClient();
  const { addToLoadingQueue, removeFromLoadingQueue, loadingQueue } =
    useLoading();
  const { openModal } = useModal();
  const { currentTask, updateCurrentTask } = useTaskExpanded();

  const [isDragging, setIsDragging] = useState(false);

  const subTask = currentTask?.subTasks.find((st) => st.title === title);

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: async ({
      type,
      event,
    }: {
      type: "check" | "swap";
      event?: React.DragEvent<HTMLLIElement>;
    }) => {
      if (!currentTask || !subTask) return;

      if (type === "check") {
        await handleCheckEvents({
          currentTask,
          subTask,
          addToLoadingQueue,
          removeFromLoadingQueue,
          updateCurrentTask,
        });
      } else if (type === "swap") {
        if (!event) return;

        await handleSubTaskSwap({
          event,
          subTask,
          currentTask,
          addToLoadingQueue,
          removeFromLoadingQueue,
          openModal,
          updateCurrentTask,
        });
      }
    },
    retry: 2,
    onError: (err: unknown) => {
      if (err instanceof Error) {
        openModal("error", err.message);
        return;
      }

      openModal(
        "error",
        `Error syncing sub task with server, check internet connection and try again.`,
      );
    },
    onSuccess: () => {
      queryClient.refetchQueries(["tasks"]); // active invalidation
    },
  });

  if (!currentTask || !subTask) return null;

  const ariaLabel = subTask.completed
    ? "Toggle action to mark as incomplete."
    : "Toggle action to mark as complete.";

  return (
    <li
      style={{
        borderRadius: removeRoundEdges ? "0" : "",
        transition: reduceAnimations ? "none" : "",
      }}
      className={`group flex items-center justify-between gap-4 rounded bg-secondary-200 px-4 py-3 transition-colors hover:bg-secondary-300`}
      draggable={isDragging}
      onDragStart={(event) => handleDragStart(event, subTask)}
      onDragOver={(event) => event.preventDefault()}
      onDrop={async (event) => {
        await mutateAsync({
          type: "swap",
          event,
        });
      }}
    >
      <div className="flex gap-4">
        <button
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          style={{ fontSize: `${fontSizeMap.base}px` }}
          className="flex-1 cursor-grab p-1"
        >
          <Move size={fontSizeMap.xl} className="stroke-iconStroke" />
        </button>

        <h3
          style={{
            fontSize: `${fontSizeMap.lg}px`,
            color: highContrastMode ? accessibilityTextColor : "",
            letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
          }}
          className="text-lg font-medium"
        >
          {subTask.title}
        </h3>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          disabled={loadingQueue.includes("task-details")}
          onClick={() => onDelete(subTask)}
          className="text-textWeak opacity-0 transition-opacity group-hover:opacity-100 hover:text-text"
        >
          Delete
        </button>

        <button
          onClick={async () => await mutateAsync({ type: "check" })}
          disabled={isLoading}
          role="checkbox"
          aria-checked={subTask.completed ? "true" : "false"}
          aria-label={ariaLabel}
          style={{
            fontSize: `${fontSizeMap.base}px`,
            borderRadius: removeRoundEdges ? "0" : "",
          }}
        >
          {subTask.completed ? (
            <SquareCheck
              size={fontSizeMap["3xl"]}
              className="stroke-checkbox"
            />
          ) : (
            <Square size={fontSizeMap["3xl"]} className="stroke-checkbox" />
          )}
        </button>
      </div>
    </li>
  );
}
