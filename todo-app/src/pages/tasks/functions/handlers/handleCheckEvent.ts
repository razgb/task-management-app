import { TaskType } from "@/pages/tasks/components/Task";
import { SubTaskType } from "@/pages/tasks/components/TaskExpanded";
import { updateSubTaskCompletion } from "../async/updateSubTaskCompletion";

type HandleCheckEventsParams = {
  currentTask: TaskType;
  subTask: SubTaskType;
  addToLoadingQueue: (key: string) => void;
  removeFromLoadingQueue: (key: string) => void;
  updateCurrentTask: (newCurrentTaskState: TaskType) => void;
};

/**
 * Handles both client side & async firebase functions.
 * App load state -> invoke async firebase function
 * -> update client -> update currentTask state -> remove app load state.
 */
export async function handleCheckEvents({
  currentTask,
  subTask,
  addToLoadingQueue,
  removeFromLoadingQueue,
  updateCurrentTask,
}: HandleCheckEventsParams) {
  addToLoadingQueue("task-details");

  const newSubTasksArray = currentTask.subTasks.map((st) => {
    if (st.title === subTask.title) {
      return {
        ...subTask,
        completed: !subTask.completed,
      };
    }

    return st;
  });

  const newCurrentTask = {
    ...currentTask,
    subTasks: newSubTasksArray,
  };

  try {
    await updateSubTaskCompletion(newCurrentTask, subTask);
    updateCurrentTask(newCurrentTask);
  } catch (err) {
    console.error(err);
  } finally {
    removeFromLoadingQueue("task-details");
  }
}
