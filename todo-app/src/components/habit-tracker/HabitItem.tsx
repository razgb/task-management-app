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
          <HabitIconButton
            icon={<X />}
            variant="delete"
            id={habit.id}
            onDelete={onDelete}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            ariaLabel={`Delete ${habit.title} habit permanently.`}
          />
          <span className="absolute -left-7 -top-5 min-w-24 rounded bg-secondary-900 px-1 py-0.5 text-center text-sm text-textContrast opacity-0 transition-all group-hover:opacity-100">
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
        <HabitIconButton
          icon={<Minus />}
          variant="minus"
          id={habit.id}
          onDecrement={onDecrement}
          onIncrement={onIncrement}
          onDelete={onDelete}
          ariaLabel={`Decrease ${habit.title} habit count by 1.`}
        />

        <p
          className={`flex ${habit.unit.trim().split(" ").length > 1 ? "items-center gap-1" : "items-baseline"}`}
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

        <HabitIconButton
          icon={<Plus />}
          variant="plus"
          id={habit.id}
          onDecrement={onDecrement}
          onIncrement={onIncrement}
          onDelete={onDelete}
          ariaLabel={`Increase ${habit.title} habit count by 1.`}
        />
      </div>

      <Button onClick={() => onReset(habit.id)}>Reset habit</Button>
    </div>
  );
}

type HabitIconButtonType = {
  variant: "minus" | "plus" | "delete";
  ariaLabel: string;
  id: string;
  icon: React.ReactNode;
  onDecrement: (id: string) => void;
  onIncrement: (id: string) => void;
  onDelete: (id: string) => void;
};

function HabitIconButton({
  variant,
  id,
  icon,
  onDecrement,
  onIncrement,
  onDelete,
  ariaLabel,
}: HabitIconButtonType) {
  const fontSizes = useFontSize();
  const { accessibilityTextColor } = useAccessibilityTextColor();
  const { accessibility } = useAccessibility();
  const {
    highContrastMode,
    increaseLetterSpacing,
    removeRoundEdges,
    reduceAnimations,
  } = accessibility;

  let handleClick = () => {};

  switch (variant) {
    case "minus": {
      handleClick = () => onDecrement(id);
      break;
    }
    case "plus": {
      handleClick = () => onIncrement(id);
      break;
    }
    case "delete": {
      handleClick = () => onDelete(id);
      break;
    }
  }

  return (
    <button
      className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent transition-colors hover:bg-secondary-400"
      style={{
        fontSize: fontSizes["sm"],
        borderRadius: removeRoundEdges ? "0" : "",
        transition: reduceAnimations ? "none" : "",
        letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
        color: highContrastMode ? accessibilityTextColor : "",
      }}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
}
