const heightClasses = {
  1: "h-1",
  2: "h-2",
  3: "h-3",
  4: "h-4",
  5: "h-5",
  6: "h-6",
  7: "h-7",
  8: "h-8",
} as const;

export default function ProgressBar({
  completion,
  width = 4,
}: {
  completion: number;
  width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}) {
  return (
    <div
      className={`${heightClasses[width]} w-full overflow-hidden rounded-full bg-secondaryBgStrong`}
    >
      <div
        className={`h-full rounded-full bg-textWeak`}
        style={{ width: completion + "%" }}
      ></div>
    </div>
  );
}
