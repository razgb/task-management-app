import logo from "../assets/logo.jpg";
import NavTimerWidget from "../components/main-navigation/NavTimerWidget";
import SearchBar from "../components/main-navigation/SearchBar";
import useAccessibility from "../stores/accessibility/useAccessibility";
// import useModal from "../stores/modal/useModal";

export default function MainNavigation() {
  const { accessibility } = useAccessibility();
  const { fontSizeMap } = accessibility;
  // const { openModal } = useModal();

  return (
    <div className={`mb-4 rounded-3xl bg-secondary-400 p-2`}>
      <div className={`flex items-center gap-4 rounded-2xl bg-primaryBg p-4`}>
        <div className="flex flex-shrink-0 items-center justify-center gap-2 self-start">
          <img className="h-12 w-12 rounded-md" src={logo} alt="logo" />
          {/* I may change this in the future to an image only. */}
          <h1
            style={{ fontSize: `${fontSizeMap["xl"]}px` }}
            className="font-bold text-heading"
          >
            TaskBuddy
          </h1>
        </div>

        <SearchBar />

        <NavTimerWidget />

        {/*
        <button
          onClick={() =>
            openModal(
              "success",
              "Welcome to Task Buddy! Account creation successful.",
            )
          }
        >
          open success modal
        </button>

        <button
          onClick={() =>
            openModal(
              "error",
              "There seems to be a connection error, please try again, please try again.",
            )
          }
        >
          open error modal
        </button>
        */}
      </div>
    </div>
  );
}
