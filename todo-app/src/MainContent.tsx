import Menu from "./layouts/Menu";
import MainNavigation from "./layouts/MainNavigation";
import Outlet from "./layouts/Outlet";
import useTheme from "./stores/timer/useTheme";
import LoadingWave from "./components/shared/LoadingWave";
import Modal from "./components/modal/Modal";
import useModal from "./stores/modal/useModal";

export default function MainContent() {
  const { theme } = useTheme();
  const { modalType } = useModal();

  // <Modal />
  return (
    <div
      className={`${theme} relative flex h-screen flex-col overflow-hidden bg-primaryBg`}
    >
      <LoadingWave />

      <div
        className={`3xl:max-w-[85dvw] mx-auto flex w-full flex-1 gap-4 overflow-hidden bg-primaryBg p-4 text-text`}
      >
        <Menu />

        <div className="flex flex-1 flex-col overflow-hidden">
          {modalType ? <Modal /> : <MainNavigation />}

          <div className="flex-1 overflow-hidden">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
