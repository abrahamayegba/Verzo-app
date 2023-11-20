"use client";
import CustomerForm from "@/components/CustomerForm";
import CreateCustomerSheet from "@/components/sheets/invoice/CreateCustomerSheet";
import BankIcon from "@/components/ui/icons/BankIcon";
import LocationIcon from "@/components/ui/icons/LocationIcon";
import ProfileIcon from "@/components/ui/icons/ProfileIcon";
import { Eye, MoveLeft, Phone, User } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const CreateInvoice = () => {
  const [openCustomerSheet, setOpenCustomerSheet] = useState(false);
  const handleOpenCustomerSheet = () => {
    setOpenCustomerSheet(true);
  };
  const handleCloseCustomerSheet = () => {
    setOpenCustomerSheet(false);
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
      <CreateCustomerSheet
        open={openCustomerSheet}
        onClose={handleCloseCustomerSheet}
      />
    </div>
  );
};

export default CreateInvoice;
