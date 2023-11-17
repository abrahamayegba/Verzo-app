"use client";
import React, { useState } from "react";
import AddonSheet from "./sheets/AddonSheet";

const AddonsContent = () => {
  const [openAddonSheet, setOpenAddonSheet] = useState(false);

  const handleCloseAddonSheet = () => {
    setOpenAddonSheet(false);
  };

  return (
    <>
      <div className=" flex flex-col w-full pt-[20px] gap-y-3">
        <p className=" text-sm text-primary-greytext px-6">
          Add more to your subscription
        </p>
        <div className=" bg-white min-h-[185px] flex flex-col rounded-b-[16px] w-full">
          <div className=" flex flex-row justify-between p-6 items-center border-b border-b-gray-100">
            <div className=" flex flex-col gap-y-[6px]">
              <p className=" text-primary-black">Team members</p>
              <p className=" text-sm text-primary-greytext">
                Add more team members to your business
              </p>
            </div>
            <button
              onClick={() => setOpenAddonSheet(true)}
              className=" px-6 py-3 rounded-[10px] flex text-sm text-primary-black gap-x-2 items-center justify-center border border-primary-border"
            >
              Purchase
            </button>
          </div>
          <div className=" flex flex-row justify-between p-6 items-center border-b border-b-gray-100">
            <div className=" flex flex-col gap-y-[6px]">
              <p className=" text-primary-black">Custom sync</p>
              <p className=" text-sm text-primary-greytext">
                Sync account applications
              </p>
            </div>
            <button className=" px-6 py-3 rounded-[10px] text-sm text-primary-black flex gap-x-2 items-center justify-center border border-primary-border">
              Purchase
            </button>
          </div>
          <div className=" flex flex-row justify-between p-6 items-center border-b border-b-gray-100">
            <div className=" flex flex-col gap-y-[6px]">
              <p className=" text-primary-black">Weekly reports</p>
              <p className=" text-sm text-primary-greytext">
                Get detailed insights
              </p>
            </div>
            <button className=" px-6 py-3 rounded-[10px] text-sm text-primary-black flex gap-x-2 items-center justify-center border border-primary-border">
              Purchase
            </button>
          </div>
        </div>
      </div>
      <AddonSheet open={openAddonSheet} onClose={handleCloseAddonSheet} />
    </>
  );
};

export default AddonsContent;
