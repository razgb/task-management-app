import { SearchIcon } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex h-3/5 w-full max-w-[600px] items-center gap-2 overflow-hidden rounded-full bg-secondaryBg pl-4">
      <SearchIcon size={22} className="stroke-iconStroke" />
      <input
        placeholder="Search tasks"
        type="text"
        className="h-full w-full bg-transparent text-text outline-none placeholder:text-stone-400"
      />
    </div>
  );
}
