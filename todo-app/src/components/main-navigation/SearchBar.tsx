import { SearchIcon } from "lucide-react";

import useFontSize from "../../stores/accessibility/useFontSize.tsx";
import useAccessibility from "../../stores/accessibility/useAccessibility.tsx";
import useAccessibilityTextColor from "../../stores/accessibility/useAccessibilityTextColor.tsx";

export default function SearchBar() {
  const fontSizes = useFontSize();
  const { accessibility } = useAccessibility();
  const { accessibilityTextColor } = useAccessibilityTextColor();
  const {
    removeRoundEdges,
    reduceAnimations,
    highContrastMode,
    increaseLetterSpacing,
  } = accessibility;

  return (
    <div
      className="flex self-end h-12 w-full max-w-[600px] items-center gap-2 overflow-hidden rounded-full bg-secondaryBg pl-4 transition-colors hover:bg-secondaryBg"
      style={{
        borderRadius: removeRoundEdges ? "0" : "",
        transition: reduceAnimations ? "none" : "",
        letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
        color: highContrastMode ? accessibilityTextColor : "",
      }}
    >
      <SearchIcon size={22} className="stroke-iconStroke" />
      <input
        placeholder="Search tasks"
        type="text"
        className="h-full w-full bg-transparent text-text outline-none placeholder:text-textPlaceholder"
        style={{
          fontSize: `${fontSizes.base}px`,
        }}
      />
    </div>
  );
}
