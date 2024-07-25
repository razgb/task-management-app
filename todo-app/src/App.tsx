import Menu from "./layouts/Menu";
import MainNavigation from "./layouts/MainNavigation";
import Outlet from "./layouts/Outlet";
import useTheme from "./stores/useTheme";
import LoadingWave from "./components/shared/LoadingWave";

function App() {
  const { theme } = useTheme();

  return (
    <div className={`${theme} flex h-screen flex-col bg-primaryBg`}>
      <LoadingWave loading={false} />

      <div
        className={`lg: mx-auto flex w-full flex-1 gap-3 overflow-hidden bg-primaryBg p-4 text-text xl:max-w-[1280px] 2xl:max-w-[1400px]`}
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
