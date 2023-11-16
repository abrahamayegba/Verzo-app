import React from "react";
import ArrowUpIcon from "./ui/icons/ArrowUpIcon";
import GraphUp from "./ui/icons/GraphUp";
import Graphflat from "./ui/icons/Graphflat";

const PurchaseMetrics = () => {
  return (
    <div className=" w-full flex min-h-[198px] rounded-[16px] bg-white border border-[#f4f4f4]">
      <div className=" w-1/3 border-r-[0.5px] px-5 py-3 flex flex-col justify-center gap-y-[36px]">
        <div className=" flex justify-between text-primary-black">
          <p className=" text-[20px] tracking-[-0.3px]">Paid</p>
          <button className=" text-primary-blue text-sm tracking-[-0.2px]">
            See more
          </button>
        </div>
        <div className=" flex justify-between flex-wrap">
          <div className=" flex flex-col gap-y-1">
            <p className=" text-[30px]  font-medium">₦600,000</p>
            <div className=" flex items-center text-primary-greytext">
              <span>
                <ArrowUpIcon />
              </span>
              <span className="text-[#4BB543] mx-1">30%</span> since last month
            </div>
          </div>
          <GraphUp />
        </div>
      </div>
      <div className=" w-1/3 border-r-[0.5px] px-5 py-3 flex flex-col justify-center gap-y-[36px]">
        <div className=" flex justify-between text-primary-black">
          <p className=" text-[20px] tracking-[-0.3px]">Pending</p>
          <button className=" text-primary-blue text-sm tracking-[-0.2px] hidden">
            See more
          </button>
        </div>
        <div className=" flex justify-between flex-wrap h-[73px]">
          <div className=" flex flex-col gap-y-1">
            <p className=" text-[30px]  font-medium">₦0.00</p>
            <div className=" items-center text-primary-greytext hidden">
              <span>
                <ArrowUpIcon />
              </span>
              <span className="text-[#4BB543] mx-1">10%</span> since last month
            </div>
          </div>
          <Graphflat />
        </div>
      </div>
      <div className=" w-1/3 border-r-[0.5px] px-5 py-3 flex flex-col justify-center gap-y-[36px]">
        <div className=" flex justify-between text-primary-black">
          <p className=" text-[20px] tracking-[-0.3px]">Overdue</p>
          <button className=" text-primary-blue text-sm tracking-[-0.2px]">
            See more
          </button>
        </div>
        <div className=" flex justify-between flex-wrap">
          <div className=" flex flex-col gap-y-1">
            <p className=" text-[30px]  font-medium">₦300,000</p>
            <div className=" flex items-center text-primary-greytext">
              <span>
                <ArrowUpIcon />
              </span>
              <span className="text-[#4BB543] mx-1">20%</span> since last month
            </div>
          </div>
          <GraphUp />
        </div>
      </div>
    </div>
  );
};

export default PurchaseMetrics;
