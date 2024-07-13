import DashboardPage from "../pages/DashboardPage.tsx";
import GroupTaskExpanded from "../pages/GroupTaskExpanded.tsx";
import SettingsPage from "../pages/SettingsPage.tsx";
import useRouter from "../stores/useRouter.tsx";

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

    case "/task-groups": {
      content = <GroupTaskExpanded />;
      break;
    }

    // need to change this.
    case "/task-groups/:id": {
      content = <GroupTaskExpanded />;
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
    <div className="m-4 flex-grow rounded-3xl bg-secondaryBg p-3">
      {content}
    </div>
  );
}

/*

    <div className="m-4 flex-grow rounded-3xl bg-secondaryBg p-3">
      <div className="h-full w-full rounded-2xl bg-primaryBg">{content}</div>
    </div>
*/
