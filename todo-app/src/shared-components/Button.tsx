import { ButtonHTMLAttributes, CSSProperties } from "react";
import useAccessibility from "@/stores/accessibility/useAccessibility";
import useTheme from "@/stores/timer/useTheme";
import Spinner from "./Spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "text"
    | "icon"
    | "ghost-icon"
    | "contrast-default"
    | "icon-text"
    | "contrast-icon-text"
    | "custom";
  transitionDuration?: number;
  "aria-label"?: string;
  style?: CSSProperties;
  loading?: boolean;
  className?: string;
}

export default function Button({
  variant,
  transitionDuration = 200,
  "aria-label": ariaLabel,
  style,
  loading,
  className,
  ...props
}: ButtonProps) {
  let classes = `transition-colors duration-${transitionDuration} `;
  const { accessibility } = useAccessibility();
  const { theme } = useTheme();
  const {
    removeRoundEdges,
    reduceAnimations,
    increaseLetterSpacing,
    highContrastMode,
    accessibilityTextColor,
  } = accessibility;

  const reverseTextColorStyle = theme === "light" ? "#fff" : "#000";
  const textColor = variant?.toLowerCase().includes("contrast")
    ? reverseTextColorStyle
    : accessibilityTextColor;

  switch (variant) {
    case "text": {
      classes += `text-text text-textWeak hover:text-text`;
      break;
    }

    case "icon": {
      classes += `w-12 h-12 rounded-full flex items-center justify-center bg-secondary-100 hover:bg-secondary-200 active:bg-secondary-100`;
      break;
    }

    case "ghost-icon": {
      classes += `w-8 h-8 rounded-full flex items-center justify-center bg-transparent hover:bg-primaryBg`;
      break;
    }

    case "contrast-default": {
      classes += `rounded-full bg-secondary-700 hover:bg-secondary-900 active:bg-secondary-700 px-4 py-2 text-textContrast`;
      break;
    }

    case "icon-text": {
      classes += `rounded-full bg-secondaryBgWeak hover:bg-secondaryBg active:bg-secondaryBgStrong px-6 py-2 text-text flex items-center gap-2`;
      break;
    }

    case "contrast-icon-text": {
      classes += `rounded-full bg-secondary-700 hover:bg-secondary-900 active:bg-secondary-700 px-6 py-2 text-textContrast flex items-center gap-2`;
      break;
    }

    case "custom": {
      break;
    }

    default: {
      classes += `rounded-full bg-secondaryBgWeak hover:bg-secondaryBg active:bg-secondaryBgStrong px-6 py-2 text-text`;
      break;
    }
  }

  const invisibleStyles = "pointer-events-none invisible select-none";

  let loadingContent: React.ReactNode | string | undefined;
  if (loading) {
    loadingContent = (
      <Spinner loading={loading} color={theme === "light" ? "#000" : "#fff"} />
    );
  } else if (reduceAnimations) {
    loadingContent = "Loading...";
  }

  return (
    <button
      style={{
        ...style,
        borderRadius: removeRoundEdges ? "0" : "",
        transition: reduceAnimations ? "none" : "",
        letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
        color: highContrastMode ? textColor : "",
      }}
      className={`${variant === "custom" ? className : ""} ${classes} relative flex items-center justify-center`}
      aria-label={ariaLabel}
      disabled={loading}
      {...props}
    >
      {loading && (
        <span className={`absolute ${loading ? "" : invisibleStyles}`}>
          {loadingContent}
        </span>
      )}

      <span
        className={`${loading ? invisibleStyles : ""} flex items-center justify-center gap-1`}
      >
        {props.children}
      </span>
    </button>
  );
}
