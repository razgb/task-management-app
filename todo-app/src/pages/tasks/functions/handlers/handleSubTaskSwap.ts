import { TaskType } from "../../components/Task";
import { SubTaskType } from "../../components/TaskExpanded";
import { swapSubTaskInFirebase } from "../async/swapSubTaskInFirebase";
import { handleDrop } from "../client/dragAndDropFunctions";
import { swapSubTaskPositionsOnClient } from "../client/swapSubTaskPositionsOnClient";

type Parameters = {
  event: React.DragEvent<HTMLLIElement>;
  subTask: SubTaskType;
  currentTask: TaskType;
  addToLoadingQueue: (key: string) => void;
  removeFromLoadingQueue: (key: string) => void;
  updateCurrentTask: (currentTask: TaskType) => void;
  openModal: (type: "success" | "error", message: string) => void;
};

export async function handleSubTaskSwap({
  event,
  subTask,
  currentTask,
  addToLoadingQueue,
  removeFromLoadingQueue,
  updateCurrentTask,
  openModal,
}: Parameters) {
  const incomingSubTaskTitle = handleDrop(event, subTask.title);
  if (!incomingSubTaskTitle) return;

  const newCurrentTask = swapSubTaskPositionsOnClient(
    incomingSubTaskTitle,
    subTask.title,
    currentTask,
  );

  addToLoadingQueue("task-swap");

  try {
    updateCurrentTask(newCurrentTask); // optimistic update
    await swapSubTaskInFirebase(newCurrentTask, subTask);
  } catch (err) {
    updateCurrentTask(currentTask); // reverse optimistic update
    openModal(
      "error",
      "Error syncing sub task swap, check internet connection and try again.",
    );
  } finally {
    removeFromLoadingQueue("task-swap");
  }
}
