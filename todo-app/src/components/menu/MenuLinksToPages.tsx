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

export default function MenuLinksToPages({
  menuState,
}: {
  menuState: boolean;
}) {
  const fontSizes = useFontSize();

  return (
    <div className={`flex flex-col items-start gap-2`}>
      <MenuButton
        to="/task-creator"
        variant="contrast"
        icon={<Plus size={fontSizes["2xl"]} />}
        menuState={menuState}
      >
        New task
      </MenuButton>
      <MenuButton
        to="/dashboard"
        icon={<LayoutDashboard size={fontSizes["2xl"]} />}
        menuState={menuState}
      >
        Dashboard
      </MenuButton>
      <MenuButton
        to="/tasks"
        icon={<ListTodo size={fontSizes["2xl"]} />}
        menuState={menuState}
      >
        Tasks
      </MenuButton>
      <MenuButton
        to="/settings"
        icon={<Settings size={fontSizes["2xl"]} />}
        menuState={menuState}
      >
        Settings
      </MenuButton>
      <MenuButton
        to="/timer"
        icon={<Timer size={fontSizes["2xl"]} />}
        menuState={menuState}
      >
        Timer
      </MenuButton>
      <MenuButton
        to="/habit-tracker"
        icon={<NotebookText size={fontSizes["2xl"]} />}
        menuState={menuState}
      >
        Habit Tracker
      </MenuButton>
    </div>
  );
}
