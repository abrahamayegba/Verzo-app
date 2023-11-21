"use client";
import React from "react";
import InvoiceList from "@/components/InvoiceList";
import InvoiceMetrics from "@/components/InvoiceMetrics";
import { PlusCircle } from "lucide-react";
import FilterDataDropdown from "@/components/FilterDataDropdown";
import Link from "next/link";

const Invoices = () => {
  // const typesenseHost = process.env.NEXT_PUBLIC_TYPESENSE_HOST;
  // const searchApiKey = process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_API_KEY;

  // console.log("Typesense Host:", typesenseHost);
  // console.log("Search API Key:", searchApiKey);
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
          <FilterDataDropdown />
          <Link href="/invoice/createinvoice">
            <button className=" px-6 py-3 rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white">
              Create invoice
              <PlusCircle className=" w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
      <InvoiceMetrics />
      <InvoiceList />
    </div>
  );
};

export default Invoices;
