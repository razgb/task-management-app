import CurrentDateWidget from "../components/dashboard/CurrentDateWidget";
import TimerWidget from "../components/dashboard/TimerWidget";
import RecentTasks from "../components/dashboard/RecentTasks";
import TotalTaskProgress from "../components/dashboard/TotalTaskProgress";
import TimerContextProvider from "../stores/timer/TimerContextProvider";

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

      <div className="col-span-1 row-span-1">
        <TimerContextProvider>
          <TimerWidget />
        </TimerContextProvider>
      </div>
    </div>
  );
}
