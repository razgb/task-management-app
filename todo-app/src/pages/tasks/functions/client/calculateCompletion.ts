import { SubTaskType } from "@/pages/tasks/components/TaskExpanded";

export function calculateCompletion(subTasks: SubTaskType[]) {
  const total = subTasks.length;
  if (total === 0) return 0;

  let completed = 0;
  subTasks.forEach((subTask) => {
    if (subTask.completed) completed++;
  });

  const completionPercentage = Math.floor((completed / total) * 100);
  return completionPercentage;
}
