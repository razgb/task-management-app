import {
  ChevronDown,
  ChevronRight,
  Moon,
  Palette,
  Sun,
  Monitor,
  CheckCircle2Icon,
} from "lucide-react";
import { useState } from "react";
import useTheme from "../../stores/useTheme";

export default function ThemeAccordion() {
  const [open, setOpen] = useState(false);
  const { changeAppTheme, theme, themeController } = useTheme();

  let borderStyles = "";
  if (open) {
    borderStyles = "rounded-t-3xl";
  } else {
    borderStyles = "rounded-3xl";
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen((prev) => !prev)}
        className={`flex select-none items-center justify-between gap-4 bg-btnBg px-4 py-2 text-lg font-medium hover:bg-btnHover active:bg-btnActive ${borderStyles}`}
      >
        <div className="flex items-center gap-2">
          <div aria-hidden="true">
            <Palette />
          </div>
          <span>Theme</span>
        </div>

        <div aria-hidden="true">
          {open ? <ChevronDown /> : <ChevronRight />}
        </div>
      </div>

      {/* The body (buttons) of the accordion */}
      {open && (
        <div className="flex flex-col items-start overflow-hidden rounded-b-3xl">
          <ThemeAccordionButton
            onClick={() => {
              changeAppTheme("light", "user");
              setOpen(false);
            }}
            icon={<Sun />}
            selected={theme === "light" && themeController === "user"}
          >
            Light
          </ThemeAccordionButton>

          <ThemeAccordionButton
            onClick={() => {
              changeAppTheme("dark", "user");
              setOpen(false);
            }}
            icon={<Moon />}
            selected={theme === "dark" && themeController === "user"}
          >
            Dark
          </ThemeAccordionButton>

          <ThemeAccordionButton
            onClick={() => {
              changeAppTheme(null, "system");
              setOpen(false);
            }}
            icon={<Monitor />}
            selected={themeController === "system"}
          >
            System
          </ThemeAccordionButton>
        </div>
      )}
    </div>
  );
}

type ThemeAccordionButtonProps = {
  children: React.ReactNode;
  icon: React.ReactNode;
  onClick: () => void;
  selected: boolean;
};

function ThemeAccordionButton({
  children,
  icon,
  onClick,
  selected,
}: ThemeAccordionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between bg-secondary-200 px-4 py-3 text-text hover:bg-btnHover"
    >
      <span className="flex items-center gap-2">
        {icon}
        {children}
      </span>

      {selected && <CheckCircle2Icon size={20} />}
    </button>
  );
}
