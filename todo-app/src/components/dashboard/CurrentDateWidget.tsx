import { useEffect, useState } from "react";

export default function CurrentDateWidget() {
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
    <div className="flex h-full flex-col items-center justify-center gap-1 rounded-2xl bg-primaryBg p-3">
      <div>
        <p className="text-4xl font-semibold">{time}</p>
      </div>
      <p className="text-xl font-semibold">{formattedDate}</p>
    </div>
  );
}
