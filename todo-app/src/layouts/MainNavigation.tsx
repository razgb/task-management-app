import logo from "../assets/logo.jpg";

import ActionButtons from "../components/main-navigation/ActionButtons";
import SearchBar from "../components/main-navigation/SearchBar";

export default function MainNavigation() {
  return (
    <div className="flex items-center justify-between gap-4 p-4">
      <picture className="flex flex-shrink-0 items-center justify-center gap-2">
        <img className="h-16 w-16 rounded-md" src={logo} alt="logo" />
        <h1 className="text-2xl font-bold text-heading">TaskBuddy</h1>
      </picture>

      <SearchBar />

      <ActionButtons />
    </div>
  );
}
