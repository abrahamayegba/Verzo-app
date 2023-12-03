import React from "react";
import { ChevronLeft } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import ActiveBankIcon from "@/components/ui/icons/ActiveBankIcon";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreateBusinessProps {
  open: boolean;
  onClose: () => void;
}

const CreateBusinessSheet: React.FC<CreateBusinessProps> = ({
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
              <ActiveBankIcon />
            </span>
          </div>
          <p className=" mt-[14px] text-lg text-primary-black">
            Business profile
          </p>
          <p className=" font-light text-primary-greytext mt-2">
            Complete all input fields
          </p>
          <form className=" w-full mt-[30px] flex flex-col gap-y-4 ">
            <div className=" flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="businessname">
                Name
              </label>
              <input
                type="text"
                name="businessname"
                id="businessname"
                placeholder="Business name"
                className=" w-full border p-[8px] pl-3 focus:outline-none rounded-lg text-sm border-gray-200"
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
                placeholder="Business email"
                className=" w-full border p-[8px] pl-3 focus:outline-none rounded-lg text-sm border-gray-200"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="category">
                Category
              </label>
              <Select>
                <SelectTrigger className="border border-gray-200 bg-transparent rounded-lg h-10 text-sm focus:outline-none px-3 py-2">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-white w-full z-[200] shadow-sm text-gray-800">
                  <SelectGroup>
                    <SelectItem
                      className="hover:bg-gray-100 cursor-pointer py-2 text-base"
                      value="service a"
                    >
                      Category A
                    </SelectItem>
                    <SelectItem
                      className="hover:bg-gray-100 cursor-pointer py-2 text-base"
                      value="service b"
                    >
                      Category B
                    </SelectItem>
                    <SelectItem
                      className="hover:bg-gray-100 cursor-pointer py-2 text-base"
                      value="service c"
                    >
                      Category C
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
                className=" w-full border p-[8px] pl-3 focus:outline-none rounded-lg text-sm border-gray-200"
              />
            </div>
            <button
              onClick={onClose}
              className=" bg-primary-blue text-white rounded-[10px] py-[10px] mt-[15px]"
            >
              Set up business
            </button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CreateBusinessSheet;
