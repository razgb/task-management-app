import { AlertTriangleIcon } from "lucide-react";
import useAccessibility from "@/stores/accessibility/useAccessibility";

export default function SubTaskList({
  taskList,
}: {
  taskList: React.ReactNode[] | undefined;
}) {
  const { accessibility } = useAccessibility();
  const { removeRoundEdges, fontSizeMap } = accessibility;

  if (!taskList) return null;

  return (
    <div
      style={{
        borderRadius: removeRoundEdges ? "0" : "",
      }}
      className="h-1/2 flex-1 rounded-2xl border-4 border-secondary-300 py-4 pl-4"
    >
      <ul className="flex h-full flex-col gap-2 overflow-y-scroll pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-scrollbar">
        {taskList.length ? (
          taskList
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex max-w-[300px] flex-col items-center">
              <AlertTriangleIcon size={64} />
              <h3
                style={{
                  fontSize: fontSizeMap["2xl"],
                }}
                className=""
              >
                No sub tasks
              </h3>
              <p
                style={{
                  fontSize: fontSizeMap["base"],
                }}
                className="text-center text-textWeak"
              >
                You'll see your sub tasks here upon adding one in the form
                above!
              </p>
            </div>
          </div>
        )}
      </ul>
    </div>
  );
}
