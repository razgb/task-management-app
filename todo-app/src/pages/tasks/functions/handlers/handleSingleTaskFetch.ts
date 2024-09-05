import { TaskType } from "@/pages/tasks/components/Task";
import { fetchSingleTaskFromFirebase } from "../async/fetchSingleTaskFromFirebase";

type Parameters = {
  taskID: string;
  addToLoadingQueue: (key: string) => void;
  removeFromLoadingQueue: (key: string) => void;
  updateCurrentTask: (newTask: TaskType) => void;
};

export async function handleSingleTaskFetch({
  taskID,
  addToLoadingQueue,
  removeFromLoadingQueue,
  updateCurrentTask,
}: Parameters) {
  addToLoadingQueue("task-details");

  try {
    const task = await fetchSingleTaskFromFirebase(taskID); // react-query onError function handles err.
    updateCurrentTask(task);
  } catch (_) {
    throw new Error(`Error getting task data for this url.`);
  } finally {
    removeFromLoadingQueue("task-details");
  }
}
