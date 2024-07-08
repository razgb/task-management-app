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
      classes += `px-4 py-2 rounded-full bg-secondary-dark hover:bg-secondary`;
      break;
    }

    case "ghost": {
      classes += `text-secondary-dark font-semibold hover:bg-secondary-ultralight`;
      break;
    }

    case "icon": {
      classes += `w-12 h-12 rounded-full flex items-center justify-center hover:bg-secondary-light`;
      break;
    }

    case "ghost-icon": {
      classes += `w-12 h-12 rounded-full flex items-center justify-center hover:bg-secondary-ultralight`;
      break;
    }
  }

  return (
    <button className={classes} {...props}>
      {props.children}
    </button>
  );
}
