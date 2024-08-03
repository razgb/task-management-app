import { useState } from "react";
import {
  AccessibilityContextType,
  AccessibilityContext,
} from "./AccessibilityContext";

const savedSettingsJSON = localStorage.getItem("accessibility");
let savedSettings: AccessibilityContextType["accessibility"];
if (savedSettingsJSON) {
  savedSettings = JSON.parse(
    savedSettingsJSON,
  ) as AccessibilityContextType["accessibility"];
}

export default function AccessibilityContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [accessibility, setAccessability] = useState<
    AccessibilityContextType["accessibility"]
  >(
    savedSettings || {
      fontSizeMultiplier: 1,
      reduceAnimations: true,
      removeRoundEdges: true,
      increaseLetterSpacing: false,
      highContrastMode: false,
    },
  );

  function updateAccessibility(
    newAccessibility: Partial<AccessibilityContextType["accessibility"]>,
  ) {
    setAccessability((prev) => {
      const newSettings = { ...prev, ...newAccessibility };
      localStorage.setItem("accessibility", JSON.stringify(newSettings));
      return newSettings;
    });
  }

  return (
    <AccessibilityContext.Provider
      value={{ accessibility, updateAccessibility }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}
