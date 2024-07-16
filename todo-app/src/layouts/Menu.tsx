import { ICON_SIZE } from "../todoAppConfig";
import { LogOut, PanelLeftOpen, PanelRightOpen } from "lucide-react";

import Button from "../components/shared/Button";

import { useState } from "react";
import NewTaskButton from "../components/menu/NewTaskButton";
import MenuButton from "../components/menu/MenuButton";
import ThemeAccordion from "../components/menu/ThemeAccordion";
import MenuLinksToPages from "../components/menu/MenuLinksToPages";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(true);

  const menuStateComponent = isOpen ? (
    <PanelRightOpen size={ICON_SIZE} className="h-6 w-6 stroke-iconStroke" />
  ) : (
    <PanelLeftOpen size={ICON_SIZE} className="stroke-secondary-dark h-6 w-6" />
  );

  return (
    <div className="text-primary mr-0 w-72 min-w-[300px] rounded-3xl bg-secondaryBg p-3">
      <div className="flex h-full flex-col justify-between rounded-2xl bg-primaryBg p-4">
        <div className="flex flex-col gap-2">
          <div className="mb-8 flex items-center justify-between gap-2">
            <Button
              variant="ghost-icon"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {menuStateComponent}
            </Button>

            <NewTaskButton>{isOpen ? "New task" : null}</NewTaskButton>
          </div>

          <MenuLinksToPages />

          <ThemeAccordion />
        </div>

        <div className="">
          <MenuButton to={null} icon={<LogOut />}>
            Logout
          </MenuButton>
        </div>
      </div>
    </div>
  );
}
