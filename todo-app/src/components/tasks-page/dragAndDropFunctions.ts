import { isSubTaskType } from "./isSubTaskType";
import { SubTaskType } from "./TaskExpanded";

export function handleDragStart(
  event: React.DragEvent<HTMLLIElement>,
  taskData: SubTaskType,
): void {
  if (!isSubTaskType(taskData)) return;

  // Serialize in JSON format.
  const jsonTask = JSON.stringify(taskData);
  event.dataTransfer?.setData("application/json", jsonTask);
}

export function handleDrop(
  event: React.DragEvent<HTMLLIElement>,
  ownTaskTitle: SubTaskType["title"],
  swapSubTaskPositions: (
    incomingTaskId: string,
    outgoingTaskId: string,
  ) => void,
): void {
  event.preventDefault();

  const temp = event.dataTransfer?.getData("application/json");
  if (!temp) return;

  const replacingTaskData = JSON.parse(temp); // Incoming task data.
  if (ownTaskTitle === replacingTaskData.id) return; // Guard against drop on same position.

  swapSubTaskPositions(replacingTaskData.id, ownTaskTitle);
}
