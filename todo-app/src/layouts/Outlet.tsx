import DashboardPage from "../pages/DashboardPage.tsx";
import SettingsPage from "../pages/SettingsPage.tsx";
import useRouter from "../stores/router/useRouter.tsx";
import TaskDetails from "../components/tasks-page/TaskDetails.tsx";
import TasksPage from "../pages/TasksPage.tsx";
import TaskCreator from "../pages/TaskCreator.tsx";
import ErrorPage from "../pages/ErrorPage.tsx";
import TimerPage from "../pages/TimerPage.tsx";
import useAccessibility from "../stores/accessibility/useAccessibility";
import HabitTracker from "../pages/HabitTrackerPage.tsx";

export default function Outlet() {
  const { path } = useRouter();
  const { accessibility } = useAccessibility();
  const { removeRoundEdges } = accessibility;

  let content: React.ReactNode | null = null;

  // Checks for sub settings routes in the path. SettingsPage handles the rest.
  if (new RegExp("/settings(/.*)?$").test(path)) {
    content = <SettingsPage />;
    return (
      <div
        style={{
          borderRadius: removeRoundEdges ? "0" : "",
        }}
        className="h-full overflow-hidden rounded-3xl bg-secondaryBg p-3"
      >
        {content}
      </div>
    );
  }

  switch (path) {
    case "/": {
      content = <DashboardPage />; // in the future this should be the dashboard
      break;
    }
    case "/dashboard": {
      content = <DashboardPage />;
      break;
    }
    case "/task-creator": {
      content = <TaskCreator />;
      break;
    }
    case "/tasks": {
      content = <TasksPage />;
      break;
    }
    case "/tasks/details": {
      content = <TaskDetails />;
      break;
    }
    case "/settings": {
      content = <SettingsPage />;
      break;
    }
    case "/timer": {
      content = <TimerPage />;
      break;
    }
    case "/habit-tracker": {
      content = <HabitTracker />;
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
      className="h-full overflow-hidden rounded-3xl bg-secondaryBg p-3"
    >
      {content}
    </div>
  );
}
