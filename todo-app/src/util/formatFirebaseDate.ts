import { TaskType } from "@/pages/tasks/components/Task";

export const formatFirebaseDate = (
  timestamp: TaskType["updatedAt"] | TaskType["createdAt"],
): string => {
  const date = new Date(timestamp.seconds * 1000);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();

  let hours: number | string = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12; // Convert to 12-hour format
  hours = hours ? String(hours).padStart(2, "0") : "12"; // The hour '0' should be '12'

  return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
};
