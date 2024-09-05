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
 * Receives subtask data from another dropped subtask.
 * Checks for unique subtask titles that are used as unique identifiers.
 */
export function handleDrop(
  event: React.DragEvent<HTMLLIElement>,
  ownTaskTitle: SubTaskType["title"],
  swapSubTaskPositions: (
    incomingTaskTitle: string,
    outgoingTaskTitle: string,
  ) => void,
): void {
  event.preventDefault();

  const temp = event.dataTransfer?.getData("application/json");
  if (!temp) return;

  const replacingTaskData = JSON.parse(temp) as SubTaskType; // Incoming task data.
  if (ownTaskTitle === replacingTaskData.title) return; // Guard against drop on same position.

  swapSubTaskPositions(replacingTaskData.title, ownTaskTitle);
}
