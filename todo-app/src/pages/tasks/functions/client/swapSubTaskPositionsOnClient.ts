import { TaskType } from "../../components/Task";
import { SubTaskType } from "../../components/TaskExpanded";

export function swapSubTaskPositionsOnClient(
  incomingTaskTitle: string,
  outgoingTaskTitle: string,
  currentTask: TaskType,
) {
  let incomingTaskPosition: number | undefined = undefined;
  let outgoingTaskPosition: number | undefined = undefined;

  currentTask.subTasks.forEach((subTask) => {
    const title = subTask.title;
    if (incomingTaskPosition && outgoingTaskPosition) return;

    if (title === incomingTaskTitle) {
      incomingTaskPosition = subTask.position;
    } else if (title === outgoingTaskTitle) {
      outgoingTaskPosition = subTask.position;
    }
  });

  const newSubTasksArray = currentTask.subTasks.map((task) => {
    const title = task.title;
    if (title !== incomingTaskTitle && title !== outgoingTaskTitle) return task;

    return {
      ...task,
      position:
        title === incomingTaskTitle
          ? outgoingTaskPosition
          : incomingTaskPosition,
    } as SubTaskType;
  });

  return {
    ...currentTask,
    subTasks: newSubTasksArray,
    updatedAt: {
      seconds: new Date().getTime() / 1000,
      nanoseconds: 0,
    },
  } as TaskType;
}
