import {
  AccessibilityIcon,
  Activity,
  // CalendarCog,
  Info,
  UserRound,
} from "lucide-react";

import AccountSettings from "./sub-settings/account-settings/AccountSettings";
import ActivitySettings from "./sub-settings/activity-settings/ActivitySettings";
import FaqSettings from "./sub-settings/faq-settings/FaqSettings";
import AccessibilitySettings from "./sub-settings/accessibility-settings/AccessibilitySettings";

import Link from "../../components/shared/Link";
import { ValidUrlPaths } from "../../stores/router/RouterContext";
import useRouter from "../../stores/router/useRouter";
import useAccessibility from "../../stores/accessibility/useAccessibility";

function SettingsPage() {
  const { path } = useRouter();
  const { accessibility } = useAccessibility();
  const {
    highContrastMode,
    increaseLetterSpacing,
    removeRoundEdges,
    reduceAnimations,
    fontSizeMap,
    accessibilityTextColor,
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
      pageToRender = <AccountSettings />;
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
                fontSize: `${fontSizeMap["3xl"]}px`,
                color: highContrastMode ? accessibilityTextColor : "",
                letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
                borderRadius: removeRoundEdges ? "0" : "",
                transition: reduceAnimations ? "none" : "",
              }}
            >
              Settings
            </h2>

            <SettingsTab
              to="/settings/account-management"
              icon={<UserRound size={fontSizeMap["2xl"]} />}
              title="Account management"
            />
            <SettingsTab
              to="/settings/accessibility"
              icon={<AccessibilityIcon size={fontSizeMap["2xl"]} />}
              title="Accessibility"
            />
            <SettingsTab
              to="/settings/activity-log"
              icon={<Activity size={fontSizeMap["2xl"]} />}
              title="Activity log"
            />
            <SettingsTab
              to="/settings/frequently-asked-questions"
              icon={<Info size={fontSizeMap["2xl"]} />}
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
  const { accessibility } = useAccessibility();
  const {
    highContrastMode,
    increaseLetterSpacing,
    reduceAnimations,
    removeRoundEdges,
    fontSizeMap,
    accessibilityTextColor,
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
        style={{
          fontSize: `${fontSizeMap.lg}px`,
          color: highContrastMode ? accessibilityTextColor : "",
        }}
      >
        {title}
      </h3>
    </Link>
  );
}

// <SettingsTab
//   to="/settings/tasks"
//   icon={<CalendarCog size={fontSizeMap["2xl"]} />}
//   title="Task settings"
// />
