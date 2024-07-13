import { MoveDiagonal } from "lucide-react";
import Button from "../shared/Button";

type TaskGroupProps = {
  title: string;
  description?: string;
};

export default function TaskGroup({ title, description }: TaskGroupProps) {
  const completion = Math.floor(Math.random() * 100);

  const formattedDescription = description
    ? formatDescription(description)
    : null;

  return (
    <div className="min-h-[150px] w-full rounded-xl bg-secondaryBg p-4">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-xl">{title}</h2>
        <Button variant="ghost-icon">
          <MoveDiagonal size={20} />
        </Button>
      </div>

      <p className="mb-4 max-w-[45ch] text-sm">{formattedDescription}</p>

      <div className="flex items-center gap-2 self-end font-semibold">
        <div className="h-4 w-full rounded-full bg-secondaryBgWeak">
          <div
            className="h-full rounded-full bg-text"
            style={{ width: completion + "%" }}
          ></div>
        </div>
        <span className="text-sm">{completion}%</span>
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
