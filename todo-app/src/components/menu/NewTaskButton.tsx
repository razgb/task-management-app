import { SquarePen } from "lucide-react";
import { ICON_SIZE } from "../../todoAppConfig";

export default function NewTaskButton({
  children,
}: {
  children: React.ReactNode | null;
}) {
  return (
    <button
      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-text hover:bg-iconBgStrong`}
    >
      <div>
        <SquarePen size={ICON_SIZE} className="stroke-iconStroke" />
      </div>
      <span>{children}</span>
    </button>
  );
}

/*
import { ButtonHTMLAttributes } from "react";

interface MenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon: React.ReactNode;
  onClick: () => void;
}

export default function MenuButton({
  children,
  icon,
  ...props
}: MenuButtonProps) {
  return (
    <button
      className={`flex items-center gap-2 rounded-full bg-btnBg px-6 py-3 text-lg text-white`}
      {...props}
    >
      <div>{icon}</div>
      <span>{children}</span>
    </button>
  );
}

*/
