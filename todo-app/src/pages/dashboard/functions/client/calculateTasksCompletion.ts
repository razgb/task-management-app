import { TaskType } from "@/pages/tasks/components/Task";

export function calculateAllTasksCompletion(tasks: TaskType[]) {
  if (tasks.length === 0) return 0;

  let totalLength = 0;
  let totalCompletedLength = 0;

  tasks.forEach((task) => {
    const { length, completedLength } = getCompletionData(task);
    totalLength += length;
    totalCompletedLength += completedLength;
  });

  return Math.floor((totalCompletedLength / totalLength) * 100);
}

function getCompletionData(task: TaskType) {
  const taskCompleted = task.status === "complete" ? 1 : 0;
  const subTaskLength = task.subTasks.length;

  if (subTaskLength === 0)
    return {
      length: 1,
      completedLength: taskCompleted,
    };

  let completedLength = taskCompleted;

  task.subTasks.forEach((st) => {
    if (st.completed) completedLength++;
  });

  return {
    length: subTaskLength + 1,
    completedLength: completedLength + taskCompleted,
  };
}
