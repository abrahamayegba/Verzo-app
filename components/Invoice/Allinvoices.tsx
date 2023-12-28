"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import InvoiceTabContentAll from "./InvoiceTabContentAll";
import InvoiceTabContentArchived from "./InvoiceTabContentArchived";
import ArchiveInvoice from "../modals/invoice/ArchiveInvoice";
import useModal from "@/app/hooks/useModal";
import DeleteInvoice from "../modals/invoice/DeleteInvoiceModal";
import localStorage from "local-storage-fallback";
import {
  useGetArchivedSalesByBusinessQuery,
  useGetSaleByBusinessQuery,
} from "@/src/generated/graphql";
import UnarchiveInvoice from "../modals/invoice/UnarchiveInvoice";

const AllInvoicesList = () => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const [isChecked, setIsChecked] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();
  const {
    isOpen: isEditModalOpen,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();

  const {
    isOpen: isUnarchiveOpen,
    openModal: openUnarchiveModal,
    closeModal: closeUnarchiveModal,
  } = useModal();

  const handleToggleSelectAll = (isChecked: boolean) => {
    setIsChecked(isChecked);
  };

  const handleOpenArchiveModal = (invoiceId: string) => {
    setSelectedId(invoiceId);
    openModal();
  };

  const handleOpenUnarchiveModal = (invoiceId: string) => {
    setSelectedId(invoiceId);
    openUnarchiveModal();
  };

  const handleOpenDeleteModal = (invoiceId: string) => {
    setSelectedId(invoiceId);
    openDeleteModal();
  };

  const handleOpenEditModal = (invoiceId: string) => {
    setSelectedId(invoiceId);
    openEditModal();
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages: number = 5;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getSalesByBusiness = useGetSaleByBusinessQuery({
    variables: {
      businessId: businessId,
      sets: 3,
    },
  });
  const invoices =
    getSalesByBusiness.data?.getSaleByBusiness?.salesByBusiness ?? [];
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
          {isChecked ? (
            <div className=" flex gap-x-4">
              <button
                onClick={openModal}
                className=" px-6 py-[10px] rounded-[10px] flex gap-x-2 items-center text-sm justify-center border border-primary-border"
              >
                Archive
              </button>
              <button
                onClick={openDeleteModal}
                className=" px-6 py-[10px] rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-red text-sm text-white"
              >
                Delete
              </button>
            </div>
          ) : null}
        </TabsList>
        <TabsContent value="all">
          <InvoiceTabContentAll
            openArchiveModal={handleOpenArchiveModal}
            openDeleteModal={handleOpenDeleteModal}
            openEditModal={handleOpenEditModal}
            onToggleSelectAll={handleToggleSelectAll}
          />
        </TabsContent>
        <TabsContent value="archived">
          <InvoiceTabContentArchived
            openDeleteModal={handleOpenDeleteModal}
            openUnarchiveModal={handleOpenUnarchiveModal}
            onToggleSelectAll={handleToggleSelectAll}
          />
        </TabsContent>
      </Tabs>
      <ArchiveInvoice
        open={isOpen}
        openModal={openModal}
        onClose={closeModal}
        invoiceId={selectedId}
      />
      <UnarchiveInvoice
        open={isUnarchiveOpen}
        openModal={openUnarchiveModal}
        onClose={closeUnarchiveModal}
        invoiceId={selectedId}
      />
      <DeleteInvoice
        open={isDeleteModalOpen}
        openModal={openDeleteModal}
        onClose={closeDeleteModal}
        invoiceId={selectedId}
      />
    </div>
  );
};

export default AllInvoicesList;
