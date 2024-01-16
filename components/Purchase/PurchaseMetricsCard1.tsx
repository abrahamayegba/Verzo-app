import React from "react";
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

const PurchaseMetricsCard1: React.FC<MetricsProps> = ({ filter }) => {
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
      totalPurchaseAmountThisWeek:
        getPurchaseForWeek.data?.getPurchasesForWeek
          ?.totalPurchaseAmountThisWeek,
      numberOfPurchasesThisWeek:
        getPurchaseForWeek.data?.getPurchasesForWeek?.purchasesThisWeek,
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
      totalPurchaseAmountThisMonth:
        getPurchaseForMonth.data?.getPurchaseForMonth
          ?.totalPurchaseAmountThisMonth,
      numberOfPurchasesThisMonth:
        getPurchaseForMonth.data?.getPurchaseForMonth?.purchasesThisMonth,
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
      totalPurchaseAmountThisQuarter:
        getPurchaseForQuarter.data?.getPurchaseForQuarter
          ?.totalPurchaseAmountThisQuarter,
      numberOfPurchasesThisQuarter:
        getPurchaseForQuarter.data?.getPurchaseForQuarter?.purchasesThisQuarter,
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
      totalPurchaseAmountThisYear:
        getPurchaseForYear.data?.getPurchaseForYear
          ?.totalPurchaseAmountThisYear,
      numberOfPurchasesThisYear:
        getPurchaseForYear.data?.getPurchaseForYear?.purchasesThisYear,
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
        <Link href="/dashboard/purchases">
          <button className=" text-primary-blue text-sm tracking-[-0.2px]">
            See more
          </button>
        </Link>
      </div>
      <div className=" flex justify-between flex-wrap h-[70px]">
        <div className=" flex flex-col gap-y-1">
          <p className=" text-[30px]  font-medium">
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
          <div className=" flex items-center text-primary-greytext">
            {filter === "weekly" &&
              weeklyData?.numberOfPurchasesThisWeek! > 0 && (
                <div className=" flex items-center text-primary-greytext text-[15px]">
                  <Plus className=" w-4 h-4" />
                  <span className=" ml-[2px] mr-1">
                    {weeklyData?.numberOfPurchasesThisWeek}
                  </span>{" "}
                  this week
                </div>
              )}
            {filter === "monthly" &&
              monthlyData?.numberOfPurchasesThisMonth! > 0 && (
                <div className=" flex items-center text-primary-greytext text-[15px]">
                  <Plus className=" w-4 h-4" />
                  <span className=" ml-[2px] mr-1">
                    {monthlyData?.numberOfPurchasesThisMonth}
                  </span>{" "}
                  this month
                </div>
              )}
            {filter === "quarterly" &&
              quarterlyData?.numberOfPurchasesThisQuarter! > 0 && (
                <div className=" flex items-center text-primary-greytext text-[15px]">
                  <Plus className=" w-4 h-4" />
                  <span className=" ml-[2px] mr-1">
                    {quarterlyData?.numberOfPurchasesThisQuarter}
                  </span>{" "}
                  this quarter
                </div>
              )}
            {filter === "yearly" &&
              yearlyData?.numberOfPurchasesThisYear! > 0 && (
                <div className=" flex items-center text-primary-greytext text-[15px]">
                  <Plus className=" w-4 h-4" />
                  <span className=" ml-[2px] mr-1">
                    {yearlyData?.numberOfPurchasesThisYear}
                  </span>{" "}
                  this year
                </div>
              )}
          </div>
        </div>
        {filter === "weekly" &&
          (weeklyData?.numberOfPurchasesThisWeek === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
        {filter === "monthly" &&
          (monthlyData?.numberOfPurchasesThisMonth === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
        {filter === "quarterly" &&
          (quarterlyData?.numberOfPurchasesThisQuarter === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
        {filter === "yearly" &&
          (yearlyData?.numberOfPurchasesThisYear === 0 ? (
            <Graphflat />
          ) : (
            <GraphUp />
          ))}
      </div>
    </>
  );
};

export default PurchaseMetricsCard1;
