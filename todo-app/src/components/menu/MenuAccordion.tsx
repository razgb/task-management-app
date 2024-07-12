import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { ReactNode, createContext, useContext, useState } from "react";

interface MenuAccordionContextType {
  activeItem: string | null;
  setActiveItem: (item: string | null) => void;
}

const MenuAccordionContext = createContext<
  MenuAccordionContextType | undefined
>(undefined); // value is undefined when used outside the context.

//

function MenuAccordion({ children }: { children: ReactNode }) {
  const [activeItem, setActiveItem] = useState<string | null>("Recent");

  return (
    <MenuAccordionContext.Provider value={{ activeItem, setActiveItem }}>
      <div className="flex flex-col gap-2">{children}</div>
    </MenuAccordionContext.Provider>
  );
}

function AccordionGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const context = useContext(MenuAccordionContext);
  if (!context) {
    throw new Error("AccordionItem must be used within a MenuAccordion");
  }

  const { activeItem, setActiveItem } = context;
  const isActive = activeItem === title;

  function toggleItem() {
    setActiveItem(isActive ? null : title);
  }

  const borderRadiusStyles = isActive ? "rounded-t" : "rounded";

  return (
    <div className="">
      <button
        onClick={toggleItem}
        className={`flex w-full items-center justify-between gap-1 bg-secondaryBg ${borderRadiusStyles} px-3 py-1 text-left text-headingSub`}
      >
        <span className="font-medium text-headingSub">{title}</span>

        {isActive ? (
          <ChevronDownIcon size={20} />
        ) : (
          <ChevronRightIcon size={20} />
        )}
      </button>

      {/* Content of the accordion group */}
      {isActive && (
        <div className="bg-secondaryBgWeak flex flex-col items-start gap-2 rounded-b-lg px-4 py-2">
          {children}
        </div>
      )}
    </div>
  );
}

function AccordionItem({ children }: { children: ReactNode }) {
  return <button className="hover:ml-1">{children}</button>;
}

MenuAccordion.group = AccordionGroup;
MenuAccordion.item = AccordionItem;
export default MenuAccordion;
