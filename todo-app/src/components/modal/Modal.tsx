import { XIcon } from "lucide-react";
import useAccessibility from "../../stores/accessibility/useAccessibility";
import useModal from "../../stores/modal/useModal";
import styles from "../../tailwindStyles";
import Button from "../shared/Button";

export default function Modal() {
  const { closeModal, modalType, modalMessage } = useModal();
  const { accessibility } = useAccessibility();
  const {
    highContrastMode,
    increaseLetterSpacing,
    removeRoundEdges,
    fontSizeMap,
    accessibilityTextColor,
    reduceAnimations,
  } = accessibility;

  let modalStyles = "";
  if (modalType === "success") {
    modalStyles = "bg-black bg-opacity-90";
  } else if (modalType === "error") {
    modalStyles = "bg-red-200";
  }

  return (
    <div
      style={{
        letterSpacing: increaseLetterSpacing ? "0.1rem" : "0",
        transition: reduceAnimations ? "none" : "",
        borderRadius: removeRoundEdges ? "0" : "",
      }}
      // prettier-ignore
      className={`absolute left-1/2 top-[1%] flex max-w-[700px] -translate-x-1/2 items-center justify-between
        gap-2 px-6 rounded-full py-4 transition-opacity ${modalType ? "" : styles.invisible} ${modalStyles}`}
    >
      <h2
        style={{
          color: highContrastMode ? accessibilityTextColor : "",
          fontSize: fontSizeMap["xl"],
          borderRadius: removeRoundEdges ? "0" : "",
        }}
        className={`${modalType === "success" ? "text-text" : "text-black"}`}
      >
        {modalMessage ||
          "Welcome to the modal! This is a test message to see how it looks."}
      </h2>

      {/* The button will soon be a unstyled button. */}
      <Button onClick={closeModal} type="button" variant="ghost-icon">
        <XIcon size={28} color={modalType === "success" ? "#fff" : "#000"} />
      </Button>
    </div>
  );
}
