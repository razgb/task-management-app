import { ICON_SIZE } from "../todoAppConfig";
import {
  LayoutDashboardIcon,
  ListIcon,
  PanelLeftOpen,
  PanelRightOpen,
} from "lucide-react";

import MenuButton from "../components/menu/MenuButton";
import Button from "../components/Button";

import { useState } from "react";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-72 m-4 mr-0 p-4 rounded-3xl text-primary bg-secondary-ultralight">
      <div className="h-full rounded-2xl bg-primary p-4">
        <div className="mb-16">
          <Button
            variant="ghost-icon"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? (
              <PanelRightOpen
                size={ICON_SIZE}
                className="w-6 h-6 stroke-secondary-dark"
              />
            ) : (
              <PanelLeftOpen
                size={ICON_SIZE}
                className="w-6 h-6 stroke-secondary-dark"
              />
            )}
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <MenuButton icon={<LayoutDashboardIcon />} onClick={() => {}}>
            Dashboard
          </MenuButton>

          <MenuButton icon={<ListIcon />} onClick={() => {}}>
            Tasks
          </MenuButton>
        </div>
      </div>
    </div>
  );
}

/*
  There will be open and close states for the css classes.
*/
