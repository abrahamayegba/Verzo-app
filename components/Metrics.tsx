import React from "react";
import MetricsCard1 from "./MetricsCard1";
import MetricsCard2 from "./MetricsCard2";
import MetricsCard3 from "./MetricsCard3";

interface MetricsProps {
  filter: string;
}

const Metrics: React.FC<MetricsProps> = ({ filter }) => {
  return (
    <div className=" w-full flex min-h-[198px] rounded-[16px] bg-white border border-[#f4f4f4]">
      <div className=" w-1/3 border-r-[0.5px] px-5 py-3 flex flex-col justify-center gap-y-[36px]">
        <MetricsCard1 filter={filter} />
      </div>
      <div className=" w-1/3 border-r-[0.5px] px-5 py-3 flex flex-col justify-center gap-y-[36px]">
        <MetricsCard2 filter={filter} />
      </div>
      <div className=" w-1/3 border-r-[0.5px] px-5 py-3 flex flex-col justify-center gap-y-[36px]">
        <MetricsCard3 filter={filter} />
      </div>
    </div>
  );
};

export default Metrics;
