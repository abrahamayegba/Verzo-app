import React from "react";
import ArrowUpIcon from "../ui/icons/ArrowUpIcon";
import GraphUp from "../ui/icons/GraphUp";
import localStorage from "local-storage-fallback";
import {
  useGetPurchaseForMonthQuery,
  useGetPurchaseForQuarterQuery,
  useGetPurchaseForWeekQuery,
  useGetPurchaseForYearQuery,
} from "@/src/generated/graphql";
import Link from "next/link";
import Graphflat from "../ui/icons/Graphflat";
import { Plus } from "lucide-react";

interface MetricsProps {
  filter: string;
}

const PurchaseMetricsCard3: React.FC<MetricsProps> = ({ filter }) => {
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
      totalPendingPurchaseAmountThisWeek:
        getPurchaseForWeek?.data?.getPurchasesForWeek
          ?.totalPendingPurchaseAmountThisWeek,
      numberOfPendingPurchasesThisWeek:
        getPurchaseForWeek.data?.getPurchasesForWeek?.pendingPurchasesThisWeek,
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
      totalPendingPurchaseAmountThisMonth:
        getPurchaseForMonth?.data?.getPurchaseForMonth
          ?.totalPendingPurchaseAmountThisMonth,
      numberOfPendingPurchasesThisMonth:
        getPurchaseForMonth.data?.getPurchaseForMonth
          ?.pendingPurchasesThisMonth,
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
      totalPendingPurchaseAmountThisQuarter:
        getPurchaseForQuarter?.data?.getPurchaseForQuarter
          ?.totalPendingPurchaseAmountThisQuarter,
      numberOfPendingPurchasesThisQuarter:
        getPurchaseForQuarter.data?.getPurchaseForQuarter
          ?.pendingpurchasesThisQuarter,
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
      totalPendingPurchaseAmountThisYear:
        getPurchaseForYear?.data?.getPurchaseForYear
          ?.totalPendingPurchaseAmountThisYear,
      numberOfPendingPurchasesThisYear:
        getPurchaseForYear.data?.getPurchaseForYear?.pendingPurchasesThisYear,
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
              weeklyData?.totalPendingPurchaseAmountThisWeek?.toLocaleString(
                "en-NG",
                {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }
              )}
            {filter === "monthly" &&
              monthlyData?.totalPendingPurchaseAmountThisMonth?.toLocaleString(
                "en-NG",
                {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }
              )}
            {filter === "quarterly" &&
              quarterlyData?.totalPendingPurchaseAmountThisQuarter?.toLocaleString(
                "en-NG",
                {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }
              )}
            {filter === "yearly" &&
              yearlyData?.totalPendingPurchaseAmountThisYear?.toLocaleString(
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
              weeklyData?.numberOfPendingPurchasesThisWeek! > 0 && (
                <div className=" flex items-center text-primary-greytext">
                  <Plus className=" w-4 h-4" />
                  <span className=" ml-[2px] mr-1">
                    {weeklyData?.numberOfPendingPurchasesThisWeek}
                  </span>{" "}
                  this week
                </div>
              )}
            {filter === "monthly" &&
              monthlyData?.numberOfPendingPurchasesThisMonth! > 0 && (
                <div className=" flex items-center text-primary-greytext">
                  <Plus className=" w-4 h-4" />
                  <span className=" ml-[2px] mr-1">
                    {monthlyData?.numberOfPendingPurchasesThisMonth}
                  </span>{" "}
                  this month
                </div>
              )}
            {filter === "quarterly" &&
              quarterlyData?.numberOfPendingPurchasesThisQuarter! > 0 && (
                <div className=" flex items-center text-primary-greytext">
                  <Plus className=" w-4 h-4" />
                  <span className=" ml-[2px] mr-1">
                    {quarterlyData?.numberOfPendingPurchasesThisQuarter}
                  </span>{" "}
                  this quarter
                </div>
              )}
            {filter === "yearly" &&
              yearlyData?.numberOfPendingPurchasesThisYear! > 0 && (
                <div className=" flex items-center text-primary-greytext">
                  <Plus className=" w-4 h-4" />
                  <span className=" ml-[2px] mr-1">
                    {yearlyData?.numberOfPendingPurchasesThisYear}%
                  </span>{" "}
                  this year
                </div>
              )}
          </div>
        </div>
        {filter === "weekly" &&
          (weeklyData?.numberOfPendingPurchasesThisWeek === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
        {filter === "monthly" &&
          (monthlyData?.numberOfPendingPurchasesThisMonth === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
        {filter === "quarterly" &&
          (quarterlyData?.numberOfPendingPurchasesThisQuarter === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
        {filter === "yearly" &&
          (yearlyData?.numberOfPendingPurchasesThisYear === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
      </div>
    </>
  );
};

export default PurchaseMetricsCard3;
