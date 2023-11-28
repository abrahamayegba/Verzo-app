import React from "react";
import { ChevronLeft } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import ActiveProductIcon from "@/components/ui/icons/ActiveProductIcon";

interface CreateProductProps {
  open: boolean;
  onClose: () => void;
}

const CreateProductSheet: React.FC<CreateProductProps> = ({
  open,
  onClose,
}) => {
  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className=" py-[60px]">
          <button
            onClick={onClose}
            className=" flex gap-x-2 text-primary-greytext items-center text-sm"
          >
            <ChevronLeft className=" w-4 h-4" />
            Back
          </button>
          <div className=" mt-[30px] flex">
            <span className=" p-3 rounded-full bg-[#EDF6FF] flex">
              <ActiveProductIcon />
            </span>
          </div>
          <p className=" mt-[14px] text-lg text-primary-black">New product</p>
          <p className=" font-light text-primary-greytext mt-2">
            Enter the product details
          </p>
          <form className=" gap-y-4 flex flex-col mt-6">
            <div className=" flex flex-col gap-y-1">
              <label htmlFor="productname">Product name</label>
              <input
                className=" w-full rounded-lg border border-gray-200 p-[8px] pl-3 text-[15px] focus:outline-none"
                type="text"
                placeholder="Product name"
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
              <label htmlFor="basicunit">Basic unit</label>
              <input
                className=" w-full rounded-lg border border-gray-200 p-[8px] pl-3 text-[15px] focus:outline-none"
                type="number"
                placeholder="1"
                min={1}
              />
            </div>
            <div className=" flex flex-col gap-y-1">
              <label htmlFor="productunit">Product unit</label>
              <input
                className=" w-full rounded-lg border border-gray-200 p-[8px] pl-3 text-[15px] focus:outline-none"
                type="text"
                placeholder="Product unit"
              />
            </div>
            <button
              onClick={onClose}
              className=" bg-primary-blue text-white rounded-[10px] py-[10px] mt-[15px]"
            >
              Create product
            </button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CreateProductSheet;
