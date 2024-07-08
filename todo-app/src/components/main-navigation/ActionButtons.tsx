import { Bell, User, Settings, Sun } from "lucide-react";
import Button from "../shared/Button";

const ICON_SIZE = 24;
const iconClasses = "stroke-secondary-dark";

export default function ActionButtons() {
  return (
    <div className="flex items-center gap-4 bg-secondary-ultralight rounded-full p-2">
      <Button variant="icon">
        <Sun size={ICON_SIZE} className={iconClasses} />
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
