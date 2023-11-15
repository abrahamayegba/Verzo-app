"use client";
import React from "react";
import InvoiceList from "@/components/InvoiceList";
import InvoiceMetrics from "@/components/InvoiceMetrics";
import { ListFilter, PlusCircle } from "lucide-react";

const Invoices = () => {
  return (
    <div className=" px-[52px] bg-primary-whiteTint pt-[47px] pb-[20px] gap-y-[36px] flex flex-col">
      <div className=" flex flex-row justify-between items-center">
        <div className=" flex flex-col  gap-y-2">
          <p className=" text-primary-black font-medium text-3xl">Invoices</p>
          <p className=" text-primary-greytext">
            Create and manage your invoices
          </p>
        </div>
        <div className=" flex gap-x-[14px] max-h-[48px]">
          {/* <FilterDropdown /> */}
          <button className=" px-6 py-3 rounded-[10px] flex gap-x-2 items-center justify-center border border-primary-border">
            Filter
            <ListFilter className=" w-5 h-5" />
          </button>
          <button className=" px-6 py-3 rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white">
            Create invoice
            <PlusCircle className=" w-5 h-5" />
          </button>
        </div>
      </div>
      <InvoiceMetrics />
      <InvoiceList />
    </div>
  );
};

export default Invoices;
