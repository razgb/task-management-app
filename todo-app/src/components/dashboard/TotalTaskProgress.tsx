import useFontSize from "../../stores/accessibility/useFontSize";

export default function TotalTaskProgress() {
  const fontSizes = useFontSize();
  const completion = Math.floor(Math.random() * 100);

  return (
    <div className="flex h-full flex-col justify-center rounded-2xl bg-primaryBg px-12">
      <h2
        className="mb-2 font-semibold capitalize"
        style={{ fontSize: `${fontSizes["2xl"]}px` }}
      >
        total progress
      </h2>

      <div className="flex items-center gap-2">
        <div className="h-6 w-full overflow-hidden rounded-2xl bg-secondaryBgWeak">
          <div
            className="h-full rounded-2xl bg-textWeak"
            style={{ width: completion + "%" }}
          ></div>
        </div>

        <p
          className="font-semibold"
          style={{ fontSize: `${fontSizes["2xl"]}px` }}
        >
          {completion}%
        </p>
      </div>
    </div>
  );
}
