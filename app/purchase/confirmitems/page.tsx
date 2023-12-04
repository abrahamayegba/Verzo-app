"use client";
import PurchaseStepIndicator from "@/components/PurchaseTimeline";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Check, ChevronDown, MoveLeft } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const ConfirmPurchaseItems = () => {
  const [date, setDate] = React.useState<Date>();
  const [openIssueDate, setOpenIssueDate] = React.useState(false);
  const currentStep = 2;
  const merchantInvoiceAdded = false;
  const paymentAdded = false;
  const itemsConfirmed = false;

  const [purchaseItems, setPurchaseItems] = useState([
    {
      id: 1,
      title: "Purchase A",
      amount: "₦30,000",
      quantity: "4",
      quantityreceived: "",
    },
    {
      id: 2,
      title: "Purchase B",
      amount: "₦20,000",
      quantity: "7",
      quantityreceived: "",
    },
  ]);

  const handleQuantityChange = (id: number, value: string) => {
    setPurchaseItems((prevPurchases) =>
      prevPurchases.map((purchase) =>
        purchase.id === id ? { ...purchase, quantityreceived: value } : purchase
      )
    );
  };

  console.log(purchaseItems);

  return (
    <div className=" pt-[40px] flex flex-col max-w-[850px] gap-y-[20px]">
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
          <p className=" text-[30px] text-primary-black ">Purchase #001 </p>
          <p className=" text-primary-greytext font-light text-lg">
            Add extra information to the purchase
          </p>
        </div>
        <div className=" flex gap-x-4">
          <Link href="/purchase/viewpurchase">
            <button className=" px-10 py-[10px] mt-6 rounded-[10px] flex text-primary-black border border-gray-200 items-center justify-center">
              Previous
            </button>
          </Link>
          <Link href="/purchase/merchantinvoice">
            <button className=" px-12 py-[10px] mt-6 rounded-[10px] flex bg-primary-blue text-white items-center justify-center">
              Next
            </button>
          </Link>
        </div>
      </div>
      <PurchaseStepIndicator
        merchantInvoiceAdded={merchantInvoiceAdded}
        currentStep={currentStep}
        itemsConfirmed={itemsConfirmed}
        paymentAdded={paymentAdded}
      />
      <div className=" w-full flex flex-col mt-[30px] gap-y-[30px]">
        <div className=" flex flex-col gap-y-5">
          <p className=" text-lg text-primary-black">Merchant details</p>
          <div className=" flex w-full gap-x-6">
            <div className=" text-primary-greytext flex flex-col gap-y-2 w-1/2">
              <p>Merchant</p>
              <p className=" border text-gray-700 border-gray-100 px-3 bg-gray-50 py-2 rounded-[8px]">
                Olivia doe
              </p>
            </div>
            <div className=" text-primary-greytext flex-col flex gap-y-2 w-1/2">
              <p>Email address</p>
              <p className=" border text-gray-700 border-gray-100 px-3 bg-gray-50 py-2 ">
                Oliviadoe@gmail.com
              </p>
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-y-5">
          <p className=" text-lg text-primary-black">Date</p>
          <div className=" flex w-full gap-x-6">
            <div className=" flex flex-col gap-y-2 w-1/2">
              <p className=" text-primary-greytext">Issue date</p>
              <Popover open={openIssueDate} onOpenChange={setOpenIssueDate}>
                <PopoverTrigger asChild>
                  <button className=" text-left text-sm font-normal flex items-center border border-gray-200 h-[40px] px-3 rounded-[8px]">
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
                      setOpenIssueDate(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className=" text-primary-greytext flex-col flex gap-y-2 w-1/2"></div>
          </div>
        </div>
        <div className=" w-full flex justify-between mt-2">
          <p className=" text-lg">Purchase items</p>
          <button className=" text-primary-blue flex items-center gap-x-2">
            Mark as received <Check className=" w-4 h-4" />
          </button>
        </div>
        <div className=" mt-[-8px] flex flex-col gap-y-7">
          {purchaseItems.map((purchase) => (
            <div
              key={purchase.id}
              className="grid grid-cols-2 grid-rows-2 gap-5 w-full"
            >
              <div className="text-primary-greytext flex flex-col gap-y-2">
                <p>Title</p>
                <p className="border text-gray-700 cursor-not-allowed border-gray-100 px-3 bg-gray-50 py-2 rounded-[8px]">
                  {purchase.title}
                </p>
              </div>
              <div className="text-primary-greytext flex flex-col gap-y-2">
                <p>Amount</p>
                <p className="border cursor-not-allowed text-gray-700 border-gray-100 px-3 bg-gray-50 py-2 rounded-[8px]">
                  {purchase.amount}
                </p>
              </div>
              <div className="text-primary-greytext flex flex-col gap-y-2">
                <p>Quantity ordered</p>
                <p className="border cursor-not-allowed text-gray-700 border-gray-100 px-3 bg-gray-50 py-2 rounded-[8px]">
                  {purchase.quantity}
                </p>
              </div>
              <div className="text-primary-greytext flex flex-col gap-y-2">
                <p>Quantity received</p>
                <input
                  className="w-full text-primary-black rounded-lg border border-gray-200 p-[8px] pl-[12px] text-[15px] focus:outline-none"
                  type="text"
                  placeholder="Enter quantity"
                  value={purchase.quantityreceived}
                  onChange={(e) =>
                    handleQuantityChange(purchase.id, e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConfirmPurchaseItems;