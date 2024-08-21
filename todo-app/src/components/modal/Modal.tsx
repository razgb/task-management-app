import { Mail, TriangleAlert, XIcon } from "lucide-react";
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
  let icon: React.ReactNode | null = null;
  if (modalType === "success") {
    modalStyles = "bg-secondary-400 bg-opacity-90";
    icon = null;
    icon = <Mail size={48} />;
  } else if (modalType === "error") {
    modalStyles = "bg-red-200";
    icon = <TriangleAlert size={48} />;
  }

  return (
    <div
      style={{
        borderRadius: removeRoundEdges ? "0" : "",
      }}
      className={`mb-4 flex rounded-3xl p-2 ${modalStyles}`}
    >
      <div
        style={{
          letterSpacing: increaseLetterSpacing ? "0.1rem" : "0",
          transition: reduceAnimations ? "none" : "",
          borderRadius: removeRoundEdges ? "0" : "",
        }}
        // prettier-ignore
        className={`font-medium bg-primaryBg w-full p-3 leading-6 rounded-2xl transition-opacity ${modalType ? "" : styles.invisible}`}
      >
        <div className="mx-auto flex max-w-[800px] items-center justify-center gap-6">
          {icon}

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
            <XIcon size={28} color={"#000"} />
          </Button>
        </div>
      </div>
    </div>
  );
}

// className={`absolute left-1/2 top-[1%] font-medium flex max-w-[700px] -translate-x-1/2 items-center justify-between
//   gap-4 px-8 leading-6 rounded-full py-4 transition-opacity ${modalType ? "" : styles.invisible} ${modalStyles}`}
