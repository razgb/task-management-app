import { TaskType } from "../../../dashboard/Task";
import { SubTaskType } from "../../TaskExpanded";
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
