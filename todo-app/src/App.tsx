import Menu from "./layouts/Menu";
import MainNavigation from "./layouts/MainNavigation";
import Outlet from "./layouts/Outlet";
import useTheme from "./stores/useTheme";
import LoadingWave from "./components/shared/LoadingWave";

function App() {
  const { theme } = useTheme();

  return (
    <div className={`${theme} flex h-screen flex-col`}>
      <LoadingWave loading={false} />

      <div
        className={`flex flex-1 gap-3 overflow-hidden bg-primaryBg p-4 text-text`}
      >
        <Menu />

        <div className="flex flex-1 flex-col overflow-hidden">
          <MainNavigation />

          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
