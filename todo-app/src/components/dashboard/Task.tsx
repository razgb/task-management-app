import { MoveIcon } from "lucide-react";
import { useState } from "react";
import useFontSize from "../../stores/accessibility/useFontSize";
import useAccessibility from "../../stores/accessibility/useAccessibility";
import useAccessibilityTextColor from "../../stores/accessibility/useAccessibilityTextColor";
import SubTaskContainer from "./SubTaskContainer";

export type TaskType = {
  title: string;
  description?: string;
  hasSubtasks: boolean;
  subtaskCompletion: number;
  hideGrabIcon?: boolean; // Manually set due to different parent containers.
  status: "draft" | "in-progress" | "complete";
};

export default function Task({
  title,
  description,
  hasSubtasks,
  // temporary default value until firebase is setup.
  subtaskCompletion,
  hideGrabIcon,
  status,
}: TaskType) {
  const fontSizes = useFontSize();
  const { accessibility } = useAccessibility();
  // prettier-ignore
  const { highContrastMode, increaseLetterSpacing, removeRoundEdges, reduceAnimations, } = accessibility;
  const { accessibilityTextColor, reverseAccessibilityTextColor } =
    useAccessibilityTextColor();

  const [isDraggable, setIsDraggable] = useState(false);
  const [taskData] = useState({
    title,
    description: formatDescription(description, 30),
    hasSubtasks,
    subtaskCompletion,
    hideGrabIcon,
    status,
  });

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
              fontSize: `${fontSizes.lg}px`,
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
                fontSize: `${fontSizes.xs}px`,
                color: highContrastMode ? reverseAccessibilityTextColor : "",
                transition: reduceAnimations ? "none" : "",
              }}
            >
              Drag task
            </span>
            <MoveIcon size={fontSizes.xl} aria-hidden={true} />
          </button>
        </div>

        <p
          className={`${description && "mb-2"} max-w-[45ch] text-textWeak 2xl:text-base`}
          style={{
            fontSize: `${fontSizes.sm}px`,
            color: highContrastMode ? accessibilityTextColor : "",
          }}
        >
          {description}
        </p>
      </div>

      <div className="mt-1 items-start">
        <SubTaskContainer
          hasSubtasks={hasSubtasks}
          hideGrabIcon={hideGrabIcon}
          taskData={taskData}
          title={title}
        />
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
