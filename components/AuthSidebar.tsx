import React from "react";
import LogoIcon from "./ui/icons/LogoWhite";
import Image from "next/image";

const AuthSidebar = () => {
  return (
    <div className=" w-[34%] purplegradient fixed z-20 inset-y-0 h-screen pt-[45px] px-[50px] pb-[100px] flex flex-col justify-between">
      <LogoIcon />
      <p className=" text-white text-[32px] leading-[44px]">
        Manage business <br /> activity in one place
      </p>
      <div className=" w-full rounded-[20px] p-6 bg-white">
        <Image
          src="/Img2.jpeg"
          alt=""
          width={60}
          height={60}
          className="rounded-full object-cover w-[60px] h-[60px]"
        />
        <div className="pt-6 flex flex-col gap-y-6">
          <p className=" font-light text-primary-greytext text-base xl:text-lg tracking-[-0.3px]">
            With precise expense tracking, you’ll gain a crystal-clear view of
            your financial health. Identify cost-saving opportunities and ensure
            your business stays profitable
          </p>
          <p className=" font-normal text-lg xl:text-[20px] text-primary-black">
            Katy Doe{" "}
            <span className=" text-primary-mainGrey">
              {" "}
              | CEO - Squared hairs
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthSidebar;
