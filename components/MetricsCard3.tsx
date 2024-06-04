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
import { TrendingUp } from "lucide-react";
import PurchaseWeeklyGraph from "./graphs/purchase/dashboard/PurchaseWeeklyGraph";
import PurchaseMonthlyGraph from "./graphs/purchase/dashboard/PurchaseMonthlyGraph";
import PurchaseQuarterlyGraph from "./graphs/purchase/dashboard/PurchaseQuarterlyGraph";
import PurchaseYearlyGraph from "./graphs/purchase/dashboard/PurchaseYearlyGraph";

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
      <div className=" flex flex-col">
        <div className=" flex justify-between gap-y-1">
          <p className=" text-[30px] font-medium">
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
              <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                <span className="text-[#4BB543] ml-2">
                  {weeklyData?.percentageIncreaseInPurchaseThisWeek}%
                </span>
              </div>
            )}
          {filter === "monthly" &&
            monthlyData?.percentageIncreaseInPurchaseThisMonth! > 0 && (
              <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                <span className="text-[#4BB543] ml-2">
                  {monthlyData?.percentageIncreaseInPurchaseThisMonth}%
                </span>{" "}
              </div>
            )}
          {filter === "quarterly" &&
            quarterlyData?.percentageIncreaseInPurchaseThisQuarter! > 0 && (
              <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                <span className="text-[#4BB543] ml-2">
                  {quarterlyData?.percentageIncreaseInPurchaseThisQuarter}%
                </span>{" "}
              </div>
            )}
          {filter === "yearly" &&
            yearlyData?.percentageIncreaseInPurchaseThisYear! > 0 && (
              <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                <span className="text-[#4BB543] ml-2">
                  {yearlyData?.percentageIncreaseInPurchaseThisYear}%
                </span>{" "}
              </div>
            )}
        </div>
        {filter === "weekly" && <PurchaseWeeklyGraph />}
        {filter === "monthly" && <PurchaseMonthlyGraph />}
        {filter === "quarterly" && <PurchaseQuarterlyGraph />}
        {filter === "yearly" && <PurchaseYearlyGraph />}
      </div>
    </>
  );
};

export default MetricsCard3;
