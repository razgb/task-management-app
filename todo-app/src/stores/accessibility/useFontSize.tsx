import useAccessibility from "./useAccessibility";

type FontSizeKey = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";

export default function useFontSize(): Record<FontSizeKey, number> {
  const { fontSizeMultiplier } = useAccessibility()["accessibility"];

  const fontSizeMap = {
    xs: 12 * fontSizeMultiplier,
    sm: 14 * fontSizeMultiplier,
    base: 16 * fontSizeMultiplier,
    lg: 18 * fontSizeMultiplier,
    xl: 20 * fontSizeMultiplier,
    "2xl": 24 * fontSizeMultiplier,
    "3xl": 32 * fontSizeMultiplier,
  };

  return fontSizeMap;
}
