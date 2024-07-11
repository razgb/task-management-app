import TasksPage from "../components/pages/TasksPage.tsx";
import DashboardPage from "../components/pages/DashboardPage.tsx";
import useRouter from "../stores/useRouter.tsx";

export default function Outlet() {
  const { path } = useRouter();
  let content: React.ReactNode | null = null;

  switch (path) {
    case "/": {
      content = <TasksPage />; // in the future this should be the dashboard
      break;
    }

    case "/tasks": {
      content = <TasksPage />;
      break;
    }

    case "/dashboard": {
      content = <DashboardPage />;
      break;
    }

    default: {
      content = <div>404</div>; // later we need to create custom component to then fix this shit.
      break;
    }
  }

  return (
    <div className="m-4 flex-grow rounded-2xl bg-secondaryBg p-1">
      <div className="h-full w-full rounded-xl bg-primaryBg">{content}</div>
    </div>
  );
}
