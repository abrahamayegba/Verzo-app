import React from "react";
import AllInvoicesList from "@/components/Allinvoices";
import { ArrowLeft, ListFilter, PlusCircle } from "lucide-react";
import Link from "next/link";
import FilterDataDropdown from "@/components/FilterDataDropdown";
import AllPurchaseList from "@/components/AllPurchaseList";

const AllPurchases = () => {
  return (
    <div className=" px-[52px] bg-primary-whiteTint pt-[47px] pb-[20px] gap-y-[30px] flex flex-col">
      <div className=" flex flex-row justify-between items-center">
        <div className=" flex flex-col gap-y-5">
          <Link href="/dashboard/purchases">
            <button className=" flex flex-row gap-x-2 text-primary-greytext items-center">
              <ArrowLeft className=" w-4 h-4" /> Back to purchases
            </button>
          </Link>
          <p className=" text-primary-black text-2xl">Complete purchase list</p>
        </div>
        <div className=" flex gap-x-[14px] max-h-[48px]">
          <FilterDataDropdown />
          <button className=" px-6 py-3 rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white">
            Create purchases
            <PlusCircle className=" w-5 h-5" />
          </button>
        </div>
      </div>
      <AllPurchaseList />
    </div>
  );
};

export default AllPurchases;