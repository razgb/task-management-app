import { TaskType } from "@/pages/tasks/components/Task";
import { calculateCompletion } from "@/pages/tasks/functions/client/calculateCompletion";
import ProgressBar from "@/shared-components/ProgressBar";
import useAccessibility from "@/stores/accessibility/useAccessibility";
import useTaskExpanded from "@/stores/taskExpanded/useTaskExpanded";
import { formatFirebaseDate } from "@/util/formatFirebaseDate";

/**
 * Renders progress bar, last edited, title, and the description.
 * Imports it's own accessiblity and taskExpanded hooks.
 */
export default function TaskDetails({
  statusMutation,
}: {
  statusMutation: (newStatus: TaskType["status"]) => Promise<void>;
}) {
  const { accessibility } = useAccessibility();
  const {
    removeRoundEdges,
    highContrastMode,
    fontSizeMap,
    increaseLetterSpacing,
    accessibilityTextColor,
    reverseAccessibilityTextColor,
  } = accessibility;
  const { currentTask } = useTaskExpanded();
  if (!currentTask) return null;

  const updatedAt = currentTask?.updatedAt;
  const lastEdited = updatedAt
    ? `Edited: ${formatFirebaseDate(updatedAt)}`
    : null;

  const completion = calculateCompletion(currentTask?.subTasks || []);

  return (
    <div className="">
      <div className="mb-4 flex h-full max-h-8 gap-2">
        {currentTask.subTasks.length ? (
          <div
            style={{
              borderRadius: removeRoundEdges ? "0" : "",
            }}
            className="flex w-full max-w-[150px] flex-shrink-0 items-center gap-1 rounded-xl bg-secondary-900 px-2"
          >
            <ProgressBar
              outerClassName="h-2 w-full rounded-3xl bg-secondary-100"
              innerClassName="h-full rounded-3xl bg-secondary-600"
              completion={completion}
              showCompletionPercentage={true}
              textStyles="text-textContrast"
              fontSize="sm"
            />
          </div>
        ) : null}

        <div
          style={{
            borderRadius: removeRoundEdges ? "0" : "",
          }}
          className="flex flex-shrink-0 items-center rounded-xl bg-secondary-900 p-2"
        >
          <p
            style={{
              fontSize: `${fontSizeMap.sm}px`,
              color: highContrastMode ? reverseAccessibilityTextColor : "",
            }}
            className="text-sm text-textContrast"
          >
            {lastEdited || "Edited: 30-07-2024"}
          </p>
        </div>

        <select
          defaultValue={currentTask?.status || "draft"}
          onChange={async (e) => {
            const value = e.target.value;
            if (!["draft", "in-progress", "complete"].includes(value)) return;

            await statusMutation(value as TaskType["status"]);
          }}
          className="cursor-pointer rounded-xl bg-secondaryBgWeak px-1 py-0.5 text-text hover:bg-secondaryBg active:bg-secondaryBgStrong"
          style={{
            borderRadius: removeRoundEdges ? "0" : "",
          }}
        >
          <option value="draft">Draft</option>
          <option value="in-progress">In-Progress</option>
          <option value="complete">Complete</option>
        </select>
      </div>

      <h1
        style={{
          fontSize: `${fontSizeMap["4xl"]}px`,
          color: highContrastMode ? accessibilityTextColor : "",
          letterSpacing: increaseLetterSpacing ? "0.2rem" : "",
        }}
        className="mb-1 text-4xl font-bold capitalize"
      >
        {currentTask?.title || "Task title"}
      </h1>

      <p
        style={{
          fontSize: `${fontSizeMap["xl"]}px`,
          color: highContrastMode ? accessibilityTextColor : "",
        }}
        className="mb-4 max-w-[75ch] text-xl text-textWeak"
      >
        {currentTask?.description || "Task description"}
      </p>
    </div>
  );
}
