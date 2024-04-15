import React from "react";
import ExpenseMetricsCard1 from "./ExpenseMetricsCard1";
import ExpenseMetricsCard3 from "./ExpenseMetricsCard3";
import ExpenseMetricsCard2 from "./ExpenseMetricsCard2";

interface MetricsProps {
  filter: string;
}

const ExpenseMetrics: React.FC<MetricsProps> = ({ filter }) => {
  return (
    <div className=" w-full flex min-h-[198px] rounded-[16px] bg-white border border-[#f4f4f4]">
      <div className=" w-1/2 border-r-[0.5px] px-5 py-6 flex flex-col justify-center gap-y-[20px]">
        <ExpenseMetricsCard2 filter={filter} />
      </div>
      <div className=" w-1/2 border-r-[0.5px] px-5 py-6 flex flex-col justify-center gap-y-[20px]">
        <ExpenseMetricsCard3 filter={filter} />
      </div>
      <div className=" w-1/2 px-5 py-6 flex flex-col justify-center gap-y-[20px]">
        <ExpenseMetricsCard1 filter={filter} />
      </div>
    </div>
  );
};

export default ExpenseMetrics;
