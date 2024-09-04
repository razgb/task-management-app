import { TriangleAlertIcon } from "lucide-react";
import useAccessibility from "../../stores/accessibility/useAccessibility";

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
      // prettier-ignore
      className={`absolute max-w-[800px] ${reduceAnimations ? "transition-opacity" : ""} ${modalStyles}
      top-[2%] left-1/2 -translate-x-1/2 flex w-full items-center gap-4 rounded-full bg-red-200 px-6 py-3`}
    >
      <TriangleAlertIcon size={42} />

      <p
        className="font-medium"
        style={{
          fontSize: fontSizeMap["xl"],
          color: highContrastMode ? accessibilityTextColor : "",
          letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
        }}
      >
        {message}
      </p>
    </div>
  );
}
