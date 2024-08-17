import { TaskType } from "../../components/dashboard/Task.tsx";
import TaskColumn from "../../components/tasks-page/TaskColumn.tsx";

import useAccessibility from "../../stores/accessibility/useAccessibility.tsx";
import { getTasksFromFirebase } from "./features/getTasksFromFirebase.ts";
import { useQuery } from "react-query";

export default function TasksPage() {
  const { accessibility } = useAccessibility();
  const { removeRoundEdges } = accessibility;

  const {
    // failureCount, // got some ideas for this...
    data: tasks,
    isLoading,
  } = useQuery("tasks", getTasksFromFirebase, {
    refetchOnWindowFocus: false, // Do not refetch on window focus
    retry: 5,
  });

  const updateTasks = (task: TaskType) => {
    // setTasks((prev) => [task, ...prev]);
  };

  const filterTasks = (id: string) => {
    // setTasks((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div
      className="h-full overflow-hidden rounded-2xl bg-primaryBg p-3"
      style={{
        borderRadius: removeRoundEdges ? 0 : "",
      }}
    >
      <div className="grid h-full grid-cols-3">
        <TaskColumn
          variant="draft"
          loading={isLoading}
          updateTasks={updateTasks}
          filterTasks={filterTasks}
          tasks={tasks}
        />

        <TaskColumn
          variant="in-progress"
          loading={isLoading}
          updateTasks={updateTasks}
          filterTasks={filterTasks}
          tasks={tasks}
        />

        <TaskColumn
          variant="complete"
          loading={isLoading}
          updateTasks={updateTasks}
          filterTasks={filterTasks}
          tasks={tasks}
        />
      </div>
    </div>
  );
}
