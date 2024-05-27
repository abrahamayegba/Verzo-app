import React from "react";
import localStorage from "local-storage-fallback";
import {
  useTotalMonthlyInvoicesAmountQuery,
  useTotalQuarterlyInvoicesAmountQuery,
  useTotalWeeklyInvoicesAmountQuery,
  useTotalYearlyInvoicesAmountQuery,
} from "@/src/generated/graphql";
import { TrendingUp } from "lucide-react";
import InvoiceDashboardPendingWeeklygraph from "../graphs/invoice/invoicedashboard/weekly/InvoiceDashboardPendingWeeklyGraph";
import InvoiceDashboardPendingMonthlyGraph from "../graphs/invoice/invoicedashboard/monthly/InvoiceDashboardPendingMonthlyGraph";
import InvoiceDashboardPendingQuarterlyGraph from "../graphs/invoice/invoicedashboard/quarterly/InvoiceDashboardPendingQuarterlyGraph";
import InvoiceDashboardPendingYearlyGraph from "../graphs/invoice/invoicedashboard/yearly/InvoiceDashboardPendingYearlyGraph";

interface MetricsProps {
  filter: string;
}

const InvoiceMetricsCard2: React.FC<MetricsProps> = ({ filter }) => {
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
      totalPendingInvoicesAmountThisWeek:
        totalWeeklyInvoicesAmountQuery?.data?.totalWeeklyInvoicesAmount
          ?.totalPendingInvoiceAmountThisWeek,
      percentagePendingInvoicesThisWeek:
        totalWeeklyInvoicesAmountQuery.data?.totalWeeklyInvoicesAmount
          ?.percentageIncreaseInPendingInvoiceThisWeek,
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
      totalPendingInvoicesAmountThisMonth:
        totalMonthlyInvoicesAmountQuery?.data?.totalMonthlyInvoicesAmount
          ?.totalPendingInvoiceAmountThisMonth,
      percentagePendingInvoicesThisMonth:
        totalMonthlyInvoicesAmountQuery.data?.totalMonthlyInvoicesAmount
          ?.percentageIncreaseInPendingInvoiceThisMonth,
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
      totalPendingInvoicesAmountThisQuarter:
        totalQuarterlyInvoicesAmountQuery?.data?.totalQuarterlyInvoicesAmount
          ?.totalPendingInvoiceAmountThisQuarter,
      percentagePendingInvoicesThisQuarter:
        totalQuarterlyInvoicesAmountQuery.data?.totalQuarterlyInvoicesAmount
          ?.percentageIncreaseInPendingInvoiceThisQuarter,
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
      totalPendingInvoicesAmountThisYear:
        totalYearlyInvoicesAmountQuery?.data?.totalYearlyInvoicesAmount
          ?.totalPendingInvoiceAmountThisYear,
      percentagePendingInvoicesThisYear:
        totalYearlyInvoicesAmountQuery.data?.totalYearlyInvoicesAmount
          ?.percentageIncreaseInPendingInvoiceThisYear,
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
      </div>
      <div className=" flex flex-col">
        <div className=" flex justify-between gap-y-1">
          <p className=" text-[30px] font-medium">
            {filter === "weekly" &&
              (
                weeklyData?.totalPendingInvoicesAmountThisWeek / 100
              )?.toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
                minimumFractionDigits: 2,
              })}
            {filter === "monthly" &&
              (
                monthlyData?.totalPendingInvoicesAmountThisMonth / 100
              )?.toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
                minimumFractionDigits: 2,
              })}
            {filter === "quarterly" &&
              (
                quarterlyData?.totalPendingInvoicesAmountThisQuarter / 100
              )?.toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
                minimumFractionDigits: 2,
              })}
            {filter === "yearly" &&
              (
                yearlyData?.totalPendingInvoicesAmountThisYear / 100
              )?.toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
                minimumFractionDigits: 2,
              })}
          </p>
          <div className=" flex items-center text-primary-greytext">
            {filter === "weekly" &&
              weeklyData?.percentagePendingInvoicesThisWeek! > 0 && (
                <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                  <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                  <span className="text-[#4BB543] ml-2">
                    {weeklyData?.percentagePendingInvoicesThisWeek}%
                  </span>{" "}
                </div>
              )}
            {filter === "monthly" &&
              monthlyData?.percentagePendingInvoicesThisMonth! > 0 && (
                <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                  <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                  <span className="text-[#4BB543] ml-2">
                    {monthlyData?.percentagePendingInvoicesThisMonth}%
                  </span>{" "}
                </div>
              )}
            {filter === "quarterly" &&
              quarterlyData?.percentagePendingInvoicesThisQuarter! > 0 && (
                <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                  <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                  <span className="text-[#4BB543] ml-2">
                    {quarterlyData?.percentagePendingInvoicesThisQuarter}%
                  </span>{" "}
                </div>
              )}
            {filter === "yearly" &&
              yearlyData?.percentagePendingInvoicesThisYear! > 0 && (
                <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                  <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                  <span className="text-[#4BB543] ml-2">
                    {yearlyData?.percentagePendingInvoicesThisYear}%
                  </span>{" "}
                </div>
              )}
          </div>
        </div>
        {filter === "weekly" && <InvoiceDashboardPendingWeeklygraph />}
        {filter === "monthly" && <InvoiceDashboardPendingMonthlyGraph />}
        {filter === "quarterly" && <InvoiceDashboardPendingQuarterlyGraph />}
        {filter === "yearly" && <InvoiceDashboardPendingYearlyGraph />}
      </div>
    </>
  );
};

export default InvoiceMetricsCard2;
