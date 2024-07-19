import { MoveIcon, SquareArrowOutUpRight } from "lucide-react";
import ProgressBar from "../shared/ProgressBar";
import useRouter from "../../stores/useRouter";

type TaskProps = {
  title: string;
  description?: string;
  // subtasks?: string[];
  hideGrabIcon?: boolean;
};

export default function Task({ title, description, hideGrabIcon }: TaskProps) {
  const updatePath = useRouter().updatePath;

  const completion = Math.floor(Math.random() * 100);
  const formattedDescription = formatDescription(description, 30);

  return (
    <div>
      <div className="flex flex-col justify-center rounded-xl bg-secondaryBgWeak p-3">
        <div>
          <div
            className={`${
              description ? "mb-1" : undefined
            } flex items-center justify-between`}
          >
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              className={`cursor-grab rounded-full p-2 hover:bg-secondary-200 ${
                hideGrabIcon ? "hidden" : ""
              }`}
            >
              <MoveIcon size={20} aria-hidden={true} />
            </button>
          </div>

          <p
            className={`${description && "mb-2"} max-w-[45ch] text-sm text-textWeak 2xl:text-base`}
          >
            {formattedDescription}
          </p>
        </div>

        <div className={`${description ? "" : "hidden"} hidden max-w-[60%]`}>
          <div
            className="flex cursor-pointer flex-col gap-1 self-end rounded-lg bg-secondary-200 p-2 transition-colors hover:bg-secondary-100"
            role="button"
            tabIndex={0}
            onClick={() => updatePath("/tasks/details")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                updatePath("/tasks/details");
            }}
          >
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Sub Tasks</h3>
              <SquareArrowOutUpRight size={16} aria-hidden={true} />
            </div>

            <div className="flex items-center gap-2">
              <ProgressBar completion={completion} width={2} />
              <span className="text-sm font-semibold">{completion}%</span>
            </div>
          </div>
        </div>
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
