export function TaskSkeletonLoad() {
  return (
    <div className="">
      <div role="status" className="animate-pulse p-3">
        <div className="mb-2.5 h-2.5 w-48 rounded-full bg-secondary-400"></div>
        <div className="mb-2 h-3 rounded-full bg-secondary-400"></div>
        <div className="mb-2.5 h-3 max-w-[200px] rounded-full bg-secondary-400"></div>
        <div className="mb-2 h-6 max-w-[100px] rounded-xl bg-secondary-400"></div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
// <div className="mb-2 h-3 rounded-full bg-secondary-600"></div>

export function TaskSkeletonLoadMultiple() {
  return (
    <>
      <TaskSkeletonLoad key={"skel-1"} />
      <TaskSkeletonLoad key={"skel-2"} />
      <TaskSkeletonLoad key={"skel-3"} />
      <TaskSkeletonLoad key={"skel-4"} />
    </>
  );
}
