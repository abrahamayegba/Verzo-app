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
import Link from "next/link";
import ArrowUpIcon from "../ui/icons/ArrowUpIcon";

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
      totalOverdueInvoicesAmountThisWeek:
        totalWeeklyInvoicesAmountQuery?.data?.totalWeeklyInvoicesAmount
          ?.totalOverDueInvoiceAmountThisWeek,
      percentageOverdueInvoicesThisWeek:
        totalWeeklyInvoicesAmountQuery.data?.totalWeeklyInvoicesAmount
          ?.percentageIncreaseInOverdueInvoicesThisWeek,
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
      totalOverdueInvoicesAmountThisMonth:
        totalMonthlyInvoicesAmountQuery?.data?.totalMonthlyInvoicesAmount
          ?.totalOverdueInvoiceAmountThisMonth,
      percentageOverdueInvoicesThisMonth:
        totalMonthlyInvoicesAmountQuery.data?.totalMonthlyInvoicesAmount
          ?.percentageIncreaseInOverdueInvoicesThisMonth,
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
      totalOverdueInvoicesAmountThisQuarter:
        totalQuarterlyInvoicesAmountQuery?.data?.totalQuarterlyInvoicesAmount
          ?.totalOverdueInvoiceAmountThisQuarter,
      percentageOverdueInvoicesThisQuarter:
        totalQuarterlyInvoicesAmountQuery.data?.totalQuarterlyInvoicesAmount
          ?.percentageIncreaseInOverdueInvoiceThisQuarter,
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
      totalOverdueInvoicesAmountThisYear:
        totalYearlyInvoicesAmountQuery?.data?.totalYearlyInvoicesAmount
          ?.totalOverdueInvoiceAmountThisYear,
      percentageOverdueInvoicesThisYear:
        totalYearlyInvoicesAmountQuery.data?.totalYearlyInvoicesAmount
          ?.percentageIncreaseInOverdueInvoicesThisYear,
    };
  };

  const weeklyData = FetchWeeklyData();
  const monthlyData = FetchMonthlyData();
  const quarterlyData = FetchQuarterlyData();
  const yearlyData = FetchYearlyData();
  return (
    <>
      <div className=" flex justify-between text-primary-black">
        <p className=" text-[20px] tracking-[-0.3px]">Overdue</p>
        <Link href="/dashboard/invoices">
          <button className=" text-primary-blue text-sm tracking-[-0.2px]">
            See more
          </button>
        </Link>
      </div>
      <div className=" flex justify-between flex-wrap">
        <div className=" flex flex-col gap-y-1">
          <p className=" text-[30px]  font-medium">
            {filter === "weekly" &&
              weeklyData?.totalOverdueInvoicesAmountThisWeek?.toLocaleString(
                "en-NG",
                {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }
              )}
            {filter === "monthly" &&
              monthlyData?.totalOverdueInvoicesAmountThisMonth?.toLocaleString(
                "en-NG",
                {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }
              )}
            {filter === "quarterly" &&
              quarterlyData?.totalOverdueInvoicesAmountThisQuarter?.toLocaleString(
                "en-NG",
                {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }
              )}
            {filter === "yearly" &&
              yearlyData?.totalOverdueInvoicesAmountThisYear?.toLocaleString(
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
              weeklyData?.percentageOverdueInvoicesThisWeek! > 0 && (
                <div className=" flex items-center text-primary-greytext">
                  <span>
                    <ArrowUpIcon />
                  </span>
                  <span className="text-[#4BB543] mx-1">
                    {weeklyData?.percentageOverdueInvoicesThisWeek}%
                  </span>{" "}
                  since last month
                </div>
              )}
            {filter === "monthly" &&
              monthlyData?.percentageOverdueInvoicesThisMonth! > 0 && (
                <div className=" flex items-center text-primary-greytext">
                  <span>
                    <ArrowUpIcon />
                  </span>
                  <span className="text-[#4BB543] mx-1">
                    {monthlyData?.percentageOverdueInvoicesThisMonth}%
                  </span>{" "}
                  since last month
                </div>
              )}
            {filter === "quarterly" &&
              quarterlyData?.percentageOverdueInvoicesThisQuarter! > 0 && (
                <div className=" flex items-center text-primary-greytext">
                  <span>
                    <ArrowUpIcon />
                  </span>
                  <span className="text-[#4BB543] mx-1">
                    {quarterlyData?.percentageOverdueInvoicesThisQuarter}%
                  </span>{" "}
                  since last month
                </div>
              )}
            {filter === "yearly" &&
              yearlyData?.percentageOverdueInvoicesThisYear! > 0 && (
                <div className=" flex items-center text-primary-greytext">
                  <span>
                    <ArrowUpIcon />
                  </span>
                  <span className="text-[#4BB543] mx-1">
                    {yearlyData?.percentageOverdueInvoicesThisYear}%
                  </span>{" "}
                  since last month
                </div>
              )}
          </div>
        </div>
        {filter === "weekly" &&
          (weeklyData?.percentageOverdueInvoicesThisWeek === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
        {filter === "monthly" &&
          (monthlyData?.percentageOverdueInvoicesThisMonth === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
        {filter === "quarterly" &&
          (quarterlyData?.percentageOverdueInvoicesThisQuarter === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
        {filter === "yearly" &&
          (yearlyData?.percentageOverdueInvoicesThisYear === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
      </div>
    </>
  );
};

export default InvoiceMetricsCard3;
