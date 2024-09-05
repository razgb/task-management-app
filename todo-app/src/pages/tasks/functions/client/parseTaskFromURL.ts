/**
 * Parses the taskID from window.location object.
 */
export function parseTaskFromURL(url: string): string | null {
  const urlAsArray = url.split("/"); // would look like ["something.com", "tasks", "taskID"]

  const indexOfTasksString = urlAsArray.findIndex((str) =>
    str.includes("tasks"),
  );

  if (!indexOfTasksString) return null;
  const unloadedTaskID = urlAsArray[indexOfTasksString + 1];

  return unloadedTaskID;
}
