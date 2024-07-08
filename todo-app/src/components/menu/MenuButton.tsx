import { ButtonHTMLAttributes } from "react";

interface MenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon: React.ReactNode;
  // [key: string]: unknown; // claude says it's overly too permissive, I agree.
  onClick: () => void;
}

export default function MenuButton({
  children,
  icon,
  ...props
}: MenuButtonProps) {
  return (
    <button
      className={`flex items-center gap-2 px-6 py-3 rounded-full 
      bg-secondary-dark text-lg hover:scale-[1.02] active:scale-100
      transition-transform duration-150`}
      {...props}
    >
      <div>{icon}</div>
      <span>{children}</span>
    </button>
  );
}
