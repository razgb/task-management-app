import { createContext } from "react";

export type AccessibilityContextType = {
  accessibility: {
    fontSizeMultiplier: 0.5 | 0.75 | 1 | 1.25 | 1.5;
    highContrastMode: boolean;
    reduceAnimations: boolean;
    removeRoundEdges: boolean;
    increaseLetterSpacing: boolean;
  };

  updateAccessibility: (
    newAccessibility: Partial<AccessibilityContextType["accessibility"]>,
  ) => void;
};

export const AccessibilityContext =
  createContext<AccessibilityContextType | null>(null);
