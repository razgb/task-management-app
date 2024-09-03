import { TaskType } from "../../../dashboard/Task";
import { SubTaskType } from "../../TaskExpanded";
import { updateSubTaskCompletion } from "../async/updateSubTaskCompletion";

/**
 * Middle ware between client side & async firebase functions.
 * App load state -> invoke async firebase function
 * -> update client -> update currentTask state -> remove app load state.
 */
export async function handleCheckEvents(
  currentTask: TaskType,
  subTask: SubTaskType,
  addToLoadingQueue: (key: string) => void,
  removeFromLoadingQueue: (key: string) => void,
  updateCurrentTask: (newCurrentTaskState: TaskType) => void,
) {
  addToLoadingQueue("task-details");

  const filteredSubTasksArray = currentTask.subTasks.filter(
    (st) => st.title !== subTask.title,
  );
  const completeSubTasksArray = [
    ...filteredSubTasksArray,
    {
      ...subTask,
      completed: !subTask.completed,
    },
  ];

  const newCurrentTask = {
    ...currentTask,
    subTasks: completeSubTasksArray,
  };

  try {
    await updateSubTaskCompletion(newCurrentTask, subTask);
    updateCurrentTask(newCurrentTask);
  } catch (error) {
    console.error("Error syncing your sub tasks with server.");
  } finally {
    removeFromLoadingQueue("task-details");
  }
}
