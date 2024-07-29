import useAccessibility from "../../stores/accessibility/useAccessibility";
import useAccessibilityTextColor from "../../stores/accessibility/useAccessibilityTextColor";
import useFontSize from "../../stores/accessibility/useFontSize";

export default function TotalTaskProgress() {
  const fontSizes = useFontSize();
  const { accessibilityTextColor } = useAccessibilityTextColor();
  const completion = Math.floor(Math.random() * 100);
  const { accessibility } = useAccessibility();
  const {
    increaseLetterSpacing,
    highContrastMode,
    removeRoundEdges,
    reduceAnimations,
  } = accessibility;

  return (
    <div
      className="flex h-full flex-col justify-center rounded-2xl bg-primaryBg px-12"
      style={{
        borderRadius: removeRoundEdges ? "0" : "",
        transition: reduceAnimations ? "none" : "",
        letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
        color: highContrastMode ? accessibilityTextColor : "",
      }}
    >
      <h2
        className="font-semibold capitalize"
        style={{ fontSize: `${fontSizes["2xl"]}px` }}
      >
        total progress
      </h2>

      <div className="flex items-center gap-2">
        <div className="h-6 w-full overflow-hidden rounded-2xl bg-secondary-200">
          <div
            className="h-full rounded-2xl bg-secondary-700"
            style={{ width: completion + "%" }}
          ></div>
        </div>

        <p
          className="font-semibold"
          style={{ fontSize: `${fontSizes["2xl"]}px` }}
        >
          {completion}%
        </p>
      </div>
    </div>
  );
}
