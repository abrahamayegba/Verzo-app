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
import PurchaseDashboardPaidWeeklyGraph from "../graphs/purchase/purchasedashboard/weekly/PurchaseDashboardPaidWeeklyGraph";
import PurchaseDashboardPaidMonthlyGraph from "../graphs/purchase/purchasedashboard/monthly/PurchaseDashboardPaidMonthlyGraph";
import PurchaseDashboardPaidQuarterlyGraph from "../graphs/purchase/purchasedashboard/quarterly/PurchaseDashboardPaidQuarterlyGraph";
import PurchaseDashboardPaidYearlyGraph from "../graphs/purchase/purchasedashboard/yearly/PurchaseDashboardPaidYearlyGraph";

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
          ?.totalPaidPurchaseAmountThisWeek / 100,
      percentageIncreaseInPaidPurchaseThisWeek:
        getPurchaseForWeek.data?.getPurchasesForWeek
          ?.percentageIncreaseInPaidPurchases,
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
          ?.totalPaidPurchaseAmountThisMonth / 100,
      percentageIncreaseInPaidPurchaseThisMonth:
        getPurchaseForMonth.data?.getPurchaseForMonth
          ?.percentageIncreaseInPaidPurchasesThisMonth,
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
          ?.totalPaidPurchaseAmountThisQuarter / 100,
      percentageIncreaseInPaidPurchasesThisQuarter:
        getPurchaseForQuarter.data?.getPurchaseForQuarter
          ?.percentageIncreaseInPaidPurchasesThisQuarter,
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
          ?.totalPaidPurchaseAmountThisYear / 100,
      percentageIncreaseInPaidPurchasesThisYear:
        getPurchaseForYear.data?.getPurchaseForYear
          ?.percentageIncreaseInPaidPurchasesThisYear,
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
      <div className=" flex flex-col">
        <div className=" flex justify-between gap-y-1">
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
          <div className=" flex items-center text-primary-greytext">
            {filter === "weekly" &&
              weeklyData?.percentageIncreaseInPaidPurchaseThisWeek! > 0 && (
                <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                  <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                  <span className="text-[#4BB543] ml-2">
                    {weeklyData?.percentageIncreaseInPaidPurchaseThisWeek}%
                  </span>{" "}
                </div>
              )}
            {filter === "monthly" &&
              monthlyData?.percentageIncreaseInPaidPurchaseThisMonth! > 0 && (
                <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                  <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                  <span className="text-[#4BB543] ml-2">
                    {monthlyData?.percentageIncreaseInPaidPurchaseThisMonth}%
                  </span>{" "}
                </div>
              )}
            {filter === "quarterly" &&
              quarterlyData?.percentageIncreaseInPaidPurchasesThisQuarter! >
                0 && (
                <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                  <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                  <span className="text-[#4BB543] ml-2">
                    {
                      quarterlyData?.percentageIncreaseInPaidPurchasesThisQuarter
                    }
                    %
                  </span>{" "}
                </div>
              )}
            {filter === "yearly" &&
              yearlyData?.percentageIncreaseInPaidPurchasesThisYear! > 0 && (
                <div className=" flex items-center text-primary-greytext font-medium text-[15px]">
                  <TrendingUp className=" text-[#4BB543] w-5 h-5" />
                  <span className="text-[#4BB543] ml-2">
                    {yearlyData?.percentageIncreaseInPaidPurchasesThisYear}%
                  </span>{" "}
                </div>
              )}
          </div>
        </div>
        {filter === "weekly" && <PurchaseDashboardPaidWeeklyGraph />}
        {filter === "monthly" && <PurchaseDashboardPaidMonthlyGraph />}
        {filter === "quarterly" && <PurchaseDashboardPaidQuarterlyGraph />}
        {filter === "yearly" && <PurchaseDashboardPaidYearlyGraph />}
      </div>
    </>
  );
};

export default PurchaseMetricsCard2;
