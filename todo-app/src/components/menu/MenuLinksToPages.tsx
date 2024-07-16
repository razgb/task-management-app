import { Settings, LayoutDashboard, ListTodo, Timer } from "lucide-react";
import MenuButton from "./MenuButton";

export default function MenuLinksToPages() {
  return (
    <ul className="flex flex-col gap-2">
      <li>
        <MenuButton to="/dashboard" icon={<LayoutDashboard />}>
          Dashboard
        </MenuButton>
      </li>
      <li>
        <MenuButton to="/tasks" icon={<ListTodo />}>
          Tasks
        </MenuButton>
      </li>
      <li>
        <MenuButton to="/settings" icon={<Settings />}>
          Settings
        </MenuButton>
      </li>
      <li>
        <MenuButton to="/timer" icon={<Timer />}>
          Timer
        </MenuButton>
      </li>
    </ul>
  );
}
