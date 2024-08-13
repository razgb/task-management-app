import { TriangleAlertIcon } from "lucide-react";
import useAccessibility from "../../../stores/accessibility/useAccessibility";

export default function ErrorModal({
  isError,
  message,
}: {
  isError: boolean;
  message: string;
}) {
  const { accessibility } = useAccessibility();
  const {
    highContrastMode,
    increaseLetterSpacing,
    removeRoundEdges,
    fontSizeMap,
    accessibilityTextColor,
    reduceAnimations,
  } = accessibility;

  const modalStyles = isError
    ? "opacity-100 visible"
    : "opacity-0 invisible select-none pointer-events-none";

  return (
    <div
      style={{
        borderRadius: removeRoundEdges ? 0 : "",
      }}
      className={`absolute ${reduceAnimations ? "transition-all" : ""} ${modalStyles} -top-[15%] left-0 flex w-full items-center gap-4 rounded-full bg-red-200 px-6 py-3`}
    >
      <TriangleAlertIcon size={42} />

      <p
        style={{
          fontSize: fontSizeMap["lg"],
          color: highContrastMode ? accessibilityTextColor : "",
          letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
        }}
      >
        {message}
      </p>
    </div>
  );
}
