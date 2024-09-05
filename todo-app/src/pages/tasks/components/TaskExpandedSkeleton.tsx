export default function TaskExpandedSkeleton() {
  return (
    <div className="h-full overflow-hidden rounded-2xl bg-primaryBg px-6 py-12">
      <div className="mx-auto flex h-full max-w-[800px] animate-pulse flex-col">
        <div className="mb-6 flex gap-2">
          <div className="h-6 w-24 rounded-md bg-secondary-500"></div>
          <div className="h-6 w-24 rounded-md bg-secondary-500"></div>
          <div className="h-6 w-24 rounded-md bg-secondary-500"></div>
        </div>

        <div className="mb-3 flex justify-between gap-2">
          {/* Title */}
          <div className="h-8 w-full max-w-[50%] rounded-md bg-secondary-500"></div>
          {/* Delete Button */}
          <div className="h-8 w-24 rounded-md bg-secondary-500"></div>
        </div>

        {/* Description */}
        <div className="mb-10 space-y-2">
          <div className="h-4 w-1/3 rounded bg-secondary-500"></div>
          <div className="h-4 w-1/3 rounded bg-secondary-500"></div>
          <div className="h-4 w-1/6 rounded bg-secondary-500"></div>
        </div>

        <div className="flex flex-1 flex-col gap-2 rounded-2xl bg-secondary-100 p-4">
          <div className="flex w-full items-center justify-between p-2">
            <div className="h-4 w-full max-w-[60%] rounded bg-secondary-500"></div>
            <div className="mr-2 h-6 w-6 bg-secondary-500"></div>
          </div>

          <div className="flex w-full items-center justify-between p-2">
            <div className="h-4 w-full max-w-[45%] rounded bg-secondary-500"></div>
            <div className="mr-2 h-6 w-6 bg-secondary-500"></div>
          </div>

          <div className="flex w-full items-center justify-between p-2">
            <div className="h-4 w-full max-w-[30%] rounded bg-secondary-500"></div>
            <div className="mr-2 h-6 w-6 bg-secondary-500"></div>
          </div>

          <div className="flex w-full items-center justify-between p-2">
            <div className="h-4 w-full max-w-[30%] rounded bg-secondary-500"></div>
            <div className="mr-2 h-6 w-6 bg-secondary-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
