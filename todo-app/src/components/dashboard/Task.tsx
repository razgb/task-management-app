import { MoveIcon, SquareArrowOutUpRight } from "lucide-react";
import ProgressBar from "../shared/ProgressBar";
import useRouter from "../../stores/useRouter";

type TaskProps = {
  title: string;
  description?: string;
  hideGrabIcon?: boolean;
};

export default function Task({ title, description, hideGrabIcon }: TaskProps) {
  const completion = Math.floor(Math.random() * 100);
  const updatePath = useRouter().updatePath;

  const formattedDescription = description
    ? formatDescription(description)
    : null;

  return (
    <div className="flex w-full flex-col justify-between rounded-xl bg-secondaryBgWeak p-4">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            className={`cursor-grab rounded-full p-2 hover:bg-secondary-200 ${
              hideGrabIcon ? "hidden" : ""
            }`}
          >
            <MoveIcon size={20} aria-hidden={true} />
          </button>
        </div>

        <p className="mb-4 max-w-[45ch] text-sm text-textWeak 2xl:text-base">
          {formattedDescription}
        </p>
      </div>

      <div>
        <div
          className="flex w-full cursor-pointer flex-col gap-1 self-end rounded-lg bg-secondary-200 p-2 transition-colors hover:bg-secondary-100"
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
  );
}

function formatDescription(desc: string) {
  if (!desc.length) return null;

  const splitDesc = desc.split(" ");
  const numberOfWords = splitDesc.length;
  if (numberOfWords < 12) return desc;

  const mostlyFormattedDesc = splitDesc.slice(0, 12);
  const lastWord = mostlyFormattedDesc.pop();

  if (lastWord!.endsWith(".")) {
    return mostlyFormattedDesc.join(" ") + " " + lastWord!.slice(0, -1) + "...";
  } else {
    return mostlyFormattedDesc.join(" ") + " " + lastWord + "...";
  }
}
