import React from "react";
import { ChevronLeft } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import ActiveServiceIcon from "@/components/ui/icons/ActiveServiceIcon";

interface CreateServiceProps {
  open: boolean;
  onClose: () => void;
}

const CreateServiceSheet: React.FC<CreateServiceProps> = ({
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
          <div className=" mt-[40px] flex">
            <span className=" p-3 rounded-full bg-[#EDF6FF] flex">
              <ActiveServiceIcon />
            </span>
          </div>
          <p className=" mt-[14px] text-lg text-primary-black">New service</p>
          <p className=" font-light text-primary-greytext mt-2">
            Enter the service details
          </p>
          <form className=" gap-y-4 flex flex-col mt-6">
            <div className=" flex flex-col gap-y-1">
              <label htmlFor="servicename">Service name</label>
              <input
                className=" w-full rounded-lg border border-gray-200 p-[8px] pl-3 text-[15px] focus:outline-none"
                type="text"
                placeholder="Service name"
              />
            </div>
            <div className=" flex flex-col gap-y-1">
              <label htmlFor="price">Price</label>
              <input
                className=" w-full rounded-lg border border-gray-200 p-[8px] pl-3 text-[15px] focus:outline-none"
                type="text"
                placeholder="Price"
              />
            </div>
            <div className=" flex flex-col gap-y-1">
              <label htmlFor="serviceunit">Service unit</label>
              <input
                className=" w-full rounded-lg border border-gray-200 p-[8px] pl-3 text-[15px] focus:outline-none"
                type="text"
                placeholder="Service unit"
              />
            </div>
            <button
              onClick={onClose}
              className=" bg-primary-blue text-white rounded-[10px] py-[10px] mt-[15px]"
            >
              Create service
            </button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CreateServiceSheet;
