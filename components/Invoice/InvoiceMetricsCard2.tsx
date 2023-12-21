import React from "react";
import GraphUp from "../ui/icons/GraphUp";
import Graphflat from "../ui/icons/Graphflat";
import localStorage from "local-storage-fallback";
import {
  useTotalMonthlyInvoicesAmountQuery,
  useTotalQuarterlyInvoicesAmountQuery,
  useTotalWeeklyInvoicesAmountQuery,
  useTotalYearlyInvoicesAmountQuery,
} from "@/src/generated/graphql";
import ArrowUpIcon from "../ui/icons/ArrowUpIcon";

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
      <div className=" flex justify-between flex-wrap">
        <div className=" flex flex-col gap-y-1">
          <p className=" text-[30px]  font-medium">
            {filter === "weekly" &&
              weeklyData?.totalPendingInvoicesAmountThisWeek?.toLocaleString(
                "en-NG",
                {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }
              )}
            {filter === "monthly" &&
              monthlyData?.totalPendingInvoicesAmountThisMonth?.toLocaleString(
                "en-NG",
                {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }
              )}
            {filter === "quarterly" &&
              quarterlyData?.totalPendingInvoicesAmountThisQuarter?.toLocaleString(
                "en-NG",
                {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }
              )}
            {filter === "yearly" &&
              yearlyData?.totalPendingInvoicesAmountThisYear?.toLocaleString(
                "en-NG",
                {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }
              )}
          </p>
          <div className=" items-center text-primary-greytext">
            {filter === "weekly" &&
              weeklyData?.percentagePendingInvoicesThisWeek! > 0 && (
                <div className=" flex items-center text-primary-greytext">
                  <span>
                    <ArrowUpIcon />
                  </span>
                  <span className="text-[#4BB543] mx-1">
                    {weeklyData?.percentagePendingInvoicesThisWeek}%
                  </span>{" "}
                  since last month
                </div>
              )}
            {filter === "monthly" &&
              monthlyData?.percentagePendingInvoicesThisMonth! > 0 && (
                <div className=" flex items-center text-primary-greytext">
                  <span>
                    <ArrowUpIcon />
                  </span>
                  <span className="text-[#4BB543] mx-1">
                    {monthlyData?.percentagePendingInvoicesThisMonth}%
                  </span>{" "}
                  since last month
                </div>
              )}
            {filter === "quarterly" &&
              quarterlyData?.percentagePendingInvoicesThisQuarter! > 0 && (
                <div className=" flex items-center text-primary-greytext">
                  <span>
                    <ArrowUpIcon />
                  </span>
                  <span className="text-[#4BB543] mx-1">
                    {quarterlyData?.percentagePendingInvoicesThisQuarter}%
                  </span>{" "}
                  since last month
                </div>
              )}
            {filter === "yearly" &&
              yearlyData?.percentagePendingInvoicesThisYear! > 0 && (
                <div className=" flex items-center text-primary-greytext">
                  <span>
                    <ArrowUpIcon />
                  </span>
                  <span className="text-[#4BB543] mx-1">
                    {yearlyData?.percentagePendingInvoicesThisYear}%
                  </span>{" "}
                  since last month
                </div>
              )}
          </div>
        </div>
        {filter === "weekly" &&
          (weeklyData?.percentagePendingInvoicesThisWeek === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
        {filter === "monthly" &&
          (monthlyData?.percentagePendingInvoicesThisMonth === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
        {filter === "quarterly" &&
          (quarterlyData?.percentagePendingInvoicesThisQuarter === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
        {filter === "yearly" &&
          (yearlyData?.percentagePendingInvoicesThisYear === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
      </div>
    </>
  );
};

export default InvoiceMetricsCard2;
