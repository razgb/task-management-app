import { MoveIcon } from "lucide-react";
import { useState } from "react";
import useAccessibility from "../../stores/accessibility/useAccessibility";
import SubTaskContainer from "./SubTaskContainer";
import { SubTaskType } from "../tasks-page/TaskExpanded";

export type TaskType = {
  id: string;
  status: "draft" | "in-progress" | "complete";
  title: string;
  description?: string;
  subtasks: SubTaskType[];
};

type TaskComponentType = TaskType & {
  hideGrabIcon?: boolean;
};

export default function Task(taskData: TaskComponentType) {
  const { accessibility } = useAccessibility();
  const {
    highContrastMode,
    increaseLetterSpacing,
    removeRoundEdges,
    reduceAnimations,
    fontSizeMap,
    accessibilityTextColor,
    reverseAccessibilityTextColor,
  } = accessibility;

  const { title, description, subtasks, hideGrabIcon } = taskData;
  const [isDraggable, setIsDraggable] = useState(false);

  function handleStartDrag(event: React.DragEvent<HTMLDivElement>) {
    if (!event.dataTransfer) return;
    const jsonData = JSON.stringify(taskData); // serialize
    event.dataTransfer.setData("application/json", jsonData); // send data through api
  }

  return (
    <div
      onDragStart={handleStartDrag}
      draggable={isDraggable}
      className="flex flex-col justify-center rounded-xl bg-secondaryBgWeak p-3"
      style={{
        borderRadius: removeRoundEdges ? "0" : "",
        letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
      }}
    >
      <div>
        <div
          className={`${
            description ? "mb-1" : undefined
          } flex items-center justify-between`}
        >
          <h2
            className="font-semibold"
            style={{
              fontSize: `${fontSizeMap.lg}px`,
              color: highContrastMode ? accessibilityTextColor : "",
            }}
          >
            {title}
          </h2>

          {/* Grab icon */}
          <button
            onMouseLeave={() => setIsDraggable(false)}
            onMouseDown={() => setIsDraggable(true)}
            className={`group relative cursor-grab rounded-full p-2 hover:bg-secondary-200 ${
              hideGrabIcon ? "hidden" : ""
            }`}
            style={{
              transition: reduceAnimations ? "none" : "",
              borderRadius: removeRoundEdges ? "0" : "",
              color: highContrastMode ? accessibilityTextColor : "",
            }}
          >
            <span
              className="absolute -right-1.5 -top-4 min-w-20 rounded bg-secondary-700 px-1 py-0.5 font-medium text-textContrast opacity-0 transition-opacity group-hover:opacity-100"
              style={{
                fontSize: `${fontSizeMap.xs}px`,
                color: highContrastMode ? reverseAccessibilityTextColor : "",
                transition: reduceAnimations ? "none" : "",
              }}
            >
              Drag task
            </span>
            <MoveIcon size={fontSizeMap.xl} aria-hidden={true} />
          </button>
        </div>

        <p
          className={`${description && "mb-2"} max-w-[45ch] text-textWeak 2xl:text-base`}
          style={{
            fontSize: `${fontSizeMap.sm}px`,
            color: highContrastMode ? accessibilityTextColor : "",
          }}
        >
          {formatDescription(description, 30)}
        </p>
      </div>

      <div className="mt-1 items-start">
        <SubTaskContainer subtasks={subtasks} title={title} />
      </div>
    </div>
  );
}

/**
 * Truncates a description to a specified word limit, appending "..." if truncated.
 */
function formatDescription(
  desc: string | undefined,
  wordLimit: number,
): string {
  if (desc == undefined) return "";

  const words = desc.trim().split(/\s+/);
  if (words.length <= wordLimit) return desc;

  const truncated = words.slice(0, wordLimit).join(" ");
  return truncated.replace(/[!?,.:;]+$/, "") + "...";
}
