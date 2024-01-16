import React from "react";
import GraphUp from "../ui/icons/GraphUp";
import localStorage from "local-storage-fallback";
import {
  useTotalMonthlyInvoicesAmountQuery,
  useTotalQuarterlyInvoicesAmountQuery,
  useTotalWeeklyInvoicesAmountQuery,
  useTotalYearlyInvoicesAmountQuery,
} from "@/src/generated/graphql";
import ArrowUpIcon from "../ui/icons/ArrowUpIcon";
import Graphflat from "../ui/icons/Graphflat";
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
      totalInvoiceAmountThisMonth:
        totalMonthlyInvoicesAmountQuery.data?.totalMonthlyInvoicesAmount
          ?.totalPaidInvoiceAmountThisMonth,
      percentagePaidInvoicesThisMonth:
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
      totalInvoiceAmountThisQuarter:
        totalQuarterlyInvoicesAmountQuery.data?.totalQuarterlyInvoicesAmount
          ?.totalPaidInvoiceAmountThisQuarter,
      percentagePaidInvoicesThisQuarter:
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
      totalInvoiceAmountThisYear:
        totalYearlyInvoicesAmountQuery.data?.totalYearlyInvoicesAmount
          ?.totalPaidInvoiceAmountThisYear,
      percentagePaidInvoicesThisYear:
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
        <p className=" text-[20px] tracking-[-0.3px]">Paid</p>
      </div>
      <div className=" flex justify-between flex-wrap h-[70px]">
        <div className=" flex flex-col gap-y-1">
          <p className=" text-[30px]  font-medium">
            {filter === "weekly" &&
              weeklyData?.totalInvoiceAmountThisWeek?.toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
                minimumFractionDigits: 2,
              })}
            {filter === "monthly" &&
              monthlyData?.totalInvoiceAmountThisMonth?.toLocaleString(
                "en-NG",
                {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }
              )}
            {filter === "quarterly" &&
              quarterlyData?.totalInvoiceAmountThisQuarter?.toLocaleString(
                "en-NG",
                {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }
              )}
            {filter === "yearly" &&
              yearlyData?.totalInvoiceAmountThisYear?.toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
                minimumFractionDigits: 2,
              })}
          </p>
          <div className=" flex items-center text-primary-greytext">
            {filter === "weekly" &&
              weeklyData?.percentagePaidInvoicesThisWeek! > 0 && (
                <div className=" flex items-center text-primary-greytext text-[15px]">
                  <span>
                    <ArrowUpIcon />
                  </span>
                  <span className="text-[#4BB543] mx-1">
                    {weeklyData?.percentagePaidInvoicesThisWeek}%
                  </span>{" "}
                  this week
                </div>
              )}
            {filter === "monthly" &&
              monthlyData?.percentagePaidInvoicesThisMonth! > 0 && (
                <div className=" flex items-center text-primary-greytext text-[15px]">
                  <span>
                    <ArrowUpIcon />
                  </span>
                  <span className="text-[#4BB543] mx-1">
                    {monthlyData?.percentagePaidInvoicesThisMonth}%
                  </span>{" "}
                  this month
                </div>
              )}
            {filter === "quarterly" &&
              quarterlyData?.percentagePaidInvoicesThisQuarter! > 0 && (
                <div className=" flex items-center text-primary-greytext text-[15px]">
                  <span>
                    <ArrowUpIcon />
                  </span>
                  <span className="text-[#4BB543] mx-1">
                    {quarterlyData?.percentagePaidInvoicesThisQuarter}%
                  </span>{" "}
                  this quarter
                </div>
              )}
            {filter === "yearly" &&
              yearlyData?.percentagePaidInvoicesThisYear! > 0 && (
                <div className=" flex items-center text-primary-greytext text-[15px]">
                  <span>
                    <ArrowUpIcon />
                  </span>
                  <span className="text-[#4BB543] mx-1">
                    {yearlyData?.percentagePaidInvoicesThisYear}%
                  </span>{" "}
                  this year
                </div>
              )}
          </div>
        </div>
        {filter === "weekly" &&
          (weeklyData?.percentagePaidInvoicesThisWeek === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
        {filter === "monthly" &&
          (monthlyData?.percentagePaidInvoicesThisMonth === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
        {filter === "quarterly" &&
          (quarterlyData?.percentagePaidInvoicesThisQuarter === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
        {filter === "yearly" &&
          (yearlyData?.percentagePaidInvoicesThisYear === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
      </div>
    </>
  );
};

export default InvoiceMetricsCard1;
