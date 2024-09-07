import logo from "../assets/logo.jpg";
import NavTimerWidget from "@/pages/outlet/components/main-nav/NavTimerWidget";
import SearchBar from "@/pages/outlet/components/main-nav/SearchBar";
import useAccessibility from "../stores/accessibility/useAccessibility";

export default function MainNavigation() {
  const { accessibility } = useAccessibility();
  const { fontSizeMap, removeRoundEdges } = accessibility;

  return (
    <div
      style={{
        borderRadius: removeRoundEdges ? "0" : "",
      }}
      className={`mb-4 rounded-3xl bg-secondary-400 p-2`}
    >
      <div
        style={{
          borderRadius: removeRoundEdges ? "0" : "",
        }}
        className={`flex items-center gap-4 rounded-2xl bg-primaryBg p-4`}
      >
        <div className="flex flex-shrink-0 items-center justify-center gap-2 self-start">
          <img className="h-12 w-12 rounded-md" src={logo} alt="logo" />
          {/* I may change this in the future to an image only. */}
          <h1
            style={{
              fontSize: `${fontSizeMap["xl"]}px`,
            }}
            className="font-bold text-heading"
          >
            TaskBuddy
          </h1>
        </div>

        <SearchBar />

        <NavTimerWidget />
      </div>
    </div>
  );
}
