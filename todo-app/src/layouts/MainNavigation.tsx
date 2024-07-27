import NavTimerWidget from "../components/main-navigation/NavTimerWidget";
import SearchBar from "../components/main-navigation/SearchBar";

export default function MainNavigation() {
  return (
    <div className="flex items-center gap-4 py-6">
      <SearchBar />
      <NavTimerWidget />
    </div>
  );
}
