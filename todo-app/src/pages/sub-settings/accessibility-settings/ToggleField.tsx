import useFontSize from "../../../stores/accessibility/useFontSize";

const labelStyles = "text-lg font-medium text-text";
const inputContainerStyle = "flex flex-col gap-2";
const toggleContainerStyle =
  "flex items-center justify-between bg-secondaryBgWeak rounded-xl p-4";

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
  const fontSizes = useFontSize();

  return (
    <div className={inputContainerStyle}>
      <label style={{ fontSize: fontSizes.base }} className={labelStyles}>
        {title}
      </label>
      <div className={toggleContainerStyle}>
        <span className="flex items-center gap-2">
          {icon}
          <span style={{ fontSize: fontSizes.base }}>{label}</span>
        </span>
        <label className="relative inline-flex cursor-pointer items-center">
          <input type="checkbox" className="peer sr-only" {...props} />

          {/* prettier-ignore */}
          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute
           after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full
            after:border after:border-gray-300 after:bg-white after:transition-all
            after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full
          peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4
            peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700
            dark:peer-focus:ring-blue-800"></div>
        </label>
      </div>
    </div>
  );
}
