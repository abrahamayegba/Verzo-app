"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import InvoiceTabContentAll from "./InvoiceTabContentAll";
import InvoiceTabContentArchived from "./InvoiceTabContentArchived";
import ArchiveInvoice from "../modals/invoice/ArchiveInvoice";
import useModal from "@/app/hooks/useModal";
import DeleteInvoice from "../modals/invoice/DeleteInvoiceModal";
import Link from "next/link";
import localStorage from "local-storage-fallback";
import {
  useGetArchivedSalesByBusinessQuery,
  useGetSaleByBusinessQuery,
} from "@/src/generated/graphql";
import BulkArchiveInvoice from "../modals/invoice/BulkArchiveInvoiceModal";

const InvoiceList = () => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const [isChecked, setIsChecked] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isDeleteInvoiceOpen,
    openModal: openDeleteInvoiceModal,
    closeModal: closeDeleteInvoiceModal,
  } = useModal();

  const {
    isOpen: isUnarchiveOpen,
    openModal: openUnarchiveModal,
    closeModal: closeUnarchiveModal,
  } = useModal();

  const {
    isOpen: isEditModalOpen,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();

  const handleToggleSelectAll = (isChecked: boolean) => {
    setIsChecked(isChecked);
  };

  const handleOpenArchiveModal = (saleId: string) => {
    setSelectedId(saleId);
    openModal();
  };

  const handleOpenDeleteModal = (saleId: string) => {
    setSelectedId(saleId);
    openDeleteInvoiceModal();
  };

  const handleOpenEditModal = (saleId: string) => {
    setSelectedId(saleId);
    openEditModal();
  };

  const getSalesByBusiness = useGetSaleByBusinessQuery({
    variables: {
      businessId: businessId,
    },
  });
  const getArchivedSalesByBusiness = useGetArchivedSalesByBusinessQuery({
    variables: {
      businessId: businessId,
      sets: 1,
      cursor: null,
    },
  });
  const archivedSales =
    getArchivedSalesByBusiness.data?.getArchivedSalesByBusiness
      ?.salesByBusiness ?? [];
  const invoices =
    getSalesByBusiness.data?.getSaleByBusiness?.salesByBusiness ?? [];
  const allInvoices = invoices.length;
  const allArchivedSales = archivedSales.length;

  return (
    <div className=" w-full flex flex-col">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className=" mb-3 flex justify-between border-b border-b-gray-100">
          <div className=" gap-x-[30px] flex">
            <TabsTrigger
              className=" text-[17px]  data-[state=active]:text-primary-black data-[state=active]:border-b-2 data-[state=active]:border-b-gray-400  text-primary-greytext"
              value="all"
            >
              All{" "}
              <span className=" text-primary-mainGrey">({allInvoices})</span>
            </TabsTrigger>
            <TabsTrigger
              className=" text-[17px]  data-[state=active]:text-primary-black text-primary-greytext data-[state=active]:border-b-2 data-[state=active]:border-b-gray-400"
              value="archived"
            >
              Archived{" "}
              <span className=" text-primary-mainGrey">
                {" "}
                ({allArchivedSales})
              </span>
            </TabsTrigger>
          </div>
          {/* {isChecked ? (
            <div className=" flex gap-x-4">
              <button
                onClick={openModal}
                className=" px-6 py-[10px] rounded-[10px] flex gap-x-2 items-center text-sm justify-center border border-primary-border"
              >
                Archive
              </button>
              <button
                onClick={openDeleteInvoiceModal}
                className=" px-6 py-[10px] rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-red text-sm text-white"
              >
                Delete
              </button>
            </div>
          ) : (
            
          )} */}
          <Link href="/dashboard/invoices/allinvoices">
            <button className=" text-primary-blue ">See all invoices</button>
          </Link>
        </TabsList>
        <TabsContent value="all">
          <InvoiceTabContentAll
            openArchiveModal={handleOpenArchiveModal}
            openDeleteModal={handleOpenDeleteModal}
            openEditModal={handleOpenEditModal}
            onToggleSelectAll={handleToggleSelectAll}
            numberOfInvoicesToShow={10}
          />
        </TabsContent>
        <TabsContent value="archived">
          <InvoiceTabContentArchived
            openArchiveModal={handleOpenArchiveModal}
            openDeleteModal={handleOpenDeleteModal}
            openEditModal={handleOpenEditModal}
            onToggleSelectAll={handleToggleSelectAll}
            numberOfInvoicesToShow={10}
          />
        </TabsContent>
      </Tabs>
      <ArchiveInvoice
        open={isOpen}
        openModal={openModal}
        onClose={closeModal}
        invoiceId={selectedId}
      />
      <DeleteInvoice
        open={isDeleteInvoiceOpen}
        openModal={openDeleteInvoiceModal}
        onClose={closeDeleteInvoiceModal}
        invoiceId={selectedId}
      />
      <BulkArchiveInvoice
        open={isOpen}
        openModal={openModal}
        onClose={closeModal}
        invoiceId={selectedId}
      />
    </div>
  );
};

export default InvoiceList;
