import { TaskType } from "../../components/dashboard/Task.tsx";
import TaskColumn, {
  TaskGroupColumnType,
} from "../../components/tasks-page/TaskColumn.tsx";
import { taskData } from "../../components/tasks-page/taskData.ts";

import { useState } from "react";
import useAccessibility from "../../stores/accessibility/useAccessibility.tsx";

// A toggle for the background color changes upon a dragover event with a <Task/>.
const defaultColumnDragStyles = {
  draft: false,
  ["in-progress"]: false,
  complete: false,
};

export default function TasksPage() {
  const { accessibility } = useAccessibility();
  const { removeRoundEdges } = accessibility;

  const [columnDragStyles, setColumnDragStyles] = useState(
    defaultColumnDragStyles,
  );

  function updateColumnDragStyles(
    newTaskColumn: TaskGroupColumnType["variant"],
  ) {
    setColumnDragStyles((prev) => ({
      ...prev,
      [newTaskColumn]: true,
    }));
  }
  const resetColumnDragStyles = () =>
    setColumnDragStyles(defaultColumnDragStyles);

  const [tasks, setTasks] = useState<TaskType[]>(
    taskData.map((task) => ({ ...task, hideGrabIcon: false })),
  );

  const updateTasks = (task: TaskType) => {
    setTasks((prev) => [task, ...prev]);
  };

  const filterTasks = (id: string) => {
    setTasks((prev) => prev.filter((item) => item.id !== id));
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
          updateTasks={updateTasks}
          filterTasks={filterTasks}
          tasks={tasks}
          columnDragStyles={columnDragStyles}
          updateColumnDragStyles={updateColumnDragStyles}
          resetColumnDragStyles={resetColumnDragStyles}
        />

        <TaskColumn
          variant="in-progress"
          updateTasks={updateTasks}
          filterTasks={filterTasks}
          tasks={tasks}
          columnDragStyles={columnDragStyles}
          updateColumnDragStyles={updateColumnDragStyles}
          resetColumnDragStyles={resetColumnDragStyles}
        />

        <TaskColumn
          variant="complete"
          updateTasks={updateTasks}
          filterTasks={filterTasks}
          tasks={tasks}
          columnDragStyles={columnDragStyles}
          updateColumnDragStyles={updateColumnDragStyles}
          resetColumnDragStyles={resetColumnDragStyles}
        />
      </div>
    </div>
  );
}
