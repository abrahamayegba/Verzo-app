import React from "react";
import Graphflat from "../ui/icons/Graphflat";
import localStorage from "local-storage-fallback";
import {
  useGetExpenseForMonthQuery,
  useGetExpenseForQuarterQuery,
  useGetExpenseForWeekQuery,
  useGetExpenseForYearQuery,
  useGetExpensesByBusinessQuery,
} from "@/src/generated/graphql";
import GraphUp from "../ui/icons/GraphUp";
import Link from "next/link";
import ExpenseDashboardPendingWeeklyGraph from "../graphs/expense/expensedashboard/weekly/ExpenseDashboardPendingWeeklyGraph";
import { TrendingUp } from "lucide-react";
import ExpenseDashboardPendingMonthlyGraph from "../graphs/expense/expensedashboard/monthly/ExpenseDashboardPendingMonthlyGraph";
import ExpenseDashboardPendingQuarterlyGraph from "../graphs/expense/expensedashboard/quarterly/ExpenseDashboardPendingQuarterlyGraph";
import ExpenseDashboardPendingYearlyGraph from "../graphs/expense/expensedashboard/yearly/ExpenseDashboardPendingYearlyGraph";

interface MetricsProps {
  filter: string;
}

const ExpenseMetricsCard3: React.FC<MetricsProps> = ({ filter }) => {
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
      totalPendingExpenseAmountThisWeek:
        getExpenseForWeek.data?.getExpensesForWeek
          ?.totalPendingExpenseAmountThisWeek / 100,
      percentageIncreaseInPendingExpenseThisWeek:
        getExpenseForWeek.data?.getExpensesForWeek
          ?.percentageIncreaseInPendingExpensesThisWeek,
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
      totalPendingExpenseAmountThisMonth:
        getExpenseForMonth.data?.getExpensesForMonth
          ?.totalPendingExpensesThisMonth / 100,
      percentageIncreaseInPendingExpenseThisMonth:
        getExpenseForMonth.data?.getExpensesForMonth
          ?.percentageIncreaseInPendingExpensesThisMonth,
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
      totalPendingExpenseAmountThisQuarter:
        getExpenseForQuarter.data?.getExpensesForQuarter
          ?.totalPendingExpensesThisQuarter / 100,
      percentageIncreaseInPendingExpenseThisQuarter:
        getExpenseForQuarter.data?.getExpensesForQuarter
          ?.percentageIncreaseInPendingExpensesThisQuarter,
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
      totalPendingExpenseAmountThisYear:
        getExpenseForYear.data?.getExpensesForYear
          ?.totalPendingExpenseAmountThisYear / 100,
      percentageIncreaseInPendingExpenseThisYear:
        getExpenseForYear.data?.getExpensesForYear
          ?.percentageIncreaseInPendingExpensesThisYear,
    };
  };

  const weeklyData = FetchWeeklyData();
  const monthlyData = FetchMonthlyData();
  const quarterlyData = FetchQuarterlyData();
  const yearlyData = FetchYearlyData();

  return (
    <>
      <div className=" flex justify-between text-primary-black">
        <p className=" text-[20px] tracking-[-0.3px]">Pending</p>
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
              weeklyData?.totalPendingExpenseAmountThisWeek?.toLocaleString(
                "en-NG",
                {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }
              )}
            {filter === "monthly" &&
              monthlyData?.totalPendingExpenseAmountThisMonth?.toLocaleString(
                "en-NG",
                {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }
              )}
            {filter === "quarterly" &&
              quarterlyData?.totalPendingExpenseAmountThisQuarter?.toLocaleString(
                "en-NG",
                {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }
              )}
            {filter === "yearly" &&
              yearlyData?.totalPendingExpenseAmountThisYear?.toLocaleString(
                "en-NG",
                {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }
              )}
          </p>
          {filter === "weekly" &&
            weeklyData?.percentageIncreaseInPendingExpenseThisWeek! > 0 && (
              <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                <span className="text-[#4BB543] ml-2">
                  {weeklyData?.percentageIncreaseInPendingExpenseThisWeek}%
                </span>{" "}
              </div>
            )}
          {filter === "monthly" &&
            monthlyData?.percentageIncreaseInPendingExpenseThisMonth! > 0 && (
              <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                <span className="text-[#4BB543] ml-2">
                  {monthlyData?.percentageIncreaseInPendingExpenseThisMonth}%
                </span>{" "}
              </div>
            )}
          {filter === "quarterly" &&
            quarterlyData?.percentageIncreaseInPendingExpenseThisQuarter! >
              0 && (
              <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                <span className="text-[#4BB543] ml-2">
                  {quarterlyData?.percentageIncreaseInPendingExpenseThisQuarter}
                  %
                </span>{" "}
              </div>
            )}
          {filter === "yearly" &&
            yearlyData?.percentageIncreaseInPendingExpenseThisYear! > 0 && (
              <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                <span className="text-[#4BB543] ml-2">
                  {yearlyData?.percentageIncreaseInPendingExpenseThisYear}%
                </span>{" "}
              </div>
            )}
        </div>
        {filter === "weekly" && <ExpenseDashboardPendingWeeklyGraph />}
        {filter === "monthly" && <ExpenseDashboardPendingMonthlyGraph />}
        {filter === "quarterly" && <ExpenseDashboardPendingQuarterlyGraph />}
        {filter === "yearly" && <ExpenseDashboardPendingYearlyGraph />}
      </div>
    </>
  );
};

export default ExpenseMetricsCard3;
