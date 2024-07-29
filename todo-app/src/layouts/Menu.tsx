import logo from "../assets/logo.jpg";

import { LogOut } from "lucide-react";
import MenuButton from "../components/menu/MenuButton";
import ThemeAccordion from "../components/menu/ThemeAccordion";
import MenuLinksToPages from "../components/menu/MenuLinksToPages";
import useFontSize from "../stores/accessibility/useFontSize";
import useAccessibility from "../stores/accessibility/useAccessibility";

export default function Menu() {
  const fontSizes = useFontSize();
  const { accessibility } = useAccessibility();
  const {
    removeRoundEdges,
    reduceAnimations,
    highContrastMode,
    increaseLetterSpacing,
  } = accessibility;

  return (
    <div
      style={{
        borderRadius: removeRoundEdges ? "0" : "",
        transition: reduceAnimations ? "none" : "",
        letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
        color: highContrastMode ? "#fff" : "",
      }}
      className="text-primary mr-0 w-72 min-w-[300px] rounded-3xl bg-secondaryBg p-3"
    >
      <div
        className="flex h-full flex-col justify-between rounded-2xl bg-primaryBg p-4"
        style={{
          borderRadius: removeRoundEdges ? "0" : "",
        }}
      >
        <div className="flex flex-col gap-2">
          <div className="mb-8 flex flex-shrink-0 items-center justify-center gap-2 self-start">
            <img className="h-16 w-16 rounded-md" src={logo} alt="logo" />
            <h1
              style={{ fontSize: `${fontSizes["2xl"]}px` }}
              className="text-2xl font-bold text-heading"
            >
              TaskBuddy
            </h1>
          </div>

          <MenuLinksToPages />

          <ThemeAccordion />
        </div>

        <div>
          {/* temp logout button link */}
          <MenuButton to="/dashboard" icon={<LogOut />}>
            Logout
          </MenuButton>
        </div>
      </div>
    </div>
  );
}
