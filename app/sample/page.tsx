"use client";
import React, { useEffect, useState } from "react";
import { AreaChart } from "@tremor/react";
import { useTotalWeeklyInvoicesAmountQuery } from "@/src/generated/graphql";

interface DailyInvoiceTotalAmounts {
  __typename?: string;
  date: string;
  dayOfWeek?: string | null;
  totalAmount: number;
  totalPendingAmount: number;
  totalPaidAmount: number;
}

const Sample = () => {
  const customTooltip = (props: any) => {
    const { payload, active } = props;
    if (!active || !payload) return null;
    return (
      <div className="w-56 rounded-tremor-default border border-tremor-border bg-tremor-background p-2 ml-[120px] mt-[-40px] text-tremor-default shadow-tremor-dropdown">
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

  const { data, loading, error } = useTotalWeeklyInvoicesAmountQuery({
    variables: {
      businessId: "cbcd7f68-8ac7-46cf-a1ad-7b29f8a1b5a2",
      weekly: true,
    },
  });
  const [chartData, setChartData] = useState<
    (DailyInvoiceTotalAmounts | null)[]
  >([]);

  useEffect(() => {
    if (data?.totalWeeklyInvoicesAmount?.dailyTotalAmounts) {
      setChartData(data?.totalWeeklyInvoicesAmount?.dailyTotalAmounts);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        Newsletter Revenue
      </h3>
      <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
        $34,567
      </p>
      <div className=" w-[100px] h-[100px] ml-[200px]">
        <AreaChart
          className="h-[100px]"
          data={chartData}
          showLegend={false}
          showXAxis={false}
          showYAxis={false}
          startEndOnly={true}
          index="date"
          yAxisWidth={65}
          categories={["totalPendingAmount", "totalPaidAmount"]}
          colors={["green", "red"]}
          showGridLines={false}
          customTooltip={customTooltip}
        />
      </div>
    </>
  );
};

export default Sample;
