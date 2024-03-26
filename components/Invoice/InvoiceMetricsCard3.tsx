import React from "react";
import localStorage from "local-storage-fallback";
import {
  useTotalMonthlyInvoicesAmountQuery,
  useTotalQuarterlyInvoicesAmountQuery,
  useTotalWeeklyInvoicesAmountQuery,
  useTotalYearlyInvoicesAmountQuery,
} from "@/src/generated/graphql";
import { TrendingUp } from "lucide-react";
import InvoiceDashboardTotalWeeklygraph from "../graphs/invoice/invoicedashboard/weekly/InvoiceDashboardTotalWeeklyGraph";
import InvoiceDashboardTotalMonthlyGraph from "../graphs/invoice/invoicedashboard/monthly/InvoiceDashboardTotalMonthlyGraph";
import InvoiceDashboardTotalQuarterlyGraph from "../graphs/invoice/invoicedashboard/quarterly/InvoiceDashboardTotalQuarterlyGraph";
import InvoiceDashboardTotalYearlyGraph from "../graphs/invoice/invoicedashboard/yearly/invoiceDashboardTotalYearlyGraph";

interface MetricsProps {
  filter: string;
}

const InvoiceMetricsCard3: React.FC<MetricsProps> = ({ filter }) => {
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
    return {
      totalInvoicesAmountThisWeek:
        totalWeeklyInvoicesAmountQuery?.data?.totalWeeklyInvoicesAmount
          ?.totalInvoiceAmountForWeek,
      percentageInvoicesThisWeek:
        totalWeeklyInvoicesAmountQuery.data?.totalWeeklyInvoicesAmount
          ?.percentageOfIncreaseInInvoicesThisWeek,
    };
  };

  const FetchMonthlyData = () => {
    const totalMonthlyInvoicesAmountQuery = useTotalMonthlyInvoicesAmountQuery({
      variables: {
        businessId: businessId,
        monthly: true,
      },
    });
    return {
      totalInvoicesAmountThisMonth:
        totalMonthlyInvoicesAmountQuery?.data?.totalMonthlyInvoicesAmount
          ?.totalInvoiceAmountForMonth,
      percentageInvoicesThisMonth:
        totalMonthlyInvoicesAmountQuery.data?.totalMonthlyInvoicesAmount
          ?.percentageIncreaseInInvoicesThisMonth,
    };
  };

  const FetchQuarterlyData = () => {
    const totalQuarterlyInvoicesAmountQuery =
      useTotalQuarterlyInvoicesAmountQuery({
        variables: {
          businessId: businessId,
          quarterly: true,
        },
      });
    return {
      totalInvoicesAmountThisQuarter:
        totalQuarterlyInvoicesAmountQuery?.data?.totalQuarterlyInvoicesAmount
          ?.totalInvoiceAmountForQuarter,
      percentageInvoicesThisQuarter:
        totalQuarterlyInvoicesAmountQuery.data?.totalQuarterlyInvoicesAmount
          ?.percentageIncreaseInInvoiceThisQuarter,
    };
  };

  const FetchYearlyData = () => {
    const totalYearlyInvoicesAmountQuery = useTotalYearlyInvoicesAmountQuery({
      variables: {
        businessId: businessId,
        yearly: true,
      },
    });
    return {
      totalInvoicesAmountThisYear:
        totalYearlyInvoicesAmountQuery?.data?.totalYearlyInvoicesAmount
          ?.totalInvoiceAmountForYear,
      percentageInvoicesThisYear:
        totalYearlyInvoicesAmountQuery.data?.totalYearlyInvoicesAmount
          ?.percentageIncreaseInInvoiceThisYear,
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
      </div>
      <div className=" flex flex-col">
        <div className=" flex justify-between gap-y-1">
          <p className=" text-[30px] font-medium">
            {filter === "weekly" &&
              weeklyData?.totalInvoicesAmountThisWeek?.toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
                minimumFractionDigits: 2,
              })}
            {filter === "monthly" &&
              monthlyData?.totalInvoicesAmountThisMonth?.toLocaleString(
                "en-NG",
                {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }
              )}
            {filter === "quarterly" &&
              quarterlyData?.totalInvoicesAmountThisQuarter?.toLocaleString(
                "en-NG",
                {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }
              )}
            {filter === "yearly" &&
              yearlyData?.totalInvoicesAmountThisYear?.toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
                minimumFractionDigits: 2,
              })}
          </p>
          <div className=" flex items-center text-primary-greytext ">
            {filter === "weekly" &&
              weeklyData?.percentageInvoicesThisWeek! > 0 && (
                <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                  <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                  <span className="text-[#4BB543] ml-2">
                    {weeklyData?.percentageInvoicesThisWeek}%
                  </span>{" "}
                </div>
              )}
            {filter === "monthly" &&
              monthlyData?.percentageInvoicesThisMonth! > 0 && (
                <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                  <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                  <span className="text-[#4BB543] ml-2">
                    {monthlyData?.percentageInvoicesThisMonth}%
                  </span>{" "}
                </div>
              )}
            {filter === "quarterly" &&
              quarterlyData?.percentageInvoicesThisQuarter! > 0 && (
                <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                  <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                  <span className="text-[#4BB543] ml-2">
                    {quarterlyData?.percentageInvoicesThisQuarter}%
                  </span>{" "}
                </div>
              )}
            {filter === "yearly" &&
              yearlyData?.percentageInvoicesThisYear! > 0 && (
                <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                  <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                  <span className="text-[#4BB543] ml-2">
                    {yearlyData?.percentageInvoicesThisYear}%
                  </span>{" "}
                </div>
              )}
          </div>
        </div>
        {filter === "weekly" && <InvoiceDashboardTotalWeeklygraph />}
        {filter === "monthly" && <InvoiceDashboardTotalMonthlyGraph />}
        {filter === "quarterly" && <InvoiceDashboardTotalQuarterlyGraph />}
        {filter === "yearly" && <InvoiceDashboardTotalYearlyGraph />}
      </div>
    </>
  );
};

export default InvoiceMetricsCard3;
