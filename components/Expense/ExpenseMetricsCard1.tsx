import React from "react";
import localStorage from "local-storage-fallback";
import {
  useGetExpenseForMonthQuery,
  useGetExpenseForQuarterQuery,
  useGetExpenseForWeekQuery,
  useGetExpenseForYearQuery,
} from "@/src/generated/graphql";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import ExpenseDashboardTotalWeeklyGraph from "../graphs/expense/expensedashboard/weekly/ExpenseDashboardTotalWeeklyGraph";
import ExpenseDashboardTotalMonthlyGraph from "../graphs/expense/expensedashboard/monthly/ExpenseDashboardTotalMonthlyGraph";
import ExpenseDashboardTotalQuarterlyGraph from "../graphs/expense/expensedashboard/quarterly/ExpenseDashboardTotalQuarterlyGraph";
import ExpenseDashboardTotalYearlyGraph from "../graphs/expense/expensedashboard/yearly/ExpenseDashboardTotalYearlyGraph";

interface MetricsProps {
  filter: string;
}

const ExpenseMetricsCard1: React.FC<MetricsProps> = ({ filter }) => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";

  const FetchWeeklyData = () => {
    const getExpenseForWeek = useGetExpenseForWeekQuery({
      variables: {
        businessId: businessId,
        weekly: true,
      },
    });
    return {
      totalExpenseAmountThisWeek:
        getExpenseForWeek.data?.getExpensesForWeek?.totalExpenseAmountThisWeek,
      percentageIncreaseInExpenseThisWeek:
        getExpenseForWeek.data?.getExpensesForWeek
          ?.percentageIncreaseInExpenseThisWeek,
    };
  };

  const FetchMonthlyData = () => {
    const getExpenseForMonth = useGetExpenseForMonthQuery({
      variables: {
        businessId: businessId,
        monthly: true,
      },
    });
    return {
      totalExpenseAmountThisMonth:
        getExpenseForMonth.data?.getExpensesForMonth
          ?.totalExpenseAmountThisMonth,
      percentageIncreaseInExpenseThisMonth:
        getExpenseForMonth.data?.getExpensesForMonth
          ?.percentageIncreaseInExpenseThisMonth,
    };
  };

  const FetchQuarterlyData = () => {
    const getExpenseForQuarter = useGetExpenseForQuarterQuery({
      variables: {
        businessId: businessId,
        quarterly: true,
      },
    });
    return {
      totalExpenseAmountThisQuarter:
        getExpenseForQuarter.data?.getExpensesForQuarter
          ?.totalExpenseAmountThisQuarter,
      percentageIncreaseInExpenseThisQuarter:
        getExpenseForQuarter.data?.getExpensesForQuarter
          ?.percentageIncreaseInExpensesThisQuarter,
    };
  };

  const FetchYearlyData = () => {
    const getExpenseForYear = useGetExpenseForYearQuery({
      variables: {
        businessId: businessId,
        yearly: true,
      },
    });
    return {
      totalExpenseAmountThisYear:
        getExpenseForYear.data?.getExpensesForYear?.totalExpenseAmountThisYear,
      percentageIncreaseInExpenseThisYear:
        getExpenseForYear.data?.getExpensesForYear
          ?.percentageIncreaseInExpensesThisYear,
    };
  };

  const weeklyData = FetchWeeklyData();
  const monthlyData = FetchMonthlyData();
  const quarterlyData = FetchQuarterlyData();
  const yearlyData = FetchYearlyData();

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
      <div className=" flex flex-col">
        <div className=" flex justify-between gap-y-1">
          <p className=" text-[30px]  font-medium">
            {filter === "weekly" &&
              weeklyData?.totalExpenseAmountThisWeek?.toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
                minimumFractionDigits: 2,
              })}
            {filter === "monthly" &&
              monthlyData?.totalExpenseAmountThisMonth?.toLocaleString(
                "en-NG",
                {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }
              )}
            {filter === "quarterly" &&
              quarterlyData?.totalExpenseAmountThisQuarter?.toLocaleString(
                "en-NG",
                {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }
              )}
            {filter === "yearly" &&
              yearlyData?.totalExpenseAmountThisYear?.toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
                minimumFractionDigits: 2,
              })}
          </p>
          {filter === "weekly" &&
            weeklyData?.percentageIncreaseInExpenseThisWeek! > 0 && (
              <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                <span className="text-[#4BB543] ml-2">
                  {weeklyData?.percentageIncreaseInExpenseThisWeek}%
                </span>{" "}
              </div>
            )}
          {filter === "monthly" &&
            monthlyData?.percentageIncreaseInExpenseThisMonth! > 0 && (
              <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                <span className="text-[#4BB543] ml-2">
                  {monthlyData?.percentageIncreaseInExpenseThisMonth}%
                </span>{" "}
              </div>
            )}
          {filter === "quarterly" &&
            quarterlyData?.percentageIncreaseInExpenseThisQuarter! > 0 && (
              <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                <span className="text-[#4BB543] ml-2">
                  {quarterlyData?.percentageIncreaseInExpenseThisQuarter}%
                </span>{" "}
              </div>
            )}
          {filter === "yearly" &&
            yearlyData?.percentageIncreaseInExpenseThisYear! > 0 && (
              <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                <span className="text-[#4BB543] ml-2">
                  {yearlyData?.percentageIncreaseInExpenseThisYear}%
                </span>{" "}
              </div>
            )}
        </div>
        {filter === "weekly" && <ExpenseDashboardTotalWeeklyGraph />}
        {filter === "monthly" && <ExpenseDashboardTotalMonthlyGraph />}
        {filter === "quarterly" && <ExpenseDashboardTotalQuarterlyGraph />}
        {filter === "yearly" && <ExpenseDashboardTotalYearlyGraph />}
      </div>
    </>
  );
};

export default ExpenseMetricsCard1;
