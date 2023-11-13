import { ArrowUp } from "lucide-react";
import React from "react";
import GraphUp from "./ui/icons/GraphUp";

const Metrics = () => {
  return (
    <div className=" w-full flex min-h-[198px] rounded-[16px] bg-white border border-[#f4f4f4]">
      <div className=" w-1/3 border-r-[0.5px] px-5 py-3 flex flex-col justify-center gap-y-[36px]">
        <div className=" flex justify-between text-primary-black">
          <p className=" text-[20px] tracking-[-0.3px]">Revenue</p>
          <button className=" text-primary-blue text-sm tracking-[-0.2px]">
            See more
          </button>
        </div>
        <div className=" flex justify-between flex-wrap">
          <div className=" flex flex-col gap-y-1">
            <p className=" text-[30px]  font-medium">₦500,000</p>
            <div className=" flex items-center text-primary-greytext">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M4.3714 8.10001L8.99997 3.60001M8.99997 3.60001L13.6285 8.10001M8.99997 3.60001V14.4"
                    stroke="#4BB543"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-[#4BB543] mx-1">40%</span> since last month
            </div>
          </div>
          <GraphUp />
        </div>
      </div>
      <div className=" w-1/3 border-r-[0.5px] px-5 py-3 flex flex-col justify-center gap-y-[36px]">
        <div className=" flex justify-between text-primary-black">
          <p className=" text-[20px] tracking-[-0.3px]">Expenses</p>
          <button className=" text-primary-blue text-sm tracking-[-0.2px]">
            See more
          </button>
        </div>
        <div className=" flex justify-between flex-wrap">
          <div className=" flex flex-col gap-y-1">
            <p className=" text-[30px]  font-medium">₦50,000</p>
            <div className=" flex items-center text-primary-greytext">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M4.3714 8.10001L8.99997 3.60001M8.99997 3.60001L13.6285 8.10001M8.99997 3.60001V14.4"
                    stroke="#4BB543"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-[#4BB543] mx-1">10%</span> since last month
            </div>
          </div>
          <GraphUp />
        </div>
      </div>
      <div className=" w-1/3 border-r-[0.5px] px-5 py-3 flex flex-col justify-center gap-y-[36px]">
        <div className=" flex justify-between text-primary-black">
          <p className=" text-[20px] tracking-[-0.3px]">Purchases</p>
          <button className=" text-primary-blue text-sm tracking-[-0.2px]">
            See more
          </button>
        </div>
        <div className=" flex justify-between flex-wrap">
          <div className=" flex flex-col gap-y-1">
            <p className=" text-[30px]  font-medium">₦300,000</p>
            <div className=" flex items-center text-primary-greytext">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M4.3714 8.10001L8.99997 3.60001M8.99997 3.60001L13.6285 8.10001M8.99997 3.60001V14.4"
                    stroke="#4BB543"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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

export default Metrics;
