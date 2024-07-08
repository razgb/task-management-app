import TasksPage from "../components/pages/TasksPage.tsx";
import DashboardPage from "../components/pages/DashboardPage.tsx";

import useRouter from "../stores/useRouter.tsx";

export default function Outlet() {
  const { path } = useRouter();
  console.log(path);

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
    <div className="flex-grow m-4 p-4 rounded-3xl bg-secondary-ultralight">
      <div className="bg-primary rounded-2xl w-full h-full">{content}</div>
    </div>
  );
}
