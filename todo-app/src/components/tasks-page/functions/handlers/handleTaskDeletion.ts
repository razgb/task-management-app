import { TaskType } from "../../../dashboard/Task";
import { deleteTaskFromFirebase } from "../async/deleteTaskFromFirebase";

type Parameters = {
  currentTask: TaskType;
  updatePath: (path: string) => void;
  updateCurrentTask: (newCurrentTask: TaskType | undefined) => void;
  addToLoadingQueue: (key: string) => void;
  removeFromLoadingQueue: (key: string) => void;
};

export async function handleTaskDeletion({
  currentTask,
  updatePath,
  updateCurrentTask,
  addToLoadingQueue,
  removeFromLoadingQueue,
}: Parameters) {
  addToLoadingQueue("task-details");

  try {
    await deleteTaskFromFirebase(currentTask.id);
  } catch (_) {
    throw new Error(`Error deleting task called "${currentTask.title}".`);
  } finally {
    removeFromLoadingQueue("task-details");
  }

  updateCurrentTask(undefined);
  updatePath("/tasks");
}
