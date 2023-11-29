import React from "react";
import AuthSidebar from "@/components/AuthSidebar";
import ActiveMailIcon from "@/components/ui/icons/ActiveMailIcon";
import CircleMailIcon from "@/components/ui/icons/CircleMailIcon";

const VerifyEmail = () => {
  return (
    <div className=" w-full flex flex-row h-screen">
      <AuthSidebar />
      <div className=" flex-1 ml-[34%] h-full pt-[60px]">
        <div className=" w-full flex justify-end items-center gap-x-9 pl-[140px] pr-[60px]">
          <p className=" text-primary-greytext text-lg">
            Already have an account?
          </p>
          <button className="rounded-[10px] text-primary-black flex text-lg justify-center px-8 py-[9px] items-center border border-primary-border">
            Sign in
          </button>
        </div>
        <div className=" flex flex-col pt-[150px] gap-y-2 pl-[140px] pr-[60px] mt-[40px]">
          <div className=" flex mb-[30px]">
            <span>
              <CircleMailIcon />
              <ActiveMailIcon />
            </span>
          </div>
          <p className=" text-[32px]">Verify email</p>
          <p className=" text-primary-greytext text-base">
            Click on the link sent to john@*****.com
          </p>
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

export default VerifyEmail;
