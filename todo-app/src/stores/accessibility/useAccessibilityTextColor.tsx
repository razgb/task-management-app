import useTheme from "../useTheme";

interface AccessibilityTextColors {
  accessibilityTextColor: string;
  reverseAccessibilityTextColor: string;
}

export default function useAccessibilityTextColor(): AccessibilityTextColors {
  const { theme } = useTheme();

  const accessibilityTextColor = theme === "light" ? "#000" : "#fff";
  const reverseAccessibilityTextColor = theme === "light" ? "#fff" : "#000";

  return {
    accessibilityTextColor,
    reverseAccessibilityTextColor,
  };
}
