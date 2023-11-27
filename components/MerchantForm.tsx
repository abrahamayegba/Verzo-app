"use client";
import { Plus } from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface MerchantFormProps {
  openMerchantSheet: () => void;
}

const MerchantForm: React.FC<MerchantFormProps> = ({ openMerchantSheet }) => {
  return (
    <div className=" flex w-full justify-between flex-col gap-y-7">
      <div className=" flex flex-row w-full justify-between">
        <p className=" text-primary-black text-lg">Merchant details</p>
        <button
          onClick={openMerchantSheet}
          className=" text-primary-blue flex items-center gap-x-2"
        >
          Add merchant <Plus className=" w-5 h-5" />
        </button>
      </div>
      <form className=" flex flex-col gap-y-[50px]">
        <div className=" flex flex-row gap-x-6">
          <div className=" flex flex-col gap-y-[6px] w-1/2">
            <label className="" htmlFor="merchant">
              Merchant
            </label>
            <Select>
              <SelectTrigger className=" w-full rounded-lg border border-gray-200">
                <SelectValue
                  className=" text-primary-greytext"
                  placeholder="Select a merchant"
                />
              </SelectTrigger>
              <SelectContent className=" bg-white w-full">
                <SelectGroup>
                  <SelectItem
                    className=" hover:bg-gray-100 cursor-pointer py-2 text-base"
                    value="apple"
                  >
                    Merchant A
                  </SelectItem>
                  <SelectItem
                    className=" hover:bg-gray-100 cursor-pointer py-2 text-base"
                    value="banana"
                  >
                    Merchant B
                  </SelectItem>
                  <SelectItem
                    className=" hover:bg-gray-100 cursor-pointer py-2 text-base"
                    value="blueberry"
                  >
                    Merchant C
                  </SelectItem>
                  <SelectItem
                    className=" hover:bg-gray-100 cursor-pointer py-2 text-base"
                    value="grapes"
                  >
                    Merchant D
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className=" flex flex-col gap-y-[6px] w-1/2">
            <label className="" htmlFor="customer">
              Email address
            </label>
            <input
              className="border border-gray-200 rounded-lg h-10 text-sm focus:outline-none px-3 py-2"
              type="text"
              placeholder="merchantemail@gmail.com"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default MerchantForm;
