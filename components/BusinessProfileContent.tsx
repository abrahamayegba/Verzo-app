import React from "react";

const BusinessProfileContent = () => {
  return (
    <div className=" flex flex-col w-full pt-[20px] gap-y-3">
      <p className=" text-sm text-primary-greytext px-6">Manage business</p>
      <div className=" bg-white min-h-[276px] flex flex-col rounded-b-[16px] w-full">
        <div className=" flex flex-row justify-between p-6 items-center border-b border-b-gray-100">
          <div className=" flex flex-col gap-y-[6px]">
            <p className=" text-primary-black">Business information</p>
            <p className=" text-sm text-primary-greytext">
              Logo, name, email address, category, phone number
            </p>
          </div>
          <button className=" px-6 py-3 rounded-[10px] flex text-sm text-primary-black gap-x-2 items-center justify-center border border-primary-border">
            Update
          </button>
        </div>
        <div className=" flex flex-row justify-between p-6 items-center border-b border-b-gray-100">
          <div className=" flex flex-col gap-y-[6px]">
            <p className=" text-primary-black">Expense categories</p>
            <p className=" text-sm text-primary-greytext">Create or delete</p>
          </div>
          <button className=" px-6 py-3 rounded-[10px] text-sm text-primary-black flex gap-x-2 items-center justify-center border border-primary-border">
            Update
          </button>
        </div>
        <div className=" flex flex-row justify-between p-6 items-center border-b border-b-gray-100">
          <div className=" flex flex-col gap-y-[6px]">
            <p className=" text-primary-black">Report</p>
            <p className=" text-sm text-primary-greytext">
              Download your business activity
            </p>
          </div>
          <button className=" px-6 py-3 rounded-[10px] text-sm text-primary-black flex gap-x-2 items-center justify-center border border-primary-border">
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfileContent;
