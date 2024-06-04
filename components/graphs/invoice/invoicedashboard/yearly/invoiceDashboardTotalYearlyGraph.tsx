"use client";
import { useTotalYearlyInvoicesAmountQuery } from "@/src/generated/graphql";
import { AreaChart } from "@tremor/react";
import React, { useEffect, useState } from "react";
import localStorage from "local-storage-fallback";

interface YearlyInvoiceTotalAmounts {
  __typename?: string;
  month?: string | null | undefined;
  totalInvoicesAmount?: number | null | undefined;
}

const InvoiceDashboardTotalYearlyGraph = () => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";

  const customTooltip = (props: any) => {
    const { payload, active } = props;
    if (!active || !payload) return null;
    const month = payload[0]?.payload?.month;

    return (
      <div className="w-[220px] rounded-tremor-default border border-tremor-border bg-tremor-background p-2 ml-[200px] mt-[-150px] text-tremor-default shadow-tremor-dropdown">
        <div className="font-medium text-tremor-content-emphasis ml-1 mb-1">
          {month}
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
                }).format(category.value / 100)}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  const { data } = useTotalYearlyInvoicesAmountQuery({
    variables: {
      businessId: businessId,
      yearly: true,
    },
  });

  const [chartData, setChartData] = useState<
    (YearlyInvoiceTotalAmounts | null)[]
  >([]);

  useEffect(() => {
    if (data?.totalYearlyInvoicesAmount?.monthlyTotalAmounts) {
      setChartData(data?.totalYearlyInvoicesAmount?.monthlyTotalAmounts);
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
        categories={["totalInvoicesAmount"]}
        colors={["blue"]}
        showGridLines={false}
        customTooltip={customTooltip}
      />
    </div>
  );
};

export default InvoiceDashboardTotalYearlyGraph;
