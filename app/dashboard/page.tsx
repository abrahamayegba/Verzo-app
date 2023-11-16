"use client";
import React from "react";
import ImportDataDropdown from "@/components/ImportDataDropdown";
import Metrics from "@/components/Metrics";
import RecentMetrics from "@/components/RecentMetrics";
import useModal from "../hooks/useModal";
import UploadInvoiceCSV from "@/components/modals/invoice/UploadInvoiceModal";
import { ListFilter } from "lucide-react";
import FilterDataDropdown from "@/components/FilterDataDropdown";

const Dashboard = () => {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <div className=" px-[52px] bg-primary-whiteTint pt-[47px] pb-[20px] gap-y-[36px] flex flex-col max-w-[1680px] mx-auto">
      <div className=" flex flex-row justify-between items-center">
        <div className=" flex flex-col  gap-y-2">
          <p className=" text-primary-black font-medium text-3xl">Dashboard</p>
          <p className=" text-primary-greytext">
            Manage your business on Verzo
          </p>
        </div>
        <div className=" flex gap-x-[14px] max-h-[48px]">
          <ImportDataDropdown openModal={openModal} />
          <FilterDataDropdown />
        </div>
      </div>
      <Metrics />
      <RecentMetrics />
      <UploadInvoiceCSV
        open={isOpen}
        openModal={openModal}
        onClose={closeModal}
      />
    </div>
  );
};

export default Dashboard;
