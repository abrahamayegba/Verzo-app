import { X } from "lucide-react";
import React from "react";

interface Bannerprops {
  onClose: () => void;
}

const Banner: React.FC<Bannerprops> = ({ onClose }) => {
  return (
    <div className=" h-[50px] purplegradient flex w-full items-center px-[54px]">
      <div
        id="discountBanner"
        className="flex items-center text-white font-normal justify-between w-full"
        onClick={onClose}
      >
        <div className=" flex flex-row gap-x-[60px]">
          <p>Verzo Plus plan will renew in 21 days</p>
          <span className="underline underline-offset-[3px] cursor-pointer">
            Update billing
          </span>
        </div>
        <X className=" w-4 h-4 text-white cursor-pointer hidden md:block " />
      </div>
    </div>
  );
};

export default Banner;
