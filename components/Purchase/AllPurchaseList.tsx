"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import useModal from "@/app/hooks/useModal";
import CustomPagination from "../InvoiceListPagination";
import DeletePurchase from "../modals/purchase/DeletePurchaseModal";
import UnarchivePurchase from "../modals/purchase/UnarchivePurchaseModal";
import PurchaseTabContentAll from "./PurchaseTabContentAll";
import PurchaseTabContentArchived from "./PurchaseTabContentArchived";
import ArchivePurchase from "../modals/purchase/ArchivePurchaseModal";
import localStorage from "local-storage-fallback";
import {
  useGetArchivedPurchasesByBusinessQuery,
  useGetPurchaseByBusinessQuery,
} from "@/src/generated/graphql";

const AllPurchaseList = () => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const [isChecked, setIsChecked] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isDeletePurchaseOpen,
    openModal: openDeletePurchaseModal,
    closeModal: closeDeletePurchaseModal,
  } = useModal();

  const {
    isOpen: isUnarchivePurchaseOpen,
    openModal: openUnarchivePurchaseModal,
    closeModal: closeUnarchivePurchaseModal,
  } = useModal();

  const {
    isOpen: isEditModalOpen,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();

  const handleToggleSelectAll = (isChecked: boolean) => {
    setIsChecked(isChecked);
  };

  const handleOpenArchiveModal = (purchaseId: string) => {
    setSelectedId(purchaseId);
    openModal();
  };

  const handleOpenDeleteModal = (purchaseId: string) => {
    setSelectedId(purchaseId);
    openDeletePurchaseModal();
  };

  const handleOpenEditModal = (purchaseId: string) => {
    setSelectedId(purchaseId);
    openEditModal();
  };

  const getPurchasesByBusiness = useGetPurchaseByBusinessQuery({
    variables: {
      businessId: businessId,
      cursor: null,
      sets: 1,
    },
  });
  const getArchivedPurchasesByBusiness = useGetArchivedPurchasesByBusinessQuery(
    {
      variables: {
        businessId: businessId,
        sets: 1,
        cursor: null,
      },
    }
  );
  const archivedPurchases =
    getArchivedPurchasesByBusiness.data?.getArchivedPurchaseByBusiness
      ?.purchaseByBusiness ?? [];
  const purchases =
    getPurchasesByBusiness.data?.getPurchaseByBusiness?.purchaseByBusiness ??
    [];
  const allPurchases = purchases.length;
  const allArchivedPurchases = archivedPurchases.length;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages: number = 5;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
              All{" "}
              <span className=" text-primary-mainGrey">({allPurchases})</span>
            </TabsTrigger>
            <TabsTrigger
              className=" text-[17px]  data-[state=active]:text-primary-black text-primary-greytext data-[state=active]:border-b-2 data-[state=active]:border-b-gray-400"
              value="archived"
            >
              Archived{" "}
              <span className=" text-primary-mainGrey">
                {" "}
                ({allArchivedPurchases})
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
                onClick={openDeletePurchaseModal}
                className=" px-6 py-[10px] rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-red text-sm text-white"
              >
                Delete
              </button>
            </div>
          ) : null}
        </TabsList>
        <TabsContent value="all">
          <PurchaseTabContentAll
            openDeleteModal={handleOpenDeleteModal}
            openArchiveModal={handleOpenArchiveModal}
            onToggleSelectAll={handleToggleSelectAll}
            openEditModal={handleOpenEditModal}
          />
          {/* {purchases.length > 0 && (
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )} */}
        </TabsContent>
        <TabsContent value="archived">
          <PurchaseTabContentArchived
            openDeleteModal={handleOpenDeleteModal}
            openUnarchiveModal={handleOpenArchiveModal}
            onToggleSelectAll={handleToggleSelectAll}
            openEditModal={handleOpenEditModal}
          />
          {/* {archivedPurchases.length > 0 && (
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )} */}
        </TabsContent>
      </Tabs>
      <ArchivePurchase
        open={isOpen}
        openModal={openModal}
        onClose={closeModal}
        purchaseId={selectedId}
      />
      <UnarchivePurchase
        open={isUnarchivePurchaseOpen}
        openModal={openUnarchivePurchaseModal}
        onClose={closeUnarchivePurchaseModal}
      />
      <DeletePurchase
        open={isDeletePurchaseOpen}
        openModal={openDeletePurchaseModal}
        onClose={closeDeletePurchaseModal}
        purchaseId={selectedId}
      />
    </div>
  );
};

export default AllPurchaseList;
