import React from "react";
import { ChevronLeft } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import ActiveCustomerIcon from "@/components/ui/icons/ActiveCustomerIcon";

interface CreateMerchantProps {
  open: boolean;
  onClose: () => void;
}

const CreateMerchantSheet: React.FC<CreateMerchantProps> = ({
  open,
  onClose,
}) => {
  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className=" py-[80px]">
          <button
            onClick={onClose}
            className=" flex gap-x-2 text-primary-greytext items-center text-sm"
          >
            <ChevronLeft className=" w-4 h-4" />
            Back
          </button>
          <div className=" mt-[50px] flex">
            <span className=" p-3 rounded-full bg-[#EDF6FF] flex">
              <ActiveCustomerIcon />
            </span>
          </div>
          <p className=" mt-[14px] text-lg text-primary-black">New merchant</p>
          <p className=" font-light text-primary-greytext mt-2">
            This can be your supplier or manufacturer
          </p>
          <form className=" w-full mt-[30px] flex flex-col gap-y-4 ">
            <div className=" flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="merchantname">
                Merchant name
              </label>
              <input
                type="text"
                name="merchantname"
                id="merchantname"
                placeholder="Merchant name"
                className=" w-full border p-[10px] focus:outline-none rounded-lg text-sm border-gray-200"
              />
            </div>
            <div className=" flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="email">
                Merchant email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email address"
                className=" w-full border p-[10px] focus:outline-none rounded-lg text-sm border-gray-200"
              />
            </div>
            <button
              onClick={onClose}
              className=" bg-primary-blue text-white rounded-[10px] py-[10px] mt-[15px]"
            >
              Save merchant
            </button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CreateMerchantSheet;
