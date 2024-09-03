import { TaskType } from "../../../dashboard/Task";
import { RawSubTaskType, RawTaskType } from "../async/getTasksFromFirebase";

export function convertClientTaskToRawTask(task: TaskType): RawTaskType {
  const rawSubTasks: Record<string, RawSubTaskType> = {};

  task.subTasks.forEach((st) => {
    rawSubTasks[st.title] = {
      position: st.position,
      completed: st.completed,
    };
  });

  return {
    ...task,
    subTasks: rawSubTasks,
  };
}
