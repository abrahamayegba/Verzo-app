"use client";
import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import CustomerList from "@/components/CustomerList";
import CreateCustomerSheet from "@/components/sheets/invoice/CreateCustomerSheet";

const Customers = () => {
  const [openCustomerSheet, setOpenCustomerSheet] = useState(false);

  const handleCloseCustomerSheet = () => {
    setOpenCustomerSheet(false);
  };
  return (
    <>
      <div className=" px-[52px] bg-primary-whiteTint pt-[47px] pb-[20px] gap-y-[36px] flex flex-col">
        <div className=" flex flex-row justify-between items-center">
          <div className=" flex flex-col  gap-y-2">
            <p className=" text-primary-black font-medium text-3xl">
              Customers
            </p>
            <p className=" text-primary-greytext">Add and manage customers</p>
          </div>
          <div className=" flex gap-x-[14px] max-h-[48px]">
            <button
              onClick={() => setOpenCustomerSheet(true)}
              className=" px-6 py-3 rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white"
            >
              Add customer
              <PlusCircle className=" w-5 h-5" />
            </button>
          </div>
        </div>
        <CustomerList />
      </div>
      <CreateCustomerSheet
        open={openCustomerSheet}
        onClose={handleCloseCustomerSheet}
      />
    </>
  );
};

export default Customers;
