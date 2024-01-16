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

interface MetricsProps {
  filter: string;
}

const ExpenseMetricsCard2: React.FC<MetricsProps> = ({ filter }) => {
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
  const filterDisplayNames = {
    weekly: "Weekly",
    monthly: "Monthly",
    quarterly: "Quarterly",
    yearly: "Yearly",
  };

  return (
    <>
      <div className=" flex justify-between text-primary-black">
        <p className=" text-[20px] tracking-[-0.3px]">
          {(filterDisplayNames as any)[filter]}
        </p>
        <Link href="/dashboard/expenses">
          <button className=" text-primary-blue text-sm tracking-[-0.2px]">
            See more
          </button>
        </Link>
      </div>
      <div className=" flex justify-between flex-wrap h-[70px]">
        <div className=" flex flex-col gap-y-1">
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
        </div>
        {filter === "weekly" &&
          (weeklyData?.percentageIncreaseInExpenseThisWeek === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
        {filter === "monthly" &&
          (monthlyData?.percentageIncreaseInExpenseThisMonth === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
        {filter === "quarterly" &&
          (quarterlyData?.percentageIncreaseInExpenseThisQuarter === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
        {filter === "yearly" &&
          (yearlyData?.percentageIncreaseInExpenseThisYear === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
      </div>
    </>
  );
};

export default ExpenseMetricsCard2;
