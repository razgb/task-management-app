import { TaskType } from "../../../dashboard/Task";
import ToDoItem from "../../sub-components/TodoItem";
import { SubTaskType } from "../../TaskExpanded";

export function reorderSubtasks(
  currentTask: TaskType,
  removalMutation: (subtask: SubTaskType) => void,
  swapSubTaskPositions: (
    incomingTaskTitle: string,
    outgoingTaskTitle: string,
  ) => void,
) {
  const reorderedTaskList: JSX.Element[] = [];
  for (let i = 0; i < currentTask.subTasks.length; i++) {
    if (reorderedTaskList.length === currentTask.subTasks.length) {
      break;
    }

    for (let j = 0; j < currentTask.subTasks.length; j++) {
      const subTask = currentTask.subTasks[j];
      if (subTask.position !== i) continue;

      reorderedTaskList.push(
        <ToDoItem
          key={subTask.title}
          subTask={subTask}
          swapSubTaskPositions={swapSubTaskPositions}
          onDelete={removalMutation}
        />,
      );
    }
  }

  return reorderedTaskList;
}
