import { ButtonHTMLAttributes, CSSProperties } from "react";
import useAccessibility from "../../stores/accessibility/useAccessibility";
import useTheme from "../../stores/useTheme";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "text"
    | "icon"
    | "ghost-icon"
    | "constrast-default"
    | "icon-text"
    | "contrast-icon-text";
  transitionDuration?: number;
  "aria-label"?: string;
  style?: CSSProperties;
}

export default function Button({
  variant,
  transitionDuration = 200,
  "aria-label": ariaLabel,
  style,
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
  } = accessibility;

  const textColorStyle = theme === "light" ? "#000" : "#fff";
  const reverseTextColorStyle = theme === "light" ? "#fff" : "#000";
  const textColor = variant?.toLowerCase().includes("contrast")
    ? reverseTextColorStyle
    : textColorStyle;

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
      classes += `w-8 h-8 rounded-full flex items-center justify-center bg-primaryBg`;
      break;
    }

    case "constrast-default": {
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

    default: {
      classes += `rounded-full bg-secondaryBgWeak hover:bg-secondaryBg active:bg-secondaryBgStrong px-6 py-2 text-text`;
      break;
    }
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
      className={classes}
      aria-label={ariaLabel}
      {...props}
    >
      {props.children}
    </button>
  );
}
