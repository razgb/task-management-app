import CurrentDate from "../components/dashboard/CurrentDate";
import RecentTaskGroups from "../components/dashboard/RecentTaskGroups";
import TotalTaskProgress from "../components/dashboard/TotalTaskProgress";

// bento grid style
export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[2fr,1fr]">
      <RecentTaskGroups />

      <div className="flex flex-col gap-3">
        <CurrentDate />
        <TotalTaskProgress />
      </div>

      <div className="col-span-2 flex w-full items-center justify-center">
        <h2>reserved for calendar</h2>
      </div>
    </div>
  );
}
