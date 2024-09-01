import { TaskType } from "../../../dashboard/Task";
import { SubTaskType } from "../../TaskExpanded";
import { updateSubTaskCompletion } from "../../../../pages/tasks/features/updateSubTaskCompletion";

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

  await updateSubTaskCompletion(newCurrentTask, subTask);
  updateCurrentTask(newCurrentTask);

  removeFromLoadingQueue("task-details");
}
