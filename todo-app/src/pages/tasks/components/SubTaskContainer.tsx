import { SquareArrowOutUpRight } from "lucide-react";
import ProgressBar from "@/shared-components/ProgressBar";
import useAccessibility from "@/stores/accessibility/useAccessibility";
import { calculateCompletion } from "@/pages/tasks/functions/client/calculateCompletion";
import { TaskType } from "./Task";

export default function SubTaskContainer({
  title,
  subTasks,
}: {
  title: string;
  subTasks: TaskType["subTasks"];
}) {
  const { accessibility } = useAccessibility();
  const {
    highContrastMode,
    increaseLetterSpacing,
    removeRoundEdges,
    reduceAnimations,
    fontSizeMap,
    reverseAccessibilityTextColor,
  } = accessibility;

  if (subTasks.length === 0) return null;
  const completion = calculateCompletion(subTasks);

  return (
    <div className={`max-w-[60%]`}>
      <div
        className="flex cursor-pointer flex-col self-end rounded-lg bg-secondary-700 p-2 transition-colors hover:bg-secondary-800"
        role="link"
        aria-label={`Navigate to subTasks for task named ${title}.`}
        tabIndex={0}
        style={{
          borderRadius: removeRoundEdges ? "0" : "",
          transition: reduceAnimations ? "none" : "",
        }}
      >
        <div className="flex items-center gap-2">
          <h3
            className="font-semibold text-textContrast"
            style={{
              fontSize: `${fontSizeMap.base}px`,
              color: highContrastMode ? reverseAccessibilityTextColor : "",
            }}
          >
            Sub Tasks
          </h3>

          <SquareArrowOutUpRight
            className="text-textContrast"
            size={16}
            aria-hidden={true}
          />
        </div>

        <div className="flex items-center gap-2">
          <ProgressBar completion={completion} height={2} />
          <span
            style={{
              fontSize: `${fontSizeMap.sm}px`,
              color: highContrastMode ? reverseAccessibilityTextColor : "",
              letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
            }}
            className="font-semibold text-textContrast"
          >
            {completion}%
          </span>
        </div>
      </div>
    </div>
  );
}
