import { useState } from "react";
import useAccessibility from "../stores/accessibility/useAccessibility";
import { Plus } from "lucide-react";
import Button from "../components/shared/Button";
import HabitItem, { Habit } from "../components/habit-tracker/HabitItem";

const unitOptions = [
  "minutes",
  "hours",
  "days",
  "months",
  "years",
  "tasks",
  "pages",
  "sessions",
  "meters",
  "miles",
  "kilometers",
  "glasses of water",
];

export default function HabitTrackerPage() {
  const { accessibility } = useAccessibility();
  const {
    highContrastMode,
    increaseLetterSpacing,
    removeRoundEdges,
    fontSizeMap,
    accessibilityTextColor,
  } = accessibility;

  const [habits, setHabits] = useState<Habit[]>([
    { id: "1", title: "Days Sober", value: 5, unit: "days" },
    { id: "2", title: "Meditation", value: 3, unit: "days" },
    { id: "6", title: "Sleep", value: 7, unit: "hours" },
    { id: "7", title: "Journaling", value: 2, unit: "days" },
    { id: "8", title: "Running", value: 10, unit: "kilometers" },
    { id: "9", title: "Coding Practice", value: 4, unit: "hours" },
    { id: "10", title: "Healthy Meals", value: 8, unit: "meals" },
    { id: "11", title: "Gratitude Practice", value: 6, unit: "days" },
    { id: "12", title: "Yoga", value: 9, unit: "sessions" },
    { id: "13", title: "Language Learning", value: 11, unit: "months" },
  ]);

  const [newHabit, setNewHabit] = useState({ title: "", unit: "days" });
  const [customUnit, setCustomUnit] = useState("");
  const [isCustomUnit, setIsCustomUnit] = useState(false);

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newHabit.title) {
      const habitUnit = isCustomUnit ? customUnit : newHabit.unit;
      setHabits([
        ...habits,
        { ...newHabit, id: Date.now().toString(), value: 0, unit: habitUnit },
      ]);
      setNewHabit({ title: "", unit: "days" });
      setCustomUnit("");
      setIsCustomUnit(false);
    }
  };

  const handleDeleteHabit = (id: string) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const handleDecrementHabit = (id: string) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id !== id || habit.value <= 0) return habit;
        return { ...habit, value: habit.value - 1 };
      }),
    );
  };

  const handleIncrementHabit = (id: string) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, value: habit.value + 1 } : habit,
      ),
    );
  };

  const handleResetHabit = (id: string) => {
    setHabits(
      habits.map((habit) => (habit.id === id ? { ...habit, value: 0 } : habit)),
    );
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUnit = e.target.value;
    if (selectedUnit === "custom") {
      setIsCustomUnit(true);
    } else {
      setIsCustomUnit(false);
      setNewHabit({ ...newHabit, unit: selectedUnit });
    }
  };

  return (
    <div
      className="flex h-full flex-col rounded-2xl bg-primaryBg p-6"
      style={{
        borderRadius: removeRoundEdges ? "0" : "",
      }}
    >
      <h2
        className="mb-6 font-bold"
        style={{
          fontSize: `${fontSizeMap["3xl"]}px`,
          color: highContrastMode ? accessibilityTextColor : "",
          letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
        }}
      >
        Habit Tracker
      </h2>

      <form onSubmit={handleAddHabit} className="mb-6 flex gap-4">
        <input
          type="text"
          value={newHabit.title}
          onChange={(e) => setNewHabit({ ...newHabit, title: e.target.value })}
          placeholder="New habit"
          className="flex-grow rounded-lg bg-secondaryBgWeak p-2 placeholder-textPlaceholder outline-none focus:ring-2 focus:ring-secondary-600"
          style={{
            fontSize: `${fontSizeMap.base}px`,
            color: highContrastMode ? accessibilityTextColor : "",
          }}
        />
        <select
          value={isCustomUnit ? "custom" : newHabit.unit}
          onChange={handleUnitChange}
          className="rounded-lg bg-secondaryBgWeak p-2"
          style={{
            fontSize: `${fontSizeMap.base}px`,
            color: highContrastMode ? accessibilityTextColor : "",
          }}
        >
          <option value="custom">Custom unit</option>
          {unitOptions.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>

        {/* new input shows here upon clicking custom unit. */}
        {isCustomUnit && (
          <input
            type="text"
            value={customUnit}
            onChange={(e) => setCustomUnit(e.target.value)}
            placeholder="Enter custom unit"
            className="rounded-lg bg-secondaryBgWeak p-2 placeholder-textPlaceholder outline-none focus:ring-2 focus:ring-secondary-600"
            style={{
              fontSize: `${fontSizeMap.base}px`,
              color: highContrastMode ? accessibilityTextColor : "",
            }}
          />
        )}

        <Button variant="contrast-icon-text" type="submit">
          <Plus size={fontSizeMap.xl} />
          Add
        </Button>
      </form>

      {/* prettier-ignore */}
      <div className="grid grid-cols-1 gap-4 overflow-y-scroll pr-2 scrollbar-thin scrollbar-track-transparent
       scrollbar-thumb-scrollbar  lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {habits.map((habit) => (
          <HabitItem
            key={habit.id}
            habit={habit}
            onDelete={handleDeleteHabit}
            onDecrement={handleDecrementHabit}
            onIncrement={handleIncrementHabit}
            onReset={handleResetHabit}
          />
        ))}
      </div>
    </div>
  );
}
