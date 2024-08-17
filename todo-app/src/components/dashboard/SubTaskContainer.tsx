import { SquareArrowOutUpRight } from "lucide-react";
import ProgressBar from "../shared/ProgressBar";
import useRouter from "../../stores/router/useRouter";
import useAccessibility from "../../stores/accessibility/useAccessibility";
import { SubTaskType } from "../tasks-page/TaskExpanded";
import useTaskExpanded from "../../stores/taskExpanded/useTaskExpanded";

import { taskData } from "../tasks-page/taskData";

export default function SubTaskContainer({
  title,
  subtasks,
}: {
  title: string;
  subtasks: SubTaskType[];
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

  if (subtasks.length === 0) {
    return null;
  }

  let completedSubtasks = 0;
  subtasks.forEach((subtask) => {
    if (subtask.completed) {
      completedSubtasks += 1;
    }
  });

  const completion = Math.round((completedSubtasks / subtasks.length) * 100);

  function handleSubtaskContainerClick() {
    updateCurrentTask(taskData[1]);
    updatePath("/tasks/details");
  }

  return (
    <div className={`max-w-[60%]`}>
      <div
        className="flex cursor-pointer flex-col gap-1 self-end rounded-lg bg-secondary-400 p-2 transition-colors hover:bg-secondary-500"
        role="link"
        aria-label={`Navigate to subtasks for task named ${title}.`}
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
            className="font-semibold"
            style={{
              fontSize: `${fontSizeMap.base}px`,
              color: highContrastMode ? accessibilityTextColor : "",
            }}
          >
            Sub Tasks
          </h3>
          <SquareArrowOutUpRight size={16} aria-hidden={true} />
        </div>

        <div className="flex items-center gap-2">
          <ProgressBar completion={completion} width={2} />
          <span
            className="font-semibold"
            style={{
              fontSize: `${fontSizeMap.sm}px`,
              color: highContrastMode ? accessibilityTextColor : "",
              letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
            }}
          >
            {completion}%
          </span>
        </div>
      </div>
    </div>
  );
}
