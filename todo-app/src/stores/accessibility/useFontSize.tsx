import useAccessibility from "./useAccessibility";

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

export default function useFontSize(): FontSizeMapType {
  const { fontSizeMultiplier } = useAccessibility()["accessibility"];

  const fontSizeMap: FontSizeMapType = {
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

  return fontSizeMap;
}
