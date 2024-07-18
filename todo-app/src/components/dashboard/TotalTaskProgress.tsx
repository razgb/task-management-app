export default function TotalTaskProgress() {
  const completion = Math.floor(Math.random() * 100);
  // const completion = 1; // testing

  return (
    <div className="flex h-full flex-col justify-center rounded-2xl bg-primaryBg px-16">
      <h2 className="mb-2 text-2xl font-semibold capitalize">total progress</h2>

      <div className="flex items-center gap-2">
        <div className="h-6 w-full overflow-hidden rounded-2xl bg-secondaryBgWeak">
          <div
            className="h-full rounded-2xl bg-textWeak"
            style={{ width: completion + "%" }}
          ></div>
        </div>

        <p className="text-xl font-semibold">{completion}%</p>
      </div>
    </div>
  );
}
