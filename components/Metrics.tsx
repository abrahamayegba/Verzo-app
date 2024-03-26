import React from "react";
import MetricsCard1 from "./MetricsCard1";
import MetricsCard2 from "./MetricsCard2";
import MetricsCard3 from "./MetricsCard3";
import Payables from "./PayablesCard";
import Receivables from "./ReceivablesCard";
import AccountBalanceCard from "./AccountBalanceCard";

interface MetricsProps {
  filter: string;
}

const Metrics: React.FC<MetricsProps> = ({ filter }) => {
  return (
    <>
      <div className=" flex flex-col gap-y-6">
        <div className=" w-full flex min-h-[198px] rounded-[16px] bg-white border border-[#f4f4f4]">
          <div className=" w-1/3 border-r-[0.5px] px-5 py-6 flex flex-col justify-start gap-y-[20px]">
            <MetricsCard1 filter={filter} />
          </div>
          <div className=" w-1/3 border-r-[0.5px] px-5 py-6 flex flex-col justify-start gap-y-[20px]">
            <MetricsCard2 filter={filter} />
          </div>
          <div className=" w-1/3 border-r-[0.5px] px-5 py-6 flex flex-col justify-start gap-y-[20px]">
            <MetricsCard3 filter={filter} />
          </div>
        </div>
        <div className=" flex flex-col gap-y-3">
          <div className=" w-full flex min-h-[148px] rounded-[16px] bg-white border border-[#f4f4f4]">
            <div className=" w-1/3 border-r-[0.5px] px-5 py-6 flex flex-col justify-start gap-y-[20px]">
              <AccountBalanceCard filter={filter} />
            </div>
            <div className=" w-1/3 border-r-[0.5px] px-5 py-6 flex flex-col justify-start gap-y-[20px]">
              <Receivables filter={filter} />
            </div>
            <div className=" w-1/3 border-r-[0.5px] px-5 py-6 flex flex-col justify-start gap-y-[20px]">
              <Payables filter={filter} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Metrics;
