import Button from "@/shared-components/Button";
import useAccessibility from "@/stores/accessibility/useAccessibility";
import { useState } from "react";

export default function AccountSettings() {
  const { accessibility } = useAccessibility();
  const {
    highContrastMode,
    reduceAnimations,
    increaseLetterSpacing,
    fontSizeMap,
    accessibilityTextColor,
    reverseAccessibilityTextColor,
  } = accessibility;

  const [modalState, setModalState] = useState<boolean>(false);

  const toggleModalState = () => setModalState((prev) => !prev);
  const cancelModal = () => setModalState(false);
  const handleModalConfirmation = () => {
    setModalState(false);
  };

  const invisibilityClasses =
    "invisible select-none pointer-events-none opacity-0";

  return (
    <div
      className="flex h-full flex-col overflow-y-auto rounded-2xl bg-primaryBg p-6"
      role="region"
      aria-labelledby="accessibility-heading"
      style={{
        transition: reduceAnimations ? "none" : "",
      }}
    >
      <h2
        id="accessibility-heading"
        className="mb-8 font-bold text-heading"
        aria-label="Accessibility Settings"
        style={{
          fontSize: `${fontSizeMap["3xl"]}px`,
          color: highContrastMode ? accessibilityTextColor : "",
          letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
        }}
      >
        Account
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="relative"
      >
        <h3
          style={{
            fontSize: `${fontSizeMap["3xl"]}px`,
            color: highContrastMode ? accessibilityTextColor : "",
            letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
          }}
          className="mb-2 text-xl capitalize"
        >
          permanently delete account
        </h3>

        <Button onClick={toggleModalState}>Delete</Button>

        <div
          className={`absolute left-0 top-[110%] rounded-xl bg-secondary-700 p-3 transition-opacity ${modalState ? "opacity-100" : invisibilityClasses}`}
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
              className="px-3 py-1 text-sm text-black hover:text-textContrast"
              onClick={cancelModal}
            >
              Cancel
            </button>

            <Button
              variant="custom"
              className="rounded-full bg-secondary-400 px-4 py-1 text-sm hover:bg-secondary-500"
              onClick={handleModalConfirmation}
            >
              Yes
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
