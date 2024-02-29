"use client";
import { useTotalQuarterlyInvoicesAmountQuery } from "@/src/generated/graphql";
import { AreaChart } from "@tremor/react";
import React, { useEffect, useState } from "react";
import localStorage from "local-storage-fallback";

interface QuarterlyInvoiceTotalAmounts {
  __typename?: string;
  month?: string | null | undefined;
  invoicePaid?: number | null | undefined;
}

const InvoiceDashboardPaidQuarterlyGraph = () => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";

  const customTooltip = (props: any) => {
    const { payload, active } = props;
    if (!active || !payload) return null;
    const month = payload[0]?.payload?.month;

    return (
      <div className="w-[190px] rounded-tremor-default border border-tremor-border bg-tremor-background p-2 ml-[280px] mt-[-150px] text-tremor-default shadow-tremor-dropdown">
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
                }).format(category.value)}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  const { data } = useTotalQuarterlyInvoicesAmountQuery({
    variables: {
      businessId: businessId,
      quarterly: true,
    },
  });

  const [chartData, setChartData] = useState<
    (QuarterlyInvoiceTotalAmounts | null)[]
  >([]);

  useEffect(() => {
    if (data?.totalQuarterlyInvoicesAmount?.quarterInvoiceAmounts) {
      setChartData(data?.totalQuarterlyInvoicesAmount?.quarterInvoiceAmounts);
    }
  }, [data]);

  return (
    <div className=" w-full">
      <AreaChart
        className="h-[100px]"
        data={chartData}
        showLegend={false}
        showYAxis={false}
        index="month"
        yAxisWidth={65}
        categories={["invoicePaid"]}
        colors={["green"]}
        showGridLines={false}
        customTooltip={customTooltip}
      />
    </div>
  );
};

export default InvoiceDashboardPaidQuarterlyGraph;
