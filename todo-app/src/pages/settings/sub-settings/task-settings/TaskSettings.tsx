import React, { useState } from "react";
import Button from "../../../../components/shared/Button";
import useAccessibility from "../../../../stores/accessibility/useAccessibility";

type InputEventType = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

export default function TaskSettings() {
  const { accessibility } = useAccessibility();
  const {
    highContrastMode,
    increaseLetterSpacing,
    removeRoundEdges,
    reduceAnimations,
    fontSizeMap,
    accessibilityTextColor,
  } = accessibility;

  const [defaultPriority, setDefaultPriority] = useState("medium");
  const [defaultDueDate, setDefaultDueDate] = useState("1");
  const [allowSubtasks, setAllowSubtasks] = useState(false);

  const labelStyles = "font-medium text-text";
  const inputStyles =
    "w-full rounded-xl bg-secondaryBgWeak p-3 outline-none placeholder:text-textPlaceholder focus:outline-focusOutline focus:outline-2 transition-colors";
  const inputContainerStyle = "flex flex-col gap-2 mb-4";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Task settings updated");
  }

  return (
    <div className="h-full overflow-hidden rounded-2xl bg-primaryBg p-6">
      <h2
        style={{
          fontSize: fontSizeMap["3xl"],
          color: highContrastMode ? accessibilityTextColor : "",
          letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
          borderRadius: removeRoundEdges ? "0" : "",
          transition: reduceAnimations ? "none" : "",
        }}
        className={`mb-8 font-bold text-heading`}
      >
        Task Settings
      </h2>

      <form
        className="flex max-w-[600px] flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div className={inputContainerStyle}>
          <label
            className={labelStyles}
            htmlFor="defaultPriority"
            style={{ fontSize: fontSizeMap["lg"] }}
          >
            Default Priority
          </label>
          <select
            id="defaultPriority"
            className={`${inputStyles} cursor-pointer`}
            value={defaultPriority}
            onChange={(e: InputEventType) => setDefaultPriority(e.target.value)}
            style={{
              fontSize: fontSizeMap["base"],
              borderRadius: removeRoundEdges ? "0" : "",
            }}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className={inputContainerStyle}>
          <label
            className={labelStyles}
            htmlFor="defaultDueDate"
            style={{ fontSize: fontSizeMap["lg"] }}
          >
            Default Due Date (days from creation)
          </label>
          <input
            type="number"
            id="defaultDueDate"
            className={inputStyles}
            value={defaultDueDate}
            onChange={(e: InputEventType) => setDefaultDueDate(e.target.value)}
            min="0"
            style={{
              fontSize: fontSizeMap["base"],
              borderRadius: removeRoundEdges ? "0" : "",
            }}
          />
        </div>

        <div className={inputContainerStyle}>
          <label
            className={labelStyles}
            htmlFor="allowSubtasks"
            style={{ fontSize: fontSizeMap["lg"] }}
          >
            Allow Subtasks by Default
          </label>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="allowSubtasks"
              className="mr-2 h-5 w-5 cursor-pointer"
              checked={allowSubtasks}
              onChange={() => setAllowSubtasks(!allowSubtasks)}
            />
            <span style={{ fontSize: fontSizeMap["base"] }}>
              Enable subtasks for new tasks
            </span>
          </div>
        </div>

        <div className="mt-4">
          <Button type="submit" style={{ fontSize: `${fontSizeMap.xl}px` }}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
