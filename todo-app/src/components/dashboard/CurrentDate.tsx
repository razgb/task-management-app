export default function CurrentDate() {
  const userLocale = navigator.language || "en-US";
  const now = new Date();
  const date = now.toLocaleDateString(userLocale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const time = now.toLocaleTimeString(userLocale, {
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

  return (
    <div className="flex h-full flex-col items-center justify-center gap-1 rounded-2xl bg-primaryBg p-3">
      <div>
        <p className="text-4xl font-semibold">{time}</p>
      </div>
      <p className="text-xl font-semibold">{formattedDate}</p>
    </div>
  );
}
