import { ArrowUpIcon, Check, MoreHorizontal } from "lucide-react";
import React from "react";
import RecentInvoices from "./RecentInvoices";
import RecentExpenses from "./RecentExpenses";
import RecentCustomers from "./RecentCustomers";
import RecentProducts from "./RecentProducts";

const RecentMetrics = () => {
  return (
    <div className=" w-full grid grid-cols-2 grid-rows-2 gap-x-6 gap-y-[49px] mt-4">
      <RecentInvoices />
      <RecentExpenses />
      <RecentCustomers />
      <RecentProducts />
    </div>
  );
};

export default RecentMetrics;
