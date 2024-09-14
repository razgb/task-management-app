import CurrentDateWidget from "@/pages/dashboard/components/CurrentDateWidget";
import TimerWidget from "@/pages/dashboard/components/TimerWidget";
import RecentTasks from "@/pages/dashboard/components/RecentTasks";
import TotalTaskProgress from "@/pages/dashboard/components/TotalTaskProgress";
import DueTasks from "./components/DueTasks";

export default function DashboardPage() {
  return (
    // prettier-ignore
    <div className="grid h-full grid-cols-1 gap-3 overflow-y-auto scrollbar-thin
      scrollbar-track-transparent scrollbar-thumb-scrollbar lg:grid-cols-4 lg:grid-rows-4">
      <div className="col-span-2 row-span-4">
        <RecentTasks />
      </div>

      <div className="col-span-1 row-span-1">
        <CurrentDateWidget />
      </div>


      <div className="col-span-1 row-span-1">
        <TimerWidget />
      </div>

      <div className="col-span-2 row-span-1">
        <TotalTaskProgress />
      </div>

      <div className="col-span-2 row-span-2">
        <DueTasks/>
      </div>
    </div>
  );
}
