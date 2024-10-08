import useGetTasks from "@/pages/tasks/useGetTasks";
import ProgressBar from "@/shared-components/ProgressBar";
import useAccessibility from "@/stores/accessibility/useAccessibility";
import { calculateAllTasksCompletion } from "../functions/client/calculateTasksCompletion";
import { useMemo } from "react";

export default function TotalTaskProgress() {
  const { accessibility } = useAccessibility();
  const {
    increaseLetterSpacing,
    highContrastMode,
    removeRoundEdges,
    reduceAnimations,
    fontSizeMap,
    accessibilityTextColor,
  } = accessibility;
  const { tasks, loading } = useGetTasks();

  const content = useMemo(() => {
    if (loading) {
      return <ProgressBarSkeleton />;
    } else if (tasks && tasks.length) {
      const completion = calculateAllTasksCompletion(tasks);

      return (
        <ProgressBar
          height={8}
          completion={completion}
          showCompletionPercentage={true}
          fontSize="3xl"
          textStyles="font-medium"
        />
      );
    } else
      return (
        <div>
          <ProgressBar height={8} completion={0} />
        </div>
      );
  }, [tasks, loading]);

  return (
    <div
      className="flex h-full flex-col justify-center rounded-2xl bg-primaryBg px-12"
      style={{
        borderRadius: removeRoundEdges ? "0" : "",
        transition: reduceAnimations ? "none" : "",
        letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
        color: highContrastMode ? accessibilityTextColor : "",
      }}
    >
      <p
        style={{
          fontSize: fontSizeMap["sm"],
        }}
        className="font-semibold uppercase"
      >
        across tasks &amp; sub-tasks
      </p>

      <h3
        className="font-semibold capitalize"
        style={{ fontSize: `${fontSizeMap["3xl"]}px` }}
      >
        total progress
      </h3>

      {content}
    </div>
  );
}

function ProgressBarSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-8 w-full animate-pulse overflow-hidden rounded-2xl bg-secondary-400"></div>
    </div>
  );
}
