import React from "react";
import RecentInvoices from "./RecentInvoices";
import RecentExpenses from "./RecentExpenses";
import RecentProducts from "./RecentProducts";
import RecentMetricEmptyState from "./emptystates/RecentMetricEmptyState";
import RecentInvoiceEmptyIcon from "./ui/icons/RecentCustomerEmptyIcon";

const RecentMetrics = () => {
  return (
    <div className=" w-full grid grid-cols-2 grid-rows-2 gap-x-6 gap-y-[49px] mt-4">
      <RecentInvoices />
      <RecentExpenses />
      {/* <RecentCustomers /> */}
      <RecentMetricEmptyState
        name="Customers"
        icon={<RecentInvoiceEmptyIcon />}
        emptytext="No customers added"
      />
      <RecentProducts />
    </div>
  );
};

export default RecentMetrics;
