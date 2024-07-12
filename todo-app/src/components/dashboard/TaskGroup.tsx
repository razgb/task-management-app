import { MoveDiagonal } from "lucide-react";
import Button from "../shared/Button";

type TaskGroupProps = {
  title: string;
};

export default function TaskGroup({ title }: TaskGroupProps) {
  const completion = Math.floor(Math.random() * 100);

  return (
    <div className="min-h-[150px] w-full rounded-xl bg-secondaryBg p-4">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-lg">{title}</h2>
        <Button variant="ghost-icon">
          <MoveDiagonal size={20} />
        </Button>
      </div>

      <div className="bg-secondaryBgWeak h-4 w-full rounded-full">
        <div
          className="h-full rounded-full bg-black"
          style={{ width: completion + "%" }}
        ></div>
      </div>
    </div>
  );
}
