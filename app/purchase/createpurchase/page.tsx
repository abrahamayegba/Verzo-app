"use client";
import MerchantPurchaseForm from "@/components/MerchantPurchaseForm";
import PurchaseItem from "@/components/PurchaseItem";
import CreateCategorySheet from "@/components/sheets/expense/CreateCategorySheet";
import CreateMerchantSheet from "@/components/sheets/expense/CreateMerchantSheet";
import CreateItemSheet from "@/components/sheets/invoice/CreateItemSheet";
import ViewPurchaseSheet from "@/components/sheets/purchase/ViewPurchaseSheet";
import ActivePurchaseIcon from "@/components/ui/icons/ActivePurchaseIcon";
import BankIcon from "@/components/ui/icons/BankIcon";
import LocationIcon from "@/components/ui/icons/LocationIcon";
import ProfileIcon from "@/components/ui/icons/ProfileIcon";
import { Textarea } from "@/components/ui/textarea";
import { Eye, MoveLeft, Phone, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, useRef, useState } from "react";

interface PurchaseItemProp {
  name: string;
  quantity: number;
  price: number;
}

const CreatePurchase = () => {
  const [purchaseItems, setPurchaseItems] = useState<PurchaseItemProp[]>([]);
  const [openMerchantSheet, setOpenMerchantSheet] = useState(false);
  const [openCreateItemSheet, setOpenCreateItemSheet] = useState(false);
  const [openViewPurchaseSheet, setOpenViewPurchaseSheet] = useState(false);
  const [openCreateCategorySheet, setOpenCreateCategorySheet] = useState(false);
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Ensure that e.target?.result is not undefined
        setSelectedImage(e.target?.result || null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCloseMerchantSheet = () => {
    setOpenMerchantSheet(false);
  };

  const handleCloseCreateCategorySheet = () => {
    setOpenCreateCategorySheet(false);
  };

  const handleCloseViewPurchaseSheet = () => {
    setOpenViewPurchaseSheet(false);
  };

  const handleOpenMerchantSheet = () => {
    setOpenMerchantSheet(true);
  };

  const deleteItem = (index: number) => {
    const updatedItems = [...purchaseItems];
    updatedItems.splice(index, 1);
    setPurchaseItems(updatedItems);
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    const updatedItems = [...purchaseItems];
    updatedItems[index].quantity = quantity;
    setPurchaseItems(updatedItems);
  };

  const handlePriceChange = (index: number, price: number) => {
    const updatedItems = [...purchaseItems];
    updatedItems[index].price = price;
    setPurchaseItems(updatedItems);
  };

  const setSideSheetCallback = (selectedItem: PurchaseItemProp) => {
    setPurchaseItems((prevItems) => [...prevItems, selectedItem]);
  };

  const handleCloseCreateItemSheet = () => {
    setOpenCreateItemSheet(false);
  };

  console.log(purchaseItems);

  return (
    <div className=" pt-[40px] flex flex-col max-w-[850px] gap-y-[36px]">
      <div className=" flex justify-between w-full items-center relative">
        <Link
          className=" absolute top-0 text-primary-greytext "
          href="/dashboard/purchases"
        >
          <button className=" flex items-center gap-x-2">
            <MoveLeft className=" w-5 h-5 " />
            Back to Purchases
          </button>
        </Link>
        <div className=" flex flex-col gap-y-[4px] mt-9">
          <p className=" text-[30px] text-primary-black ">New order </p>
          <p className=" text-primary-greytext font-light text-lg">
            Fill out the information below to create a purchase order
          </p>
        </div>
        <button
          onClick={() => setOpenViewPurchaseSheet(true)}
          className=" px-6 py-3 rounded-[10px] flex gap-x-2 items-center justify-center border border-primary-border"
        >
          Preview
          <Eye className=" w-5 h-5 text-gray-500" />
        </button>
      </div>
      <div className=" flex flex-col gap-y-5">
        <p className=" text-primary-black text-lg">Business details</p>
        <div className=" flex flex-row gap-x-9 items-center">
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              ref={fileInputRef}
            />
            {selectedImage ? (
              <div>
                <Image
                  alt="Preview"
                  width={134}
                  height={132}
                  src={selectedImage as string}
                />
              </div>
            ) : (
              <button
                className="h-[132px] border border-dashed border-primary-border rounded-md px-6 text-primary-greytext cursor-pointer"
                onClick={handleClick}
              >
                Drag or <br /> upload logo
              </button>
            )}
          </div>
          <div className=" flex flex-col gap-y-6 text-primary-greytext text-lg">
            <p className=" flex gap-x-3 items-center">
              <BankIcon />
              Verzo
            </p>
            <p className=" flex gap-x-3 items-center">
              <LocationIcon />
              Lagos, Nigeria
            </p>
          </div>
          <div className=" flex flex-col gap-y-6 text-primary-greytext text-lg">
            <p className=" flex gap-x-3 items-center ">
              <Phone className=" w-5 h-5 text-[#C4C4C4]" />
              +23410234790
            </p>
            <p className=" flex gap-x-3 items-center ">
              <ProfileIcon />
              femi@verzo.com
            </p>
          </div>
        </div>
      </div>
      <MerchantPurchaseForm openMerchantSheet={handleOpenMerchantSheet} />
      <div className=" w-full mt-5 flex flex-col gap-y-9">
        <div className=" flex justify-between items-center w-full">
          <div className=" flex flex-col">
            <p className=" text-lg text-primary-black">Items</p>
            <p className=" text-primary-greytext">List the items purchased</p>
          </div>
          <button
            onClick={() => setOpenCreateItemSheet(true)}
            className=" text-primary-blue flex items-center gap-x-2"
          >
            Add item <Plus className=" w-[18px] h-[18px]" />
          </button>
        </div>
        <div className=" flex flex-col">
          <div className="grid grid-cols-5 gap-x-5 text-primary-greytext border-t border-t-[#f4f4f4] py-[14px]">
            <p className="col-span-3">Item</p>
            <p className="col-span-1 px-3">Qty</p>
            <p className="col-span-1 text-end pr-3">Price</p>
          </div>
          {purchaseItems.length === 0 ? (
            <div className=" h-[150px] bg-white flex flex-col justify-center gap-y-4 items-center text-primary-greytext">
              <span className=" p-3 bg-[#F9FCFF] rounded-full">
                <ActivePurchaseIcon />
              </span>
              No purchase added
            </div>
          ) : (
            purchaseItems.map((purchase, index) => (
              <PurchaseItem
                key={index}
                item={purchase}
                index={index}
                onDelete={deleteItem}
                onQuantityChange={handleQuantityChange}
                onPriceChange={handlePriceChange}
              />
            ))
          )}
          {purchaseItems.length > 0 && (
            <div className=" w-full flex flex-col items-end text-primary-black text-lg mt-[30px]">
              <div className=" flex gap-x-[180px] p-4">
                <p className=" text-primary-greytext">Subtotal</p>
                <p>₦3,000</p>
              </div>
              <div className=" flex gap-x-[180px] p-4 border-t border-t-gray-100">
                <p className=" text-primary-greytext">Amount due</p>
                <p>₦3,000</p>
              </div>
            </div>
          )}
        </div>
        <div className=" flex flex-col mt-2">
          <p className=" text-lg text-primary-black">Description</p>
          <p className=" text-primary-greytext mt-[2px]">
            Say more to your customer
          </p>
          <Textarea className=" mt-5" />
        </div>
        <div className=" flex flex-col">
          <p className=" text-lg text-primary-black">Reference</p>
          <p className=" text-primary-greytext mt-[2px]">
            A unique identifier for this purchase
          </p>
          <input
            className=" w-full rounded-lg border border-gray-200 p-[10px] text-[15px] focus:outline-none mt-5"
            type="text"
          />
        </div>
        <div className=" flex flex-row items-center gap-x-5 mt-2">
          <button className=" px-9 py-3 rounded-[10px] flex gap-x-2 items-center justify-center border border-primary-border">
            Cancel
          </button>
          <button className=" bg-primary-blue text-white rounded-[10px] px-10 py-3">
            Save
          </button>
        </div>
      </div>
      <CreateCategorySheet
        open={openCreateCategorySheet}
        onClose={handleCloseCreateCategorySheet}
      />
      <CreateItemSheet
        open={openCreateItemSheet}
        onClose={handleCloseCreateItemSheet}
        onItemSelected={setSideSheetCallback}
      />
      <ViewPurchaseSheet
        open={openViewPurchaseSheet}
        onClose={handleCloseViewPurchaseSheet}
      />
      <CreateMerchantSheet
        open={openMerchantSheet}
        onClose={handleCloseMerchantSheet}
      />
    </div>
  );
};

export default CreatePurchase;
