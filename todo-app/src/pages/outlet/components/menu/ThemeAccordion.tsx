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
import useTheme from "@/stores/timer/useTheme";
import useAccessibility from "@/stores/accessibility/useAccessibility";

export default function ThemeAccordion({ menuState }: { menuState: boolean }) {
  const { accessibility } = useAccessibility();
  const {
    removeRoundEdges,
    reduceAnimations,
    highContrastMode,
    increaseLetterSpacing,
    fontSizeMap,
    accessibilityTextColor,
  } = accessibility;

  const [open, setOpen] = useState(false);
  const { changeAppTheme, theme, themeController } = useTheme();
  let borderStyles = "";
  if (open) {
    borderStyles = "rounded-t-3xl";
  } else {
    borderStyles = "rounded-3xl";
  }

  return (
    <div
      className={`${menuState ? "opacity-100" : "hidden opacity-0"} transition`}
    >
      <div
        role="button"
        aria-label="Show theme options."
        tabIndex={0}
        onClick={() => setOpen((prev) => !prev)}
        className={`flex select-none items-center justify-between gap-4 bg-btnBg px-4 py-2 ${fontSizeMap["lg"]} font-medium hover:bg-btnHover active:bg-btnActive ${borderStyles}`}
        style={{
          borderRadius: removeRoundEdges ? "0" : "",
          transition: reduceAnimations ? "none" : "",
          letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
          color: highContrastMode ? accessibilityTextColor : "",
        }}
      >
        <div className="flex items-center gap-2">
          <div aria-hidden="true">
            <Palette />
          </div>
          <span style={{ fontSize: `${fontSizeMap.base}px` }}>Theme</span>
        </div>

        <div aria-hidden="true">
          {open ? <ChevronDown /> : <ChevronRight />}
        </div>
      </div>

      {/* The body (buttons) of the accordion */}
      {open && (
        <div
          style={{
            borderRadius: removeRoundEdges ? "0" : "",
          }}
          className="flex flex-col items-start overflow-hidden rounded-b-3xl"
        >
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
  const { accessibility } = useAccessibility();
  const {
    removeRoundEdges,
    reduceAnimations,
    highContrastMode,
    increaseLetterSpacing,
    fontSizeMap,
    accessibilityTextColor,
  } = accessibility;

  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between bg-secondary-200 px-4 py-3 text-text hover:bg-btnHover`}
      style={{
        fontSize: `${fontSizeMap.base}px`,
        borderRadius: removeRoundEdges ? "0" : "",
        transition: reduceAnimations ? "none" : "",
        letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
        color: highContrastMode ? accessibilityTextColor : "",
      }}
    >
      <span
        style={{ fontSize: `${fontSizeMap.base}px` }}
        className="flex items-center gap-2"
      >
        {icon}
        {children}
      </span>

      {selected && <CheckCircle2Icon size={fontSizeMap["xl"]} />}
    </button>
  );
}
