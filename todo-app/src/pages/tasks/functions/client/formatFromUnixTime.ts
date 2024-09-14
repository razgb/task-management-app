export function formatFromUnixTime(unixTimestamp: string | number): string {
  const timestamp =
    typeof unixTimestamp === "string"
      ? parseInt(unixTimestamp, 10)
      : unixTimestamp;

  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear(); // Get full year

  return `${day}-${month}-${year}`; // Return as dd/mm/yyyy format
}
