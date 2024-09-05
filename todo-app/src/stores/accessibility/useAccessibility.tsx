import { useContext, useMemo } from "react";
import { AccessibilityContext } from "./AccessibilityContext";
import useAccessibilityTextColor from "./useAccessibilityTextColor";

export type FontSizeMapType = {
  xs: number;
  sm: number;
  base: number;
  lg: number;
  xl: number;
  "2xl": number;
  "3xl": number;
  "4xl": number;
  "5xl": number;
  "6xl": number;
};

/**
 * Unified location to receive all accessibility values.
 *
 */
export default function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === null) {
    throw new Error(
      "useAccessibility must be used within a AccessibilityProvider context.",
    );
  }

  const { accessibilityTextColor, reverseAccessibilityTextColor } =
    useAccessibilityTextColor();

  const { accessibility, updateAccessibility } = context;
  const { fontSizeMultiplier } = accessibility;

  const fontSizeMap: FontSizeMapType = useMemo(() => {
    return {
      xs: 12 * fontSizeMultiplier,
      sm: 14 * fontSizeMultiplier,
      base: 16 * fontSizeMultiplier,
      lg: 18 * fontSizeMultiplier,
      xl: 20 * fontSizeMultiplier,
      "2xl": 24 * fontSizeMultiplier,
      "3xl": 30 * fontSizeMultiplier,
      "4xl": 36 * fontSizeMultiplier,
      "5xl": 48 * fontSizeMultiplier,
      "6xl": 60 * fontSizeMultiplier,
    };
  }, [fontSizeMultiplier]);

  return {
    accessibility: {
      fontSizeMap,
      accessibilityTextColor,
      reverseAccessibilityTextColor,
      ...accessibility,
    },
    updateAccessibility,
  };
}
