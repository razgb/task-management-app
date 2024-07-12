import { ICON_SIZE } from "../todoAppConfig";
import { PanelLeftOpen, PanelRightOpen, PlusIcon } from "lucide-react";

import Button from "../components/shared/Button";

import { useState } from "react";
import MenuAccordion from "../components/menu/MenuAccordion";
import NewTaskButton from "../components/menu/NewTaskButton";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="text-primary m-4 mr-0 w-72 rounded-2xl bg-secondaryBg p-3">
      <div className="h-full rounded-xl bg-primaryBg p-4">
        <div className="mb-16 flex justify-between gap-2">
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

        <MenuAccordion>
          <MenuAccordion.group title="Recent">
            <MenuAccordion.item>Human Body</MenuAccordion.item>
            <MenuAccordion.item>Cultures</MenuAccordion.item>
            <MenuAccordion.item>Algebra</MenuAccordion.item>
            <MenuAccordion.item>Chemistry</MenuAccordion.item>
            <MenuAccordion.item>Wars</MenuAccordion.item>
            <MenuAccordion.item>Literature</MenuAccordion.item>
            <MenuAccordion.item>Landforms</MenuAccordion.item>
            <MenuAccordion.item>Painting</MenuAccordion.item>
          </MenuAccordion.group>

          <MenuAccordion.group title="Work">
            <MenuAccordion.item>Human Body</MenuAccordion.item>
            <MenuAccordion.item>Cultures</MenuAccordion.item>
            <MenuAccordion.item>Algebra</MenuAccordion.item>
            <MenuAccordion.item>Chemistry</MenuAccordion.item>
          </MenuAccordion.group>

          <MenuAccordion.group title="Personal">
            <MenuAccordion.item>Human Body</MenuAccordion.item>
            <MenuAccordion.item>Cultures</MenuAccordion.item>
            <MenuAccordion.item>Algebra</MenuAccordion.item>
            <MenuAccordion.item>Chemistry</MenuAccordion.item>
          </MenuAccordion.group>
        </MenuAccordion>
      </div>
    </div>
  );
}
