import React from "react";
import Verzologoblue from "./ui/icons/Verzologoblue";
import NotificationsDropdown from "./NotificationsDropdown";
import TopbarDropdown from "./TopbarDropdown";
import SearchBar from "./Search";

const Topbar = () => {
  return (
    <header className=" bg-white text-blue-100 fixed flex items-center w-full top-0 z-[100] h-[80px] border border-[#f4f4f4]">
      <nav className=" flex px-9 items-center justify-between w-full">
        <div className=" flex flex-row items-center gap-x-[60px]">
          <Verzologoblue />
          <SearchBar />
        </div>
        <div className=" flex items-center gap-x-[20px]">
          <NotificationsDropdown />
          <TopbarDropdown />
        </div>
      </nav>
    </header>
  );
};

export default Topbar;
