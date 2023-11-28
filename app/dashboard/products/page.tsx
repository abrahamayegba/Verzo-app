"use client";
import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import ProductList from "@/components/ProductList";
import CreateProductSheet from "@/components/sheets/product/CreateProductSheet";

const Products = () => {
  const [openCreateProductSheet, setOpenCreateProductSheet] = useState(false);

  const handleCloseProductSheet = () => {
    setOpenCreateProductSheet(false);
  };
  return (
    <>
      <div className=" px-[52px] bg-primary-whiteTint pt-[47px] pb-[20px] gap-y-[36px] flex flex-col">
        <div className=" flex flex-row justify-between items-center">
          <div className=" flex flex-col  gap-y-2">
            <p className=" text-primary-black font-medium text-3xl">Products</p>
            <p className=" text-primary-greytext">Create and manage products</p>
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
      <CreateProductSheet
        open={openCreateProductSheet}
        onClose={handleCloseProductSheet}
      />
    </>
  );
};

export default Products;
