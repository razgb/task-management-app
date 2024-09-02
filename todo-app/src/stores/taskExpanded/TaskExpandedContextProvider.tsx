import { useState } from "react";
import TaskExpandedContext from "./TaskExpandedContext";
import { TaskType } from "../../components/dashboard/Task";

export const TaskContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentTask, setCurrentTask] = useState<TaskType | undefined>(
    undefined,
  );

  const updateCurrentTask = (task: TaskType | undefined) =>
    setCurrentTask(task);

  return (
    <TaskExpandedContext.Provider value={{ currentTask, updateCurrentTask }}>
      {children}
    </TaskExpandedContext.Provider>
  );
};
