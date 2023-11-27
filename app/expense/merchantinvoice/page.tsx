"use client";
import ExpenseStepIndicator from "@/components/ExpenseTimeline";
import ViewExpenseSheet from "@/components/sheets/expense/ViewExpenseSheet";
import { Calendar } from "@/components/ui/calendar";
import FileIcon from "@/components/ui/icons/FileIcon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ChevronDown, Eye, MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";

const AddMerchantInvoice = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentStep = 3;
  const merchantInvoiceAdded = false;
  const itemsConfirmed = true;
  const paymentAdded = false;

  const [isDragActive, setIsDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [date, setDate] = React.useState<Date>();
  const [openPaymentDate, setOpenPaymentDate] = React.useState(false);
  const [openViewExpenseSheet, setOpenViewExpenseSheet] = useState(false);

  const handleCloseViewExpenseSheet = () => {
    setOpenViewExpenseSheet(false);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    // Handle dropped files here
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the input field
    }
  };

  return (
    <>
      <div className=" pt-[40px] flex flex-col max-w-[850px] gap-y-[20px]">
        <div className=" flex justify-between w-full items-center relative">
          <Link
            className=" absolute top-0 text-primary-greytext "
            href="/dashboard/expenses"
          >
            <button className=" flex items-center gap-x-2">
              <MoveLeft className=" w-5 h-5 " />
              Back to Expenses
            </button>
          </Link>
          <div className=" flex flex-col gap-y-[4px] mt-9">
            <p className=" text-[30px] text-primary-black ">Expense #001 </p>
            <p className=" text-primary-greytext font-light text-lg">
              Add extra information to the expense
            </p>
          </div>
          <div className=" flex gap-x-4">
            <Link href="/expense/viewexpense">
              <button className=" px-10 py-[10px] mt-3 rounded-[10px] flex border border-gray-200 items-center justify-center">
                Back
              </button>
            </Link>
            <Link href="/expense/addpayment">
              <button className=" px-10 py-[10px] mt-3 rounded-[10px] flex bg-primary-blue text-white items-center justify-center">
                Next
              </button>
            </Link>
          </div>
        </div>
        <ExpenseStepIndicator
          merchantInvoiceAdded={merchantInvoiceAdded}
          currentStep={currentStep}
          itemsConfirmed={itemsConfirmed}
          paymentAdded={paymentAdded}
        />
        <div className=" w-full flex flex-col mt-[30px] gap-y-[30px]">
          <div className=" flex flex-row justify-between">
            <div className=" flex flex-row items-center gap-x-7">
              <div className=" w-[128px] h-[100px] bg-gray-100 items-end rounded-[10px] flex justify-center">
                <Image src="/preview.png" width={80} height={80} alt="image" />
              </div>
              <div className=" flex flex-col">
                <p className=" text-xl text-primary-black">Expense #001</p>
                <p className=" text-lg text-primary-greytext font-light">
                  Short description about the expense
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpenViewExpenseSheet(true)}
              className="rounded-[10px] flex text-primary-blue items-center gap-x-[6px] justify-center"
            >
              Preview
              <Eye className=" w-5 h-5" />
            </button>
          </div>
          <div className=" flex flex-col mt-[20px] gap-y-9">
            <div className=" flex flex-col gap-y-1 ">
              <p className=" text-lg text-primary-black">
                Upload merchant invoice
              </p>
              <p className=" text-sm text-primary-greytext">
                Supported formats: PNG, JPG & JPEG
              </p>
            </div>
            <div>
              <div
                onClick={handleClick}
                onDragEnter={handleDragEnter}
                onDragOver={(e) => e.preventDefault()}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border items-center flex-col gap-y-3 cursor-pointer justify-center flex border-dashed  border-gray-300 rounded-[8px] w-full h-[130px] ${
                  isDragActive ? "bg-gray-100" : ""
                } ${selectedFile ? " bg-[#F9FCFF]" : " bg-transparent"}`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  id="fileInput"
                  onChange={handleInputChange}
                  style={{ display: "none" }}
                  accept="image/*" // Specify accepted file types if needed
                />
                <FileIcon />
                {selectedFile ? (
                  <p>
                    {selectedFile.name}.{" "}
                    <button
                      onClick={handleClearFile}
                      className=" text-primary-red underline underline-offset-2"
                    >
                      Remove file
                    </button>
                  </p>
                ) : (
                  <p>
                    Drag and Drop or{" "}
                    <span className="text-primary-blue underline underline-offset-2">
                      Upload file
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-y-4 mt-[20px]">
            <p>Details</p>
            <div className=" flex flex-row gap-x-6">
              <div className=" flex flex-col gap-y-2 w-1/2">
                <p className=" text-primary-greytext">Issue date</p>
                <Popover
                  open={openPaymentDate}
                  onOpenChange={setOpenPaymentDate}
                >
                  <PopoverTrigger asChild>
                    <button className=" text-left text-sm font-normal bg-white flex items-center border border-gray-200 h-[40px] px-3 rounded-[8px]">
                      {date ? (
                        format(date, "PPP")
                      ) : (
                        <div className=" justify-between flex items-center w-full">
                          <span className=" text-sm">Pick a date</span>
                          <ChevronDown className=" w-4 h-4 text-primary-greytext" />
                        </div>
                      )}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0 bg-white">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => {
                        setDate(date);
                        setOpenPaymentDate(false);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="text-primary-greytext flex flex-col gap-y-2 w-1/2">
                <p>Amount</p>
                <p className="border cursor-not-allowed text-gray-700 border-gray-100 px-3 bg-gray-50 py-2 rounded-[8px]">
                  ₦120,000
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ViewExpenseSheet
        open={openViewExpenseSheet}
        onClose={handleCloseViewExpenseSheet}
      />
    </>
  );
};

export default AddMerchantInvoice;
