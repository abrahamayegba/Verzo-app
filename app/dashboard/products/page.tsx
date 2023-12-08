"use client";
import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import ProductList from "@/components/ProductList";
import localStorage from "local-storage-fallback";
import CreateProductSheet from "@/components/sheets/product/CreateProductSheet";
import {
  useGetBusinessesByUserIdQuery,
  useGetProductsByBusinessQuery,
} from "@/src/generated/graphql";
import MainLoader from "@/components/loading/MainLoader";
import Loader2 from "@/components/loading/Loader2";

const Products = () => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const [openCreateProductSheet, setOpenCreateProductSheet] = useState(false);
  const getBusinessesByUserId = useGetBusinessesByUserIdQuery();
  const getProductsByBusiness = useGetProductsByBusinessQuery({
    variables: {
      businessId: businessId,
      cursor: null,
      sets: 1,
    },
  });

  const handleCloseProductSheet = () => {
    setOpenCreateProductSheet(false);
  };
  if (getBusinessesByUserId.loading) {
    return <MainLoader />;
  }

  const productsLoading = getProductsByBusiness.loading;

  return (
    <>
      {productsLoading ? (
        <Loader2 />
      ) : (
        <div className=" px-[52px] bg-primary-whiteTint pt-[47px] pb-[20px] gap-y-[36px] flex flex-col">
          <div className=" flex flex-row justify-between items-center">
            <div className=" flex flex-col  gap-y-2">
              <p className=" text-primary-black font-medium text-3xl">
                Products
              </p>
              <p className=" text-primary-greytext">
                Create and manage products
              </p>
            </div>
            <div className=" flex gap-x-[14px] max-h-[48px]">
              <button
                onClick={() => setOpenCreateProductSheet(true)}
                className=" px-6 py-3 rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white"
              >
                Add product
                <PlusCircle className=" w-5 h-5" />
              </button>
            </div>
          </div>
          <ProductList />
        </div>
      )}

      <CreateProductSheet
        open={openCreateProductSheet}
        onClose={handleCloseProductSheet}
      />
    </>
  );
};

export default Products;
