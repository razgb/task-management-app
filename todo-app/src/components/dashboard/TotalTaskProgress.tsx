import { Goal } from "lucide-react";

export default function TotalTaskProgress() {
  const completion = Math.floor(Math.random() * 100);
  // const completion = 1; // testing

  return (
    <div className="h-full min-w-[400px] content-center rounded-2xl bg-primaryBg px-16">
      <div className="mb-2 flex items-center gap-2">
        <div>
          <Goal size={36} />
        </div>

        <h2 className="text-2xl font-semibold capitalize">total progress</h2>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-8 w-full overflow-hidden rounded-2xl bg-secondaryBgStrong">
          <div
            className="h-full rounded-2xl bg-text"
            style={{ width: completion + "%" }}
          ></div>
        </div>

        <p className="text-xl font-semibold">{completion}%</p>
      </div>
    </div>
  );
}
