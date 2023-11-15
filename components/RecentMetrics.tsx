import React from "react";
import RecentInvoices from "./RecentInvoices";
import RecentExpenses from "./RecentExpenses";
import RecentProducts from "./RecentProducts";
import RecentMetricEmptyState from "./emptystates/RecentMetricEmptyState";
import ActiveCustomerIcon from "./ui/icons/ActiveCustomerIcon";

const RecentMetrics = () => {
  return (
    <div className=" w-full grid grid-cols-2 grid-rows-2 gap-x-6 gap-y-[49px] mt-4">
      <RecentInvoices />
      <RecentExpenses />
      {/* <RecentCustomers /> */}
      <RecentMetricEmptyState
        name="Customers"
        icon={<ActiveCustomerIcon />}
        emptytext="No customers added"
      />
      <RecentProducts />
    </div>
  );
};

export default RecentMetrics;
