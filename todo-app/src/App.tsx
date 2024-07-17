import "./index.css";
import Menu from "./layouts/Menu";
import MainNavigation from "./layouts/MainNavigation";
import Outlet from "./layouts/Outlet";
import useTheme from "./stores/useTheme";
function App() {
  const { theme } = useTheme();

  return (
    <div className={`${theme} flex h-screen gap-4 bg-primaryBg p-4 text-text`}>
      <Menu />

      <div className="flex flex-1 flex-col">
        <MainNavigation />

        <div className="flex-1 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
