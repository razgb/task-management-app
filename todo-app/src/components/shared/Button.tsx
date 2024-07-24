import { ButtonHTMLAttributes, CSSProperties } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "text" | "ghost" | "icon" | "ghost-icon" | "icon-text";
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

  switch (variant) {
    case "text": {
      classes += `text-text text-textWeak hover:text-text`;
      break;
    }

    case "ghost": {
      classes += `text-text font-semibold hover:bg-secondary-ultralight`;
      break;
    }

    case "icon": {
      // have no idea what to call this, might just delete.
      classes += `w-16 h-16 rounded-full flex items-center justify-center bg-iconBg hover:bg-iconBgStrong`;
      break;
    }

    case "ghost-icon": {
      classes += `w-8 h-8 rounded-full flex items-center justify-center bg-primaryBg`;
      break;
    }

    case "icon-text": {
      classes += `flex items-center gap-1 rounded-full bg-mainButtonBg hover:bg-mainButtonBgHover font-medium active:bg-mainButtonBgActive px-4 py-2 text-secondary-100`;
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
      }}
      className={classes}
      aria-label={ariaLabel}
      {...props}
    >
      {props.children}
    </button>
  );
}
