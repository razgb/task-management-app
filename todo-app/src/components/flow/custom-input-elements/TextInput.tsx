import useAccessibility from "../../../stores/accessibility/useAccessibility";

interface TextInputProps {
  type: "email" | "password" | "name";
  value: string;
  updateState: (newValue: string) => void;
  label: string;
  placeholder?: string;
}

const containerClasses = " flex gap-1 justify-center flex-col ";
const labelClasses = " text-text ";
const inputClasses = ` p-2 rounded-xl bg-secondary-100 outline outline-1 focus:outline-2 outline-secondary-500 focus:outline
  placeholder:text-textPlaceholder text-text `;

export default function TextInput({
  type,
  value,
  updateState,
  label,
  placeholder,
}: TextInputProps) {
  const { accessibility } = useAccessibility();
  const {
    highContrastMode,
    increaseLetterSpacing,
    removeRoundEdges,
    fontSizeMap,
    accessibilityTextColor,
  } = accessibility;

  return (
    <div className={`${containerClasses}`}>
      <label
        className={`${labelClasses}`}
        style={{
          fontSize: fontSizeMap["lg"],
          color: highContrastMode ? accessibilityTextColor : "",
          borderRadius: removeRoundEdges ? 0 : "",
          letterSpacing: increaseLetterSpacing ? "0.25rem" : "",
        }}
        htmlFor={type}
      >
        {label}:
      </label>

      <input
        type={type}
        id={type}
        value={value}
        onChange={(e) => {
          updateState(e.target.value);
        }}
        placeholder={placeholder}
        required
        aria-required
        className={inputClasses}
        style={{
          fontSize: fontSizeMap["lg"],
          color: highContrastMode ? accessibilityTextColor : "",
          borderRadius: removeRoundEdges ? 0 : "",
          letterSpacing: increaseLetterSpacing ? "0.25rem" : "",
        }}
      />
    </div>
  );
}
