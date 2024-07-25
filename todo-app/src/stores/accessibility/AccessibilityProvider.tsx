import { useState } from "react";
import {
  AccessibilityContextType,
  AccessibilityContext,
} from "./AccessibilityContext";

export default function AccessibilityContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [accessibility, setAccessability] = useState<
    AccessibilityContextType["accessibility"]
  >({
    fontSizeMultiplier: 1,
    reduceAnimations: false,
    removeRoundEdges: false,
    increaseLetterSpacing: false,
    highContrastMode: false,
    dyslexicMode: false,
    colorBlindMode: "Normal",
    defaultTimeout: false,
  });

  function updateAccessibility(
    newAccessibility: Partial<AccessibilityContextType["accessibility"]>,
  ) {
    setAccessability((prev) => ({ ...prev, ...newAccessibility }));
  }

  return (
    <AccessibilityContext.Provider
      value={{ accessibility, updateAccessibility }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}