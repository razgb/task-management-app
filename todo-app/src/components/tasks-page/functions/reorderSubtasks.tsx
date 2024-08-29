import { TaskType } from "../../dashboard/Task";
import ToDoItem from "../sub-components/TodoItem";
import { SubTaskType } from "../TaskExpanded";

type MutateAsyncParameters = {
  taskID: string;
  type: string;
  subTask: SubTaskType;
};

export function reorderSubtasks(
  currentTask: TaskType,
  subTasks: SubTaskType[],
  mutateAsync: ({
    taskID,
    type,
    subTask,
  }: MutateAsyncParameters) => Promise<void>,
  swapSubTaskPositions: () => void,
) {
  const reorderedTaskList: JSX.Element[] = [];
  for (let i = 0; i < subTasks.length; i++) {
    if (reorderedTaskList.length === subTasks.length) {
      break;
    }

    for (let j = 0; j < subTasks.length; j++) {
      const subTask = subTasks[j];
      if (subTask.position !== i) continue;

      reorderedTaskList.push(
        <ToDoItem
          key={subTask.title}
          subTask={subTask}
          swapSubTaskPositions={swapSubTaskPositions}
          onDelete={async () => {
            await mutateAsync({
              taskID: currentTask.id,
              type: "delete-sub-task",
              subTask: subTask,
            });
          }}
        />,
      );
    }
  }
}
