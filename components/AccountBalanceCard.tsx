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
import localStorage from "local-storage-fallback";
import React from "react";
import { TrendingUp } from "lucide-react";

interface MetricsProps {
  filter: string;
}

const AccountBalanceCard: React.FC<MetricsProps> = ({ filter }) => {
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
          ?.percentageOfIncreaseInInvoicesThisWeek,
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
        <p className=" text-[20px] tracking-[-0.3px]">Cash Balance</p>
      </div>
      <div className=" flex flex-col">
        <div className=" flex justify-between gap-y-1">
          <p className=" text-[30px] font-medium">
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
            {filter === "quarterly" &&
              quarterlyData?.quarterlyRevenue?.toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
                minimumFractionDigits: 2,
              })}
            {filter === "yearly" &&
              yearlyData?.yearlyRevenue?.toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
                minimumFractionDigits: 2,
              })}
          </p>
          {filter === "weekly" && weeklyData?.percentageWeeklyRevenue! > 0 && (
            <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
              <TrendingUp className=" text-[#4BB543] w-5 h-5" />
              <span className="text-[#4BB543] ml-2">
                {weeklyData?.percentageWeeklyRevenue}%
              </span>{" "}
            </div>
          )}
          {filter === "monthly" &&
            monthlyData?.percentageMonthlyRevenue! > 0 && (
              <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                <span className="text-[#4BB543] ml-2">
                  {monthlyData?.percentageMonthlyRevenue}%
                </span>{" "}
              </div>
            )}
          {filter === "quarterly" &&
            quarterlyData?.percentageQuarterlyRevenue! > 0 && (
              <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                <span className="text-[#4BB543] ml-2">
                  {quarterlyData?.percentageQuarterlyRevenue}%
                </span>{" "}
              </div>
            )}
          {filter === "yearly" && yearlyData?.percentageYearlyRevenue! > 0 && (
            <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
              <TrendingUp className=" text-[#4BB543] w-5 h-5" />
              <span className="text-[#4BB543] ml-1">
                {yearlyData?.percentageYearlyRevenue}%
              </span>{" "}
            </div>
          )}
        </div>
        {/* {filter === "weekly" && <Invoicegraph />}
        {filter === "monthly" && <InvoiceMonthlyGraph />}
        {filter === "quarterly" && <InvoiceQuarterlyGraph />}
        {filter === "yearly" && <InvoiceYearlyGraph />} */}
      </div>
    </>
  );
};

export default AccountBalanceCard;
