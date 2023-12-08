"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import useModal from "@/app/hooks/useModal";
import DeleteProduct from "./modals/product/DeleteProductModal";
import UnarchiveProduct from "./modals/product/UnarchiveProductModal";
import ArchiveProduct from "./modals/product/ArchiveProductModal";
import ProductTabContentAll from "./ProductTabContentAll";
import localStorage from "local-storage-fallback";
import ProductTabContentArchived from "./ProductTabContentArchived";
import { useGetProductsByBusinessQuery } from "@/src/generated/graphql";
import EditProductSheet from "./sheets/product/EditProductSheet";

const ProductList = () => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const [isChecked, setIsChecked] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isDeleteProductOpen,
    openModal: openDeleteProductModal,
    closeModal: closeDeleteProductModal,
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

  const getProductsByBusiness = useGetProductsByBusinessQuery({
    variables: {
      businessId: businessId,
      cursor: null,
      sets: 1,
    },
  });

  const products =
    getProductsByBusiness.data?.getProductsByBusiness?.productByBusiness ?? [];

  const allProducts = products.length;
  const archivedProducts = products.filter(
    (product) => product?.isArchived
  ).length;

  const handleToggleSelectAll = (isChecked: boolean) => {
    setIsChecked(isChecked);
  };

  const handleOpenArchiveModal = (customerId: string) => {
    setSelectedId(customerId);
    openModal();
  };

  const handleOpenDeleteModal = (customerId: string) => {
    setSelectedId(customerId);
    openDeleteProductModal();
  };

  const handleOpenEditModal = (customerId: string) => {
    setSelectedId(customerId);
    openEditModal();
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
              <span className=" text-primary-mainGrey">({allProducts})</span>
            </TabsTrigger>
            <TabsTrigger
              className=" text-[17px]  data-[state=active]:text-primary-black text-primary-greytext data-[state=active]:border-b-2 data-[state=active]:border-b-gray-400"
              value="archived"
            >
              Archived{" "}
              <span className=" text-primary-mainGrey">
                {" "}
                ({archivedProducts})
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
                onClick={openDeleteProductModal}
                className=" px-6 py-[10px] rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-red text-sm text-white"
              >
                Delete
              </button>
            </div>
          ) : null}
        </TabsList>
        <TabsContent value="all">
          <ProductTabContentAll
            openDeleteModal={handleOpenDeleteModal}
            openArchiveModal={handleOpenArchiveModal}
            openEditModal={handleOpenEditModal}
            onToggleSelectAll={handleToggleSelectAll}
          />
        </TabsContent>
        <TabsContent value="archived">
          <ProductTabContentArchived
            openDeleteModal={openDeleteProductModal}
            openUnarchiveModal={openUnarchiveModal}
            onToggleSelectAll={handleToggleSelectAll}
          />
        </TabsContent>
      </Tabs>
      <ArchiveProduct
        open={isOpen}
        openModal={openModal}
        onClose={closeModal}
        productId={selectedId}
      />
      <EditProductSheet
        open={isEditModalOpen}
        onClose={closeEditModal}
        productId={selectedId}
      />
      <UnarchiveProduct
        open={isUnarchiveOpen}
        openModal={openUnarchiveModal}
        onClose={closeUnarchiveModal}
        productId={selectedId}
      />
      <DeleteProduct
        open={isDeleteProductOpen}
        openModal={openDeleteProductModal}
        onClose={closeDeleteProductModal}
        productId={selectedId}
      />
    </div>
  );
};

export default ProductList;
