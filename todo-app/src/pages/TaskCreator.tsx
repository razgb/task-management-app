import { useReducer } from "react";
import Button from "../components/shared/Button";
import Link from "../components/shared/Link";
import useFontSize from "../stores/accessibility/useFontSize";
import useAccessibilityTextColor from "../stores/accessibility/useAccessibilityTextColor";
import useAccessibility from "../stores/accessibility/useAccessibility";

const inputContainerStyle = "flex flex-col gap-2 mb-4 w-full";
const labelStyles = "font-medium";
const inputStyles =
  "w-full hover:bg-secondaryBg rounded-xl bg-secondaryBgWeak p-3 outline-none placeholder:text-textPlaceholder focus:outline-focusOutline focus:outline-2 transition-colors";

type TaskFormState = {
  taskName: string;
  dueDate: string;
  priority: string;
  description: string;
};

type TaskFormAction = {
  type: "setName" | "setDueDate" | "setPriority" | "setDescription";
  payload: string;
};

function checkWordsAgainstLimit(word: string, limit: number) {
  return word.split(/\s+/).filter(Boolean).length <= limit;
}

function getWordCount(word: string) {
  return word.split(/\s+/).filter(Boolean).length;
}

function reducer(state: TaskFormState, action: TaskFormAction) {
  const { type, payload } = action;

  switch (type) {
    case "setName":
      if (!checkWordsAgainstLimit(payload, 10)) {
        return state;
      }

      return { ...state, taskName: action.payload };
    case "setDueDate":
      return { ...state, dueDate: action.payload };
    case "setPriority":
      return { ...state, priority: action.payload };
    case "setDescription":
      if (!checkWordsAgainstLimit(payload, 30)) {
        return state;
      }

      return { ...state, description: action.payload };
    default:
      throw new Error(
        "Invalid action type. Must be one of these: \nsetName, setDueDate, setPriority, setDescription",
      );
  }
}

export default function TaskCreator() {
  const fontSizes = useFontSize();
  const { accessibility } = useAccessibility();
  const {
    highContrastMode,
    increaseLetterSpacing,
    reduceAnimations,
    removeRoundEdges,
  } = accessibility;
  const { accessibilityTextColor } = useAccessibilityTextColor();

  const [state, dispatch] = useReducer(reducer, {
    taskName: "",
    dueDate: "",
    priority: "",
    description: "",
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Form submitted");
  }

  return (
    <div className="h-full overflow-hidden rounded-2xl bg-primaryBg p-6">
      <h2
        className="mb-8 font-bold"
        style={{ fontSize: `${fontSizes["3xl"]}px` }}
      >
        Create new task
      </h2>

      <form onSubmit={handleSubmit} className="flex gap-16">
        <div className="flex w-full max-w-[800px] flex-col gap-3">
          <div className={inputContainerStyle}>
            <div className="flex items-center gap-2">
              <label
                className={`${labelStyles} inline`}
                htmlFor="taskName"
                style={{
                  fontSize: `${fontSizes.xl}px`,
                  color: highContrastMode ? accessibilityTextColor : "",
                  letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
                }}
              >
                Task Title
              </label>
              <span
                className="text-textWeak"
                style={{
                  fontSize: `${fontSizes.sm}px`,
                  color: highContrastMode ? accessibilityTextColor : "",
                }}
              >
                {`${getWordCount(state.taskName)}/10 words`}
              </span>
            </div>
            <input
              placeholder="e.g., Finish the presentation"
              type="text"
              id="taskName"
              className={inputStyles}
              style={{
                fontSize: `${fontSizes.lg}px`,
                color: highContrastMode ? accessibilityTextColor : "",
                borderRadius: removeRoundEdges ? "0" : "",
                transition: reduceAnimations ? "none" : "",
              }}
              value={state.taskName}
              onChange={(e) =>
                dispatch({ type: "setName", payload: e.target.value })
              }
              required
            />
          </div>

          <div className={`${inputContainerStyle} w-1/3`}>
            <label
              className={labelStyles}
              htmlFor="dueDate"
              style={{
                fontSize: `${fontSizes.xl}px`,
                color: highContrastMode ? accessibilityTextColor : "",
                letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
              }}
            >
              Due Date{" "}
              <span
                className="text-textWeak"
                style={{ fontSize: `${fontSizes.sm}px` }}
              >
                (optional)
              </span>
            </label>
            <input
              type="date"
              id="dueDate"
              className={`${inputStyles} cursor-pointer`}
              style={{
                fontSize: `${fontSizes.lg}px`,
                color: highContrastMode ? accessibilityTextColor : "",
                borderRadius: removeRoundEdges ? "0" : "",
                transition: reduceAnimations ? "none" : "",
              }}
              value={state.dueDate}
              onChange={(e) =>
                dispatch({ type: "setDueDate", payload: e.target.value })
              }
            />
          </div>

          <div className={inputContainerStyle}>
            <label
              className={labelStyles}
              htmlFor="priority"
              style={{
                fontSize: `${fontSizes.xl}px`,
                color: highContrastMode ? accessibilityTextColor : "",
                letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
              }}
            >
              Priority Level{" "}
              <span
                className="text-textWeak"
                style={{ fontSize: `${fontSizes.sm}px` }}
              >
                (optional)
              </span>
            </label>

            <select
              id="priority"
              className={`${inputStyles} cursor-pointer`}
              style={{
                fontSize: `${fontSizes.lg}px`,
                color: highContrastMode ? accessibilityTextColor : "",
                borderRadius: removeRoundEdges ? "0" : "",
                transition: reduceAnimations ? "none" : "",
              }}
              value={state.priority}
              onChange={(e) =>
                dispatch({ type: "setPriority", payload: e.target.value })
              }
            >
              <option value="" disabled>
                Select priority
              </option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className={inputContainerStyle}>
            <div className="flex items-center gap-2">
              <label
                className={labelStyles}
                htmlFor="description"
                style={{
                  fontSize: `${fontSizes.xl}px`,
                  color: highContrastMode ? accessibilityTextColor : "",
                  letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
                }}
              >
                Description
              </label>
              <span
                className="text-textWeak"
                style={{ fontSize: `${fontSizes.sm}px` }}
              >
                {`(optional) ${getWordCount(state.description)}/30 words`}
              </span>
            </div>

            <textarea
              placeholder="Add some details about your task..."
              id="description"
              className={`${inputStyles} h-32 resize-none overflow-y-hidden`}
              style={{
                fontSize: `${fontSizes.lg}px`,
                color: highContrastMode ? accessibilityTextColor : "",
                borderRadius: removeRoundEdges ? "0" : "",
                transition: reduceAnimations ? "none" : "",
              }}
              value={state.description}
              onChange={(e) =>
                dispatch({ type: "setDescription", payload: e.target.value })
              }
            />
          </div>

          <div className="flex items-center justify-end gap-4">
            <Link className="text-textWeak hover:text-text" to="/dashboard">
              Cancel
            </Link>
            <Button>Create</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

// ignore for now:   const wordCount = description.trim().split(/\s+/).filter(Boolean).length;
