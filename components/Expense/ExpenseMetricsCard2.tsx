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
import ExpenseDashboardPaidWeeklyGraph from "../graphs/expense/expensedashboard/weekly/ExpenseDashboardPaidWeeklyGraph";
import ExpenseDashboardPaidMonthlyGraph from "../graphs/expense/expensedashboard/monthly/ExpenseDashboardPaidMonthlyGraph";
import ExpenseDashboardPaidQuarterlyGraph from "../graphs/expense/expensedashboard/quarterly/ExpenseDashboardPaidQuarterlyGraph";
import ExpenseDashboardPaidYearlyGraph from "../graphs/expense/expensedashboard/yearly/ExpenseDashboardPaidYearlyGraph";

interface MetricsProps {
  filter: string;
}

const ExpenseMetricsCard2: React.FC<MetricsProps> = ({ filter }) => {
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
      totalPaidExpenseAmountThisWeek:
        getExpenseForWeek.data?.getExpensesForWeek
          ?.totalPaidExpenseAmountThisWeek / 100,
      percentageIncreaseInPaidExpenseThisWeek:
        getExpenseForWeek.data?.getExpensesForWeek
          ?.percentageIncreaseInPaidExpensesThisWeek,
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
      totalPaidExpenseAmountThisMonth:
        getExpenseForMonth.data?.getExpensesForMonth
          ?.totalPaidExpensesThisMonth / 100,
      percentageIncreaseInPaidExpenseThisMonth:
        getExpenseForMonth.data?.getExpensesForMonth
          ?.percentageIncreaseInPaidExpensesThisMonth,
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
      totalPaidExpenseAmountThisQuarter:
        getExpenseForQuarter.data?.getExpensesForQuarter
          ?.totalPaidExpensesThisQuarter / 100,
      percentageIncreaseInPaidExpenseThisQuarter:
        getExpenseForQuarter.data?.getExpensesForQuarter
          ?.percentageIncreaseInExpensesPaidThisQuarter,
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
      totalPaidExpenseAmountThisYear:
        getExpenseForYear.data?.getExpensesForYear
          ?.totalPaidExpensesAmountThisYear / 100,
      percentageIncreaseInPaidExpenseThisYear:
        getExpenseForYear.data?.getExpensesForYear
          ?.percentageIncreaseInPaidExpensesThisYear,
    };
  };

  const weeklyData = FetchWeeklyData();
  const monthlyData = FetchMonthlyData();
  const quarterlyData = FetchQuarterlyData();
  const yearlyData = FetchYearlyData();

  return (
    <>
      <div className=" flex justify-between text-primary-black">
        <p className=" text-[20px] tracking-[-0.3px]">Paid</p>
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
              weeklyData?.totalPaidExpenseAmountThisWeek?.toLocaleString(
                "en-NG",
                {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }
              )}
            {filter === "monthly" &&
              monthlyData?.totalPaidExpenseAmountThisMonth?.toLocaleString(
                "en-NG",
                {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }
              )}
            {filter === "quarterly" &&
              quarterlyData?.totalPaidExpenseAmountThisQuarter?.toLocaleString(
                "en-NG",
                {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }
              )}
            {filter === "yearly" &&
              yearlyData?.totalPaidExpenseAmountThisYear?.toLocaleString(
                "en-NG",
                {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }
              )}
          </p>
          {filter === "weekly" &&
            weeklyData?.percentageIncreaseInPaidExpenseThisWeek! > 0 && (
              <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                <span className="text-[#4BB543] ml-2">
                  {weeklyData?.percentageIncreaseInPaidExpenseThisWeek}%
                </span>{" "}
              </div>
            )}
          {filter === "monthly" &&
            monthlyData?.percentageIncreaseInPaidExpenseThisMonth! > 0 && (
              <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                <span className="text-[#4BB543] ml-2">
                  {monthlyData?.percentageIncreaseInPaidExpenseThisMonth}%
                </span>{" "}
              </div>
            )}
          {filter === "quarterly" &&
            quarterlyData?.percentageIncreaseInPaidExpenseThisQuarter! > 0 && (
              <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                <span className="text-[#4BB543] ml-2">
                  {quarterlyData?.percentageIncreaseInPaidExpenseThisQuarter}%
                </span>{" "}
              </div>
            )}
          {filter === "yearly" &&
            yearlyData?.percentageIncreaseInPaidExpenseThisYear! > 0 && (
              <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                <span className="text-[#4BB543] ml-2">
                  {yearlyData?.percentageIncreaseInPaidExpenseThisYear}%
                </span>{" "}
              </div>
            )}
        </div>
        {filter === "weekly" && <ExpenseDashboardPaidWeeklyGraph />}
        {filter === "monthly" && <ExpenseDashboardPaidMonthlyGraph />}
        {filter === "quarterly" && <ExpenseDashboardPaidQuarterlyGraph />}
        {filter === "yearly" && <ExpenseDashboardPaidYearlyGraph />}
      </div>
    </>
  );
};

export default ExpenseMetricsCard2;
