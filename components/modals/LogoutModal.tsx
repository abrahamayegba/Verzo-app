import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Logout from "../ui/icons/Logout";
import { useLogOutMutation } from "@/src/generated/graphql";
import { clearToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

interface LogoutProps {
  open: boolean;
  openModal: () => void;
  onClose: () => void;
}
const LogoutModal: React.FC<LogoutProps> = ({ open, openModal, onClose }) => {
  const router = useRouter();
  const [logOutMutation, { loading }] = useLogOutMutation();
  const handleLogout = async () => {
    try {
      await logOutMutation();
      clearToken();
      localStorage.removeItem("businessId");
      router.push("/auth/signin");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[110]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-400"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-400 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-400"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform gap-y-3 overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow transition-all sm:w-full sm:max-w-[450px] sm:p-9">
                <div className=" flex flex-col gap-y-3">
                  <div className=" flex">
                    <span className=" rounded-full p-3 bg-[#FFF1F1] flex">
                      <Logout />
                    </span>
                  </div>
                  <p className=" text-lg text-[#121212]">Log out?</p>
                  <p className=" text-primary-greytext">
                    Are you sure you want to logout?
                  </p>
                  <div className=" flex justify-between mt-6">
                    <button
                      onClick={onClose}
                      className=" px-7 py-[10px] rounded-[10px] flex gap-x-2 items-center justify-center border border-primary-border text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleLogout()}
                      disabled={loading}
                      className={`px-7 py-[10px] rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-red text-white ${
                        loading ? " opacity-50" : ""
                      }`}
                    >
                      {loading ? "Loading" : "Log out"}
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default LogoutModal;
