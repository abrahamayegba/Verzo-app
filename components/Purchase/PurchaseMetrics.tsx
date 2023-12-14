import React from "react";
import PurchaseMetricsCard1 from "./PurchaseMetricsCard1";
import PurchaseMetricsCard2 from "./PurchaseMetricsCard2";
import PurchaseMetricsCard3 from "./PurchaseMetricsCard3";

interface MetricsProps {
  filter: string;
}

const PurchaseMetrics: React.FC<MetricsProps> = ({ filter }) => {
  return (
    <div className=" w-full flex min-h-[198px] rounded-[16px] bg-white border border-[#f4f4f4]">
      <div className=" w-1/3 border-r-[0.5px] px-5 py-3 flex flex-col justify-center gap-y-[36px]">
        <PurchaseMetricsCard1 filter={filter} />
      </div>
      <div className=" w-1/3 border-r-[0.5px] px-5 py-3 flex flex-col justify-center gap-y-[36px]">
        <PurchaseMetricsCard2 filter={filter} />
      </div>
      <div className=" w-1/3 border-r-[0.5px] px-5 py-3 flex flex-col justify-center gap-y-[36px]">
        <PurchaseMetricsCard3 filter={filter} />
      </div>
    </div>
  );
};

export default PurchaseMetrics;
