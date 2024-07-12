import "./index.css";
import Menu from "./layouts/Menu";
import MainNavigation from "./layouts/MainNavigation";
import Outlet from "./layouts/Outlet";
import useTheme from "./stores/useTheme";

function App() {
  const { theme } = useTheme();

  return (
    <div className={`${theme} flex h-screen bg-primaryBg text-text`}>
      <Menu />

      <div className="flex flex-grow flex-col gap-4">
        <MainNavigation />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
