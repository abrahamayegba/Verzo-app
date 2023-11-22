import React from "react";
import { ChevronLeft } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import PersonalInformationIcon from "@/components/ui/icons/PersonalInformationIcon";
import PasswordIcon from "@/components/ui/icons/PasswordIcon";

interface SecurityProps {
  open: boolean;
  onClose: () => void;
}

const SecuritySheet: React.FC<SecurityProps> = ({ open, onClose }) => {
  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className=" py-[100px]">
          <button
            onClick={onClose}
            className=" flex gap-x-2 text-primary-greytext items-center text-sm"
          >
            <ChevronLeft className=" w-4 h-4" />
            Back
          </button>
          <div className=" mt-[40px] flex">
            <span className=" p-3 rounded-full bg-[#EDF6FF] flex">
              <PasswordIcon />
            </span>
          </div>
          <p className=" mt-[14px] text-lg text-primary-black">Password</p>
          <p className=" font-light text-primary-greytext mt-2">
            Update password
          </p>
          <form className=" w-full mt-[30px] flex flex-col gap-y-5 ">
            <div className=" flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="oldpassword">
                Old password
              </label>
              <input
                type="password"
                name="oldpassword"
                id="oldpassword"
                placeholder="Enter current password"
                className=" w-full border p-[10px] focus:outline-none rounded-lg text-sm border-gray-200"
              />
            </div>
            <div className=" flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="password">
                New password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="8+ characters"
                className=" w-full border p-[10px] focus:outline-none rounded-lg text-sm border-gray-200"
              />
            </div>
            <div className=" flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="newpassword">
                Confirm password
              </label>
              <input
                type="password"
                name="newpassword"
                id="newpassword"
                placeholder="8+ characters"
                className=" w-full border p-[10px] focus:outline-none rounded-lg text-sm border-gray-200"
              />
            </div>
            <button
              onClick={onClose}
              className=" bg-primary-blue text-white rounded-[10px] py-[10px] mt-[15px]"
            >
              Update password
            </button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SecuritySheet;
