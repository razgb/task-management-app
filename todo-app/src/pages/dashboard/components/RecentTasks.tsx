import { MoveDiagonal } from "lucide-react";
import Link from "@/shared-components/Link";
import useAccessibility from "@/stores/accessibility/useAccessibility";
import useGetTasks from "@/pages/tasks/useGetTasks";
import { useProccessTaskData } from "@/pages/tasks/functions/client/useProcessTaskData";
import { useMemo } from "react";

export default function RecentTasks() {
  const { accessibility } = useAccessibility();
  const {
    highContrastMode,
    increaseLetterSpacing,
    removeRoundEdges,
    fontSizeMap,
    accessibilityTextColor,
  } = accessibility;

  const { tasks, loading } = useGetTasks();

  const lastSixTasks = useMemo(() => {
    return tasks ? structuredClone(tasks) : undefined;
  }, [tasks]);

  const output = useProccessTaskData({
    tasks: lastSixTasks?.splice(0, 6),
    loading,
    column: undefined,
    hideGrabIcon: true,
  });

  return (
    <div
      style={{
        borderRadius: removeRoundEdges ? "0" : "",
      }}
      className="flex h-full flex-col overflow-hidden rounded-2xl bg-primaryBg p-8"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2
          className="font-bold"
          style={{
            fontSize: `${fontSizeMap["3xl"]}px`,
            color: highContrastMode ? accessibilityTextColor : "",
            letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
          }}
        >
          Recent Tasks
        </h2>
        <Link
          to="/tasks"
          className="rounded-full bg-primaryBg p-2 transition-colors hover:bg-secondaryBgWeak"
        >
          <MoveDiagonal size={fontSizeMap["3xl"]} />
        </Link>
      </div>

      <div className="grid h-fit grid-cols-1 gap-4 overflow-y-scroll p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-scrollbar">
        {output}
      </div>
    </div>
  );
}
