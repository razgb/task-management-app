import { useEffect } from "react";
import TaskColumn from "../../components/tasks-page/TaskColumn.tsx";

import useAccessibility from "../../stores/accessibility/useAccessibility.tsx";
import { getTasksFromFirebase } from "./features/getTasksFromFirebase.ts";
import { useQuery } from "react-query";
import useModal from "../../stores/modal/useModal.tsx";

export default function TasksPage() {
  const { accessibility } = useAccessibility();
  const { removeRoundEdges } = accessibility;
  const { openModal } = useModal();

  const {
    failureCount, // got some ideas for this...
    error,
    data: tasks,
    isFetching,
  } = useQuery(["tasks"], getTasksFromFirebase, {
    refetchOnWindowFocus: false, // Do not refetch on window focus
    retry: 5,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (failureCount === 5) {
      openModal(
        "error",
        "Failed to load tasks after multiple attempts. Check your internet connection and try again.",
      );
    }
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
