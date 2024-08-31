import { removeSubTaskFromFirebase } from "../../../../pages/tasks/features/removeSubTaskFromFirebase";
import { SubTaskType } from "../../TaskExpanded";

type HandleSubTaskRemoveProps = {
  subTask: SubTaskType;
  subTasks: SubTaskType[];
  addToLoadingQueue: (key: string) => void;
  removeFromLoadingQueue: (key: string) => void;
  removeSubTaskFromFirebase: typeof removeSubTaskFromFirebase;
  removeSubTaskOnClient: (subTaskId: SubTaskType) => void;
  taskID: string;
};

export async function handleSubTaskRemove({
  subTask,
  subTasks,
  addToLoadingQueue,
  removeFromLoadingQueue,
  removeSubTaskFromFirebase,
  removeSubTaskOnClient,
  taskID,
}: HandleSubTaskRemoveProps) {
  const subTaskToRemove = subTasks.find((st) => st.title === subTask.title);

  if (!subTaskToRemove) {
    console.error("Sub-task not found");
    return;
  }

  addToLoadingQueue("task-details");

  await removeSubTaskFromFirebase(taskID, subTask, subTasks); // react-query onError function handles err.
  removeSubTaskOnClient(subTask);

  removeFromLoadingQueue("task-details");
}
