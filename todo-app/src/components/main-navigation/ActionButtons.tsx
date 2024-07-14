import { User } from "lucide-react";
import { ICON_SIZE } from "../../todoAppConfig";
const iconClasses = "stroke-iconStroke";
import Button from "../shared/Button";

export default function ActionButtons() {
  return (
    <div className="flex items-center gap-4 rounded-full p-2">
      <Button variant="icon">
        <User size={ICON_SIZE} className={iconClasses} />
      </Button>
    </div>
  );
}
