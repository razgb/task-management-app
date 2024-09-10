import TaskColumn from "@/pages/tasks/components/TaskColumn.tsx";
import { getTasksFromFirebase } from "@/pages/tasks/functions/async/getTasksFromFirebase.ts";
import useAccessibility from "@/stores/accessibility/useAccessibility.tsx";
import useModal from "@/stores/modal/useModal.tsx";
import { useQuery } from "react-query";

export default function TasksPage() {
  const { accessibility } = useAccessibility();
  const { removeRoundEdges } = accessibility;
  const { openModal } = useModal();

  const { data: tasks, isFetching } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasksFromFirebase,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    retryDelay: 500,
    retry: (failureCount) => {
      if (failureCount < 4) return true; // retries query

      openModal(
        "error",
        "Error loading your data. Check your internet connection and try again.",
      );

      return false; // stops query
    },
  });

  return (
    <div
      className="h-full overflow-hidden rounded-2xl bg-primaryBg p-3"
      style={{
        borderRadius: removeRoundEdges ? 0 : "",
      }}
    >
      <div className="grid h-full grid-cols-3">
        <TaskColumn variant="draft" loading={isFetching} tasks={tasks} />

        <TaskColumn variant="in-progress" loading={isFetching} tasks={tasks} />

        <TaskColumn variant="complete" loading={isFetching} tasks={tasks} />
      </div>
    </div>
  );
}
