import React from "react";
import localStorage from "local-storage-fallback";
import {
  useTotalMonthlyInvoicesAmountQuery,
  useTotalQuarterlyInvoicesAmountQuery,
  useTotalWeeklyInvoicesAmountQuery,
  useTotalYearlyInvoicesAmountQuery,
} from "@/src/generated/graphql";
import { TrendingUp } from "lucide-react";
import InvoiceDashboardPaidWeeklygraph from "../graphs/invoice/invoicedashboard/weekly/InvoiceDashboardPaidWeeklyGraph";
import InvoiceDashboardPaidMonthlyGraph from "../graphs/invoice/invoicedashboard/monthly/InvoiceDashboardPaidMonthlyGraph";
import InvoiceDashboardPaidQuarterlyGraph from "../graphs/invoice/invoicedashboard/quarterly/InvoiceDashboardPaidQuarterlyGraph";
import InvoiceDashboardPaidYearlyGraph from "../graphs/invoice/invoicedashboard/yearly/InvoiceDashboardPaidYearlyGraph";
interface MetricsProps {
  filter: string;
}

const InvoiceMetricsCard1: React.FC<MetricsProps> = ({ filter }) => {
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
      totalInvoiceAmountThisWeek:
        totalWeeklyInvoicesAmountQuery.data?.totalWeeklyInvoicesAmount
          ?.totalPaidInvoiceAmountThisWeek,
      percentagePaidInvoicesThisWeek:
        totalWeeklyInvoicesAmountQuery.data?.totalWeeklyInvoicesAmount
          ?.percentageIncreaseInPaidInvoicesThisWeek,
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
      totalInvoiceAmountThisMonth:
        totalMonthlyInvoicesAmountQuery.data?.totalMonthlyInvoicesAmount
          ?.totalPaidInvoiceAmountThisMonth,
      percentagePaidInvoicesThisMonth:
        totalMonthlyInvoicesAmountQuery.data?.totalMonthlyInvoicesAmount
          ?.percentageIncreaseInPaidInvoicesForMonth,
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
      totalInvoiceAmountThisQuarter:
        totalQuarterlyInvoicesAmountQuery.data?.totalQuarterlyInvoicesAmount
          ?.totalPaidInvoiceAmountThisQuarter,
      percentagePaidInvoicesThisQuarter:
        totalQuarterlyInvoicesAmountQuery.data?.totalQuarterlyInvoicesAmount
          ?.percentageIncreaseInInvoicePaidThisQuarter,
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
      totalInvoiceAmountThisYear:
        totalYearlyInvoicesAmountQuery.data?.totalYearlyInvoicesAmount
          ?.totalPaidInvoiceAmountThisYear,
      percentagePaidInvoicesThisYear:
        totalYearlyInvoicesAmountQuery.data?.totalYearlyInvoicesAmount
          ?.percentageIncreaseInInvoicesPaidThisYear,
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
      </div>
      <div className=" flex flex-col">
        <div className="flex justify-between gap-y-1">
          <p className=" text-[30px]  font-medium">
            {filter === "weekly" &&
              (weeklyData?.totalInvoiceAmountThisWeek / 100)?.toLocaleString(
                "en-NG",
                {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }
              )}
            {filter === "monthly" &&
              (monthlyData?.totalInvoiceAmountThisMonth / 100)?.toLocaleString(
                "en-NG",
                {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }
              )}
            {filter === "quarterly" &&
              (
                quarterlyData?.totalInvoiceAmountThisQuarter / 100
              )?.toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
                minimumFractionDigits: 2,
              })}
            {filter === "yearly" &&
              (yearlyData?.totalInvoiceAmountThisYear / 100)?.toLocaleString(
                "en-NG",
                {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }
              )}
          </p>
          <div className=" flex items-center text-primary-greytext">
            {filter === "weekly" &&
              weeklyData?.percentagePaidInvoicesThisWeek! > 0 && (
                <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                  <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                  <span className="text-[#4BB543] ml-2">
                    {weeklyData?.percentagePaidInvoicesThisWeek}%
                  </span>{" "}
                </div>
              )}
            {filter === "monthly" &&
              monthlyData?.percentagePaidInvoicesThisMonth! > 0 && (
                <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                  <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                  <span className="text-[#4BB543] ml-2">
                    {monthlyData?.percentagePaidInvoicesThisMonth}%
                  </span>{" "}
                </div>
              )}
            {filter === "quarterly" &&
              quarterlyData?.percentagePaidInvoicesThisQuarter! > 0 && (
                <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                  <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                  <span className="text-[#4BB543] ml-2">
                    {quarterlyData?.percentagePaidInvoicesThisQuarter}%
                  </span>{" "}
                </div>
              )}
            {filter === "yearly" &&
              yearlyData?.percentagePaidInvoicesThisYear! > 0 && (
                <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                  <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                  <span className="text-[#4BB543] ml-2">
                    {yearlyData?.percentagePaidInvoicesThisYear}%
                  </span>{" "}
                </div>
              )}
          </div>
        </div>
        {filter === "weekly" && <InvoiceDashboardPaidWeeklygraph />}
        {filter === "monthly" && <InvoiceDashboardPaidMonthlyGraph />}
        {filter === "quarterly" && <InvoiceDashboardPaidQuarterlyGraph />}
        {filter === "yearly" && <InvoiceDashboardPaidYearlyGraph />}
      </div>
    </>
  );
};

export default InvoiceMetricsCard1;
