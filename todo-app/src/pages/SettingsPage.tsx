import {
  AccessibilityIcon,
  Activity,
  CalendarCog,
  HeartHandshake,
  Info,
  UserRound,
} from "lucide-react";
import Link from "../components/shared/Link";
import { ValidUrlPaths } from "../stores/RouterContext";

function SettingsPage() {
  return (
    <div className={`h-full rounded-2xl bg-primaryBg p-3`}>
      <div className="flex h-full flex-col">
        <div className={`flex h-full gap-1`}>
          <div className="z-10 flex h-full w-1/2 flex-col gap-6 rounded-2xl bg-secondaryBg p-6">
            <h2 className="text-3xl font-bold text-heading">Settings</h2>
            <SettingsTab to="/" icon={<CalendarCog />} title="Task settings" />
            <SettingsTab
              to="/"
              icon={<UserRound />}
              title="Account management"
            />
            <SettingsTab
              to="/"
              icon={<AccessibilityIcon />}
              title="Accessibility"
            />
            <SettingsTab to="/" icon={<Activity />} title="Activity log" />
            <SettingsTab to="/" icon={<Info />} title="FAQ" />
            <SettingsTab
              to="/"
              icon={<HeartHandshake />}
              title="Feedback and support"
            />
          </div>

          <div
            className={`h-full w-1/2 rounded-2xl bg-secondary-200 transition-transform`}
          ></div>
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
      className="flex items-center gap-2 rounded-xl bg-secondary-200 px-4 py-2 hover:bg-secondary-100"
      role="button"
      ariaLabel={`Settings tab for ${title}.`}
    >
      {icon}
      <h3 className="text-lg font-medium capitalize">{title}</h3>
    </Link>
  );
}

// To add everything except a specific file (replace 'file_to_exclude' with the actual file name):
// git add . ':!file_to_exclude'

// To add everything:
// git add .

// To remove a single file (replace 'file_to_remove' with the actual file name):
// git rm file_to_remove
