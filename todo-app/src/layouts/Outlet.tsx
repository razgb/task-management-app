import DashboardPage from "../pages/DashboardPage.tsx";
import SettingsPage from "../pages/SettingsPage.tsx";
import useRouter from "../stores/useRouter.tsx";
import TaskDetails from "../components/task-groups-page/TaskDetails.tsx";
import TasksPage from "../pages/TasksPage.tsx";

export default function Outlet() {
  const { path } = useRouter();
  let content: React.ReactNode | null = null;

  switch (path) {
    case "/": {
      content = <DashboardPage />; // in the future this should be the dashboard
      break;
    }

    case "/dashboard": {
      content = <DashboardPage />;
      break;
    }

    case "/tasks": {
      content = <TasksPage />;
      break;
    }

    // need to change this.
    case "/tasks/details": {
      content = <TaskDetails />;
      break;
    }

    case "/settings": {
      content = <SettingsPage />;
      break;
    }

    default: {
      content = <div>404</div>; // later we need to create custom component to then fix this shit.
      break;
    }
  }

  return (
    <div className="h-full overflow-hidden rounded-3xl bg-secondaryBg p-3">
      {content}
    </div>
  );
}
