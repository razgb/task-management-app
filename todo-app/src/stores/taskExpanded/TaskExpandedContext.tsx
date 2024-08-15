import { createContext } from "react";

import { TaskType } from "../../components/dashboard/Task";

type TaskContextType = {
  currentTask: TaskType | undefined;
  updateCurrentTask: (task: TaskType) => void;
};

const TaskExpandedContext = createContext<TaskContextType | undefined>(
  undefined,
);
export default TaskExpandedContext;
