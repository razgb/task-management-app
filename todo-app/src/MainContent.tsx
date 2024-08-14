import Menu from "./layouts/Menu";
import MainNavigation from "./layouts/MainNavigation";
import Outlet from "./layouts/Outlet";
import useTheme from "./stores/timer/useTheme";
import LoadingWave from "./components/shared/LoadingWave";
import Modal from "./components/modal/Modal";

export default function MainContent() {
  const { theme } = useTheme();

  return (
    <div
      className={`${theme} relative flex h-screen flex-col overflow-hidden bg-primaryBg`}
    >
      <LoadingWave />

      <Modal />

      <div
        className={`3xl:max-w-[85dvw] mx-auto flex w-full flex-1 gap-6 overflow-hidden bg-primaryBg p-6 text-text`}
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
