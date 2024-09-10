import Menu from "./layouts/Menu";
import Outlet from "./layouts/Outlet";
import useTheme from "./stores/theme/useTheme";
import LoadingWave from "@/shared-components/LoadingWave";
import Modal from "@/pages/outlet/components/modal/Modal";

export default function MainContent() {
  const { theme } = useTheme();

  return (
    <div
      className={`${theme} relative flex h-screen flex-col overflow-hidden bg-primaryBg`}
    >
      <LoadingWave />
      <Modal />

      <div
        className={`3xl:max-w-[85dvw] mx-auto flex w-full flex-1 gap-6 overflow-hidden bg-primaryBg px-8 pb-8 pt-4 text-text`}
      >
        <Menu />

        <div className="flex flex-1 flex-col overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
