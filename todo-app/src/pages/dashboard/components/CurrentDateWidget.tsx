import { useEffect, useState } from "react";
import useAccessibility from "@/stores/accessibility/useAccessibility";

export default function CurrentDateWidget() {
  const { accessibility } = useAccessibility();
  const {
    increaseLetterSpacing,
    highContrastMode,
    removeRoundEdges,
    reduceAnimations,
    fontSizeMap,
    accessibilityTextColor,
  } = accessibility;

  const [currentDate, setCurrentDate] = useState(new Date());
  const userLocale = navigator.language || "en-US";
  const date = currentDate.toLocaleDateString(userLocale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const time = currentDate.toLocaleTimeString(userLocale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const formattedDate = userLocale.startsWith("en")
    ? date.replace(/(\d+)(?=(st|nd|rd|th))/, (_, p1) => {
        const suffix = ["th", "st", "nd", "rd"][p1 % 10] || "th";
        return `${p1}${suffix}`;
      })
    : date;

  useEffect(() => {
    setTimeout(() => {
      if (!currentDate) return;
      setCurrentDate(new Date());
    }, 15 * 1000);
  });

  return (
    <div
      className="flex h-full flex-col items-center justify-center rounded-2xl bg-primaryBg p-3"
      style={{
        borderRadius: removeRoundEdges ? "0" : "",
        transition: reduceAnimations ? "none" : "",
        letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
      }}
    >
      <div>
        <h3
          className="font-semibold"
          style={{
            fontSize: `${fontSizeMap["4xl"]}px`,
            color: highContrastMode ? accessibilityTextColor : "",
          }}
        >
          {time}
        </h3>
      </div>
      <p
        className="text-center"
        style={{
          fontSize: `${fontSizeMap["lg"]}px`,
          color: highContrastMode ? accessibilityTextColor : "",
        }}
      >
        {formattedDate}
      </p>
    </div>
  );
}
