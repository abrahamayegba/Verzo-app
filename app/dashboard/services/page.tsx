import React from "react";
import { PlusCircle } from "lucide-react";
import ServiceList from "@/components/ServiceList";

const Services = () => {
  return (
    <div className=" px-[52px] bg-primary-whiteTint pt-[47px] pb-[20px] gap-y-[36px] flex flex-col">
      <div className=" flex flex-row justify-between items-center">
        <div className=" flex flex-col  gap-y-2">
          <p className=" text-primary-black font-medium text-3xl">Services</p>
          <p className=" text-primary-greytext">Create and manage services</p>
        </div>
        <div className=" flex gap-x-[14px] max-h-[48px]">
          <button className=" px-6 py-3 rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white">
            Add service
            <PlusCircle className=" w-5 h-5" />
          </button>
        </div>
      </div>
      <ServiceList />
    </div>
  );
};

export default Services;