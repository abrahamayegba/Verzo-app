import AllInvoicesList from "@/components/Allinvoices";
import { ArrowLeft, PlusCircle } from "lucide-react";
import React from "react";

const AllInvoices = () => {
  return (
    <div className=" px-[52px] bg-primary-whiteTint pt-[47px] pb-[20px] gap-y-[30px] flex flex-col">
      <div className=" flex flex-row justify-between items-center">
        <div className=" flex flex-col gap-y-5">
          <p className=" flex flex-row gap-x-2 text-primary-greytext items-center">
            <ArrowLeft className=" w-4 h-4" /> Back to invoices
          </p>
          <p className=" text-primary-black text-2xl">Complete invoice list</p>
        </div>
        <div className=" flex gap-x-[14px] max-h-[48px]">
          {/* <FilterDropdown /> */}
          <button className=" px-6 py-3 rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white">
            Create invoice
            <PlusCircle className=" w-5 h-5" />
          </button>
        </div>
      </div>
      <AllInvoicesList />
    </div>
  );
};

export default AllInvoices;
