"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import useModal from "@/app/hooks/useModal";
import Link from "next/link";
import PurchaseTabContentAll from "./PurchaseTabContentAll";
import PurchaseTabContentArchived from "./PurchaseTabContentArchived";
import ArchivePurchase from "../modals/purchase/ArchivePurchaseModal";
import UnarchivePurchase from "../modals/purchase/UnarchivePurchaseModal";
import DeletePurchase from "../modals/purchase/DeletePurchaseModal";
import localStorage from "local-storage-fallback";
import { useGetPurchaseByBusinessQuery } from "@/src/generated/graphql";

const PurchaseList = () => {
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
      sets: 1,
      cursor: null,
    },
  });
  const purchases =
    getPurchasesByBusiness.data?.getPurchaseByBusiness?.purchaseByBusiness ??
    [];
  const allPurchases = purchases.length;
  const archivedPurchases = purchases.filter(
    (purchase) => purchase?.archived
  ).length;

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
                ({archivedPurchases})
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
          ) : (
            <Link href="/dashboard/purchases/allpurchases">
              <button className=" text-primary-blue ">See all purchases</button>
            </Link>
          )}
        </TabsList>
        <TabsContent value="all">
          <PurchaseTabContentAll
            openDeleteModal={handleOpenDeleteModal}
            openArchiveModal={handleOpenArchiveModal}
            onToggleSelectAll={handleToggleSelectAll}
            openEditModal={handleOpenEditModal}
            numberOfPurchasesToShow={10}
          />
        </TabsContent>
        <TabsContent value="archived">
          <PurchaseTabContentArchived
            openDeleteModal={openDeletePurchaseModal}
            openUnarchiveModal={openUnarchiveModal}
            openEditModal={openEditModal}
            onToggleSelectAll={handleToggleSelectAll}
            numberOfPurchasesToShow={10}
          />
        </TabsContent>
      </Tabs>
      <ArchivePurchase
        open={isOpen}
        openModal={openModal}
        onClose={closeModal}
        purchaseId={selectedId}
      />
      <UnarchivePurchase
        open={isUnarchiveOpen}
        openModal={openUnarchiveModal}
        onClose={closeUnarchiveModal}
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

export default PurchaseList;
