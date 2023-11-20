import React from "react";
import { ChevronLeft } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import ActiveCustomerIcon from "@/components/ui/icons/ActiveCustomerIcon";

interface CreateCustomerProps {
  open: boolean;
  onClose: () => void;
}

const CreateCustomerSheet: React.FC<CreateCustomerProps> = ({
  open,
  onClose,
}) => {
  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className=" py-[70px]">
          <button
            onClick={onClose}
            className=" flex gap-x-2 text-primary-greytext items-center text-sm"
          >
            <ChevronLeft className=" w-4 h-4" />
            Back
          </button>
          <div className=" mt-[30px] flex">
            <span className=" p-3 rounded-full bg-[#EDF6FF] flex">
              <ActiveCustomerIcon />
            </span>
          </div>
          <p className=" mt-[14px] text-lg text-primary-black">New customer</p>
          <p className=" font-light text-primary-greytext mt-2">
            Add a new customer to your business
          </p>
          <form className=" w-full mt-[30px] flex flex-col gap-y-4 ">
            <div className=" flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="fullname">
                Full name
              </label>
              <input
                type="text"
                name="fullname"
                id="fullname"
                placeholder="full name"
                className=" w-full border p-[12px] focus:outline-none rounded-lg text-sm border-primary-mainGrey"
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
                className=" w-full border p-[12px] focus:outline-none rounded-lg text-sm border-primary-mainGrey"
              />
            </div>
            <div className=" flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="phone">
                Phone number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="Phone number"
                className=" w-full border p-[12px] focus:outline-none rounded-lg text-sm border-primary-mainGrey"
              />
            </div>
            <div className=" flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="address">
                Customer address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Customer address"
                className=" w-full border p-[12px] focus:outline-none rounded-lg text-sm border-primary-mainGrey"
              />
            </div>
            <button
              onClick={onClose}
              className=" bg-primary-blue text-white rounded-[10px] py-3 mt-[15px]"
            >
              Save customer
            </button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CreateCustomerSheet;
