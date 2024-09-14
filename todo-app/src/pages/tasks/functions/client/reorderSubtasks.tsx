import { TaskType } from "@/pages/tasks/components/Task";
import ToDoItem from "@/pages/tasks/components/sub-components/TodoItem";
import { SubTaskType } from "@/pages/tasks/components/TaskExpanded";

type ReorderSubTasksType = {
  currentTask: TaskType | undefined;
  removalMutation: (subtask: SubTaskType) => void;
};

export function reorderSubtasks({
  currentTask,
  removalMutation,
}: ReorderSubTasksType) {
  if (!currentTask) return;

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
          onDelete={removalMutation}
        />,
      );
    }
  }

  return reorderedTaskList;
}
