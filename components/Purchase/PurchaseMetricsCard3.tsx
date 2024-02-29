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
import { Plus, TrendingUp } from "lucide-react";
import PurchaseDashboardPendingWeeklyGraph from "../graphs/purchase/purchasedashboard/weekly/PurchaseDashboardPendingWeeklyGraph";
import PurchaseDashboardPendingMonthlyGraph from "../graphs/purchase/purchasedashboard/monthly/PurchaseDashboardPendingMonthlyGraph";
import PurchaseDashboardPendingQuarterlyGraph from "../graphs/purchase/purchasedashboard/quarterly/PurchaseDashboardPendingQuarterlyGraph";
import PurchaseDashboardPendingYearlyGraph from "../graphs/purchase/purchasedashboard/yearly/PurchaseDashboardPendingYearlyGraph";

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
      percentagePendingPurchasesThisWeek:
        getPurchaseForWeek.data?.getPurchasesForWeek
          ?.percentageIncreaseInPendingPurchaseThisWeek,
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
      percentageOfPendingPurchasesThisMonth:
        getPurchaseForMonth.data?.getPurchaseForMonth
          ?.percentageIncreaseInPendingPurchasesThisMonth,
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
      percentagePendingPurchasesThisQuarter:
        getPurchaseForQuarter.data?.getPurchaseForQuarter
          ?.percentageIncreaseInPendingPurchasesThisQuarter,
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
      percentagePendingPurchasesThisYear:
        getPurchaseForYear.data?.getPurchaseForYear
          ?.percentageIncreaseInPendingPurchasesThisYear,
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
      <div className=" flex flex-col">
        <div className=" flex justify-between gap-y-1">
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
              weeklyData?.percentagePendingPurchasesThisWeek! > 0 && (
                <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                  <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                  <span className="text-[#4BB543] ml-2">
                    {weeklyData?.percentagePendingPurchasesThisWeek}%
                  </span>{" "}
                </div>
              )}
            {filter === "monthly" &&
              monthlyData?.percentageOfPendingPurchasesThisMonth! > 0 && (
                <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                  <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                  <span className="text-[#4BB543] ml-2">
                    {monthlyData?.percentageOfPendingPurchasesThisMonth}%
                  </span>{" "}
                </div>
              )}
            {filter === "quarterly" &&
              quarterlyData?.percentagePendingPurchasesThisQuarter! > 0 && (
                <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                  <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                  <span className="text-[#4BB543] ml-2">
                    {quarterlyData?.percentagePendingPurchasesThisQuarter}%
                  </span>{" "}
                </div>
              )}
            {filter === "yearly" &&
              yearlyData?.percentagePendingPurchasesThisYear! > 0 && (
                <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                  <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                  <span className="text-[#4BB543] ml-2">
                    {yearlyData?.percentagePendingPurchasesThisYear}%
                  </span>{" "}
                </div>
              )}
          </div>
        </div>
        {filter === "weekly" && <PurchaseDashboardPendingWeeklyGraph />}
        {filter === "monthly" && <PurchaseDashboardPendingMonthlyGraph />}
        {filter === "quarterly" && <PurchaseDashboardPendingQuarterlyGraph />}
        {filter === "yearly" && <PurchaseDashboardPendingYearlyGraph />}
      </div>
    </>
  );
};

export default PurchaseMetricsCard3;
