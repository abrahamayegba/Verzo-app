import React from "react";
import GraphUp from "../ui/icons/GraphUp";
import localStorage from "local-storage-fallback";
import { useGetExpensesByBusinessQuery } from "@/src/generated/graphql";
import Link from "next/link";
import Graphflat from "../ui/icons/Graphflat";

const ExpenseMetricsCard1 = () => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";

  const getExpensesByBusiness = useGetExpensesByBusinessQuery({
    variables: {
      businessId: businessId,
      sets: 1,
      cursor: null,
    },
  });
  const expenses =
    getExpensesByBusiness.data?.getExpenseByBusiness?.expenseByBusiness;
  let totalExpenses = 0;
  expenses?.forEach((Expense) => {
    totalExpenses += Expense?.amount!;
  });
  return (
    <>
      <div className=" flex justify-between text-primary-black">
        <p className=" text-[20px] tracking-[-0.3px]">Total</p>
        <Link href="/dashboard/expenses">
          <button className=" text-primary-blue text-sm tracking-[-0.2px]">
            See more
          </button>
        </Link>
      </div>
      <div className=" flex justify-between flex-wrap">
        <div className=" flex flex-col gap-y-1">
          <p className=" text-[30px]  font-medium">
            {totalExpenses?.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
        {totalExpenses === 0 ? <Graphflat /> : <GraphUp />}
      </div>
    </>
  );
};

export default ExpenseMetricsCard1;
