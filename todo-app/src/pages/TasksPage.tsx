import { useState } from "react";

import Task, { TaskType } from "../components/dashboard/Task.tsx";
import {
  draftTasksData,
  inProgressTasksData,
  completeTasksData,
} from "../components/tasks-page/taskData.ts";
import useFontSize from "../stores/accessibility/useFontSize.tsx";

export default function TasksPage() {
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
    <div className="h-full overflow-hidden rounded-2xl bg-primaryBg p-3">
      <div className="grid h-full grid-cols-3">
        <TaskColumn
          taskColumnMap={taskColumnMap}
          variant="draft"
          tasks={draftTasks}
        />
        <TaskColumn
          taskColumnMap={taskColumnMap}
          variant="in-progress"
          tasks={inProgressTasks}
        />
        <TaskColumn
          taskColumnMap={taskColumnMap}
          variant="complete"
          tasks={completeTasks}
        />
      </div>
    </div>
  );
}

type TaskGroupColumnType = {
  variant: "draft" | "in-progress" | "complete";
  tasks: TaskType[];
  taskColumnMap: {
    draft: {
      update: (task: TaskType) => void;
      remove: (title: string) => void;
    };
    ["in-progress"]: {
      update: (task: TaskType) => void;
      remove: (title: string) => void;
    };
    complete: {
      update: (task: TaskType) => void;
      remove: (title: string) => void;
    };
  };
};

function TaskColumn({ variant, tasks, taskColumnMap }: TaskGroupColumnType) {
  const fontSizes = useFontSize();

  const output = tasks.map((item) => (
    <Task
      key={Math.random()}
      title={item.title}
      description={item.description}
      hideGrabIcon={false}
      hasSubtasks={item.hasSubtasks}
      subtaskCompletion={item.subtaskCompletion}
      status={item.status}
    />
  ));

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault(); // we'll set tailwind styles for this later.
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const droppedTask = event.dataTransfer?.getData("application/json"); // get from api

    if (droppedTask) {
      const parsedTask: TaskType = JSON.parse(droppedTask);
      console.log(parsedTask); // data used for the task

      taskColumnMap[parsedTask.status].remove(parsedTask.title);
      taskColumnMap[variant].update({
        ...parsedTask,
        status: variant,
      });
    } else {
      // we will handle this case with a global error object later.
      console.log("Some error occured with the task drop.");
    }
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="flex h-full flex-col overflow-hidden p-4"
    >
      <h2
        style={{ fontSize: `${fontSizes["2xl"]}px` }}
        className="mb-4 font-bold capitalize"
      >
        {variant}
      </h2>
      <div className="flex-1 overflow-y-auto p-2 pr-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-scrollbar">
        <div className="grid grid-cols-1 content-start gap-3">{output}</div>
      </div>
    </div>
  );
}
