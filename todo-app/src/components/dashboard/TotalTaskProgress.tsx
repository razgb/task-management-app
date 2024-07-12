export default function TotalTaskProgress() {
  const completion = Math.floor(Math.random() * 100);

  return (
    <div className="h-full min-w-[400px] content-center rounded-2xl bg-primaryBg px-16">
      <h2 className="mb-2 text-xl font-semibold capitalize">
        total progress across groups
      </h2>

      <div className="flex items-end gap-2">
        <div className="h-4 w-full rounded-full bg-secondaryBg">
          <div
            className="h-full rounded-full bg-text"
            style={{ width: completion + "%" }}
          ></div>
        </div>

        <p className="text-sm font-semibold">{completion}%</p>
      </div>
    </div>
  );
}
