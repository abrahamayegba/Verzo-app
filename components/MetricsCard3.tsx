import {
  useGetExpenseForMonthQuery,
  useGetExpenseForQuarterQuery,
  useGetExpenseForWeekQuery,
  useGetExpenseForYearQuery,
  useGetPurchaseForMonthQuery,
  useGetPurchaseForQuarterQuery,
  useGetPurchaseForWeekQuery,
  useGetPurchaseForYearQuery,
  useTotalMonthlyInvoicesAmountQuery,
  useTotalQuarterlyInvoicesAmountQuery,
  useTotalWeeklyInvoicesAmountQuery,
  useTotalYearlyInvoicesAmountQuery,
} from "@/src/generated/graphql";
import Link from "next/link";
import React from "react";
import Graphflat from "./ui/icons/Graphflat";
import localStorage from "local-storage-fallback";
import GraphUp from "./ui/icons/GraphUp";
import ArrowUpIcon from "./ui/icons/ArrowUpIcon";

interface MetricsProps {
  filter: string;
}

const MetricsCard3: React.FC<MetricsProps> = ({ filter }) => {
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
          ?.totalPaidInvoiceAmountThisWeek,
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
      percentageIncreaseInPurchaseThisWeek:
        getPurchaseForWeek.data?.getPurchasesForWeek
          ?.percentageIncreaseInPurchaseThisWeek,
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
          ?.totalPaidInvoiceAmountThisMonth,
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
      percentageIncreaseInPurchaseThisMonth:
        getPurchaseForMonth.data?.getPurchaseForMonth
          ?.percentageIncreaseInPurchaseThisMonth,
    };
  };

  const FetchQuarterlyData = () => {
    const totalQuarterlyInvoicesAmount = useTotalQuarterlyInvoicesAmountQuery({
      variables: {
        businessId: businessId,
        quarterly: true,
      },
    });
    const getExpenseForQuarter = useGetExpenseForQuarterQuery({
      variables: {
        businessId: businessId,
        quarterly: true,
      },
    });
    const getPurchaseForQuarter = useGetPurchaseForQuarterQuery({
      variables: {
        businessId: businessId,
        quarterly: true,
      },
    });
    return {
      quarterlyRevenue:
        totalQuarterlyInvoicesAmount.data?.totalQuarterlyInvoicesAmount
          ?.totalPaidInvoiceAmountThisQuarter,
      percentageQuarterlyRevenue:
        totalQuarterlyInvoicesAmount.data?.totalQuarterlyInvoicesAmount
          ?.percentageIncreaseInInvoiceThisQuarter,
      totalExpenseAmountThisQuarter:
        getExpenseForQuarter.data?.getExpensesForQuarter
          ?.totalExpenseAmountThisQuarter,
      percentageIncreaseInExpenseThisQuarter:
        getExpenseForQuarter.data?.getExpensesForQuarter
          ?.percentageIncreaseInExpensesThisQuarter,
      totalPurchaseAmountThisQuarter:
        getPurchaseForQuarter.data?.getPurchaseForQuarter
          ?.totalPurchaseAmountThisQuarter,
      percentageIncreaseInPurchaseThisQuarter:
        getPurchaseForQuarter.data?.getPurchaseForQuarter
          ?.percentageIncreaseInPurchaseThisQuarter,
    };
  };

  const FetchYearlyData = () => {
    const totalYearlyInvoicesAmount = useTotalYearlyInvoicesAmountQuery({
      variables: {
        businessId: businessId,
        yearly: true,
      },
    });
    const getExpenseForYear = useGetExpenseForYearQuery({
      variables: {
        businessId: businessId,
        yearly: true,
      },
    });
    const getPurchaseForYear = useGetPurchaseForYearQuery({
      variables: {
        businessId: businessId,
        yearly: true,
      },
    });
    return {
      yearlyRevenue:
        totalYearlyInvoicesAmount.data?.totalYearlyInvoicesAmount
          ?.totalPaidInvoiceAmountThisYear,
      percentageYearlyRevenue:
        totalYearlyInvoicesAmount.data?.totalYearlyInvoicesAmount
          ?.percentageIncreaseInInvoiceThisYear,
      totalExpenseAmountThisYear:
        getExpenseForYear.data?.getExpensesForYear?.totalExpenseAmountThisYear,
      percentageIncreaseInExpenseThisYear:
        getExpenseForYear.data?.getExpensesForYear
          ?.percentageIncreaseInExpensesThisYear,
      totalPurchaseAmountThisYear:
        getPurchaseForYear.data?.getPurchaseForYear
          ?.totalPurchaseAmountThisYear,
      percentageIncreaseInPurchaseThisYear:
        getPurchaseForYear.data?.getPurchaseForYear
          ?.percentageIncreaseInPurchaseThisYear,
    };
  };

  const weeklyData = FetchWeeklyData();
  const monthlyData = FetchMonthlyData();
  const quarterlyData = FetchQuarterlyData();
  const yearlyData = FetchYearlyData();

  return (
    <>
      <div className=" flex justify-between text-primary-black">
        <p className=" text-[20px] tracking-[-0.3px]">Purchases</p>
        <Link href="/dashboard/purchases">
          <button className=" text-primary-blue text-sm tracking-[-0.2px]">
            See more
          </button>
        </Link>
      </div>
      <div className=" flex justify-between flex-wrap h-[70px]">
        <div className=" flex flex-col gap-y-1">
          <p className=" text-[30px]  font-medium">
            {filter === "weekly" &&
              weeklyData?.totalPurchaseAmountThisWeek?.toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
                minimumFractionDigits: 2,
              })}
            {filter === "monthly" &&
              monthlyData?.totalPurchaseAmountThisMonth?.toLocaleString(
                "en-NG",
                {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }
              )}
            {filter === "quarterly" &&
              quarterlyData?.totalPurchaseAmountThisQuarter?.toLocaleString(
                "en-NG",
                {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }
              )}
            {filter === "yearly" &&
              yearlyData?.totalPurchaseAmountThisYear?.toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
                minimumFractionDigits: 2,
              })}
          </p>
          {filter === "weekly" &&
            weeklyData?.percentageIncreaseInPurchaseThisWeek! > 0 && (
              <div className=" flex items-center text-primary-greytext text-[15px]">
                <span>
                  <ArrowUpIcon />
                </span>
                <span className="text-[#4BB543] mx-1">
                  {weeklyData?.percentageIncreaseInPurchaseThisWeek}%
                </span>{" "}
                this week
              </div>
            )}
          {filter === "monthly" &&
            monthlyData?.percentageIncreaseInPurchaseThisMonth! > 0 && (
              <div className=" flex items-center text-primary-greytext text-[15px]">
                <span>
                  <ArrowUpIcon />
                </span>
                <span className="text-[#4BB543] mx-1">
                  {monthlyData?.percentageIncreaseInPurchaseThisMonth}%
                </span>{" "}
                this month
              </div>
            )}
          {filter === "quarterly" &&
            quarterlyData?.percentageIncreaseInPurchaseThisQuarter! > 0 && (
              <div className=" flex items-center text-primary-greytext text-[15px]">
                <span>
                  <ArrowUpIcon />
                </span>
                <span className="text-[#4BB543] mx-1">
                  {quarterlyData?.percentageIncreaseInPurchaseThisQuarter}%
                </span>{" "}
                this quarter
              </div>
            )}
          {filter === "yearly" &&
            yearlyData?.percentageIncreaseInPurchaseThisYear! > 0 && (
              <div className=" flex items-center text-primary-greytext text-[15px]">
                <span>
                  <ArrowUpIcon />
                </span>
                <span className="text-[#4BB543] mx-1">
                  {yearlyData?.percentageIncreaseInPurchaseThisYear}%
                </span>{" "}
                this year
              </div>
            )}
        </div>
        {filter === "weekly" &&
          (weeklyData?.totalPurchaseAmountThisWeek === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
        {filter === "monthly" &&
          (monthlyData?.totalPurchaseAmountThisMonth === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
        {filter === "quarterly" &&
          (quarterlyData?.totalPurchaseAmountThisQuarter === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
        {filter === "yearly" &&
          (yearlyData?.totalPurchaseAmountThisYear === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
      </div>
    </>
  );
};

export default MetricsCard3;
