import { createContext } from "react";
import { TaskType } from "@/pages/tasks/components/Task";

type TaskContextType = {
  currentTask: TaskType | undefined;
  updateCurrentTask: (task: TaskType | undefined) => void;
};

const TaskExpandedContext = createContext<TaskContextType | undefined>(
  undefined,
);
export default TaskExpandedContext;
