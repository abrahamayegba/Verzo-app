import React from "react";
import { ChevronLeft } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import PlusIcon from "@/components/ui/icons/PlusIcon";

interface CreateCategoryProps {
  open: boolean;
  onClose: () => void;
}

const CreateCategorySheet: React.FC<CreateCategoryProps> = ({
  open,
  onClose,
}) => {
  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className=" pt-[80px]">
          <button
            onClick={onClose}
            className=" flex gap-x-2 text-primary-greytext items-center text-sm"
          >
            <ChevronLeft className=" w-4 h-4" />
            Back
          </button>
          <div className=" mt-[60px] flex">
            <span className=" p-3 rounded-full bg-[#EDF6FF] flex">
              <PlusIcon />
            </span>
          </div>
          <p className=" mt-[14px] text-lg text-primary-black"> New category</p>
          <p className="font-light text-primary-greytext mt-2">
            Enter the category details
          </p>
          <div className=" w-full mt-[30px] flex flex-col gap-y-6">
            <form className=" gap-y-4 flex flex-col mb-3">
              <div className=" flex flex-col gap-y-2">
                <label htmlFor="servicename">Category name</label>
                <input
                  className=" w-full rounded-lg border border-gray-200 p-[10px] text-[15px] focus:outline-none"
                  type="text"
                  placeholder="Category name"
                />
              </div>

              <button
                onClick={onClose}
                className=" bg-primary-blue text-white rounded-[10px] py-[10px] mt-[15px]"
              >
                Save category
              </button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CreateCategorySheet;
