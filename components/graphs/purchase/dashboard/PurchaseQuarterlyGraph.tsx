"use client";
import { useGetPurchaseForQuarterQuery } from "@/src/generated/graphql";
import { AreaChart } from "@tremor/react";
import React, { useEffect, useState } from "react";
import localStorage from "local-storage-fallback";

interface QuarterlyPurchaseTotalAmounts {
  month?: string | null;
  purchaseAmount?: number | null;
  purchasePending?: number | null;
  purchasePaid?: number | null;
}

const PurchaseQuarterlyGraph = () => {
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
  const { data } = useGetPurchaseForQuarterQuery({
    variables: {
      businessId: businessId,
      quarterly: true,
    },
  });
  const [chartData, setChartData] = useState<
    (QuarterlyPurchaseTotalAmounts | null)[]
  >([]);

  useEffect(() => {
    if (data?.getPurchaseForQuarter?.quarterPurchaseAmounts) {
      setChartData(data?.getPurchaseForQuarter?.quarterPurchaseAmounts);
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
        categories={["purchasePending", "purchasePaid"]}
        colors={["green", "blue"]}
        showGridLines={false}
        customTooltip={customTooltip}
      />
    </div>
  );
};

export default PurchaseQuarterlyGraph;
