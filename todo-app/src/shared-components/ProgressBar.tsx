import useAccessibility from "@/stores/accessibility/useAccessibility";

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
  height = 4,
  innerClassName,
  outerClassName,
}: {
  completion: number;
  height?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  innerClassName?: string;
  outerClassName?: string;
}) {
  const { accessibility } = useAccessibility();
  const {
    reduceAnimations,
    highContrastMode,
    accessibilityTextColor,
    reverseAccessibilityTextColor,
  } = accessibility;

  let innerStyles = "";
  let outerStyles = "";

  if (innerClassName && outerClassName) {
    outerStyles = outerClassName;
    innerStyles = innerClassName;
  } else {
    outerStyles = `${heightClasses[height]} w-full rounded-3xl bg-secondary-100`;
    innerStyles = `h-full rounded-3xl bg-secondary-600`;
  }

  return (
    <div
      className={outerStyles}
      style={{
        backgroundColor: highContrastMode ? reverseAccessibilityTextColor : "",
        borderRadius: reduceAnimations ? "0" : "",
      }}
    >
      <div
        className={innerStyles}
        style={{
          width: completion + "%",
          backgroundColor: highContrastMode ? accessibilityTextColor : "",
          borderRadius: reduceAnimations ? "0" : "",
        }}
      ></div>
    </div>
  );
}
