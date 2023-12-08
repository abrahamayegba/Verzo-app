import { MoreHorizontal } from "lucide-react";
import React from "react";
import localStorage from "local-storage-fallback";
import { useGetExpensesByBusinessQuery } from "@/src/generated/graphql";
import RecentMetricEmptyState from "./emptystates/RecentMetricEmptyState";
import RecentExpenseEmptyIcon from "./ui/icons/RecentExpenseEmptyIcon";
import Link from "next/link";

const RecentExpenses = () => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const getExpensesByBusiness = useGetExpensesByBusinessQuery({
    variables: {
      businessId: businessId,
    },
  });
  const expenses =
    getExpensesByBusiness.data?.getExpenseByBusiness?.expenseByBusiness ?? [];
  return (
    <>
      {expenses?.length === 0 ? (
        <RecentMetricEmptyState
          name="Expenses"
          icon={<RecentExpenseEmptyIcon />}
          emptytext="No expense recorded"
        />
      ) : (
        <div className=" min-h-[241px] rounded-[16px] flex flex-col border border-gray-100">
          <div className=" flex justify-between items-center py-[14px] px-6 rounded-t-[10px] ">
            <p className=" text-primary-greytext text-sm">Recent Expenses</p>
            <Link href="/dashboard/expenses">
              <button className=" text-primary-blue text-sm tracking-[-0.2px]">
                View all
              </button>
            </Link>
          </div>
          <div className=" flex flex-col bg-white h-full rounded-b-[16px]">
            {expenses.map((expense) => (
              <div
                key={expense?.id}
                className=" border-t border-t-gray-100 min-h-[63px] flex justify-between text-sm items-center px-6"
              >
                <p>#{expense?.id}</p>
                <p className=" text-primary-greytext">{expense?.expenseDate}</p>
                <div className="bg-green-100 h-[20px] text-xs text-green-800 flex items-baseline rounded-full px-2.5 py-0.5 ">
                  {expense?.expenseCategory?.name}
                </div>
                <MoreHorizontal className=" text-[#c4c4c4]" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RecentExpenses;
