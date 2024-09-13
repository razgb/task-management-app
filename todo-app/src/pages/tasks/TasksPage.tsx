import TaskColumn from "@/pages/tasks/components/TaskColumn.tsx";
import useAccessibility from "@/stores/accessibility/useAccessibility.tsx";
import useGetTasks from "./useGetTasks";

export default function TasksPage() {
  const { accessibility } = useAccessibility();
  const { removeRoundEdges } = accessibility;
  const { tasks, loading } = useGetTasks();

  return (
    <div
      className="h-full overflow-hidden rounded-2xl bg-primaryBg p-3"
      style={{
        borderRadius: removeRoundEdges ? 0 : "",
      }}
    >
      <div className="grid h-full grid-cols-3">
        <TaskColumn variant="draft" loading={loading} tasks={tasks} />

        <TaskColumn variant="in-progress" loading={loading} tasks={tasks} />

        <TaskColumn variant="complete" loading={loading} tasks={tasks} />
      </div>
    </div>
  );
}
