import { Check, MoreHorizontal } from "lucide-react";
import React from "react";

const RecentCustomers = () => {
  return (
    <div className=" min-h-[241px] rounded-[16px] flex flex-col border border-gray-100">
      <div className=" flex justify-between items-center py-[14px] px-6 rounded-t-[10px] ">
        <p className=" text-primary-greytext text-sm">Recent Customers</p>
        <button className=" text-primary-blue text-sm tracking-[-0.2px]">
          View all
        </button>
      </div>
      <div className=" flex flex-col bg-white h-full rounded-b-[16px]">
        <div className=" border-b border-b-gray-100 min-h-[63px] flex justify-between text-sm items-center px-6">
          <p>#001</p>
          <p className=" text-primary-greytext">Jan 9, 2023</p>
          <p className=" text-primary-greytext">olivia@gmail.com</p>
          <MoreHorizontal className=" text-[#c4c4c4]" />
        </div>
        <div className=" border-b border-b-gray-100 min-h-[63px] flex justify-between text-sm items-center px-6">
          <p>#001</p>
          <p className=" text-primary-greytext">Jan 9, 2023</p>
          <p className=" text-primary-greytext">olivia@gmail.com</p>
          <MoreHorizontal className=" text-[#c4c4c4]" />
        </div>
        <div className=" min-h-[63px] flex justify-between text-sm items-center px-6">
          <p>#001</p>
          <p className=" text-primary-greytext">Jan 9, 2023</p>
          <p className=" text-primary-greytext">olivia@gmail.com</p>
          <MoreHorizontal className=" text-[#c4c4c4]" />
        </div>
      </div>
    </div>
  );
};

export default RecentCustomers;