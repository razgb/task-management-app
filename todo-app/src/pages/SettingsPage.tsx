import {
  AccessibilityIcon,
  Activity,
  CalendarCog,
  Info,
  UserRound,
} from "lucide-react";

import AccountSettings from "./sub-settings/AccountSettings";
import Accessibility from "./sub-settings/Accessibility";
import ActivitySettings from "./sub-settings/ActivitySettings";
import FaqSettings from "./sub-settings/FaqSettings";
import TaskSettings from "./sub-settings/TaskSettings";

import Link from "../components/shared/Link";
import { ValidUrlPaths } from "../stores/RouterContext";
import useRouter from "../stores/useRouter";

function SettingsPage() {
  const { path } = useRouter();
  let pageToRender: React.ReactNode | null = null;

  switch (path) {
    case "/settings/account-management":
      pageToRender = <AccountSettings />;
      break;
    case "/settings/accessibility":
      pageToRender = <Accessibility />;
      break;
    case "/settings/activity-log":
      pageToRender = <ActivitySettings />;
      break;
    case "/settings/frequently-asked-questions":
      pageToRender = <FaqSettings />;
      break;
    default:
      pageToRender = <TaskSettings />;
      break;
  }

  return (
    <div className={`h-full rounded-2xl bg-primaryBg p-12`}>
      <div className="flex h-full flex-col">
        <div className={`flex h-full gap-6`}>
          <div className="z-10 flex h-full w-1/2 flex-col gap-6 rounded-2xl p-6">
            <h2 className="text-3xl font-bold text-heading">Settings</h2>
            <SettingsTab
              to="/settings/tasks"
              icon={<CalendarCog />}
              title="Task settings"
            />
            <SettingsTab
              to="/settings/account-management"
              icon={<UserRound />}
              title="Account management"
            />
            <SettingsTab
              to="/settings/accessibility"
              icon={<AccessibilityIcon />}
              title="Accessibility"
            />
            <SettingsTab
              to="/settings/activity-log"
              icon={<Activity />}
              title="Activity log"
            />
            <SettingsTab
              to="/settings/frequently-asked-questions"
              icon={<Info />}
              title="FAQ"
            />
          </div>

          <div
            className={`h-full w-1/2 rounded-2xl bg-secondary-200 transition-transform`}
          >
            {pageToRender}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;

function SettingsTab({
  icon,
  title,
  to,
}: {
  icon: React.ReactNode;
  title: string;
  to: ValidUrlPaths;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 rounded-xl bg-secondary-200 px-4 py-2 hover:bg-secondary-300"
      role="button"
      ariaLabel={`Settings tab for ${title}.`}
    >
      {icon}
      <h3 className="text-lg font-medium capitalize">{title}</h3>
    </Link>
  );
}
