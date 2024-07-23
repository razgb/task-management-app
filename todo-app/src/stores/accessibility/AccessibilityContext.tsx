import { createContext } from "react";

export type AccessibilityContextType = {
  accessibility: {
    fontSizeMultiplier: 0.5 | 0.75 | 1 | 1.25 | 1.5 | 2;
    highContrastMode: boolean;
    reduceAnimations: boolean;
    removeRoundEdges: boolean;
    increaseLetterSpacing: boolean;
    defaultTimeout: boolean;
    dyslexicMode: boolean;
    colorBlindMode:
      | "Normal"
      | "Protanopia"
      | "Deuteranopia"
      | "Tritanopia"
      | "Achromatopsia";
  };

  updateAccessibility: (
    newAccessibility: Partial<AccessibilityContextType["accessibility"]>,
  ) => void;
};

export const AccessibilityContext =
  createContext<AccessibilityContextType | null>(null);
