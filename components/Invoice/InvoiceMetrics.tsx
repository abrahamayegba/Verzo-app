import React from "react";
import InvoiceMetricsCard1 from "./InvoiceMetricsCard1";
import InvoiceMetricsCard2 from "./InvoiceMetricsCard2";
import InvoiceMetricsCard3 from "./InvoiceMetricsCard3";

interface MetricsProps {
  filter: string;
}
const InvoiceMetrics: React.FC<MetricsProps> = ({ filter }) => {
  return (
    <div className=" w-full flex min-h-[198px] rounded-[16px] bg-white border border-[#f4f4f4]">
      <div className=" w-1/3 border-r-[0.5px] px-5 py-6 flex flex-col justify-center gap-y-[20px]">
        <InvoiceMetricsCard1 filter={filter} />
      </div>
      <div className=" w-1/3 border-r-[0.5px] px-5 py-6 flex flex-col justify-center gap-y-[20px]">
        <InvoiceMetricsCard2 filter={filter} />
      </div>
      <div className=" w-1/3 px-5 py-6 flex flex-col justify-center gap-y-[20px]">
        <InvoiceMetricsCard3 filter={filter} />
      </div>
    </div>
  );
};

export default InvoiceMetrics;
