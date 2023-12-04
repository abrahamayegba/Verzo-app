import React from "react";
import GraphUp from "./ui/icons/GraphUp";
import Graphflat from "./ui/icons/Graphflat";
import ArrowUpIcon from "./ui/icons/ArrowUpIcon";
import localStorage from "local-storage-fallback";
import {
  useGetExpenseForWeekQuery,
  useGetPurchaseForWeekQuery,
  useTotalWeeklyInvoicesAmountQuery,
} from "@/src/generated/graphql";

const Metrics = () => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const totalWeeklyInvoicesAmountQuery = useTotalWeeklyInvoicesAmountQuery({
    variables: {
      businessId: businessId,
      weekly: true,
    },
  });
  const getExpenseForWeek = useGetExpenseForWeekQuery({
    variables: {
      businessId: businessId,
      weekly: true,
    },
  });
  const getPurchaseForWeek = useGetPurchaseForWeekQuery({
    variables: {
      businessId: businessId,
      weekly: true,
    },
  });

  const weeklyRevenue =
    totalWeeklyInvoicesAmountQuery.data?.totalWeeklyInvoicesAmount
      ?.totalInvoiceAmountForWeek;
  const percentageWeeklyRevenue =
    totalWeeklyInvoicesAmountQuery.data?.totalWeeklyInvoicesAmount
      ?.percentageOfIncreaseInInvoicesThisWeek;

  const totalExpenseAmountThisWeek =
    getExpenseForWeek.data?.getExpensesForWeek?.totalExpenseAmountThisWeek;

  const percentageIncreaseInExpenseThisWeek =
    getExpenseForWeek.data?.getExpensesForWeek
      ?.percentageIncreaseInExpenseThisWeek;

  const totalPurchaseAmountThisWeek =
    getPurchaseForWeek.data?.getPurchasesForWeek?.totalPurchaseAmountThisWeek;

  return (
    <div className=" w-full flex min-h-[198px] rounded-[16px] bg-white border border-[#f4f4f4]">
      <div className=" w-1/3 border-r-[0.5px] px-5 py-3 flex flex-col justify-center gap-y-[36px]">
        <div className=" flex justify-between text-primary-black">
          <p className=" text-[20px] tracking-[-0.3px]">Revenue</p>
          <button className=" text-primary-blue text-sm tracking-[-0.2px]">
            See more
          </button>
        </div>
        <div className=" flex justify-between flex-wrap">
          <div className=" flex flex-col gap-y-1">
            <p className=" text-[30px]  font-medium">
              {weeklyRevenue?.toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
                minimumFractionDigits: 2,
              })}
            </p>
            {percentageWeeklyRevenue! > 0 && (
              <div className=" flex items-center text-primary-greytext">
                <span>
                  <ArrowUpIcon />
                </span>
                <span className="text-[#4BB543] mx-1">
                  {percentageWeeklyRevenue}%
                </span>{" "}
                since last month
              </div>
            )}
          </div>
          {percentageWeeklyRevenue === 0 ? <Graphflat /> : <GraphUp />}
        </div>
      </div>
      <div className=" w-1/3 border-r-[0.5px] px-5 py-3 flex flex-col justify-center gap-y-[36px]">
        <div className=" flex justify-between text-primary-black">
          <p className=" text-[20px] tracking-[-0.3px]">Expenses</p>
          <button className=" text-primary-blue text-sm tracking-[-0.2px]">
            See more
          </button>
        </div>
        <div className=" flex justify-between flex-wrap">
          <div className=" flex flex-col gap-y-1">
            <p className=" text-[30px]  font-medium">
              {totalExpenseAmountThisWeek?.toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
                minimumFractionDigits: 2,
              })}
            </p>
            {percentageIncreaseInExpenseThisWeek! > 0 && (
              <div className=" items-center text-primary-greytext flex ">
                <span>
                  <ArrowUpIcon />
                </span>
                <span className="text-[#4BB543] mx-1">
                  {percentageIncreaseInExpenseThisWeek}%
                </span>{" "}
                since last month
              </div>
            )}
          </div>
          {percentageIncreaseInExpenseThisWeek === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          )}
        </div>
      </div>
      <div className=" w-1/3 border-r-[0.5px] px-5 py-3 flex flex-col justify-center gap-y-[36px]">
        <div className=" flex justify-between text-primary-black">
          <p className=" text-[20px] tracking-[-0.3px]">Purchases</p>
          <button className=" text-primary-blue text-sm tracking-[-0.2px]">
            See more
          </button>
        </div>
        <div className=" flex justify-between flex-wrap">
          <div className=" flex flex-col gap-y-1">
            <p className=" text-[30px]  font-medium">
              {totalPurchaseAmountThisWeek?.toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
                minimumFractionDigits: 2,
              })}
            </p>
            {totalPurchaseAmountThisWeek! > 0 && (
              <div className=" flex items-center text-primary-greytext">
                <span>
                  <ArrowUpIcon />
                </span>
                <span className="text-[#4BB543] mx-1">20%</span> since last
                month
              </div>
            )}
          </div>
          {totalPurchaseAmountThisWeek === 0 ? <Graphflat /> : <GraphUp />}
        </div>
      </div>
    </div>
  );
};

export default Metrics;
