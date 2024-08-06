import logo from "../assets/logo.jpg";
import NavTimerWidget from "../components/main-navigation/NavTimerWidget";
import SearchBar from "../components/main-navigation/SearchBar";
import useFontSize from "../stores/accessibility/useFontSize";

export default function MainNavigation() {
  const fontSizes = useFontSize();
  return (
    <div className="flex items-center gap-4 py-6">
      <div className="flex flex-shrink-0 items-center justify-center gap-2 self-start">
        <img className="h-16 w-16 rounded-md" src={logo} alt="logo" />
        {/* I may change this in the future to an image only. */}
        <h1
          style={{ fontSize: `${fontSizes["2xl"]}px` }}
        className="text-2xl font-bold text-heading"
        >
          TaskBuddy
        </h1>
      </div>
      <SearchBar />
      <NavTimerWidget />
    </div>
  );
}
