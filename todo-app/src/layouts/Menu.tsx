import { ICON_SIZE } from "../todoAppConfig";
import { PanelLeftOpen, PanelRightOpen } from "lucide-react";

import Button from "../components/shared/Button";

import { useState } from "react";
import NewTaskButton from "../components/menu/NewTaskButton";
import { MenuButtons } from "../components/menu/MenuButtons";
import ThemeAccordion from "../components/menu/ThemeAccordion";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="text-primary mr-0 w-72 min-w-[300px] rounded-3xl bg-secondaryBg p-3">
      <div className="h-full rounded-2xl bg-primaryBg p-4">
        <div className="mb-16 flex items-center justify-between gap-2">
          <Button
            variant="ghost-icon"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? (
              <PanelRightOpen
                size={ICON_SIZE}
                className="h-6 w-6 stroke-iconStroke"
              />
            ) : (
              <PanelLeftOpen
                size={ICON_SIZE}
                className="stroke-secondary-dark h-6 w-6"
              />
            )}
          </Button>

          <NewTaskButton>{isOpen ? "New task" : null}</NewTaskButton>
        </div>

        <MenuButtons />

        <ThemeAccordion />
      </div>
    </div>
  );
}
