import React from "react";
import RecentInvoices from "./RecentInvoices";
import RecentExpenses from "./Expense/RecentExpenses";
import RecentProducts from "./RecentProducts";
import RecentCustomers from "./RecentCustomers";

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
