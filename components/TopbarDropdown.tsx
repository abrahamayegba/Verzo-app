import React, { useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDown, LogOut, Settings, Users } from "lucide-react";
import { Fragment } from "react";
import Link from "next/link";
import LogoutModal from "./modals/LogoutModal";
import useModal from "@/app/hooks/useModal";
import localStorage from "local-storage-fallback";
import { useGetBusinessesByUserIdQuery } from "@/src/generated/graphql";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const TopbarDropdown = () => {
  const {
    isOpen: isLogoutModalOpen,
    openModal: openLogoutModal,
    closeModal: closeLogoutModal,
  } = useModal();
  const getBusinessesByUserId = useGetBusinessesByUserIdQuery();
  const businessName =
    getBusinessesByUserId?.data?.getBusinessesByUserId?.businesses?.[0]
      ?.businessName || "";
  const businessId =
    getBusinessesByUserId.data?.getBusinessesByUserId?.businesses?.map(
      (business) => business?.id
    ) || [];
  localStorage.setItem("businessId", JSON.stringify(businessId));

  const userInfo = {
    name: getBusinessesByUserId?.data?.getBusinessesByUserId?.user?.fullname,
  };
  const userRole = {
    role: getBusinessesByUserId?.data?.getBusinessesByUserId?.user?.role
      ?.roleName,
  };
  const firstLetter = userInfo.name ? userInfo.name.charAt(0) : "";

  const businessFirstLetter = businessName.charAt(0);

  return (
    <>
      <Menu as="div" className="relative ">
        <div>
          <Menu.Button className="relative cursor-pointer flex justify-end items-center rounded-full bg-white text-sm focus:outline-none lg:rounded-md lg:p-2">
            <div className=" flex flex-row gap-x-3 items-center">
              <span className="hidden text-[15px] font-medium capitalize text-gray-700 lg:block">
                {businessName}
              </span>
              <div className=" flex flex-row items-center gap-x-1">
                <span className="rounded-full bg-primary-blue flex w-[30px] h-[30px] items-center justify-center">
                  <span className="text-white uppercase">
                    {businessFirstLetter}
                  </span>
                </span>
                <ChevronDown
                  className=" hidden h-[18px] w-[18px] flex-shrink-0 text-gray-400 lg:block"
                  aria-hidden="true"
                />
              </div>
            </div>
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
          <Menu.Items className="absolute right-0 z-10 mt-2 w-[240px] origin-top-right rounded-md text-primary-greytext bg-white py-1 shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {() => (
                <Link
                  href="/dashboard/settings"
                  className={classNames(
                    "flex flex-row items-center cursor-default gap-x-3 px-4 py-2 text-sm "
                  )}
                >
                  <span className="rounded-full bg-primary-blue flex w-[30px] h-[30px] items-center justify-center">
                    <span className="text-white text-lg">{firstLetter}</span>
                  </span>
                  <div className=" flex flex-col">
                    <p className=" font-medium capitalize text-gray-700 text-[15px]">
                      {userInfo.name}
                    </p>
                    <p>{userRole.role}</p>
                  </div>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }: any) => (
                <Link
                  href="/dashboard/team"
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "flex flex-row items-center gap-x-4 px-4 py-2"
                  )}
                >
                  <Users className=" h-5 w-5" />
                  Team
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }: any) => (
                <Link
                  href="/dashboard/settings"
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "flex flex-row items-center gap-x-4 px-4 py-2 "
                  )}
                >
                  <Settings className=" h-5 w-5" />
                  Settings
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }: any) => (
                <button
                  onClick={openLogoutModal}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    " flex cursor-pointer flex-row w-full items-center gap-x-4 px-4 py-2"
                  )}
                >
                  <LogOut className=" h-5 w-5 rotate-180" />
                  Logout
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
      <LogoutModal
        open={isLogoutModalOpen}
        openModal={openLogoutModal}
        onClose={closeLogoutModal}
      />
    </>
  );
};

export default TopbarDropdown;
