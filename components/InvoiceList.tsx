"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import InvoiceTabContentAll from "./InvoiceTabContentAll";
import InvoiceTabContentArchived from "./InvoiceTabContentArchived";
import ArchiveInvoice from "./modals/invoice/ArchiveInvoice";
import useModal from "@/app/hooks/useModal";
import DeleteInvoice from "./modals/invoice/DeleteInvoiceIcon";
import Link from "next/link";

const InvoiceList = () => {
  const allInvoices = "(15)";
  const archivedInvoices = "(0)";
  const [isChecked, setIsChecked] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isOpenModal1,
    openModal: openModal1,
    closeModal: closeModal1,
  } = useModal();

  const handleToggleSelectAll = (isChecked: boolean) => {
    setIsChecked(isChecked);
  };

  return (
    <div className=" w-full flex flex-col">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className=" mb-3 flex justify-between border-b border-b-gray-100">
          <div className=" gap-x-[30px] flex">
            <TabsTrigger
              className=" text-[17px]  data-[state=active]:text-primary-black data-[state=active]:border-b-2 data-[state=active]:border-b-gray-400  text-primary-greytext"
              value="all"
            >
              All <span className=" text-primary-mainGrey">{allInvoices}</span>
            </TabsTrigger>
            <TabsTrigger
              className=" text-[17px]  data-[state=active]:text-primary-black text-primary-greytext data-[state=active]:border-b-2 data-[state=active]:border-b-gray-400"
              value="archived"
            >
              Archived{" "}
              <span className=" text-primary-mainGrey">
                {" "}
                {archivedInvoices}
              </span>
            </TabsTrigger>
          </div>
          {isChecked ? (
            <div className=" flex gap-x-4">
              <button
                onClick={openModal}
                className=" px-6 py-[10px] rounded-[10px] flex gap-x-2 items-center text-sm justify-center border border-primary-border"
              >
                Archive
              </button>
              <button
                onClick={openModal1}
                className=" px-6 py-[10px] rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-red text-sm text-white"
              >
                Delete
              </button>
            </div>
          ) : (
            <Link href="/dashboard/invoices/allinvoices">
              <button className=" text-primary-blue ">See all invoices</button>
            </Link>
          )}
        </TabsList>
        <TabsContent value="all">
          <InvoiceTabContentAll onToggleSelectAll={handleToggleSelectAll} />
        </TabsContent>
        <TabsContent value="archived">
          <InvoiceTabContentArchived />
        </TabsContent>
      </Tabs>
      <ArchiveInvoice
        open={isOpen}
        openModal={openModal}
        onClose={closeModal}
      />
      <DeleteInvoice
        open={isOpenModal1}
        openModal={openModal1}
        onClose={closeModal1}
      />
    </div>
  );
};

export default InvoiceList;
