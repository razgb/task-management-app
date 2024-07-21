import { Move, Square, SquareCheck } from "lucide-react";
import { useState } from "react";

type ToDoItemType = {
  title: string;
  completed: boolean;
};

export default function ToDoItem({ title, completed }: ToDoItemType) {
  const [checked, setChecked] = useState(completed || false);

  const ariaLabel = checked
    ? "Toggle action to mark as incomplete."
    : "Toggle action to mark as complete.";

  return (
    <li className="flex items-center justify-between gap-4 rounded bg-secondary-100 px-4 py-3 hover:bg-secondary-200">
      <div className="flex gap-4">
        <button className="flex-1 cursor-grab p-1">
          <Move size={20} className="stroke-iconStroke" />
        </button>

        <h3 className="text-lg font-medium">{title}</h3>
      </div>

      <button
        onClick={() => setChecked((prev) => !prev)}
        role="checkbox"
        aria-checked={checked ? "true" : "false"}
        aria-label={ariaLabel}
      >
        {checked ? (
          <SquareCheck size={32} className="stroke-checkbox" />
        ) : (
          <Square size={32} className="stroke-checkbox" />
        )}
      </button>
    </li>
  );
}
