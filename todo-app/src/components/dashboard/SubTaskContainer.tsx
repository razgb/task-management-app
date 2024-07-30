import { SquareArrowOutUpRight } from "lucide-react";
import ProgressBar from "../shared/ProgressBar";
import useRouter from "../../stores/useRouter";
import Link from "../shared/Link";
import useFontSize from "../../stores/accessibility/useFontSize";
import useAccessibility from "../../stores/accessibility/useAccessibility";
import useAccessibilityTextColor from "../../stores/accessibility/useAccessibilityTextColor";

export default function SubTaskContainer({
  hasSubtasks,
  hideGrabIcon,
  taskData,
  title,
}: {
  hasSubtasks: boolean;
  hideGrabIcon: boolean | undefined;
  taskData: {
    subtaskCompletion: number;
  };
  title: string;
}) {
  const fontSizes = useFontSize();
  const { accessibility } = useAccessibility();
  const {
    highContrastMode,
    increaseLetterSpacing,
    removeRoundEdges,
    reduceAnimations,
  } = accessibility;
  const { accessibilityTextColor } = useAccessibilityTextColor();
  const updatePath = useRouter().updatePath;

  if (hasSubtasks) {
    return (
      <div className={`${hasSubtasks ? "" : "hidden"} max-w-[60%]`}>
        <div
          className="flex cursor-pointer flex-col gap-1 self-end rounded-lg bg-secondary-400 p-2 transition-colors hover:bg-secondary-500"
          role="link"
          aria-label={`Navigate to subtasks for task named ${title}.`}
          tabIndex={0}
          onClick={() => updatePath("/tasks/details")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ")
              updatePath("/tasks/details");
          }}
          style={{
            borderRadius: removeRoundEdges ? "0" : "",
            transition: reduceAnimations ? "none" : "",
          }}
        >
          <div className="flex items-center gap-2">
            <h3
              className="font-semibold"
              style={{
                fontSize: `${fontSizes.base}px`,
                color: highContrastMode ? accessibilityTextColor : "",
              }}
            >
              Sub Tasks
            </h3>
            <SquareArrowOutUpRight size={16} aria-hidden={true} />
          </div>

          <div className="flex items-center gap-2">
            <ProgressBar completion={taskData.subtaskCompletion} width={2} />
            <span
              className="font-semibold"
              style={{
                fontSize: `${fontSizes.sm}px`,
                color: highContrastMode ? accessibilityTextColor : "",
                letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
              }}
            >
              {taskData.subtaskCompletion}%
            </span>
          </div>
        </div>
      </div>
    );
  } else if (!hideGrabIcon) {
    return (
      <Link
        to="/tasks"
        className="rounded-lg bg-secondary-400 px-3 py-2 font-semibold text-text hover:bg-secondary-500"
        aria-label={`Navigate to add subtasks for task named ${title}.`}
      >
        Add Subtasks
      </Link>
    );
  }

  return null;
}
