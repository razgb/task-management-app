import {
  draftTasksData,
  inProgressTasksData,
  completeTasksData,
} from "../components/tasks-page/taskData.ts";

import { TaskType } from "../components/dashboard/Task.tsx";

import { useState } from "react";
import useAccessibility from "../stores/accessibility/useAccessibility.tsx";
import TaskColumn, {
  TaskGroupColumnType,
} from "../components/tasks-page/TaskColumn.tsx";

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
  function resetColumnDragStyles() {
    setColumnDragStyles(defaultColumnDragStyles);
  }

  const [draftTasks, setDraftTasks] = useState<TaskType[]>(
    draftTasksData.map((task) => ({ ...task, hideGrabIcon: false })),
  );
  const [inProgressTasks, setInProgressTasks] = useState<TaskType[]>(
    inProgressTasksData.map((task) => ({ ...task, hideGrabIcon: false })),
  );
  const [completeTasks, setCompleteTasks] = useState<TaskType[]>(
    completeTasksData.map((task) => ({ ...task, hideGrabIcon: false })),
  );

  const taskColumnMap: TaskGroupColumnType["taskColumnMap"] = {
    draft: {
      update: (task: TaskType) => setDraftTasks((prev) => [task, ...prev]),
      remove: (title: string) =>
        setDraftTasks((prev) => prev.filter((item) => item.title !== title)),
    },
    ["in-progress"]: {
      update: (task: TaskType) => setInProgressTasks((prev) => [task, ...prev]),
      remove: (title: string) =>
        setInProgressTasks((prev) =>
          prev.filter((item) => item.title !== title),
        ),
    },
    complete: {
      update: (task: TaskType) => setCompleteTasks((prev) => [task, ...prev]),
      remove: (title: string) =>
        setCompleteTasks((prev) => prev.filter((item) => item.title !== title)),
    },
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
          taskColumnMap={taskColumnMap}
          variant="draft"
          tasks={draftTasks}
          columnDragStyles={columnDragStyles}
          updateColumnDragStyles={updateColumnDragStyles}
          resetColumnDragStyles={resetColumnDragStyles}
        />
        <TaskColumn
          taskColumnMap={taskColumnMap}
          variant="in-progress"
          tasks={inProgressTasks}
          columnDragStyles={columnDragStyles}
          updateColumnDragStyles={updateColumnDragStyles}
          resetColumnDragStyles={resetColumnDragStyles}
        />
        <TaskColumn
          taskColumnMap={taskColumnMap}
          variant="complete"
          tasks={completeTasks}
          columnDragStyles={columnDragStyles}
          updateColumnDragStyles={updateColumnDragStyles}
          resetColumnDragStyles={resetColumnDragStyles}
        />
      </div>
    </div>
  );
}
