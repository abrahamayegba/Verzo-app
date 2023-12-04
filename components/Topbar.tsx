import React from "react";
import Verzologoblue from "./ui/icons/Verzologoblue";
import NotificationsDropdown from "./NotificationsDropdown";
import { Search } from "lucide-react";
import TopbarDropdown from "./TopbarDropdown";

const Topbar = () => {
  return (
    <header className=" bg-white text-blue-100 fixed flex items-center w-full top-0 z-[100] h-[80px] border border-[#f4f4f4]">
      <nav className=" flex px-9 items-center justify-between w-full">
        <div className=" flex flex-row items-center gap-x-[60px]">
          <Verzologoblue />
          <form className="relative flex flex-1 mt-1" action="#" method="GET">
            <label htmlFor="search-field" className="sr-only">
              Search
            </label>
            <Search
              className="pointer-events-none absolute ml-2 inset-y-0 left-0 h-full w-5 text-gray-400"
              aria-hidden="true"
            />
            <input
              id="search-field"
              className="block h-full w-[400px] rounded border-0 focus:outline-none py-3 pl-9 pr-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
              placeholder="Search..."
              type="search"
              name="search"
            />
          </form>
        </div>
        <div className="ml-4 flex items-center md:ml-6 gap-x-[20px]">
          <NotificationsDropdown />
          <TopbarDropdown />
        </div>
      </nav>
    </header>
  );
};

export default Topbar;
