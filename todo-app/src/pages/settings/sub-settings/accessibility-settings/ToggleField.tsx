import useAccessibility from "../../../../stores/accessibility/useAccessibility";
import { appConfigVariables } from "../../../../appConfigVariables";

const labelStyles = "text-lg font-medium text-text";
const inputContainerStyle = "flex flex-col gap-2";
const toggleContainerStyle =
  "flex items-center  justify-between bg-secondary-200 rounded-xl p-4";

type ToggleFieldType = {
  title: string;
  icon: React.ReactNode;
  label: string;
  checked: boolean;
  onChange: () => void;
};

export default function ToggleField({
  title,
  icon,
  label,
  ...props
}: ToggleFieldType) {
  const { accessibility } = useAccessibility();
  const {
    highContrastMode,
    increaseLetterSpacing,
    reduceAnimations,
    removeRoundEdges,
    fontSizeMap,
    accessibilityTextColor,
  } = accessibility;

  return (
    <div
      className={inputContainerStyle}
      style={{
        letterSpacing: increaseLetterSpacing
          ? appConfigVariables.letterSpacing
          : "",
      }}
    >
      <label
        htmlFor={title}
        style={{
          fontSize: fontSizeMap.base,
          color: highContrastMode ? accessibilityTextColor : "",
        }}
        className={labelStyles}
      >
        {title}
      </label>

      <div
        className={toggleContainerStyle}
        style={{
          borderRadius: removeRoundEdges ? "0" : "",
          transition: reduceAnimations ? "none" : "",
        }}
      >
        <p className="flex items-center gap-2">
          {icon}
          <span
            className="text-text"
            style={{
              fontSize: fontSizeMap.base,
              color: highContrastMode ? accessibilityTextColor : "",
            }}
          >
            {label}
          </span>
        </p>

        <label className="relative inline-flex cursor-pointer items-center">
          <input
            id={title}
            type="checkbox"
            className="peer sr-only"
            {...props}
          />

          {/* prettier-ignore */}
          <div className="peer h-6 w-11 rounded-full bg-gray-500 after:absolute
           after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full
            after:border after:border-gray-300 after:bg-white after:transition-all
            after:content-[''] peer-checked:bg-secondary-700 peer-checked:after:translate-x-full
          peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2
            peer-focus:ring-secondary-100
            dark:peer-focus:ring-secondary-900"
            style={{
              borderRadius: removeRoundEdges ? "0" : "",
              transition: reduceAnimations ? "none" : "",
            }}
          ></div>
        </label>
      </div>
    </div>
  );
}
