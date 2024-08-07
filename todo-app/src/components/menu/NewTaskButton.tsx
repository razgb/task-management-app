import { SquarePen } from "lucide-react";
import useAccessibility from "../../stores/accessibility/useAccessibility";

export default function NewTaskButton({
  children,
}: {
  children: React.ReactNode | null;
}) {
  const { accessibility } = useAccessibility();
  const { fontSizeMap } = accessibility;

  return (
    <button
      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-text hover:bg-iconBgStrong`}
      style={{ fontSize: `${fontSizeMap.base}px` }}
    >
      <div>
        <SquarePen size={fontSizeMap["2xl"]} className="stroke-iconStroke" />
      </div>
      <span style={{ fontSize: `${fontSizeMap.base}px` }}>{children}</span>
    </button>
  );
}
