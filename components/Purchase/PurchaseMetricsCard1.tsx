import React from "react";
import localStorage from "local-storage-fallback";
import {
  useGetPurchaseForMonthQuery,
  useGetPurchaseForQuarterQuery,
  useGetPurchaseForWeekQuery,
  useGetPurchaseForYearQuery,
} from "@/src/generated/graphql";
import Link from "next/link";
import { Plus, TrendingUp } from "lucide-react";
import PurchaseDashboardTotalWeeklyGraph from "../graphs/purchase/purchasedashboard/weekly/PurchaseDashboardTotalWeeklyGraph";
import PurchaseDashboardTotalMonthlyGraph from "../graphs/purchase/purchasedashboard/monthly/PurchaseDashboardTotalMonthlyGraph";
import PurchaseDashboardTotalQuarterlyGraph from "../graphs/purchase/purchasedashboard/quarterly/PurchaseDashboardTotalQuarterlyGraph";
import PurchaseDashboardTotalYearlyGraph from "../graphs/purchase/purchasedashboard/yearly/PurchaseDashboardTotalYearlyGraph";

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
          ?.totalPurchaseAmountThisWeek / 100,
      percentageIncreaseInPurchaseThisWeek:
        getPurchaseForWeek.data?.getPurchasesForWeek
          ?.percentageIncreaseInPurchaseThisWeek,
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
          ?.totalPurchaseAmountThisMonth / 100,
      percentageIncreaseInPurchaseThisMonth:
        getPurchaseForMonth.data?.getPurchaseForMonth
          ?.percentageIncreaseInPurchaseThisMonth,
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
          ?.totalPurchaseAmountThisQuarter / 100,
      percentageIncreaseInPurchaseThisQuarter:
        getPurchaseForQuarter.data?.getPurchaseForQuarter
          ?.percentageIncreaseInPurchaseThisQuarter,
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
          ?.totalPurchaseAmountThisYear / 100,
      percentageIncreaseInPurchaseThisYear:
        getPurchaseForYear.data?.getPurchaseForYear
          ?.percentageIncreaseInPurchaseThisYear,
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
      <div className=" flex flex-col">
        <div className=" flex justify-between gap-y-1">
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
              weeklyData?.percentageIncreaseInPurchaseThisWeek! > 0 && (
                <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                  <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                  <span className="text-[#4BB543] ml-2">
                    {weeklyData?.percentageIncreaseInPurchaseThisWeek}%
                  </span>{" "}
                </div>
              )}
            {filter === "monthly" &&
              monthlyData?.percentageIncreaseInPurchaseThisMonth! > 0 && (
                <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                  <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                  <span className="text-[#4BB543] ml-2">
                    {monthlyData?.percentageIncreaseInPurchaseThisMonth}%
                  </span>{" "}
                </div>
              )}
            {filter === "quarterly" &&
              quarterlyData?.percentageIncreaseInPurchaseThisQuarter! > 0 && (
                <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                  <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                  <span className="text-[#4BB543] ml-2">
                    {quarterlyData?.percentageIncreaseInPurchaseThisQuarter}%
                  </span>{" "}
                </div>
              )}
            {filter === "yearly" &&
              yearlyData?.percentageIncreaseInPurchaseThisYear! > 0 && (
                <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                  <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                  <span className="text-[#4BB543] ml-2">
                    {yearlyData?.percentageIncreaseInPurchaseThisYear}%
                  </span>{" "}
                </div>
              )}
          </div>
        </div>
        {filter === "weekly" && <PurchaseDashboardTotalWeeklyGraph />}
        {filter === "monthly" && <PurchaseDashboardTotalMonthlyGraph />}
        {filter === "quarterly" && <PurchaseDashboardTotalQuarterlyGraph />}
        {filter === "yearly" && <PurchaseDashboardTotalYearlyGraph />}
      </div>
    </>
  );
};

export default PurchaseMetricsCard1;
