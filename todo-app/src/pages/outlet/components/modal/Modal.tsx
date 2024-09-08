import { Mail, TriangleAlert, XIcon } from "lucide-react";
import useAccessibility from "@/stores/accessibility/useAccessibility";
import useModal from "@/stores/modal/useModal";
import styles from "@/tailwindStyles";
import useTheme from "@/stores/theme/useTheme";

export default function Modal() {
  const { closeModal, modalType, modalMessage } = useModal();
  const { accessibility } = useAccessibility();
  const {
    increaseLetterSpacing,
    removeRoundEdges,
    fontSizeMap,
    reduceAnimations,
  } = accessibility;
  const { theme } = useTheme();

  let modalStyles = "";
  let textIconStyles: string = "";
  let icon: React.ReactNode | null = null;

  switch (modalType) {
    case "success":
      modalStyles = "bg-secondary-400 bg-opacity-90";
      icon = <Mail size={22} />;
      textIconStyles = "text-text";
      break;

    case "error":
      modalStyles = theme === "light" ? "bg-red-300" : "bg-red-900";
      icon = <TriangleAlert size={22} />;
      textIconStyles = theme === "light" ? "text-red-950" : "text-red-300";
      break;

    default:
      modalStyles = "";
      textIconStyles = "";
      icon = null;
  }

  const modal = modalType ? "" : styles.invisible;

  return (
    <div
      style={{
        letterSpacing: increaseLetterSpacing ? "0.1rem" : "0",
        transition: reduceAnimations ? "none" : "",
        borderRadius: removeRoundEdges ? "0" : "",
      }}
      // prettier-ignore
      className={`font-medium w-full leading-6
      transition-opacity ${modal} ${modalStyles} ${textIconStyles}`}
    >
      <div className="mx-auto flex max-w-[800px] items-center justify-center gap-2">
        {icon}
        <h2
          style={{
            fontSize: fontSizeMap["lg"],
            borderRadius: removeRoundEdges ? "0" : "",
          }}
          className="text-inherit"
        >
          {modalMessage ||
            "Welcome to the modal! This is a test message to see how it looks."}
        </h2>

        <button className={"text-inherit"} onClick={closeModal}>
          <XIcon size={22} />
        </button>
      </div>
    </div>
  );
}
