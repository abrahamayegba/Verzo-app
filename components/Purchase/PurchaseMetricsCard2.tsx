import React from "react";
import ArrowUpIcon from "../ui/icons/ArrowUpIcon";
import Graphflat from "../ui/icons/Graphflat";
import localStorage from "local-storage-fallback";
import {
  useGetPurchaseForMonthQuery,
  useGetPurchaseForQuarterQuery,
  useGetPurchaseForWeekQuery,
  useGetPurchaseForYearQuery,
} from "@/src/generated/graphql";
import Link from "next/link";
import GraphUp from "../ui/icons/GraphUp";
import { Plus } from "lucide-react";

interface MetricsProps {
  filter: string;
}

const PurchaseMetricsCard2: React.FC<MetricsProps> = ({ filter }) => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";

  const FetchWeeklyData = () => {
    const getPurchaseForWeek = useGetPurchaseForWeekQuery({
      variables: {
        businessId: businessId,
        weekly: true,
      },
    });
    return {
      totalPaidPurchaseAmountThisWeek:
        getPurchaseForWeek?.data?.getPurchasesForWeek
          ?.totalPaidPurchaseAmountThisWeek,
      numberOfPaidPurchasesThisWeek:
        getPurchaseForWeek.data?.getPurchasesForWeek?.paidPurchasesThisWeek,
    };
  };

  const FetchMonthlyData = () => {
    const getPurchaseForMonth = useGetPurchaseForMonthQuery({
      variables: {
        businessId: businessId,
        monthly: true,
      },
    });
    return {
      totalPaidPurchaseAmountThisMonth:
        getPurchaseForMonth?.data?.getPurchaseForMonth
          ?.totalPaidPurchaseAmountThisMonth,
      numberOfPaidPurchasesThisMonth:
        getPurchaseForMonth.data?.getPurchaseForMonth?.paidPurchasesThisMonth,
    };
  };

  const FetchQuarterlyData = () => {
    const getPurchaseForQuarter = useGetPurchaseForQuarterQuery({
      variables: {
        businessId: businessId,
        quarterly: true,
      },
    });
    return {
      totalPaidPurchaseAmountThisQuarter:
        getPurchaseForQuarter?.data?.getPurchaseForQuarter
          ?.totalPaidPurchaseAmountThisQuarter,
      numberOfPaidPurchasesThisQuarter:
        getPurchaseForQuarter.data?.getPurchaseForQuarter
          ?.paidPurchasesThisQuarter,
    };
  };

  const FetchYearlyData = () => {
    const getPurchaseForYear = useGetPurchaseForYearQuery({
      variables: {
        businessId: businessId,
        yearly: true,
      },
    });
    return {
      totalPaidPurchaseAmountThisYear:
        getPurchaseForYear?.data?.getPurchaseForYear
          ?.totalPaidPurchaseAmountThisYear,
      numberOfPaidPurchasesThisYear:
        getPurchaseForYear.data?.getPurchaseForYear?.paidPurchasesThisYear,
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
        <Link href="/dashboard/purchases">
          <button className=" text-primary-blue text-sm tracking-[-0.2px]">
            See more
          </button>
        </Link>
      </div>
      <div className=" flex justify-between flex-wrap">
        <div className=" flex flex-col gap-y-1">
          <p className=" text-[30px]  font-medium">
            {filter === "weekly" &&
              weeklyData?.totalPaidPurchaseAmountThisWeek?.toLocaleString(
                "en-NG",
                {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }
              )}
            {filter === "monthly" &&
              monthlyData?.totalPaidPurchaseAmountThisMonth?.toLocaleString(
                "en-NG",
                {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }
              )}
            {filter === "quarterly" &&
              quarterlyData?.totalPaidPurchaseAmountThisQuarter?.toLocaleString(
                "en-NG",
                {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }
              )}
            {filter === "yearly" &&
              yearlyData?.totalPaidPurchaseAmountThisYear?.toLocaleString(
                "en-NG",
                {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }
              )}
          </p>
          <div className=" items-center text-primary-greytext hidden">
            {filter === "weekly" &&
              weeklyData?.numberOfPaidPurchasesThisWeek! > 0 && (
                <div className=" flex items-center text-primary-greytext">
                  <Plus className=" w-4 h-4" />
                  <span className=" ml-[2px] mr-1">
                    {weeklyData?.numberOfPaidPurchasesThisWeek}
                  </span>{" "}
                  this week
                </div>
              )}
            {filter === "monthly" &&
              monthlyData?.numberOfPaidPurchasesThisMonth! > 0 && (
                <div className=" flex items-center text-primary-greytext">
                  <Plus className=" w-4 h-4" />
                  <span className=" ml-[2px] mr-1">
                    {monthlyData?.numberOfPaidPurchasesThisMonth}
                  </span>{" "}
                  this month
                </div>
              )}
            {filter === "quarterly" &&
              quarterlyData?.numberOfPaidPurchasesThisQuarter! > 0 && (
                <div className=" flex items-center text-primary-greytext">
                  <Plus className=" w-4 h-4" />
                  <span className=" ml-[2px] mr-1">
                    {quarterlyData?.numberOfPaidPurchasesThisQuarter}%
                  </span>{" "}
                  this quarter
                </div>
              )}
            {filter === "yearly" &&
              yearlyData?.numberOfPaidPurchasesThisYear! > 0 && (
                <div className=" flex items-center text-primary-greytext">
                  <Plus className=" w-4 h-4" />
                  <span className=" ml-[2px] mr-1">
                    {yearlyData?.numberOfPaidPurchasesThisYear}%
                  </span>{" "}
                  this year
                </div>
              )}
          </div>
        </div>
        {filter === "weekly" &&
          (weeklyData?.numberOfPaidPurchasesThisWeek === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
        {filter === "monthly" &&
          (monthlyData?.numberOfPaidPurchasesThisMonth === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
        {filter === "quarterly" &&
          (quarterlyData?.numberOfPaidPurchasesThisQuarter === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
        {filter === "yearly" &&
          (yearlyData?.numberOfPaidPurchasesThisYear === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
      </div>
    </>
  );
};

export default PurchaseMetricsCard2;
