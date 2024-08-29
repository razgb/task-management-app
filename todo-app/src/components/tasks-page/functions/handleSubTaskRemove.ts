import { SubTaskType } from "../TaskExpanded";

type HandleSubTaskRemoveProps = {
  subTasks: SubTaskType[];
  subTask: SubTaskType;
  addToLoadingQueue: (key: string) => void;
  removeFromLoadingQueue: (key: string) => void;
  removeSubTaskFromFirebase: (
    taskID: string,
    subTaskTitle: SubTaskType,
  ) => Promise<void>;
  removeSubTaskOnClient: (subTaskId: SubTaskType) => void;
  taskID: string;
};

export async function handleSubTaskRemove({
  subTasks,
  subTask,
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

  await removeSubTaskFromFirebase(taskID, subTask); // react-query onError function handles err.
  removeSubTaskOnClient(subTask);

  removeFromLoadingQueue("task-details");
}
