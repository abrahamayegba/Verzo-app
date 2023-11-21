"use client";
import CustomerForm from "@/components/CustomerForm";
import InvoiceItem from "@/components/InvoiceItem";
import SaleExpenseItem from "@/components/SaleExpenseItem";
import CreateCustomerSheet from "@/components/sheets/invoice/CreateCustomerSheet";
import CreateItemSheet from "@/components/sheets/invoice/CreateItemSheet";
import ActiveProductIcon from "@/components/ui/icons/ActiveProductIcon";
import BankIcon from "@/components/ui/icons/BankIcon";
import LocationIcon from "@/components/ui/icons/LocationIcon";
import ProfileIcon from "@/components/ui/icons/ProfileIcon";
import { Eye, Info, Menu, MoveLeft, Phone, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

interface Expense {
  name: string;
  amount: string;
}

const CreateInvoice = () => {
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [openCustomerSheet, setOpenCustomerSheet] = useState(false);
  const [openCreateItemSheet, setOpenCreateItemSheet] = useState(false);
  const handleOpenCustomerSheet = () => {
    setOpenCustomerSheet(true);
  };
  const handleCloseCustomerSheet = () => {
    setOpenCustomerSheet(false);
  };

  const handleCloseCreateItemSheet = () => {
    setOpenCreateItemSheet(false);
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

  const handleExpenseChange = (
    index: number,
    field: keyof Expense,
    value: string
  ) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index][field] = value;
    setExpenses(updatedExpenses);
  };

  const handleDeleteExpense = (index: number) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };

  console.log(expenses);

  return (
    <div className=" pt-[40px] flex flex-col max-w-[850px] gap-y-[36px]">
      <div className=" flex justify-between w-full items-center relative">
        <Link
          className=" absolute top-0 text-primary-greytext "
          href="/dashboard/invoices"
        >
          <button className=" flex items-center gap-x-2">
            <MoveLeft className=" w-5 h-5 " />
            Back to invoice
          </button>
        </Link>
        <div className=" flex flex-col gap-y-[4px] mt-9">
          <p className=" text-[30px] text-primary-black ">New Invoice </p>
          <p className=" text-primary-greytext font-light text-lg">
            Fill out the information below to create an invoice
          </p>
        </div>
        <button className=" px-6 py-3 rounded-[10px] flex gap-x-2 items-center justify-center border border-primary-border">
          Preview
          <Eye className=" w-5 h-5 text-gray-500" />
        </button>
      </div>
      <div className=" flex flex-col gap-y-5">
        <p className=" text-primary-black text-lg">Business details</p>
        <div className=" flex flex-row gap-x-9 items-center">
          <button className=" h-[132px] border border-dashed border-primary-border rounded-md px-6 text-primary-greytext">
            Drag or <br /> upload logo
          </button>
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
            Add item <Plus className=" w-5 h-5" />
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
          <div className=" w-full flex flex-col items-end text-primary-black text-lg mt-[50px]">
            <div className=" flex gap-x-[180px] p-4">
              <p className=" text-primary-greytext">Subtotal</p>
              <p>₦3,000</p>
            </div>
            <div className=" flex gap-x-[180px] p-4 border-t border-t-gray-100">
              <p className=" text-primary-greytext">Amount due</p>
              <p>₦3,000</p>
            </div>
          </div>
        </div>
        <div className=" flex justify-between items-center w-full">
          <div className=" flex flex-col">
            <p className=" text-lg text-primary-black items-center flex flex-row gap-x-2">
              Sale expense
              <Info className=" w-5 h-5 text-gray-400 mt-[2px]" />
            </p>
            <p className=" text-primary-greytext">Include extra expenses</p>
          </div>
          <button
            onClick={handleAddExpense}
            className=" text-primary-blue flex items-center gap-x-2"
          >
            Add expense <Plus className=" w-5 h-5" />
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
      </div>
      <CreateItemSheet
        open={openCreateItemSheet}
        onClose={handleCloseCreateItemSheet}
        onItemSelected={setSideSheetCallback}
      />
      <CreateCustomerSheet
        open={openCustomerSheet}
        onClose={handleCloseCustomerSheet}
      />
    </div>
  );
};

export default CreateInvoice;
