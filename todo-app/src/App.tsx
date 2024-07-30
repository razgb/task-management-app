import Menu from "./layouts/Menu";
import MainNavigation from "./layouts/MainNavigation";
import Outlet from "./layouts/Outlet";
import useTheme from "./stores/timer/useTheme";
import LoadingWave from "./components/shared/LoadingWave";

function App() {
  const { theme } = useTheme();

  return (
    <div
      className={`${theme} flex h-screen flex-col overflow-hidden bg-primaryBg`}
    >
      <LoadingWave />

      <div
        className={`mx-auto flex w-full flex-1 gap-6 overflow-hidden bg-primaryBg p-6 text-text 2xl:max-w-[85dvw]`}
      >
        <Menu />

        <div className="flex flex-1 flex-col overflow-hidden">
          <MainNavigation />

          <div className="flex-1 overflow-hidden">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
