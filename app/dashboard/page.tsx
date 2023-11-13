import Filterdropdown from "@/components/Filterdropdown";
import Metrics from "@/components/Metrics";
import RecentMetrics from "@/components/RecentMetrics";
import { ArrowDownToLine } from "lucide-react";
import React from "react";

const Dashboard = () => {
  return (
    <div className=" px-[52px] bg-primary-whiteTint pt-[47px] pb-[20px] gap-y-[36px] flex flex-col">
      <div className=" flex flex-row justify-between items-center">
        <div className=" flex flex-col  gap-y-2">
          <p className=" text-primary-black font-medium text-3xl">Dashboard</p>
          <p className=" text-primary-greytext">
            Manage your business on Verzo
          </p>
        </div>
        <div className=" flex gap-x-[14px] max-h-[48px]">
          <button className=" px-6 py-3 rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white">
            Import Data
            <ArrowDownToLine className=" w-5 h-5" />
          </button>
          <Filterdropdown />
        </div>
      </div>
      <Metrics />
      <RecentMetrics />
    </div>
  );
};

export default Dashboard;
