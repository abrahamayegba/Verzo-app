"use client";
import React, { useState } from "react";
import UpdateBusinessSheet from "../sheets/settings/businessprofile/UpdateBusinessSheet";
import UpdateBusinessSheet2 from "../sheets/settings/businessprofile/UpdateBusinessSheet2";
import UpdateExpenseCategorySheet from "../sheets/settings/businessprofile/UpdateExpenseCategorySheet";

const BusinessProfileContent = () => {
  const [openUpdateBusinessSheet, setOpenUpdateBusinessSheet] = useState(false);
  const [openUpdateBusinessSheet2, setOpenUpdateBusinessSheet2] =
    useState(false);
  const [openUpdateExpenseCategorySheet, setOpenUpdateExpenseCategorySheet] =
    useState(false);
  const handleCloseUpdateBusinessSheet = () => {
    setOpenUpdateBusinessSheet(false);
  };
  const handleOpenUpdateBusinessSheet = () => {
    setOpenUpdateBusinessSheet(true);
  };
  const handleCloseUpdateBusinessSheet2 = () => {
    setOpenUpdateBusinessSheet2(false);
  };
  const handleOpenUpdateBusinessSheet2 = () => {
    setOpenUpdateBusinessSheet2(true);
  };
  const handleCloseUpdateExpenseCategorySheet = () => {
    setOpenUpdateExpenseCategorySheet(false);
  };
  const handleOpenUpdateExpenseCategorySheet = () => {
    setOpenUpdateExpenseCategorySheet(true);
  };
  return (
    <>
      <div className=" flex flex-col w-full pt-[20px] gap-y-3">
        <p className=" text-sm text-primary-greytext px-6">Manage business</p>
        <div className=" bg-white min-h-[276px] flex flex-col rounded-b-[16px] w-full">
          <div className=" flex flex-row justify-between p-6 items-center border-b border-b-gray-100">
            <div className=" flex flex-col gap-y-[6px]">
              <p className=" text-primary-black">Business information</p>
              <p className=" text-sm text-primary-greytext">
                Logo, Business name, Business email
              </p>
            </div>
            <button
              onClick={() => setOpenUpdateBusinessSheet(true)}
              className=" px-6 py-3 rounded-[10px] flex text-sm text-primary-black gap-x-2 items-center justify-center border border-primary-border"
            >
              Update
            </button>
          </div>
          <div className=" flex flex-row justify-between p-6 items-center border-b border-b-gray-100">
            <div className=" flex flex-col gap-y-[6px]">
              <p className=" text-primary-black">More Business information</p>
              <p className=" text-sm text-primary-greytext">
                Business category
              </p>
            </div>
            <button
              onClick={handleOpenUpdateBusinessSheet2}
              className=" px-6 py-3 rounded-[10px] flex text-sm text-primary-black gap-x-2 items-center justify-center border border-primary-border"
            >
              Update
            </button>
          </div>
          <div className=" flex flex-row justify-between p-6 items-center border-b border-b-gray-100">
            <div className=" flex flex-col gap-y-[6px]">
              <p className=" text-primary-black">Expense categories</p>
              <p className=" text-sm text-primary-greytext">View categories</p>
            </div>
            <button
              onClick={handleOpenUpdateExpenseCategorySheet}
              className=" px-6 py-3 rounded-[10px] text-sm text-primary-black flex gap-x-2 items-center justify-center border border-primary-border"
            >
              View
            </button>
          </div>
          <div className=" flex flex-row justify-between p-6 items-center border-b border-b-gray-100">
            <div className=" flex flex-col gap-y-[6px]">
              <p className=" text-primary-black">Report</p>
              <p className=" text-sm text-primary-greytext">
                Download your business activity
              </p>
            </div>
            <button
              disabled
              className=" px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed text-sm text-primary-black rounded-[10px] flex gap-x-2 items-center justify-center border border-primary-border"
            >
              Download
            </button>
          </div>
        </div>
      </div>
      <UpdateBusinessSheet
        open={openUpdateBusinessSheet}
        onClose={handleCloseUpdateBusinessSheet}
        openSheet={handleOpenUpdateBusinessSheet}
      />
      <UpdateBusinessSheet2
        open={openUpdateBusinessSheet2}
        onClose={handleCloseUpdateBusinessSheet2}
        openSheet={handleOpenUpdateBusinessSheet2}
      />
      <UpdateExpenseCategorySheet
        open={openUpdateExpenseCategorySheet}
        onClose={handleCloseUpdateExpenseCategorySheet}
        openSheet={handleOpenUpdateExpenseCategorySheet}
      />
    </>
  );
};

export default BusinessProfileContent;
