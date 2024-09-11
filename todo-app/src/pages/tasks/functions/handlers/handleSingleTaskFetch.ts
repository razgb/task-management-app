import { TaskType } from "@/pages/tasks/components/Task";
import { fetchSingleTaskFromFirebase } from "../async/fetchSingleTaskFromFirebase";

type Parameters = {
  taskID: string;
  updateCurrentTask: (newTask: TaskType) => void;
};

export async function handleSingleTaskFetch({
  taskID,
  updateCurrentTask,
}: Parameters) {
  try {
    const task = await fetchSingleTaskFromFirebase(taskID); // react-query onError function handles err.
    updateCurrentTask(task);
  } catch (_) {
    throw new Error(`Error getting task data for this url.`);
  }
}
