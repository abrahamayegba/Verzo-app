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
import {
  useGetArchivedProductsByBusinessQuery,
  useGetArchivedServiceByBusinessQuery,
  useGetProductOrServiceByBusinessQuery,
  useGetProductsByBusinessQuery,
  useGetServiceByBusinessQuery,
} from "@/src/generated/graphql";
import EditProductSheet from "./sheets/product/EditProductSheet";
import ServiceTabContentAll from "./ServiceTabContentAll";
import ItemTabContentAll from "./ItemTabContentAll";

interface ProductlistProps {
  productSearchId: string;
}

const ProductList: React.FC<ProductlistProps> = ({ productSearchId }) => {
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

  const getProductOrServiceByBusiness = useGetProductOrServiceByBusinessQuery({
    variables: {
      businessId: businessId,
    },
  });

  const getProductsByBusiness = useGetProductsByBusinessQuery({
    variables: {
      businessId: businessId,
      cursor: null,
      sets: 1,
    },
  });

  const getServicesByBusiness = useGetServiceByBusinessQuery({
    variables: {
      businessId: businessId,
      cursor: null,
      sets: 1,
    },
  });
  const services =
    getServicesByBusiness.data?.getServiceByBusiness?.serviceByBusiness ?? [];

  const getArchivedProductsByBusiness = useGetArchivedProductsByBusinessQuery({
    variables: {
      businessId: businessId,
      cursor: null,
      sets: 1,
    },
  });

  const archivedItems =
    getArchivedProductsByBusiness.data?.getArchivedProductByBusiness
      ?.productByBusiness ?? [];

  const items =
    getProductsByBusiness.data?.getProductsByBusiness?.productByBusiness ?? [];

  const getArchivedServicesByBusiness = useGetArchivedServiceByBusinessQuery({
    variables: {
      businessId: businessId,
      cursor: null,
      sets: 1,
    },
  });

  const archivedServices =
    getArchivedServicesByBusiness.data?.getArchivedServicesByBusiness
      ?.serviceByBusiness ?? [];

  const productSearchResult = items.find(
    (product) => product?.id === productSearchId
  );

  const archivedProductSearchResult = archivedItems.find(
    (product) => product?.id === productSearchId
  );

  const defaultValue = productSearchResult
    ? "all"
    : archivedProductSearchResult
    ? "archived"
    : "all";

  const products =
    getProductOrServiceByBusiness.data?.getProductOrServiceByBusiness
      ?.productOrServiceByBusiness ?? [];
  const allProducts = products.length;

  const allItems = items.length;
  const allArchivedProducts = archivedItems.length + archivedServices.length;
  const allServices = services.length;

  const handleToggleSelectAll = (isChecked: boolean) => {
    setIsChecked(isChecked);
  };

  const handleOpenArchiveModal = (customerId: string) => {
    setSelectedId(customerId);
    openModal();
  };

  const handleOpenUnarchiveModal = (customerId: string) => {
    setSelectedId(customerId);
    openUnarchiveModal();
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
      <Tabs defaultValue={defaultValue} className="w-full">
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
              className=" text-[17px]  data-[state=active]:text-primary-black data-[state=active]:border-b-2 data-[state=active]:border-b-gray-400  text-primary-greytext"
              value="item"
            >
              Item <span className=" text-primary-mainGrey">({allItems})</span>
            </TabsTrigger>
            <TabsTrigger
              className=" text-[17px]  data-[state=active]:text-primary-black data-[state=active]:border-b-2 data-[state=active]:border-b-gray-400  text-primary-greytext"
              value="service"
            >
              Service{" "}
              <span className=" text-primary-mainGrey">({allServices})</span>
            </TabsTrigger>
            <TabsTrigger
              className=" text-[17px]  data-[state=active]:text-primary-black text-primary-greytext data-[state=active]:border-b-2 data-[state=active]:border-b-gray-400"
              value="archived"
            >
              Archived{" "}
              <span className=" text-primary-mainGrey">
                {" "}
                ({allArchivedProducts})
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
            productSearchId={productSearchId}
          />
        </TabsContent>
        <TabsContent value="item">
          <ItemTabContentAll
            openDeleteModal={handleOpenDeleteModal}
            openArchiveModal={handleOpenArchiveModal}
            openEditModal={handleOpenEditModal}
            onToggleSelectAll={handleToggleSelectAll}
            productSearchId={productSearchId}
          />
        </TabsContent>
        <TabsContent value="service">
          <ServiceTabContentAll
            openDeleteModal={handleOpenDeleteModal}
            openArchiveModal={handleOpenArchiveModal}
            openEditModal={handleOpenEditModal}
            onToggleSelectAll={handleToggleSelectAll}
            serviceSearchId={productSearchId}
          />
        </TabsContent>
        <TabsContent value="archived">
          <ProductTabContentArchived
            openDeleteModal={handleOpenDeleteModal}
            openUnarchiveModal={handleOpenUnarchiveModal}
            productSearchId={productSearchId}
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
