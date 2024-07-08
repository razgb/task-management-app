import { Bell, User, Settings, Sun } from "lucide-react";
import Button from "../shared/Button";
import { ICON_SIZE } from "../../todoAppConfig";

const iconClasses = "stroke-secondary-dark";

export default function ActionButtons() {
  return (
    <div className="bg-secondary-ultralight rounded-full p-2">
      <div className="flex items-center gap-4 rounded-full bg-primary p-2">
        <Button variant="ghost-icon">
          <Sun size={ICON_SIZE} className={iconClasses} />
        </Button>

        <Button variant="ghost-icon">
          <Bell size={ICON_SIZE} className={iconClasses} />
        </Button>

        <Button variant="ghost-icon">
          <User size={ICON_SIZE} className={iconClasses} />
        </Button>

        <Button variant="ghost-icon">
          <Settings size={ICON_SIZE} className={iconClasses} />
        </Button>
      </div>
    </div>
  );
}
