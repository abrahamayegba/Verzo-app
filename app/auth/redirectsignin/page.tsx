import Verzologoblue2 from "@/components/ui/icons/Verzologoblue2";
import Link from "next/link";
import React from "react";

const RedirectSignin = () => {
  return (
    <div>
      <div className="mx-auto flex h-screen min-h-full w-full max-w-xl flex-col justify-center py-12 font-Inter sm:px-6 lg:px-8">
        <div className="space-y-3">
          <div className="space-y-3 sm:w-full flex items-center flex-col">
            <Verzologoblue2 />
            <h2 className=" text-center text-2xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <div className=" px-[25px] sm:w-full">
            <div className="h-auto bg-white px-4 pt-[10px] sm:rounded-lg sm:px-10">
              <form className="space-y-6">
                <div className=" h-[70px]">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-[#1e293b]"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      required
                      className={`block h-[40px] w-full appearance-none rounded-md border border-gray-100 bg-gray-50 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-verzoblue sm:text-sm `}
                    />
                  </div>
                </div>
                <div className=" mt-[24px] h-[70px]">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-[#1e293b]"
                  >
                    Password
                  </label>
                  <div className="relative mt-1 flex flex-col">
                    <input
                      required
                      className={`block h-[40px] w-full appearance-none rounded-md border border-gray-100 bg-gray-50 px-3 py-2 placeholder-gray-400 focus:outline-none  sm:text-sm`}
                    />
                  </div>
                </div>
                <div className="mt-[20px] flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-200 text-primary-verzoblue focus:outline-none focus:ring-primary-verzoblue"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm font-medium text-primary-verzoblue hover:text-primary-verzobluehover">
                    <Link href="/forgotPassword">Forgot your password?</Link>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="mt-[24px] flex h-[45px] w-full items-center justify-center rounded-md border border-transparent bg-primary-blue px-4 py-2 text-[16px] font-semibold text-white shadow-sm hover:bg-primary-verzobluehover focus:outline-none"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
            <div className="mt-2 flex items-center justify-center p-4 pt-2">
              <p className="text-center text-sm text-gray-500">
                Don&apos;t have an account?{" "}
                <a
                  href="/signup"
                  className="font-medium text-primary-verzoblue transition duration-100 hover:text-primary-verzobluehover active:text-primary-verzoblue"
                >
                  Register
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedirectSignin;
