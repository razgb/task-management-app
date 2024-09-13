import useAccessibility, {
  FontSizeMapType,
} from "@/stores/accessibility/useAccessibility";

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
  fontSize,
  showCompletionPercentage,
  textStyles,
}: {
  completion: number;
  height?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  innerClassName?: string;
  outerClassName?: string;
  fontSize?: keyof FontSizeMapType;
  showCompletionPercentage?: boolean;
  textStyles?: string;
}) {
  const { accessibility } = useAccessibility();
  const { reduceAnimations, fontSizeMap } = accessibility;

  let outerStyles = "";
  let innerStyles = "";

  if (innerClassName && outerClassName) {
    outerStyles = outerClassName;
    innerStyles = innerClassName;
  } else {
    outerStyles = `overflow-hidden ${heightClasses[height]} w-full rounded-3xl bg-secondary-100`;
    innerStyles = `h-full rounded-3xl bg-secondary-600`;
  }

  const textFontSize = fontSize ? fontSizeMap[fontSize] : fontSizeMap["2xl"];

  return (
    <div className="flex w-full items-center gap-1">
      <div
        className={outerStyles}
        style={{
          borderRadius: reduceAnimations ? "0" : "",
        }}
      >
        <div
          className={innerStyles}
          style={{
            width: completion + "%",
            borderRadius: reduceAnimations ? "0" : "",
          }}
        ></div>
      </div>

      {showCompletionPercentage && (
        <span
          className={textStyles}
          style={{
            fontSize: textFontSize,
          }}
        >
          {`${completion}%`}
        </span>
      )}
    </div>
  );
}
