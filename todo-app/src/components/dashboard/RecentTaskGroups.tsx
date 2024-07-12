import TaskGroup from "./TaskGroup";

export default function RecentTaskGroups() {
  return (
    <div className="rounded-2xl bg-primaryBg p-8">
      <h2 className="mb-4 text-2xl font-bold">Recent Task Groups</h2>

      <div className="grid grid-cols-1 place-items-center gap-4 lg:grid-cols-2">
        <TaskGroup title="App specifics" />
        <TaskGroup title="App design" />
        <TaskGroup title="App notes" />
        <TaskGroup title="App architecture" />
      </div>
    </div>
  );
}
