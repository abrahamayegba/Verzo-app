import React, { ReactElement, SVGProps } from "react";

interface props {
  name: string;
  icon: ReactElement<SVGProps<SVGSVGElement>>;
  emptytext: string;
}

const RecentMetricEmptyState: React.FC<props> = ({ name, icon, emptytext }) => {
  return (
    <div className=" min-h-[241px] rounded-[16px] flex flex-col border border-gray-100">
      <div className=" flex justify-between items-center py-[14px] px-6 rounded-t-[10px] ">
        <p className=" text-primary-greytext text-sm">Recent {name}</p>
        <button
          disabled
          className=" text-primary-blue text-sm tracking-[-0.2px] cursor-not-allowed"
        >
          View all
        </button>
      </div>
      <div className=" flex flex-col bg-white gap-y-3 h-full rounded-b-[16px] items-center justify-center">
        <span className=" p-3 rounded-full bg-[#F9FCFF]"> {icon}</span>
        <p className=" text-base text-primary-greytext">{emptytext}</p>
      </div>
    </div>
  );
};

export default RecentMetricEmptyState;
