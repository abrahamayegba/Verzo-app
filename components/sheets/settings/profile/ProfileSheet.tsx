import React from "react";
import { ChevronLeft } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import PersonalInformationIcon from "@/components/ui/icons/PersonalInformationIcon";

interface ProfileProps {
  open: boolean;
  onClose: () => void;
}

const ProfileSheet: React.FC<ProfileProps> = ({ open, onClose }) => {
  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className=" pt-[112px]">
          <button
            onClick={onClose}
            className=" flex gap-x-2 text-primary-greytext items-center text-sm"
          >
            <ChevronLeft className=" w-4 h-4" />
            Back
          </button>
          <div className=" mt-[40px] flex">
            <span className=" p-3 rounded-full bg-[#EDF6FF] flex">
              <PersonalInformationIcon />
            </span>
          </div>
          <p className=" mt-[14px] text-lg text-primary-black">
            Personal information
          </p>
          <p className=" font-light text-primary-greytext mt-2">
            Provide accurate info
          </p>
          <form className=" w-full mt-[30px] flex flex-col gap-y-5 ">
            <div className=" flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="firstname">
                Full name
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="Full name"
                className=" w-full border p-[14px] focus:outline-none rounded-lg text-sm border-primary-mainGrey"
              />
            </div>
            <div className=" flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="email">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email address"
                className=" w-full border p-[14px] focus:outline-none rounded-lg text-sm border-primary-mainGrey"
              />
            </div>
            <button
              onClick={onClose}
              className=" bg-primary-blue text-white rounded-[10px] py-3 mt-[15px]"
            >
              Update profile
            </button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProfileSheet;
