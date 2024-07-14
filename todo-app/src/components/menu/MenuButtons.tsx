import { ValidUrlPaths } from "../../stores/RouterContext";
import useRouter from "../../stores/useRouter";
import { Settings, LayoutDashboard, ListTodo, Palette } from "lucide-react";

export function MenuButtons() {
  return (
    <ul className="mb-2 flex flex-col gap-2">
      <li>
        <MenuButton to="/dashboard" icon={<LayoutDashboard />}>
          Dashboard
        </MenuButton>
      </li>
      <li>
        <MenuButton to="/task-groups" icon={<ListTodo />}>
          Task Groups
        </MenuButton>
      </li>
      <li>
        <MenuButton to="/settings" icon={<Settings />}>
          Settings
        </MenuButton>
      </li>
    </ul>
  );
}

type MenuButtonProps = {
  to: ValidUrlPaths;
  children: React.ReactNode;
  icon?: React.ReactNode;
};

function MenuButton({ to, children, icon }: MenuButtonProps) {
  const { updatePath } = useRouter();

  return (
    <div
      role="button"
      tabIndex={0}
      className="flex items-center gap-2 rounded-3xl bg-btnBg px-4 py-2 text-lg hover:bg-btnHover active:bg-btnActive"
      onClick={() => updatePath(to)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          updatePath(to);
        }
      }}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      <span>{children}</span>
    </div>
  );
}
