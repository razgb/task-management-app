import { SearchIcon } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex h-12 w-full max-w-[600px] items-center gap-2 overflow-hidden rounded-full bg-secondaryBgWeak pl-4 transition-colors hover:bg-secondaryBg">
      <SearchIcon size={22} className="stroke-iconStroke" />
      <input
        placeholder="Search tasks"
        type="text"
        className="h-full w-full bg-transparent text-text outline-none placeholder:text-textPlaceholder"
      />
    </div>
  );
}
