import { Download, Eye, MoreHorizontal, Pen } from "lucide-react";
import React from "react";
import localStorage from "local-storage-fallback";
import { useGetExpensesByBusinessQuery } from "@/src/generated/graphql";
import RecentMetricEmptyState from "../emptystates/RecentMetricEmptyState";
import RecentExpenseEmptyIcon from "../ui/icons/RecentExpenseEmptyIcon";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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
          <div className=" flex justify-between items-center py-[14px] max-h-[50px] px-6 rounded-t-[10px] ">
            <p className=" text-primary-greytext text-sm">Recent Expenses</p>
            <Link href="/dashboard/expenses">
              <button className=" text-primary-blue text-sm tracking-[-0.2px]">
                View all
              </button>
            </Link>
          </div>
          <div className=" flex flex-col bg-white h-full rounded-b-[16px]">
            {expenses.slice(0, 3).map((expense, index) => (
              <div
                key={expense?.id}
                className={`min-h-[62px] flex justify-between text-sm items-center px-6 ${
                  index === 2 ? "" : "border-b border-b-gray-100"
                }`}
              >
                <p>#EXP{String(index + 1).padStart(3, "0")}</p>
                <p className=" text-primary-greytext">
                  {expense?.expenseDate
                    ? new Date(expense.expenseDate).toDateString()
                    : ""}
                </p>
                <div className="bg-green-100 h-[20px] text-xs text-green-800 flex items-baseline rounded-full px-2.5 py-0.5 ">
                  {expense?.expenseCategory?.name}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger className=" focus:outline-none">
                    <MoreHorizontal className=" text-[#c4c4c4]" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className=" bg-white mt-1 text-primary-greytext shadow1 w-[160px] ml-1">
                    <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2">
                      <Link
                        className=" flex gap-x-2 items-center"
                        href={`/expense/viewexpense?expenseId=${expense?.id}`}
                      >
                        <Eye className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                        View Expense
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2">
                      <Link
                        className=" flex gap-x-2 items-center"
                        href={`/expense/editexpense?expenseId=${expense?.id}`}
                      >
                        <Pen className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                        Edit Expense
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

export default RecentExpenses;
