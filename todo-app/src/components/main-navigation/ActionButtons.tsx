import { Bell, User, Settings, Sun, Moon } from "lucide-react";
import { ICON_SIZE } from "../../todoAppConfig";
const iconClasses = "stroke-iconStroke";
import Button from "../shared/Button";
import useTheme from "../../stores/useTheme";

export default function ActionButtons() {
  const { theme, changeAppTheme } = useTheme();

  const handleThemeChange = () => {
    if (theme === "light") {
      changeAppTheme("dark");
    } else {
      changeAppTheme("light");
    }
  };

  return (
    <div className="flex items-center gap-4 rounded-full p-2">
      <Button variant="icon" onClick={handleThemeChange}>
        {theme === "light" ? (
          <Sun size={ICON_SIZE} className={iconClasses} />
        ) : (
          <Moon size={ICON_SIZE} className={iconClasses} />
        )}
      </Button>

      <Button variant="icon">
        <Bell size={ICON_SIZE} className={iconClasses} />
      </Button>

      <Button variant="icon">
        <User size={ICON_SIZE} className={iconClasses} />
      </Button>

      <Button variant="icon">
        <Settings size={ICON_SIZE} className={iconClasses} />
      </Button>
    </div>
  );
}
