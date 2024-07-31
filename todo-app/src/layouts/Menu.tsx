import logo from "../assets/logo.jpg";

import { LogOut } from "lucide-react";
import MenuButton from "../components/menu/MenuButton";
import ThemeAccordion from "../components/menu/ThemeAccordion";
import MenuLinksToPages from "../components/menu/MenuLinksToPages";
import useFontSize from "../stores/accessibility/useFontSize";
import useAccessibility from "../stores/accessibility/useAccessibility";
import { MenuIcon } from "lucide-react";
import { useState } from "react";

export default function Menu() {
  const [menuState, setMenuState] = useState<boolean>(false);
  const toggleMenuState = () => setMenuState((prev) => !prev);

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
      className={`text-primary mr-0 rounded-3xl bg-secondaryBg p-3 ${
        menuState ? "min-w-[300px]" : "w-fit"
      }`}
    >
      <div
        className={`flex h-full flex-col justify-between rounded-2xl bg-primaryBg p-4`}
        style={{
          borderRadius: removeRoundEdges ? "0" : "",
        }}
      >
        <div
          className={`flex flex-col gap-2 ${menuState ? "items-stretch" : "items-start"}`}
        >
          <div className={`mb-8 flex items-start`}>
            <button
              onClick={toggleMenuState}
              className="active:bg-secondary-150 flex items-center justify-center rounded-full bg-transparent p-4 hover:bg-secondary-200"
            >
              <MenuIcon />
            </button>

            {/* <div className="flex flex-shrink-0 items-center justify-center gap-2 self-start">
              <img className="h-16 w-16 rounded-md" src={logo} alt="logo" />
              <h1
                style={{ fontSize: `${fontSizes["2xl"]}px` }}
                className="text-2xl font-bold text-heading"
              >
                TaskBuddy
              </h1>
            </div> */}
          </div>

          <MenuLinksToPages menuState={menuState} />

          <ThemeAccordion menuState={menuState} />
        </div>

        {/* <div>
          <MenuButton to="/dashboard" icon={<LogOut />} menuState={menuState}>
            Logout
          </MenuButton>
        </div> */}
      </div>
    </div>
  );
}
