"use client";
import CustomerForm from "@/components/CustomerForm";
import InvoiceItem from "@/components/InvoiceItem";
import SaleExpenseItem from "@/components/SaleExpenseItem";
import ServiceExpenseItem from "@/components/ServiceExpenseItem";
import CreateCustomerSheet from "@/components/sheets/invoice/CreateCustomerSheet";
import CreateItemSheet from "@/components/sheets/invoice/CreateItemSheet";
import ViewInvoiceSheet from "@/components/sheets/invoice/ViewInvoiceSheet";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import ActiveProductIcon from "@/components/ui/icons/ActiveProductIcon";
import BankIcon from "@/components/ui/icons/BankIcon";
import InfoIcon from "@/components/ui/icons/InfoIcon";
import LocationIcon from "@/components/ui/icons/LocationIcon";
import ProfileIcon from "@/components/ui/icons/ProfileIcon";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Info, MoveLeft, Phone, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, useRef, useState } from "react";

interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

interface Expense {
  name: string;
  amount: string;
}

interface ServiceExpense {
  service: string;
  amount: string;
}

const CreateInvoice = () => {
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [serviceExpenses, setServiceExpenses] = useState<ServiceExpense[]>([]);
  const [openCustomerSheet, setOpenCustomerSheet] = useState(false);
  const [openViewInvoiceSheet, setOpenViewInvoiceSheet] = useState(false);
  const [openCreateItemSheet, setOpenCreateItemSheet] = useState(false);
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleOpenCustomerSheet = () => {
    setOpenCustomerSheet(true);
  };
  const handleCloseCustomerSheet = () => {
    setOpenCustomerSheet(false);
  };

  const handleCloseCreateItemSheet = () => {
    setOpenCreateItemSheet(false);
  };

  const handleCloseViewInvoiceSheet = () => {
    setOpenViewInvoiceSheet(false);
  };

  const deleteItem = (index: number) => {
    const updatedItems = [...invoiceItems];
    updatedItems.splice(index, 1);
    setInvoiceItems(updatedItems);
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    const updatedItems = [...invoiceItems];
    updatedItems[index].quantity = quantity;
    setInvoiceItems(updatedItems);
  };

  const handlePriceChange = (index: number, price: number) => {
    const updatedItems = [...invoiceItems];
    updatedItems[index].price = price;
    setInvoiceItems(updatedItems);
  };

  const setSideSheetCallback = (selectedItem: InvoiceItem) => {
    setInvoiceItems((prevItems) => [...prevItems, selectedItem]);
  };

  const handleAddExpense = () => {
    setExpenses([...expenses, { name: "", amount: "" }]);
  };

  const handleAddServiceExpense = () => {
    setServiceExpenses([...serviceExpenses, { service: "", amount: "" }]);
  };

  const handleExpenseChange = (
    index: number,
    field: keyof Expense,
    value: string
  ) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index][field] = value;
    setExpenses(updatedExpenses);
  };

  const handleServiceExpenseChange = (
    index: number,
    field: keyof ServiceExpense,
    value: string
  ) => {
    const updatedServiceExpenses = [...serviceExpenses];
    updatedServiceExpenses[index][field] = value;
    setServiceExpenses(updatedServiceExpenses);
  };

  const handleDeleteExpense = (index: number) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };

  const handleDeleteServiceExpense = (index: number) => {
    const updatedServiceExpenses = [...serviceExpenses];
    updatedServiceExpenses.splice(index, 1);
    setServiceExpenses(updatedServiceExpenses);
  };

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

  return (
    <div className=" pt-[40px] flex flex-col max-w-[850px] gap-y-[36px]">
      <div className=" flex justify-between w-full items-center relative">
        <Link
          className=" absolute top-0 text-primary-greytext "
          href="/dashboard/invoices"
        >
          <button className=" flex items-center gap-x-2">
            <MoveLeft className=" w-5 h-5 " />
            Back to Invoices
          </button>
        </Link>
        <div className=" flex flex-col gap-y-[4px] mt-9">
          <p className=" text-[30px] text-primary-black ">New Invoice </p>
          <p className=" text-primary-greytext font-light text-lg">
            Fill out the information below to create an invoice
          </p>
        </div>
        <button
          onClick={() => setOpenViewInvoiceSheet(true)}
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
      <CustomerForm openCustomerSheet={handleOpenCustomerSheet} />
      <div className=" w-full mt-5 flex flex-col gap-y-9">
        <div className=" flex justify-between items-center w-full">
          <div className=" flex flex-col">
            <p className=" text-lg text-primary-black">Items</p>
            <p className=" text-primary-greytext">Describe the items sold</p>
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
          {invoiceItems.length === 0 ? (
            <div className=" h-[150px] bg-white flex flex-col justify-center gap-y-4 items-center text-primary-greytext">
              <span className=" p-3 bg-[#F9FCFF] rounded-full">
                <ActiveProductIcon />
              </span>
              No items added
            </div>
          ) : (
            invoiceItems.map((item, index) => (
              <InvoiceItem
                key={index}
                item={item}
                index={index}
                onDelete={deleteItem}
                onQuantityChange={handleQuantityChange}
                onPriceChange={handlePriceChange}
              />
            ))
          )}
          {invoiceItems.length > 0 && (
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
        <div className=" flex justify-between items-center w-full">
          <div className=" flex flex-col">
            <p className=" text-lg text-primary-black items-center flex flex-row gap-x-2">
              Sale expense
              <HoverCard>
                <HoverCardTrigger>
                  <Info className=" w-5 h-5 text-gray-400 mt-[2px] cursor-pointer" />
                </HoverCardTrigger>
                <HoverCardContent className=" bg-white shadow-none rounded-[10px] w-[350px] p-5">
                  <div className=" flex flex-col gap-y-3">
                    <div className=" flex">
                      <span className=" rounded-full bg-[#EDF6FF] p-2 flex">
                        <InfoIcon />
                      </span>
                    </div>
                    <p className=" text-lg text-primary-black">Sale expense</p>
                    <p className=" text-primary-greytext text-sm mt-[-4px]">
                      A short text explaining this component of invoice creation
                      to the user. It should be concise
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </p>
            <p className=" text-primary-greytext">Include extra expenses</p>
          </div>
          <button
            onClick={handleAddExpense}
            className=" text-primary-blue flex items-center gap-x-2"
          >
            Add expense <Plus className=" w-[18px] h-[18px]" />
          </button>
        </div>
        {expenses.map((expense, index) => (
          <SaleExpenseItem
            key={index}
            expense={expense}
            index={index}
            onExpenseChange={handleExpenseChange}
            onDeleteExpense={handleDeleteExpense}
          />
        ))}
        <div className=" flex justify-between items-center w-full mt-3">
          <div className=" flex flex-col">
            <p className=" text-lg text-primary-black items-center flex flex-row gap-x-2">
              Service expense
              <HoverCard>
                <HoverCardTrigger>
                  <Info className=" w-5 h-5 text-gray-400 mt-[2px] cursor-pointer" />
                </HoverCardTrigger>
                <HoverCardContent className=" bg-white shadow-none rounded-[10px] w-[350px] p-5">
                  <div className=" flex flex-col gap-y-3">
                    <div className=" flex">
                      <span className=" rounded-full bg-[#EDF6FF] p-2 flex">
                        <InfoIcon />
                      </span>
                    </div>
                    <p className=" text-lg text-primary-black">
                      Service expense
                    </p>
                    <p className=" text-primary-greytext text-sm mt-[-4px]">
                      A short text explaining this component of invoice creation
                      to the user. It should be concise
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </p>
            <p className=" text-primary-greytext">
              Include extra service expenses
            </p>
          </div>
          <button
            onClick={handleAddServiceExpense}
            className=" text-primary-blue flex items-center gap-x-2"
          >
            Add expense <Plus className=" w-[18px] h-[18px]" />
          </button>
        </div>
        {serviceExpenses.map((serviceExpense, index) => (
          <ServiceExpenseItem
            key={index}
            expense={serviceExpense}
            index={index}
            onServiceExpenseChange={handleServiceExpenseChange}
            onDeleteServiceExpense={handleDeleteServiceExpense}
          />
        ))}
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
            A unique identifier for this invoice
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
      <CreateItemSheet
        open={openCreateItemSheet}
        onClose={handleCloseCreateItemSheet}
        onItemSelected={setSideSheetCallback}
      />
      <ViewInvoiceSheet
        open={openViewInvoiceSheet}
        onClose={handleCloseViewInvoiceSheet}
      />
      <CreateCustomerSheet
        open={openCustomerSheet}
        onClose={handleCloseCustomerSheet}
      />
    </div>
  );
};

export default CreateInvoice;
