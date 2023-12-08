import {
  useGetExpenseForMonthQuery,
  useGetExpenseForWeekQuery,
  useGetPurchaseForMonthQuery,
  useGetPurchaseForWeekQuery,
  useTotalMonthlyInvoicesAmountQuery,
  useTotalWeeklyInvoicesAmountQuery,
} from "@/src/generated/graphql";
import Link from "next/link";
import localStorage from "local-storage-fallback";
import React from "react";
import Graphflat from "./ui/icons/Graphflat";
import GraphUp from "./ui/icons/GraphUp";
import ArrowUpIcon from "./ui/icons/ArrowUpIcon";

interface MetricsProps {
  filter: string;
}

const MetricsCard1: React.FC<MetricsProps> = ({ filter }) => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";

  const FetchWeeklyData = () => {
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
    return {
      weeklyRevenue:
        totalWeeklyInvoicesAmountQuery.data?.totalWeeklyInvoicesAmount
          ?.totalInvoiceAmountForWeek,
      percentageWeeklyRevenue:
        totalWeeklyInvoicesAmountQuery.data?.totalWeeklyInvoicesAmount
          ?.percentageOfIncreaseInInvoicesThisWeek,
      totalExpenseAmountThisWeek:
        getExpenseForWeek.data?.getExpensesForWeek?.totalExpenseAmountThisWeek,
      percentageIncreaseInExpenseThisWeek:
        getExpenseForWeek.data?.getExpensesForWeek
          ?.percentageIncreaseInExpenseThisWeek,
      totalPurchaseAmountThisWeek:
        getPurchaseForWeek.data?.getPurchasesForWeek
          ?.totalPurchaseAmountThisWeek,
    };
  };

  const FetchMonthlyData = () => {
    const totalMonthlyInvoicesAmount = useTotalMonthlyInvoicesAmountQuery({
      variables: {
        businessId: businessId,
        monthly: true,
      },
    });
    const getExpenseForMonth = useGetExpenseForMonthQuery({
      variables: {
        businessId: businessId,
        monthly: true,
      },
    });
    const getPurchaseForMonth = useGetPurchaseForMonthQuery({
      variables: {
        businessId: businessId,
        monthly: true,
      },
    });
    return {
      monthlyRevenue:
        totalMonthlyInvoicesAmount.data?.totalMonthlyInvoicesAmount
          ?.totalInvoiceAmountForMonth,
      percentageMonthlyRevenue:
        totalMonthlyInvoicesAmount.data?.totalMonthlyInvoicesAmount
          ?.percentageIncreaseInInvoicesThisMonth,
      totalExpenseAmountThisMonth:
        getExpenseForMonth.data?.getExpensesForMonth
          ?.totalExpenseAmountThisMonth,
      percentageIncreaseInExpenseThisMonth:
        getExpenseForMonth.data?.getExpensesForMonth
          ?.percentageIncreaseInExpenseThisMonth,
      totalPurchaseAmountThisMonth:
        getPurchaseForMonth.data?.getPurchaseForMonth
          ?.totalPurchaseAmountThisMonth,
    };
  };

  const weeklyData = FetchWeeklyData();
  const monthlyData = FetchMonthlyData();

  return (
    <>
      <div className=" flex justify-between text-primary-black">
        <p className=" text-[20px] tracking-[-0.3px]">Revenue</p>
        <Link href="/dashboard/invoices">
          <button className=" text-primary-blue text-sm tracking-[-0.2px]">
            See more
          </button>
        </Link>
      </div>
      <div className=" flex justify-between flex-wrap">
        <div className=" flex flex-col gap-y-1">
          <p className=" text-[30px]  font-medium">
            {filter === "weekly" &&
              weeklyData?.weeklyRevenue?.toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
                minimumFractionDigits: 2,
              })}
            {filter === "monthly" &&
              monthlyData?.monthlyRevenue?.toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
                minimumFractionDigits: 2,
              })}
          </p>
          {filter === "weekly" && weeklyData?.percentageWeeklyRevenue! > 0 && (
            <div className=" flex items-center text-primary-greytext">
              <span>
                <ArrowUpIcon />
              </span>
              <span className="text-[#4BB543] mx-1">
                {weeklyData?.percentageWeeklyRevenue}%
              </span>{" "}
              since last month
            </div>
          )}
          {filter === "monthly" &&
            monthlyData?.percentageMonthlyRevenue! > 0 && (
              <div className=" flex items-center text-primary-greytext">
                <span>
                  <ArrowUpIcon />
                </span>
                <span className="text-[#4BB543] mx-1">
                  {monthlyData?.percentageMonthlyRevenue}%
                </span>{" "}
                since last month
              </div>
            )}
        </div>
        {filter === "weekly" &&
          (weeklyData?.percentageWeeklyRevenue === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
        {filter === "monthly" &&
          (monthlyData?.percentageMonthlyRevenue === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
      </div>
    </>
  );
};

export default MetricsCard1;
