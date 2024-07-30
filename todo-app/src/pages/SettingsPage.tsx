import {
  AccessibilityIcon,
  Activity,
  CalendarCog,
  Info,
  UserRound,
} from "lucide-react";

import AccountSettings from "./sub-settings/account-settings/AccountSettings";
import ActivitySettings from "./sub-settings/activity-settings/ActivitySettings";
import FaqSettings from "./sub-settings/faq-settings/FaqSettings";
import TaskSettings from "./sub-settings/task-settings/TaskSettings";

import Link from "../components/shared/Link";
import { ValidUrlPaths } from "../stores/RouterContext";
import useRouter from "../stores/useRouter";
import AccessibilitySettings from "./sub-settings/accessibility-settings/AccessibilitySettings";
import useFontSize from "../stores/accessibility/useFontSize";
import useAccessibility from "../stores/accessibility/useAccessibility";
import useAccessibilityTextColor from "../stores/accessibility/useAccessibilityTextColor";

function SettingsPage() {
  const { path } = useRouter();
  const fontSizes = useFontSize();
  const { accessibilityTextColor } = useAccessibilityTextColor();
  const { accessibility } = useAccessibility();
  const {
    highContrastMode,
    increaseLetterSpacing,
    removeRoundEdges,
    reduceAnimations,
  } = accessibility;

  let pageToRender: React.ReactNode | null = null;

  switch (path) {
    case "/settings/account-management":
      pageToRender = <AccountSettings />;
      break;
    case "/settings/accessibility":
      pageToRender = <AccessibilitySettings />;
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
    <div
      className={`h-full rounded-2xl bg-primaryBg p-12`}
      style={{
        borderRadius: removeRoundEdges ? "0" : "",
      }}
    >
      <div className="flex h-full flex-col">
        <div className={`flex h-full gap-6`}>
          <div className="z-10 flex h-full w-1/2 flex-col gap-4 rounded-2xl p-6">
            <h2
              className="font-bold text-heading"
              style={{
                fontSize: `${fontSizes["3xl"]}px`,
                color: highContrastMode ? accessibilityTextColor : "",
                letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
                borderRadius: removeRoundEdges ? "0" : "",
                transition: reduceAnimations ? "none" : "",
              }}
            >
              Settings
            </h2>

            <SettingsTab
              to="/settings/tasks"
              icon={<CalendarCog size={fontSizes["2xl"]} />}
              title="Task settings"
            />
            <SettingsTab
              to="/settings/account-management"
              icon={<UserRound size={fontSizes["2xl"]} />}
              title="Account management"
            />
            <SettingsTab
              to="/settings/accessibility"
              icon={<AccessibilityIcon size={fontSizes["2xl"]} />}
              title="Accessibility"
            />
            <SettingsTab
              to="/settings/activity-log"
              icon={<Activity size={fontSizes["2xl"]} />}
              title="Activity log"
            />
            <SettingsTab
              to="/settings/frequently-asked-questions"
              icon={<Info size={fontSizes["2xl"]} />}
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
  const fontSizes = useFontSize();
  const { accessibility } = useAccessibility();
  const {
    highContrastMode,
    increaseLetterSpacing,
    reduceAnimations,
    removeRoundEdges,
  } = accessibility;

  return (
    <Link
      to={to}
      className="flex items-center gap-2 rounded-xl bg-secondary-200 px-4 py-3 transition-colors hover:bg-secondary-300"
      ariaLabel={`Settings tab for ${title}.`}
      style={{
        color: highContrastMode ? "#fff" : "",
        letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
        borderRadius: removeRoundEdges ? "0" : "",
        transition: reduceAnimations ? "none" : "",
      }}
    >
      {icon}
      <h3
        className="font-medium capitalize"
        style={{ fontSize: `${fontSizes.lg}px` }}
      >
        {title}
      </h3>
    </Link>
  );
}
