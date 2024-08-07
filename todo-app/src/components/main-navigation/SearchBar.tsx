import { SearchIcon } from "lucide-react";

import useAccessibility from "../../stores/accessibility/useAccessibility.tsx";

export default function SearchBar() {
  const { accessibility } = useAccessibility();
  const {
    removeRoundEdges,
    reduceAnimations,
    highContrastMode,
    increaseLetterSpacing,
    fontSizeMap,
    accessibilityTextColor,
  } = accessibility;

  return (
    <div
      className="flex h-12 w-full max-w-[600px] items-center gap-2 self-end overflow-hidden rounded-full bg-secondaryBg pl-4 transition-colors hover:bg-secondaryBg"
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
          fontSize: `${fontSizeMap.base}px`,
        }}
      />
    </div>
  );
}
