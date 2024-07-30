import Task, { TaskType } from "../dashboard/Task.tsx";
import useFontSize from "../../stores/accessibility/useFontSize.tsx";
import useAccessibility from "../../stores/accessibility/useAccessibility.tsx";
import { useState } from "react";
import {
  TaskSkeletonLoad,
  TaskSkeletonLoadMultiple,
} from "./TaskSkeletonLoad.tsx";

export type TaskGroupColumnType = {
  variant: "draft" | "in-progress" | "complete";
  tasks: TaskType[];

  columnDragStyles: {
    draft: boolean;
    "in-progress": boolean;
    complete: boolean;
  };
  updateColumnDragStyles: (
    variant: "draft" | "in-progress" | "complete",
  ) => void;
  resetColumnDragStyles: () => void;

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

export default function TaskColumn({
  variant,
  tasks,
  taskColumnMap,
}: TaskGroupColumnType) {
  const fontSizes = useFontSize();
  const { accessibility } = useAccessibility();
  const {
    removeRoundEdges,
    highContrastMode,
    reduceAnimations,
    increaseLetterSpacing,
  } = accessibility;

  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

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

  // if (variant === "draft")
  //   output.push(<TaskSkeletonLoadMultiple key="draft-skeleton-1" />);

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

    taskColumnMap[parsedTask.status].remove(parsedTask.title);
    taskColumnMap[variant].update({
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
          fontSize: `${fontSizes["2xl"]}px`,
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
