import CurrentDateWidget from "@/pages/dashboard/components/CurrentDateWidget";
import TimerWidget from "@/pages/dashboard/components/TimerWidget";
import RecentTasks from "@/pages/dashboard/components/RecentTasks";
import TotalTaskProgress from "@/pages/dashboard/components/TotalTaskProgress";

export default function DashboardPage() {
  return (
    // prettier-ignore
    <div className="grid h-full grid-cols-1 gap-2 overflow-y-auto scrollbar-thin
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
        <div className="rounded-2xl bg-primaryBg h-full">
        </div>
      </div>
    </div>
  );
}
