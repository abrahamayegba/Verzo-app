"use client";
import { Eye, MoreHorizontal, Pen, Send } from "lucide-react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetSaleByBusinessQuery } from "@/src/generated/graphql";
import RecentMetricEmptyState from "./emptystates/RecentMetricEmptyState";
import RecentInvoiceEmptyIcon from "./ui/icons/RecentInvoiceEmptyIcon";
import localStorage from "local-storage-fallback";
import Link from "next/link";

const RecentInvoices = () => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );

  const businessId = storedBusinessId[0] || "";
  const getSalesByBusiness = useGetSaleByBusinessQuery({
    variables: {
      businessId: businessId,
    },
  });
  const sales =
    getSalesByBusiness.data?.getSaleByBusiness?.salesByBusiness ?? [];
  return (
    <>
      {sales?.length === 0 ? (
        <RecentMetricEmptyState
          name="Invoices"
          icon={<RecentInvoiceEmptyIcon />}
          emptytext="No invoice available"
        />
      ) : (
        <div className=" min-h-[241px] rounded-[16px] flex flex-col border border-gray-100">
          <div className=" flex justify-between items-center py-[14px]  max-h-[50px] px-6 rounded-t-[10px] ">
            <p className=" text-primary-greytext text-sm">Recent Invoices</p>
            <Link href="/dashboard/invoices">
              <button className=" text-primary-blue text-sm tracking-[-0.2px]">
                View all
              </button>
            </Link>
          </div>
          <div className=" flex flex-col bg-white h-full rounded-b-[16px]">
            {sales.slice(0, 3).map((sale, index) => (
              <div
                key={sale?.id}
                className={`min-h-[62px] flex justify-between text-sm items-center px-6 ${
                  index === 2 ? "" : "border-b border-b-gray-100"
                }`}
              >
                <p>#{sale?.reference}</p>
                <p className="text-primary-greytext">
                  {" "}
                  {sale?.transactionDate
                    ? new Date(sale.transactionDate).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )
                    : ""}
                </p>
                {sale?.paid === true ? (
                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    <span className="mr-2 text-green-500">✔</span>
                    Paid
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">
                    <span className="mr-2 text-yellow-500">⌛</span>
                    Pending
                  </span>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger className=" focus:outline-none">
                    <MoreHorizontal className=" text-[#c4c4c4]" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className=" bg-white mt-1 text-primary-greytext shadow1 w-[160px] ml-1">
                    <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2">
                      <Link
                        className=" flex gap-x-2 items-center"
                        href={`/invoice/viewinvoice?invoiceId=${sale?.id}`}
                      >
                        <Eye className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                        View Invoice
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2">
                      <Link
                        className=" flex gap-x-2 items-center"
                        href={`/invoice/editinvoice?invoiceId=${sale?.id}`}
                      >
                        <Pen className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                        Edit Invoice
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RecentInvoices;
