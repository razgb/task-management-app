import Task, { TaskType } from "../dashboard/Task.tsx";
import useAccessibility from "../../stores/accessibility/useAccessibility.tsx";
import { useState } from "react";
import { TaskSkeletonLoadMultiple } from "./TaskSkeletonLoad.tsx";

export type TaskGroupColumnType = {
  variant: "draft" | "in-progress" | "complete";
  loading: boolean;
  tasks: TaskType[] | undefined;
  updateTasks: (task: TaskType) => void;
  filterTasks: (id: string) => void;
};

export default function TaskColumn({
  variant,
  loading,
  tasks,
  updateTasks,
  filterTasks,
}: TaskGroupColumnType) {
  const { accessibility } = useAccessibility();
  const {
    removeRoundEdges,
    highContrastMode,
    reduceAnimations,
    increaseLetterSpacing,
    fontSizeMap,
  } = accessibility;

  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

  const output = proccessTaskData(tasks, loading, variant);

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDraggingOver(true);
  }

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDraggingOver(false);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDraggingOver(false);
    const droppedTask = event.dataTransfer?.getData("application/json"); // get from api
    if (!droppedTask) return;

    const parsedTask: TaskType = JSON.parse(droppedTask);
    if (parsedTask.status === variant) return; // prevent unnecessary code.
    console.log(parsedTask);

    filterTasks(parsedTask.id);
    updateTasks({
      ...parsedTask,
      status: variant,
    });
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`flex h-full flex-col gap-4 overflow-hidden p-4 ${isDraggingOver ? "bg-secondary-100" : ""} `}
      style={{
        borderRadius: removeRoundEdges ? 0 : "",
        transition: reduceAnimations ? "none" : "",
      }}
    >
      <h2
        style={{
          fontSize: `${fontSizeMap["2xl"]}px`,
          letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
          color: highContrastMode ? "#fff" : "",
        }}
        className="font-bold capitalize"
      >
        {variant}
      </h2>

      {/* prettier-ignore */}
      <div className="flex pr-2 flex-1 flex-col overflow-y-scroll gap-4
        scrollbar-thin scrollbar-track-transparent scrollbar-thumb-scrollbar">
        {output}
      </div>
    </div>
  );
}

/**
 * Turns raw task data from firebase into an array of JSX
 * <Task/> elements that are relevant to their respective
 * parent column's variant property.
 */
function proccessTaskData(
  tasks: TaskType[] | undefined,
  loading: boolean,
  column: TaskGroupColumnType["variant"],
) {
  let output: null | React.ReactNode | Iterable<React.ReactNode> = null;

  if (loading) {
    output = <TaskSkeletonLoadMultiple />;
  } else if (!loading && tasks) {
    output = tasks
      .filter((task) => task.status === column)
      .map((task) => {
        return (
          <Task
            key={task.id}
            id={task.id}
            subtasks={task.subtasks}
            title={task.title}
            description={task.description}
            status={task.status}
            hideGrabIcon={true}
          />
        );
      });
  }

  return output;
}
