import { TaskType } from "@/pages/tasks/components/Task";
import { useProccessTaskData } from "@/pages/tasks/functions/client/useProcessTaskData";
import useGetTasks from "@/pages/tasks/useGetTasks";
import useAccessibility from "@/stores/accessibility/useAccessibility";

export default function DueTasks() {
  const { accessibility } = useAccessibility();
  const {
    highContrastMode,
    increaseLetterSpacing,
    removeRoundEdges,
    fontSizeMap,
    accessibilityTextColor,
  } = accessibility;
  const { tasks, loading } = useGetTasks();

  const output = useProccessTaskData({
    tasks: sortByDueDate(tasks),
    hideGrabIcon: true,
    column: undefined,
    loading,
  });

  return (
    <div
      style={{
        borderRadius: removeRoundEdges ? "0" : "",
      }}
      className="flex h-full flex-col rounded-2xl bg-primaryBg p-6"
    >
      <h3
        style={{
          fontSize: `${fontSizeMap["3xl"]}px`,
          color: highContrastMode ? accessibilityTextColor : "",
          letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
        }}
        className="mb-4 font-semibold capitalize text-text"
      >
        tasks due soon
      </h3>

      <div
        //prettier-ignore
        className="flex flex-1 flex-col gap-3 overflow-y-scroll p-6
        scrollbar-thin scrollbar-track-transparent scrollbar-thumb-scrollbar"
      >
        {output}
      </div>
    </div>
  );
}

function sortByDueDate(tasks: TaskType[] | undefined) {
  if (!tasks || tasks.length === 0) return tasks; // same empty array.

  const tasksWithDueDates: TaskType[] = [];

  tasks.forEach((task) => {
    if (task.dueDate) tasksWithDueDates.push(task);
  });

  if (tasksWithDueDates.length === 0) return tasks; // same empty array.

  const tasksWithValidDueDates = tasksWithDueDates.filter(
    (task): task is TaskType & { dueDate: NonNullable<TaskType["dueDate"]> } =>
      task.dueDate !== null,
  );

  return tasksWithValidDueDates
    .sort((a, b) => a.dueDate - b.dueDate)
    .splice(0, 4);
}
