import { TaskType } from "../../../dashboard/Task";
import { updateTaskStatusInFirebase } from "../async/updateTaskStatusInFirebase";

type Parameters = {
  newStatus: TaskType["status"];
  currentTask: TaskType;
  updateCurrentTask: (newCurrentTask: TaskType) => void;
  addToLoadingQueue: (key: string) => void;
  removeFromLoadingQueue: (key: string) => void;
};

export async function handleTaskStatusUpdate({
  newStatus,
  currentTask,
  updateCurrentTask,
  addToLoadingQueue,
  removeFromLoadingQueue,
}: Parameters) {
  addToLoadingQueue("task-details");

  try {
    await updateTaskStatusInFirebase(currentTask.id, newStatus);
  } catch (_) {
    throw new Error(
      `Error syncing task status for task called "${currentTask.title}". Check internet connection and try again.`,
    );
  } finally {
    removeFromLoadingQueue("task-details");
  }

  updateCurrentTask({
    ...currentTask,
    status: newStatus,
  });
}
