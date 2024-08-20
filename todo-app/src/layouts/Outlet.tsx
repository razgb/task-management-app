import TaskExpanded from "../components/tasks-page/TaskExpanded.tsx";
import DashboardPage from "../pages/dashboard/DashboardPage.tsx";
import ErrorPage from "../pages/error/ErrorPage.tsx";
// import HabitTracker from "../pages/habit-tracker/HabitTrackerPage.tsx";
import SettingsPage from "../pages/settings/SettingsPage.tsx";
import TaskCreator from "../pages/task-creator/TaskCreator.tsx";
import TasksPage from "../pages/tasks/TasksPage.tsx";
import TimerPage from "../pages/timer/TimerPage.tsx";

import useAccessibility from "../stores/accessibility/useAccessibility";
import useRouter from "../stores/router/useRouter.tsx";
import styles from "../tailwindStyles.ts";

export default function Outlet() {
  const { path } = useRouter();
  const { accessibility } = useAccessibility();
  const { removeRoundEdges, highContrastMode } = accessibility;

  let content: React.ReactNode | null = null;

  switch (true) {
    case path === "/": {
      content = <DashboardPage />; // in the future this should be the dashboard
      break;
    }
    case path === "/dashboard": {
      content = <DashboardPage />;
      break;
    }
    case path === "/task-creator": {
      content = <TaskCreator />;
      break;
    }
    case path === "/tasks": {
      content = <TasksPage />;
      break;
    }
    case new RegExp("^/tasks/[a-zA-Z0-9]+$").test(path): {
      content = <TaskExpanded />;
      break;
    }
    case new RegExp("/settings(/.*)?$").test(path): {
      content = <SettingsPage />;
      break;
    }
    case path === "/timer": {
      content = <TimerPage />;
      break;
    }
    // case path === "/habit-tracker": {
    //   content = <HabitTracker />;
    //   break;
    // }
    case path === "error": {
      content = <ErrorPage />;
      break;
    }
    default: {
      content = <ErrorPage />;
      break;
    }
  }

  return (
    <div
      style={{
        borderRadius: removeRoundEdges ? "0" : "",
      }}
      // prettier-ignore
      className={`h-full overflow-hidden rounded-3xl
      ${highContrastMode ? styles.reducedAnimatonPageBackgroundColor : styles.pageBackgroundColor} p-3`}
    >
      {content}
    </div>
  );
}
