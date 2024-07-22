import CurrentDateWidget from "../components/dashboard/CurrentDateWidget";
import RecentTasks from "../components/dashboard/RecentTasks";
import TotalTaskProgress from "../components/dashboard/TotalTaskProgress";

export default function DashboardPage() {
  return (
    <div className="grid h-full grid-cols-1 gap-3 overflow-y-auto lg:grid-cols-4 lg:grid-rows-4">
      <div className="col-span-2 row-span-3">
        <RecentTasks />
      </div>

      <div className="col-span-1 row-span-1">
        <CurrentDateWidget />
      </div>

      <div className="col-span-1 row-span-1">
        <TotalTaskProgress />
      </div>
    </div>
  );
}

<div className="col-span-2 flex w-full items-center justify-center">
  <h2>reserved for calendar</h2>
</div>;
