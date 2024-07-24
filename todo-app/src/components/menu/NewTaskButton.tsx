import { SquarePen } from "lucide-react";
import useFontSize from "../../stores/accessibility/useFontSize";

export default function NewTaskButton({
  children,
}: {
  children: React.ReactNode | null;
}) {
  const fontSizes = useFontSize();

  return (
    <button
      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-text hover:bg-iconBgStrong`}
      style={{ fontSize: `${fontSizes.base}px` }}
    >
      <div>
        <SquarePen size={fontSizes["2xl"]} className="stroke-iconStroke" />
      </div>
      <span style={{ fontSize: `${fontSizes.base}px` }}>{children}</span>
    </button>
  );
}
