import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "icon" | "ghost-icon";
  textsize?: "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
  transitionDuration?: number;
}

export default function Button({
  variant = "default",
  textsize = "base",
  transitionDuration = 200,
  ...props
}: ButtonProps) {
  let classes = `transition-colors duration-${transitionDuration} text-${textsize} `;

  switch (variant) {
    case "default": {
      classes += `rounded-full bg-black px-4 py-2`;
      break;
    }

    case "ghost": {
      classes += `text-text font-semibold hover:bg-secondary-ultralight`;
      break;
    }

    case "icon": {
      // have no idea what to call this, might just delete.
      classes += `w-12 h-12 rounded-full flex items-center justify-center hover:bg-iconBgStrong`;
      break;
    }

    case "ghost-icon": {
      classes += `w-12 h-12 rounded-full flex items-center justify-center hover:bg-iconBg`;
      break;
    }
  }

  return (
    <button className={classes} {...props}>
      {props.children}
    </button>
  );
}
