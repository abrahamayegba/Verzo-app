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
import localStorage from "local-storage-fallback";
import ExpenseWeeklyGraph from "./graphs/expense/dashboard/ExpenseWeeklyGraph";
import ExpenseMonthlyGraph from "./graphs/expense/dashboard/ExpenseMonthlyGraph";
import ExpenseQuarterlyGraph from "./graphs/expense/dashboard/ExpenseQuarterlyGraph";
import ExpenseYearlyGraph from "./graphs/expense/dashboard/ExpenseYearlyGraph";

interface MetricsProps {
  filter: string;
}

const MetricsCard2: React.FC<MetricsProps> = ({ filter }) => {
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
          ?.totalPaidInvoiceAmountThisWeek / 100,
      percentageWeeklyRevenue:
        totalWeeklyInvoicesAmountQuery.data?.totalWeeklyInvoicesAmount
          ?.percentageIncreaseInPaidInvoicesThisWeek,
      totalExpenseAmountThisWeek:
        getExpenseForWeek.data?.getExpensesForWeek?.totalExpenseAmountThisWeek /
        100,
      percentageIncreaseInExpenseThisWeek:
        getExpenseForWeek.data?.getExpensesForWeek
          ?.percentageIncreaseInExpenseThisWeek,
      totalPurchaseAmountThisWeek:
        getPurchaseForWeek.data?.getPurchasesForWeek
          ?.totalPurchaseAmountThisWeek / 100,
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
          ?.totalPaidInvoiceAmountThisMonth / 100,
      percentageMonthlyRevenue:
        totalMonthlyInvoicesAmount.data?.totalMonthlyInvoicesAmount
          ?.percentageIncreaseInInvoicesThisMonth,
      totalExpenseAmountThisMonth:
        getExpenseForMonth.data?.getExpensesForMonth
          ?.totalExpenseAmountThisMonth / 100,
      percentageIncreaseInExpenseThisMonth:
        getExpenseForMonth.data?.getExpensesForMonth
          ?.percentageIncreaseInExpenseThisMonth,
      totalPurchaseAmountThisMonth:
        getPurchaseForMonth.data?.getPurchaseForMonth
          ?.totalPurchaseAmountThisMonth / 100,
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
          ?.totalPaidInvoiceAmountThisQuarter / 100,
      percentageQuarterlyRevenue:
        totalQuarterlyInvoicesAmount.data?.totalQuarterlyInvoicesAmount
          ?.percentageIncreaseInInvoiceThisQuarter,
      totalExpenseAmountThisQuarter:
        getExpenseForQuarter.data?.getExpensesForQuarter
          ?.totalExpenseAmountThisQuarter / 100,
      percentageIncreaseInExpenseThisQuarter:
        getExpenseForQuarter.data?.getExpensesForQuarter
          ?.percentageIncreaseInExpensesThisQuarter,
      totalPurchaseAmountThisQuarter:
        getPurchaseForQuarter.data?.getPurchaseForQuarter
          ?.totalPurchaseAmountThisQuarter / 100,
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
          ?.totalPaidInvoiceAmountThisYear / 100,
      percentageYearlyRevenue:
        totalYearlyInvoicesAmount.data?.totalYearlyInvoicesAmount
          ?.percentageIncreaseInInvoiceThisYear,
      totalExpenseAmountThisYear:
        getExpenseForYear.data?.getExpensesForYear?.totalExpenseAmountThisYear /
        100,
      percentageIncreaseInExpenseThisYear:
        getExpenseForYear.data?.getExpensesForYear
          ?.percentageIncreaseInExpensesThisYear,
      totalPurchaseAmountThisYear:
        getPurchaseForYear.data?.getPurchaseForYear
          ?.totalPurchaseAmountThisYear / 100,
    };
  };

  const weeklyData = FetchWeeklyData();
  const monthlyData = FetchMonthlyData();
  const quarterlyData = FetchQuarterlyData();
  const yearlyData = FetchYearlyData();

  return (
    <>
      <div className=" flex justify-between text-primary-black">
        <p className=" text-[20px] tracking-[-0.3px]">Expenses</p>
        <Link href="/dashboard/expenses">
          <button className=" text-primary-blue text-sm tracking-[-0.2px]">
            See more
          </button>
        </Link>
      </div>
      <div className=" flex flex-col">
        <div className=" flex gap-y-1">
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
              <div className=" items-center text-primary-greytext font-medium flex text-[15px]">
                {/* <TrendingUp className=" text-[#4BB543] w-5 h-5" /> */}
                <span className="text-[#4BB543] mt-2 text-sm ml-2">
                  +{weeklyData?.percentageIncreaseInExpenseThisWeek}%
                </span>{" "}
              </div>
            )}
          {filter === "monthly" &&
            monthlyData?.percentageIncreaseInExpenseThisMonth! > 0 && (
              <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                {/* <TrendingUp className=" text-[#4BB543] w-5 h-5" /> */}
                <span className="text-[#4BB543] mt-2 text-sm ml-2">
                  +{monthlyData?.percentageIncreaseInExpenseThisMonth}%
                </span>{" "}
              </div>
            )}
          {filter === "quarterly" &&
            quarterlyData?.percentageIncreaseInExpenseThisQuarter! > 0 && (
              <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                {/* <TrendingUp className=" text-[#4BB543] w-5 h-5" /> */}
                <span className="text-[#4BB543] mt-2 text-sm ml-2">
                  +{quarterlyData?.percentageIncreaseInExpenseThisQuarter}%
                </span>{" "}
              </div>
            )}
          {filter === "yearly" &&
            yearlyData?.percentageIncreaseInExpenseThisYear! > 0 && (
              <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                {/* <TrendingUp className=" text-[#4BB543] w-5 h-5" /> */}
                <span className="text-[#4BB543] mt-2 text-sm ml-2">
                  +{yearlyData?.percentageIncreaseInExpenseThisYear}%
                </span>{" "}
              </div>
            )}
        </div>
        {filter === "weekly" && <ExpenseWeeklyGraph />}
        {filter === "monthly" && <ExpenseMonthlyGraph />}
        {filter === "quarterly" && <ExpenseQuarterlyGraph />}
        {filter === "yearly" && <ExpenseYearlyGraph />}
      </div>
    </>
  );
};

export default MetricsCard2;
