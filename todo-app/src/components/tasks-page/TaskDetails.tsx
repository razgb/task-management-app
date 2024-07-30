import useAccessibility from "../../stores/accessibility/useAccessibility";
import useAccessibilityTextColor from "../../stores/accessibility/useAccessibilityTextColor";
import useFontSize from "../../stores/accessibility/useFontSize";
import Button from "../shared/Button";
import ProgressBar from "../shared/ProgressBar";
import ToDoItem from "./TodoItem";

import { subTasksData } from "./subTaskData";

export default function TaskDetails() {
  const fontSizes = useFontSize();
  const { accessibilityTextColor } = useAccessibilityTextColor();
  const { accessibility } = useAccessibility();
  const {
    reduceAnimations,
    removeRoundEdges,
    increaseLetterSpacing,
    highContrastMode,
  } = accessibility;

  return (
    <div
      style={{
        transition: reduceAnimations ? "none" : "",
        borderRadius: removeRoundEdges ? "0" : "",
        letterSpacing: increaseLetterSpacing ? "0.1rem" : "0",
      }}
      className="h-full overflow-hidden rounded-2xl bg-primaryBg px-6 py-12"
    >
      <div className="mx-auto flex h-full w-full max-w-[800px] flex-1 flex-col gap-2">
        <div className="mb-2 flex h-full max-h-8 gap-4">
          <div
            style={{
              borderRadius: removeRoundEdges ? "0" : "",
            }}
            className="flex w-full max-w-[150px] items-center gap-1 rounded-xl bg-secondary-100 px-2 py-1"
          >
            <ProgressBar completion={50} width={1} />
            <p
              style={{
                fontSize: `${fontSizes.sm}px`,
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
            className="flex items-center rounded-xl bg-secondary-100 p-2"
          >
            <p
              style={{
                fontSize: `${fontSizes.sm}px`,
                color: highContrastMode ? accessibilityTextColor : "",
              }}
              className="text-sm font-light"
            >
              Last edited: 30-07-2024
            </p>
          </div>
        </div>

        <h1
          style={{
            fontSize: `${fontSizes["3xl"]}px`,
            color: highContrastMode ? accessibilityTextColor : "",
            letterSpacing: increaseLetterSpacing ? "0.2rem" : "",
          }}
          className="text-3xl font-bold capitalize"
        >
          app architecture
        </h1>

        <p
          style={{
            fontSize: `${fontSizes["lg"]}px`,
            color: highContrastMode ? accessibilityTextColor : "",
          }}
          className="mb-12 max-w-[75ch] text-lg text-textWeak"
        >
          A well-designed app architecture is crucial for building robust,
          scalable, and maintainable applications. It provides a clear structure
          and organization for your code, making it easier to understand,
          modify, and extend over time.
        </p>

        <form
          style={{
            borderRadius: removeRoundEdges ? "0" : "",
            transition: reduceAnimations ? "none" : "",
          }}
          className="m-0 flex max-w-[500px] items-center gap-1 rounded-full bg-secondary-200 transition-colors hover:bg-secondary-300"
        >
          <input
            className="h-full w-full rounded-xl bg-transparent px-3 py-1 outline-none placeholder:text-textPlaceholder"
            type="text"
            placeholder="Add a sub task"
            style={{
              fontSize: `${fontSizes.sm}px`,
              color: highContrastMode ? accessibilityTextColor : "",
            }}
          />
          <Button
            style={{ fontSize: `${fontSizes.sm}px` }}
            variant="contrast-default"
            type="submit"
          >
            Add
          </Button>
        </form>

        <div
          style={{
            borderRadius: removeRoundEdges ? "0" : "",
          }}
          className="h-1/2 flex-1 rounded-2xl border-4 border-secondary-300 py-4 pl-4"
        >
          <ul className="flex h-full flex-col gap-2 overflow-y-scroll pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-scrollbar">
            {subTasksData.map((item, index) => (
              <ToDoItem
                key={index}
                title={item.title}
                completed={item.completed}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
