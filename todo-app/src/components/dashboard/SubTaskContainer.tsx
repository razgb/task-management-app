import { SquareArrowOutUpRight } from "lucide-react";
import ProgressBar from "../shared/ProgressBar";
import useRouter from "../../stores/router/useRouter";
import useAccessibility from "../../stores/accessibility/useAccessibility";
import useTaskExpanded from "../../stores/taskExpanded/useTaskExpanded";

import { taskData } from "../tasks-page/taskData";
import { calculateCompletion } from "../tasks-page/functions/client/calculateCompletion";
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
    accessibilityTextColor,
  } = accessibility;
  const { updatePath } = useRouter();
  const { updateCurrentTask } = useTaskExpanded();

  if (subTasks.length === 0) return null;
  const completion = calculateCompletion(subTasks);

  function handleSubtaskContainerClick() {
    updateCurrentTask(taskData[1]);
    updatePath("/tasks/details");
  }

  return (
    <div className={`max-w-[60%]`}>
      <div
        className="flex cursor-pointer flex-col self-end rounded-lg bg-secondary-700 p-2 transition-colors hover:bg-secondary-800"
        role="link"
        aria-label={`Navigate to subTasks for task named ${title}.`}
        tabIndex={0}
        onClick={handleSubtaskContainerClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") updatePath("/tasks/details");
        }}
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
              color: highContrastMode ? accessibilityTextColor : "",
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
              color: highContrastMode ? accessibilityTextColor : "",
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
