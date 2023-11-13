"use client";
import React from "react";
import Verzologoblue from "./ui/icons/Verzologoblue";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDown, LogOut, Search, Settings } from "lucide-react";
import { useState, Fragment } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Topbar = () => {
  const customerName = "John Doe";
  const companyName = "Doe Industries";

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
          <button
            type="button"
            className="relative rounded-full border p-[10px] text-gray-600 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-verzoblue focus:ring-offset-2"
          >
            <span className="absolute -inset-1.5" />
            <span className="sr-only">View notifications</span>
            <span>
              <svg
                width={16}
                height={16}
                fill="none"
                viewBox="0 0 24 24"
                role="none"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M14 3a2 2 0 1 0-4 0v.27a7.482 7.482 0 0 0-5.457 6.636L4.228 14H1v4a3 3 0 0 0 3 3h5.172a3 3 0 0 0 5.656 0H20a3 3 0 0 0 3-3v-4h-3.228l-.315-4.094A7.482 7.482 0 0 0 14 3.27V3Zm-2 2a5.48 5.48 0 0 0-5.463 5.059L6.08 16H3v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2h-3.08l-.457-5.941A5.48 5.48 0 0 0 12 5Z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </button>
          <Menu as="div" className="relative ">
            <div>
              <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none lg:rounded-md lg:p-2 lg:hover:bg-gray-50">
                <div className=" flex flex-col items-start">
                  <span className="hidden text-sm text-primary-greytext lg:block">
                    {customerName}
                  </span>
                  <span className="hidden text-[15px] font-medium capitalize text-gray-700 lg:block">
                    {companyName}
                  </span>
                </div>

                <ChevronDown
                  className="ml-2 hidden h-[18px] w-[18px] flex-shrink-0 text-primary-greytext lg:block"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }: any) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "flex flex-row items-center gap-x-3 px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      <span className=" h-4 w-4">
                        <svg viewBox="0 0 24 24" fill="none">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 2C9.266 2 7.05 4.239 7.05 7s2.216 5 4.95 5 4.95-2.239 4.95-5S14.734 2 12 2ZM9.25 7c0-1.534 1.231-2.778 2.75-2.778S14.75 5.466 14.75 7 13.519 9.778 12 9.778 9.25 8.534 9.25 7ZM22.45 16.038 21.9 17l.55-.962-.003-.002-.004-.003-.014-.008-.049-.027-.175-.097a19.9 19.9 0 0 0-.647-.333 26.119 26.119 0 0 0-2.297-.997c-1.898-.72-4.512-1.46-7.261-1.46-2.712 0-5.3.585-7.191 1.158-.95.288-1.735.576-2.285.793a21.686 21.686 0 0 0-.817.343l-.048.021-.013.006-.004.002-.002.001.46 1.01-.461-1.01-.639.298v1.643c0 .586 0 1.091.034 1.507.035.44.114.877.326 1.297a3.317 3.317 0 0 0 1.442 1.457c.416.214.849.293 1.283.329.412.034.913.034 1.493.034h12.844c.58 0 1.08 0 1.492-.034.435-.036.868-.115 1.284-.33.621-.319 1.126-.829 1.442-1.456.212-.42.29-.857.326-1.297.034-.416.034-.921.034-1.507v-1.018l-.55-.32ZM3.2 17.333v-.15l.126-.051c.504-.2 1.232-.467 2.115-.734 1.776-.539 4.138-1.065 6.559-1.065 2.384 0 4.72.649 6.489 1.318a23.937 23.937 0 0 1 2.31 1.017c0 .457-.005.778-.025 1.034-.025.302-.066.414-.094.47-.105.208-.274.378-.48.485-.055.028-.166.07-.465.094-.311.026-.72.027-1.355.027H5.62c-.634 0-1.044-.001-1.355-.027-.3-.024-.41-.066-.464-.094a1.106 1.106 0 0 1-.481-.486c-.028-.055-.07-.167-.094-.469-.025-.314-.026-.728-.026-1.369Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </span>
                      Your Profile
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }: any) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "flex flex-row items-center gap-x-3 px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      <Settings className=" h-4 w-4" />
                      Settings
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }: any) => (
                    <a
                      // onClick={() => handleLogout()}
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        " flex cursor-pointer flex-row items-center gap-x-3 px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      <LogOut className=" h-4 w-4" />
                      Logout
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </nav>
    </header>
  );
};

export default Topbar;
