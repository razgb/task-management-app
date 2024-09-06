import Button from "@/shared-components/Button";
import Link from "@/shared-components/Link";
import useAccessibility from "@/stores/accessibility/useAccessibility";
import { useLoading } from "@/stores/loading/useLoading";
import useModal from "@/stores/modal/useModal";
import useRouter from "@/stores/router/useRouter";
import { useReducer } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addNewTaskToFirebase } from "../tasks/functions/async/addNewTaskToFirebase";
import { getWordCount } from "./functions/client/getWordCount";
import { reducer } from "./functions/client/reducer";

const inputContainerStyle = "flex flex-col gap-2 mb-4 w-full";
const labelStyles = "font-medium";
const inputStyles =
  "w-full hover:bg-secondaryBg rounded-xl bg-secondaryBgWeak p-3 outline-none placeholder:text-textPlaceholder focus:outline-focusOutline focus:outline-2 transition-colors";

export default function TaskCreator() {
  const { accessibility } = useAccessibility();
  const {
    highContrastMode,
    increaseLetterSpacing,
    reduceAnimations,
    removeRoundEdges,
    fontSizeMap,
    accessibilityTextColor,
  } = accessibility;
  const queryClient = useQueryClient();
  const { updatePath } = useRouter();
  const { addToLoadingQueue, removeFromLoadingQueue } = useLoading();
  const { openModal } = useModal();

  const [state, dispatch] = useReducer(reducer, {
    title: "",
    dueDate: "",
    description: "",
  });

  console.log(state);

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async () => {
      if (!state.title) {
        openModal("error", "Error, task must have a title before creation.");
        return;
      }

      addToLoadingQueue("task-creator");

      try {
        await addNewTaskToFirebase(state);
        updatePath("/tasks");
      } catch (err) {
        console.log(err); // temp
        throw new Error(
          "Error uploading task to server, check internet connection and try again.",
        );
      } finally {
        removeFromLoadingQueue("task-creator");
      }
    },
    retry: 2,
    onError: (err) => {
      if (err instanceof Error) {
        openModal("error", err.message);
        return;
      }

      openModal(
        "error",
        `Error uploading task to server, check internet connection and try again.`,
      );
    },
    onSuccess: () => {
      queryClient.refetchQueries(["tasks"]);
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await mutateAsync();
  }

  return (
    <div
      style={{
        borderRadius: removeRoundEdges ? "0" : "",
      }}
      className="h-full overflow-hidden rounded-2xl bg-primaryBg p-6"
    >
      <h2
        className="mb-8 font-bold"
        style={{
          fontSize: `${fontSizeMap["3xl"]}px`,
          letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
          color: highContrastMode ? accessibilityTextColor : "",
        }}
      >
        Create new task
      </h2>

      <form onSubmit={handleSubmit} className="flex gap-16">
        <div className="flex w-full max-w-[800px] flex-col gap-3">
          <div className={inputContainerStyle}>
            <div className="flex items-center gap-2">
              <label
                className={`${labelStyles} inline`}
                htmlFor="title"
                style={{
                  fontSize: `${fontSizeMap.xl}px`,
                  color: highContrastMode ? accessibilityTextColor : "",
                  letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
                }}
              >
                Task Title
              </label>
              <span
                className="text-textWeak"
                style={{
                  fontSize: `${fontSizeMap.sm}px`,
                  color: highContrastMode ? accessibilityTextColor : "",
                  letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
                }}
              >
                {`${getWordCount(state.title)}/10 words`}
              </span>
            </div>
            <input
              placeholder="e.g., Finish the presentation"
              type="text"
              id="title"
              className={inputStyles}
              style={{
                fontSize: `${fontSizeMap.lg}px`,
                color: highContrastMode ? accessibilityTextColor : "",
                borderRadius: removeRoundEdges ? "0" : "",
                transition: reduceAnimations ? "none" : "",
              }}
              value={state.title}
              onChange={(e) =>
                dispatch({ type: "setTitle", payload: e.target.value })
              }
              required
            />
          </div>

          <div className={`${inputContainerStyle} w-1/3`}>
            <label
              className={labelStyles}
              htmlFor="dueDate"
              style={{
                fontSize: `${fontSizeMap.xl}px`,
                color: highContrastMode ? accessibilityTextColor : "",
                letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
              }}
            >
              Due Date{" "}
              <span
                className="text-textWeak"
                style={{
                  fontSize: `${fontSizeMap.sm}px`,
                  color: highContrastMode ? accessibilityTextColor : "",
                  letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
                }}
              >
                (optional)
              </span>
            </label>
            <input
              type="date"
              id="dueDate"
              className={`${inputStyles} cursor-pointer`}
              style={{
                fontSize: `${fontSizeMap.lg}px`,
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
            <div className="flex items-center gap-2">
              <label
                className={labelStyles}
                htmlFor="description"
                style={{
                  fontSize: `${fontSizeMap.xl}px`,
                  color: highContrastMode ? accessibilityTextColor : "",
                  letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
                }}
              >
                Description
              </label>
              <span
                className="text-textWeak"
                style={{
                  fontSize: `${fontSizeMap.sm}px`,
                  color: highContrastMode ? accessibilityTextColor : "",
                  letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
                }}
              >
                {`(optional) ${getWordCount(state.description)}/30 words`}
              </span>
            </div>

            <textarea
              placeholder="Add some details about your task..."
              id="description"
              className={`${inputStyles} h-32 resize-none overflow-y-hidden`}
              style={{
                fontSize: `${fontSizeMap.lg}px`,
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

            <Button loading={isLoading}>Create</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
