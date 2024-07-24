import {
  Settings,
  LayoutDashboard,
  ListTodo,
  Timer,
  Plus,
  NotebookText,
} from "lucide-react";
import MenuButton from "./MenuButton";
import useFontSize from "../../stores/accessibility/useFontSize";

export default function MenuLinksToPages() {
  const fontSizes = useFontSize();

  return (
    <ul className="flex flex-col gap-2">
      <li>
        <MenuButton
          to="/task-creator"
          variant="contrast"
          icon={<Plus size={fontSizes["2xl"]} />}
        >
          New task
        </MenuButton>
      </li>
      <li>
        <MenuButton
          to="/dashboard"
          icon={<LayoutDashboard size={fontSizes["2xl"]} />}
        >
          Dashboard
        </MenuButton>
      </li>
      <li>
        <MenuButton to="/tasks" icon={<ListTodo size={fontSizes["2xl"]} />}>
          Tasks
        </MenuButton>
      </li>
      <li>
        <MenuButton to="/settings" icon={<Settings size={fontSizes["2xl"]} />}>
          Settings
        </MenuButton>
      </li>
      <li>
        <MenuButton to="/timer" icon={<Timer size={fontSizes["2xl"]} />}>
          Timer
        </MenuButton>
      </li>
      <li>
        <MenuButton
          to="/habit-tracker"
          icon={<NotebookText size={fontSizes["2xl"]} />}
        >
          Habit Tracker
        </MenuButton>
      </li>
    </ul>
  );
}
