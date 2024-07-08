import { SearchIcon } from "lucide-react";

export default function SearchBar() {
  return (
    <div
      className="max-w-[600px] w-full h-4/5 flex items-center gap-2 bg-secondary-ultralight 
    rounded-full overflow-hidden pl-4"
    >
      <SearchIcon size={22} className="stroke-secondary-dark" />
      <input
        placeholder="Search tasks"
        type="text"
        className="bg-transparent w-full h-full outline-none"
      />
    </div>
  );
}
