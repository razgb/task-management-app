import CurrentDateWidget from "../components/dashboard/CurrentDateWidget";
import RecentTasks from "../components/dashboard/RecentTasks";
import TotalTaskProgress from "../components/dashboard/TotalTaskProgress";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[2fr,1fr]">
      <RecentTasks />

      <div className="flex flex-col gap-3">
        <CurrentDateWidget />
        <TotalTaskProgress />
      </div>

      <div className="col-span-2 flex w-full items-center justify-center">
        <h2>reserved for calendar</h2>
      </div>
    </div>
  );
}
