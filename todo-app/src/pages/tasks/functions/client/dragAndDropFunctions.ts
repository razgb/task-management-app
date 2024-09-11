import { isSubTaskType } from "./isSubTaskType";
import { SubTaskType } from "@/pages/tasks/components/TaskExpanded";

export function handleDragStart(
  event: React.DragEvent<HTMLLIElement>,
  taskData: SubTaskType,
): void {
  if (!isSubTaskType(taskData)) return;

  // Serialize in JSON format.
  const jsonTask = JSON.stringify(taskData);
  event.dataTransfer?.setData("application/json", jsonTask);
}

/**
 * Receives subtask data from a dropped subtask.
 * Checks for subtask titles that are used as unique identifiers.
 */
export function handleDrop(
  event: React.DragEvent<HTMLLIElement>,
  subTaskTitle: SubTaskType["title"],
) {
  event.preventDefault();

  const temp = event.dataTransfer?.getData("application/json");
  if (!temp) return;

  const receivedSubTask = JSON.parse(temp) as SubTaskType; // Incoming task data.
  if (subTaskTitle === receivedSubTask.title) return; // Guard against drop on same position.

  return receivedSubTask.title;
}
