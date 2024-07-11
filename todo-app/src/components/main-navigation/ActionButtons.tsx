import { Bell, User, Settings, Sun } from "lucide-react";
import { ICON_SIZE } from "../../todoAppConfig";
const iconClasses = "stroke-iconStroke";
import Button from "../shared/Button";

export default function ActionButtons() {
  return (
    <div className="rounded-full bg-secondaryBg p-1">
      <div className="flex items-center gap-4 rounded-full bg-primaryBg p-2">
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
