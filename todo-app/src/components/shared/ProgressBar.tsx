import useAccessibility from "../../stores/accessibility/useAccessibility";

const heightClasses = {
  1: "h-1",
  2: "h-2",
  3: "h-3",
  4: "h-4",
  5: "h-5",
  6: "h-6",
  7: "h-7",
  8: "h-8",
} as const;

export default function ProgressBar({
  completion,
  width = 4,
}: {
  completion: number;
  width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}) {
  const { accessibility } = useAccessibility();
  const {
    reduceAnimations,
    highContrastMode,
    accessibilityTextColor,
    reverseAccessibilityTextColor,
  } = accessibility;

  return (
    <div
      className={`${heightClasses[width]} w-full rounded-3xl bg-secondary-100`}
      style={{
        backgroundColor: highContrastMode ? reverseAccessibilityTextColor : "",
        borderRadius: reduceAnimations ? "0" : "",
      }}
    >
      <div
        className={`h-full rounded-3xl bg-secondary-600`}
        style={{
          width: completion + "%",
          backgroundColor: highContrastMode ? accessibilityTextColor : "",
          borderRadius: reduceAnimations ? "0" : "",
        }}
      ></div>
    </div>
  );
}
