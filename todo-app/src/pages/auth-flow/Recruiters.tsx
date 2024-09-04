import Button from "../../components/shared/Button";
import useAccessibility from "../../stores/accessibility/useAccessibility";

export default function Recruiters() {
  const { accessibility } = useAccessibility();
  const {
    highContrastMode,
    increaseLetterSpacing,
    fontSizeMap,
    accessibilityTextColor,
  } = accessibility;

  return (
    <div className="mt-auto flex flex-col items-start gap-1">
      <span
        style={{
          color: highContrastMode ? accessibilityTextColor : "",
          letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
        }}
        className="mr-1 text-textWeak"
      >
        Demo account (for recruiters):
      </span>

      <Button
        onClick={() => {}}
        style={{
          fontSize: fontSizeMap["sm"],
          fontWeight: "500",
        }}
      >
        Open
      </Button>
    </div>
  );
}
