"use client";
import { useGetExpenseForYearQuery } from "@/src/generated/graphql";
import { AreaChart } from "@tremor/react";
import React, { useEffect, useState } from "react";
import localStorage from "local-storage-fallback";

interface YearlyExpenseTotalAmounts {
  month?: string | null;
  totalExpensesAmount?: number | null;
}

const ExpenseDashboardTotalYearlyGraph = () => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const customTooltip = (props: any) => {
    const { payload, active } = props;
    if (!active || !payload) return null;
    return (
      <div className="w-[190px] rounded-tremor-default border border-tremor-border bg-tremor-background p-2 ml-[280px] mt-[-150px] text-tremor-default shadow-tremor-dropdown">
        <div className="font-medium text-tremor-content-emphasis ml-1 mb-1">
          {new Date(payload[0]?.payload?.date).toDateString()}
        </div>
        {payload.map((category: any, idx: any) => (
          <div
            key={idx}
            className={`flex flex-1 space-x-2.5 ${
              idx !== payload.length - 1 ? "mb-4" : ""
            }`}
          >
            <div
              className={`flex w-1 flex-col bg-${category.color}-500 rounded`}
            />
            <div className="space-y-1">
              <p className="text-tremor-content capitalize">
                {category.dataKey}
              </p>
              <p className="font-medium text-tremor-content-emphasis">
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(category.value)}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  const { data } = useGetExpenseForYearQuery({
    variables: {
      businessId: businessId,
      yearly: true,
    },
  });
  const [chartData, setChartData] = useState<
    (YearlyExpenseTotalAmounts | null)[]
  >([]);

  useEffect(() => {
    if (data?.getExpensesForYear?.monthlyTotalAmounts) {
      setChartData(data?.getExpensesForYear?.monthlyTotalAmounts);
    }
  }, [data]);

  return (
    <div className=" w-full">
      <AreaChart
        className="h-[100px]"
        data={chartData}
        showLegend={false}
        showYAxis={false}
        startEndOnly={true}
        index="month"
        yAxisWidth={65}
        categories={["totalExpensesAmount"]}
        colors={["blue"]}
        showGridLines={false}
        customTooltip={customTooltip}
      />
    </div>
  );
};

export default ExpenseDashboardTotalYearlyGraph;
