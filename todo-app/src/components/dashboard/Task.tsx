import { MoveIcon, SquareArrowOutUpRight } from "lucide-react";
import ProgressBar from "../shared/ProgressBar";
import useRouter from "../../stores/useRouter";
import Link from "../shared/Link";
import { useState } from "react";
import useFontSize from "../../stores/accessibility/useFontSize";

export type TaskType = {
  title: string;
  description?: string;
  hasSubtasks: boolean;
  subtaskCompletion: number;
  hideGrabIcon?: boolean;
  status: "draft" | "in-progress" | "complete";
};

export default function Task({
  title,
  description,
  hasSubtasks,
  // temporary default value until firebase is setup.
  subtaskCompletion,
  hideGrabIcon,
  status,
}: TaskType) {
  const fontSizes = useFontSize();
  const updatePath = useRouter().updatePath;
  const [isDraggable, setIsDraggable] = useState(false);
  const [taskData] = useState({
    title,
    description: formatDescription(description, 30),
    hasSubtasks,
    subtaskCompletion,
    hideGrabIcon,
    status,
  });

  function handleStartDrag(event: React.DragEvent<HTMLDivElement>) {
    if (!event.dataTransfer) return;
    const jsonData = JSON.stringify(taskData); // serialize
    event.dataTransfer.setData("application/json", jsonData); // send data through api
  }

  return (
    <div
      onDragStart={handleStartDrag}
      draggable={isDraggable}
      className="flex flex-col justify-center rounded-xl bg-secondaryBgWeak p-3"
    >
      <div>
        <div
          className={`${
            description ? "mb-1" : undefined
          } flex items-center justify-between`}
        >
          <h2
            className="font-semibold"
            style={{ fontSize: `${fontSizes.lg}px` }}
          >
            {title}
          </h2>
          <button
            onMouseLeave={() => setIsDraggable(false)}
            onMouseDown={() => setIsDraggable(true)}
            className={`group relative cursor-grab rounded-full p-2 hover:bg-secondary-200 ${
              hideGrabIcon ? "hidden" : ""
            }`}
          >
            <span
              className="absolute -left-1/2 -top-5 min-w-16 rounded bg-secondary-700 px-1 py-0.5 font-medium text-textContrast opacity-0 transition-opacity group-hover:opacity-100"
              style={{ fontSize: `${fontSizes.xs}px` }}
            >
              Drag task
            </span>
            <MoveIcon size={fontSizes.xl} aria-hidden={true} />
          </button>
        </div>

        <p
          className={`${description && "mb-2"} max-w-[45ch] text-textWeak 2xl:text-base`}
          style={{ fontSize: `${fontSizes.sm}px` }}
        >
          {description}
        </p>
      </div>

      <div className="mt-1 items-start">
        {hasSubtasks ? (
          <div className={`${hasSubtasks ? "" : "hidden"} max-w-[60%]`}>
            <div
              className="flex cursor-pointer flex-col gap-1 self-end rounded-lg bg-secondary-400 p-2 transition-colors hover:bg-secondary-500"
              role="link"
              aria-label={`Navigate to subtasks for task named ${title}.`}
              tabIndex={0}
              onClick={() => updatePath("/tasks/details")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  updatePath("/tasks/details");
              }}
            >
              <div className="flex items-center gap-2">
                <h3
                  className="font-semibold"
                  style={{ fontSize: `${fontSizes.base}px` }}
                >
                  Sub Tasks
                </h3>
                <SquareArrowOutUpRight size={16} aria-hidden={true} />
              </div>

              <div className="flex items-center gap-2">
                <ProgressBar
                  completion={taskData.subtaskCompletion}
                  width={2}
                />
                <span
                  className="font-semibold"
                  style={{ fontSize: `${fontSizes.sm}px` }}
                >
                  {taskData.subtaskCompletion}%
                </span>
              </div>
            </div>
          </div>
        ) : (
          !hideGrabIcon && (
            <Link
              to="/tasks"
              className="rounded-lg bg-secondary-400 px-3 py-2 font-semibold text-text hover:bg-secondary-500"
              aria-label={`Navigate to add subtasks for task named ${title}.`}
            >
              Add Subtasks
            </Link>
          )
        )}
      </div>
    </div>
  );
}

/**
 * Truncates a description to a specified word limit, appending "..." if truncated.
 */
function formatDescription(
  desc: string | undefined,
  wordLimit: number,
): string {
  if (desc == undefined) return "";

  const words = desc.trim().split(/\s+/);
  if (words.length <= wordLimit) return desc;

  const truncated = words.slice(0, wordLimit).join(" ");
  return truncated.replace(/[!?,.:;]+$/, "") + "...";
}
