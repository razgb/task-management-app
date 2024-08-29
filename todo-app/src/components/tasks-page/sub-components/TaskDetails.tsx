import useAccessibility from "../../../stores/accessibility/useAccessibility";
import useTaskExpanded from "../../../stores/taskExpanded/useTaskExpanded";
import ProgressBar from "../../shared/ProgressBar";

/**
 * Renders progress bar, last edited, title, and the description.
 * Imports it's own accessiblity and taskExpanded hooks.
 */
export default function TaskDetails() {
  const { accessibility } = useAccessibility();
  const {
    removeRoundEdges,
    highContrastMode,
    fontSizeMap,
    increaseLetterSpacing,
    accessibilityTextColor,
  } = accessibility;
  const { currentTask } = useTaskExpanded();
  // if (!currentTask) return null;

  return (
    <div className="">
      <div className="mb-8 flex h-full max-h-8 gap-2">
        <div
          style={{
            borderRadius: removeRoundEdges ? "0" : "",
          }}
          className="flex w-full max-w-[150px] flex-shrink-0 items-center gap-1 rounded-xl bg-secondary-100 px-2 py-1"
        >
          <ProgressBar completion={50} width={1} />
          <p
            style={{
              fontSize: `${fontSizeMap.sm}px`,
              color: highContrastMode ? accessibilityTextColor : "",
            }}
            className="flex-shrink-0 font-light"
          >
            50%
          </p>
        </div>

        <div
          style={{
            borderRadius: removeRoundEdges ? "0" : "",
          }}
          className="flex flex-shrink-0 items-center rounded-xl bg-secondary-100 p-2"
        >
          <p
            style={{
              fontSize: `${fontSizeMap.sm}px`,
              color: highContrastMode ? accessibilityTextColor : "",
            }}
            className="text-sm font-light"
          >
            Last edited: 30-07-2024
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <h1
          style={{
            fontSize: `${fontSizeMap["3xl"]}px`,
            color: highContrastMode ? accessibilityTextColor : "",
            letterSpacing: increaseLetterSpacing ? "0.2rem" : "",
          }}
          className="mb-1 text-3xl font-bold capitalize"
        >
          {currentTask?.title || "Task title"}
        </h1>

        <select className="rounded-full bg-secondaryBgWeak px-1 py-0.5 text-text hover:bg-secondaryBg active:bg-secondaryBgStrong">
          <option value="draft">Draft</option>
          <option value="in-progress">In-progress</option>
          <option value="complete">Complete</option>
        </select>
      </div>

      <p
        style={{
          fontSize: `${fontSizeMap["lg"]}px`,
          color: highContrastMode ? accessibilityTextColor : "",
        }}
        className="mb-4 max-w-[75ch] text-lg text-textWeak"
      >
        {currentTask?.description || "Task description"}
      </p>
    </div>
  );
}
