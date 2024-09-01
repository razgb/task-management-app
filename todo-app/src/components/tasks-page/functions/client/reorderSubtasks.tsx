import { TaskType } from "../../../dashboard/Task";
import ToDoItem from "../../sub-components/TodoItem";
import { SubTaskType } from "../../TaskExpanded";

type ReorderSubTasksType = {
  currentTask: TaskType;
  removalMutation: (subtask: SubTaskType) => void;
  swapSubTaskPositions: (
    incomingTaskTitle: string,
    outgoingTaskTitle: string,
  ) => void;
};

export function reorderSubtasks({
  currentTask,
  removalMutation,
  swapSubTaskPositions,
}: ReorderSubTasksType) {
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
          title={subTask.title}
          swapSubTaskPositions={swapSubTaskPositions}
          onDelete={removalMutation}
        />,
      );
    }
  }

  return reorderedTaskList;
}
