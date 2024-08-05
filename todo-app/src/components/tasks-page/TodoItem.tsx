import { Move, Square, SquareCheck } from "lucide-react";
import { useState } from "react";
import useFontSize from "../../stores/accessibility/useFontSize";
import useAccessibilityTextColor from "../../stores/accessibility/useAccessibilityTextColor";
import useAccessibility from "../../stores/accessibility/useAccessibility";

import { handleDrop, handleDragStart } from "./dragAndDropFunctions";
import { SubTaskType } from "./subTaskData";

type ToDoItemProps = {
  task: SubTaskType;
  swapSubTaskPositions: (incomingTaskId: string, outgoingTaskId: string) => void;
};

export default function ToDoItem({ task, swapSubTaskPositions }: ToDoItemProps) {
  const fontSizes = useFontSize();
  const { accessibilityTextColor } = useAccessibilityTextColor();
  const { accessibility } = useAccessibility();
  const {
    reduceAnimations,
    removeRoundEdges,
    increaseLetterSpacing,
    highContrastMode,
  } = accessibility;

  const [checked, setChecked] = useState(task.completed || false);
  const [isDragging, setIsDragging] = useState(false);

  const ariaLabel = checked
    ? "Toggle action to mark as incomplete."
    : "Toggle action to mark as complete.";

  return (
    <li
      style={{
        borderRadius: removeRoundEdges ? "0" : "",
        transition: reduceAnimations ? "none" : "",
      }}
      className={`flex items-center justify-between gap-4 rounded bg-secondary-200 px-4 py-3 transition-colors hover:bg-secondary-300`}
      draggable={isDragging}
      onDragStart={(event) => handleDragStart(event, task)}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => handleDrop(event, task.id, swapSubTaskPositions)}
    >
      <div className="flex gap-4">
        <button
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          style={{ fontSize: `${fontSizes.base}px` }}
          className="flex-1 cursor-grab p-1"
        >
          <Move size={fontSizes.xl} className="stroke-iconStroke" />
        </button>

        <h3
          style={{
            fontSize: `${fontSizes.lg}px`,
            color: highContrastMode ? accessibilityTextColor : "",
            letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
          }}
          className="text-lg font-medium"
        >
          {task.title}
        </h3>
      </div>

      <button
        onClick={() => setChecked((prev: boolean): boolean => !prev)}
        role="checkbox"
        aria-checked={checked ? "true" : "false"}
        aria-label={ariaLabel}
        style={{
          fontSize: `${fontSizes.base}px`,
          borderRadius: removeRoundEdges ? "0" : "",
        }}
      >
        {checked ? (
          <SquareCheck size={fontSizes["3xl"]} className="stroke-checkbox" />
        ) : (
          <Square size={fontSizes["3xl"]} className="stroke-checkbox" />
        )}
      </button>
    </li>
  );
}
