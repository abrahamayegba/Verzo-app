"use client";
import React, { useState } from "react";
import AuthSidebar from "@/components/AuthSidebar";
import { Eye, EyeOff } from "lucide-react";
import GoogleIcon from "@/components/ui/icons/GoogleIcon";
import Link from "next/link";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className=" w-full flex flex-row h-screen">
      <AuthSidebar />
      <div className=" flex-1 ml-[34%] h-full pt-[50px]">
        <div className=" w-full flex justify-end items-center gap-x-9 pl-[140px] pr-[60px]">
          <p className=" text-primary-greytext text-lg">
            Don’t have an account?
          </p>
          <button className="rounded-[10px] text-primary-black flex text-lg justify-center px-8 py-[9px] items-center border border-primary-border">
            Sign up
          </button>
        </div>
        <div className=" flex flex-col pl-[140px] pr-[60px] mt-[30px]">
          <div className=" flex flex-col gap-y-2">
            <p className=" text-primary-black text-[32px]">Sign in to Verzo</p>
            <p className=" text-primary-greytext text-lg">Welcome back</p>
          </div>
          <form className=" flex flex-col mt-[30px] gap-y-5">
            <div className=" flex flex-col gap-y-2">
              <label className=" text-primary-black" htmlFor="email">
                Email address
              </label>
              <input
                type="email"
                name="email"
                className="max-w-[400px] px-3 py-[10px] border-gray-300 rounded-[8px] border focus:outline-none "
                placeholder="e.g john@mail.com"
              />
            </div>
            <div className=" flex flex-col  gap-y-2">
              <label className=" text-primary-black " htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="max-w-[400px] px-3 py-[10px] relative border-gray-300 rounded-[8px] border focus:outline-none "
                placeholder="8+ characters"
              />
              <p className="text-base text-primary-black mt-4">
                Forgot password?{" "}
                <Link
                  href="/auth/resetpassword"
                  className="text-primary-blue underline underline-offset-4 ml-[2px]"
                >
                  Reset here
                </Link>
              </p>
              <span
                onClick={togglePasswordVisibility}
                className="absolute cursor-pointer mt-[48px] ml-[360px]"
              >
                {showPassword ? (
                  <Eye className=" w-4 h-4 text-primary-greytext" />
                ) : (
                  <EyeOff className=" w-4 h-4 text-primary-greytext" />
                )}
              </span>
            </div>
            <div className=" flex flex-col mt-1">
              <button className=" rounded-[10px] px-[100px] max-w-[400px] py-[10px]  text-white bg-primary-blue text-lg flex items-center justify-center">
                Sign in
              </button>
              <div className="flex space-x-[11px] py-6 items-center">
                <hr className="w-[182px] h-[1px] bg-primary-borderGrey" />
                <span className="text-sm text-primary-greytext">Or</span>
                <hr className="w-[182px] h-[1px] bg-primary-borderGrey" />
              </div>
              <button className="w-[400px] py-[10px] rounded-[10px] border  border-gray-300 bg-white text-lg flex items-center justify-center gap-x-3">
                <GoogleIcon />
                Sign in with Google
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className=" border-t border-t-gray-100 bg-white w-full flex z-[15] absolute bottom-0 pl-[34%]">
        <p className=" py-6 text-[15px] pl-[140px] text-primary-greytext">
          By using the platform you agree to{" "}
          <span className=" text-primary-blue cursor-pointer text-[15px] ml-1 underline underline-offset-4">
            Verzo’s Privacy Policy
          </span>{" "}
          and
          <span className=" text-primary-blue cursor-pointer text-[15px] ml-1 underline underline-offset-4">
            Terms of Use
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
