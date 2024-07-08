import logo from "../assets/logo.jpg";
import ActionButtons from "../components/main-navigation/ActionButtons";
import SearchBar from "../components/main-navigation/SearchBar";

export default function MainNavigation() {
  return (
    <div className="min-h-16 flex gap-4 items-center justify-between p-4">
      <picture className="flex gap-2 items-center justify-center flex-shrink-0">
        <img className="w-16 h-16 rounded-md" src={logo} alt="logo" />
        <h1 className="text-2xl font-bold">Tasks App</h1>
      </picture>

      <SearchBar />

      <ActionButtons />
    </div>
  );
}
