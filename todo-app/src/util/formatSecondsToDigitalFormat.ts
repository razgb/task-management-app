export default function formatSecondsToDigitalFormat(
  seconds: number,
  format: "second" | "minute-second" | "hour-minute-second",
): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  switch (format) {
    case "second":
      return seconds.toString().padStart(2, "0");

    case "minute-second":
      return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;

    case "hour-minute-second":
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;

    default:
      throw new Error("Invalid format specified");
  }
}
