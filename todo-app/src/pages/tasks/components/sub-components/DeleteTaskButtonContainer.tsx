import { Trash } from "lucide-react";
import Button from "@/shared-components/Button";
import { useState } from "react";
import useAccessibility from "@/stores/accessibility/useAccessibility";
import useTheme from "@/stores/theme/useTheme";

export default function DeleteTaskButtonContainer({
  deletionMutation,
}: {
  deletionMutation: () => void;
}) {
  const { accessibility } = useAccessibility();
  const {
    removeRoundEdges,
    highContrastMode,
    fontSizeMap,
    increaseLetterSpacing,
    reverseAccessibilityTextColor,
    reduceAnimations,
  } = accessibility;
  const { theme } = useTheme();

  const [modalState, setModalState] = useState<boolean>(false);

  const toggleModalState = () => setModalState((prev) => !prev);
  const handleModalConfirmation = () => {
    deletionMutation();
    setModalState(false);
  };

  const cancelModal = () => setModalState(false);
  const invisibilityClasses =
    "invisible select-none pointer-events-none opacity-0";

  return (
    <div className="relative flex-shrink-0">
      <Button
        style={{
          borderRadius: removeRoundEdges ? "0" : "",
          transition: reduceAnimations ? "none" : "",
          color: highContrastMode ? reverseAccessibilityTextColor : "",
        }}
        variant="custom"
        className="rounded-xl bg-secondary-700 px-3 py-1 text-sm text-textContrast hover:bg-secondary-900"
        onClick={toggleModalState}
        onKeyDown={(e) => e.key === "Escape" && setModalState(false)}
        tabIndex={0}
      >
        <Trash
          size={fontSizeMap["xl"]}
          color={theme === "light" ? "#fff" : "#000"}
        />
        <span
          style={{
            color: highContrastMode ? reverseAccessibilityTextColor : "",
            fontSize: fontSizeMap["base"],
          }}
        >
          Delete task
        </span>
      </Button>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleModalConfirmation();
        }}
        className={`absolute left-1/2 top-[110%] -translate-x-1/2 rounded-xl bg-secondary-700 p-3 transition-opacity ${modalState ? "opacity-100" : invisibilityClasses}`}
      >
        <h4 className="mb-2 text-center text-lg text-textContrast">
          Are you sure?
        </h4>

        <div className="flex items-center gap-0.5">
          <button
            type="button"
            style={{
              fontSize: `${fontSizeMap["sm"]}px`,
              color: highContrastMode ? reverseAccessibilityTextColor : "",
              letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
            }}
            className="px-3 py-1 text-sm text-textContrast hover:text-textContrast"
            onClick={cancelModal}
          >
            Cancel
          </button>

          <Button
            variant="custom"
            className="rounded-full bg-secondary-400 px-4 py-1 text-sm hover:bg-secondary-500"
          >
            Yes
          </Button>
        </div>
      </form>
    </div>
  );
}
