import { Minus, Plus, X } from "lucide-react";
import useAccessibility from "../../stores/accessibility/useAccessibility";
import useAccessibilityTextColor from "../../stores/accessibility/useAccessibilityTextColor";
import useFontSize from "../../stores/accessibility/useFontSize";
import Button from "../shared/Button";

export type Habit = {
  id: string;
  title: string;
  value: number;
  unit: string;
};

export default function HabitItem({
  habit,
  onDelete,
  onIncrement,
  onDecrement,
  onReset,
}: {
  habit: Habit;
  onDelete: (id: string) => void;
  onDecrement: (id: string) => void;
  onIncrement: (id: string) => void;
  onReset: (id: string) => void;
}) {
  const fontSizes = useFontSize();
  const { accessibilityTextColor } = useAccessibilityTextColor();
  const { accessibility } = useAccessibility();
  const {
    highContrastMode,
    increaseLetterSpacing,
    removeRoundEdges,
    reduceAnimations,
  } = accessibility;

  return (
    <div
      className="relative flex flex-col items-center justify-center gap-1 rounded-xl bg-secondary-300 px-3 py-2"
      style={{
        borderRadius: removeRoundEdges ? "0" : "",
        transition: reduceAnimations ? "none" : "",
      }}
    >
      <div className="group absolute left-1 top-1">
        <div className="relative">
          <Button
            variant="ghost-icon"
            onClick={() => onDelete(habit.id)}
            aria-label={`Delete ${habit.title} habit`}
          >
            <X size={fontSizes.xl} />
          </Button>
          <span className="absolute -left-7 -top-5 min-w-24 rounded bg-textContrast px-1 py-0.5 text-center text-sm opacity-0 transition-all group-hover:opacity-100">
            Delete habit
          </span>
        </div>
      </div>

      <h3
        className="text-wrap font-semibold capitalize"
        style={{
          fontSize: `${fontSizes.xl}px`,
          color: highContrastMode ? accessibilityTextColor : "",
          letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
        }}
      >
        {habit.title}
      </h3>

      <div className="flex items-center justify-center gap-4">
        <Button
          variant="ghost-icon"
          style={{
            fontSize: fontSizes["sm"],
          }}
          onClick={() => onDecrement(habit.id)}
        >
          <Minus />
        </Button>

        <p
          className={`flex ${habit.title.trim().split(" ").length > 1 ? "items-center gap-1" : "items-baseline"}`}
          style={{
            color: highContrastMode ? accessibilityTextColor : "",
          }}
        >
          <span
            style={{ fontSize: `${fontSizes["5xl"]}px` }}
            className="font-bold"
          >
            {habit.value}
          </span>
          <span style={{ fontSize: `${fontSizes.xl}px` }} className="ml-1">
            {habit.unit}
          </span>
        </p>

        <Button variant="ghost-icon" onClick={() => onIncrement(habit.id)}>
          <Plus />
        </Button>
      </div>

      <Button onClick={() => onReset(habit.id)}>Reset habit</Button>
    </div>
  );
}
