import { TaskType } from "@/pages/tasks/components/Task";
import { SubTaskType } from "@/pages/tasks/components/TaskExpanded";
import { RawTaskType } from "../async/getTasksFromFirebase";

export function convertRawTaskToClientTask(rawTask: RawTaskType): TaskType {
  const subTasks = rawTask.subTasks;
  const subTaskEntries = Object.entries(subTasks);

  const correctSubTasksStructure = subTaskEntries.map(([title, rest]) => {
    return {
      ...rest,
      title,
    } as SubTaskType;
  });

  return {
    ...rawTask,
    subTasks: correctSubTasksStructure,
  };
}
