import { X } from "lucide-react";
import React from "react";

interface Bannerprops {
  onClose: () => void;
}

const Banner: React.FC<Bannerprops> = ({ onClose }) => {
  return (
    <div className=" h-[50px] purplegradient flex w-full items-center px-[60px]">
      <div
        id="discountBanner"
        className="flex items-center text-white font-normal justify-between w-full"
      >
        <div className=" flex flex-row gap-x-[50px]">
          <p>
            Verzo Free plan expires in 30 days. Upgrade to continue using Verzo.
          </p>
          <span className="underline underline-offset-[3px] cursor-pointer">
            Update billing
          </span>
        </div>
        <X
          onClick={onClose}
          className=" w-4 h-4 text-white cursor-pointer hidden md:block "
        />
      </div>
    </div>
  );
};

export default Banner;
