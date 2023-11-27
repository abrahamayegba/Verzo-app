"use client";
import ExpenseStepIndicator from "@/components/ExpenseTimeline";
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

const ConfirmItems = () => {
  const [date, setDate] = React.useState<Date>();
  const [openIssueDate, setOpenIssueDate] = React.useState(false);
  const currentStep = 2;
  const merchantInvoiceAdded = false;
  const paymentAdded = false;
  const itemsConfirmed = false;

  const [saleExpenses, setSaleExpenses] = useState([
    {
      id: 1,
      title: "Expense A",
      amount: "₦30,000",
      quantity: "4",
      quantityreceived: "",
    },
    {
      id: 2,
      title: "Expense B",
      amount: "₦20,000",
      quantity: "7",
      quantityreceived: "",
    },
    // Add more sale expenses as needed
  ]);

  const handleQuantityChange = (id: number, value: string) => {
    setSaleExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === id ? { ...expense, quantityreceived: value } : expense
      )
    );
  };

  console.log(saleExpenses);

  return (
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
        <Link href="/expense/merchantinvoice">
          <button className=" px-12 py-[10px] mt-6 rounded-[10px] flex bg-primary-blue text-white items-center justify-center">
            Next
          </button>
        </Link>
      </div>
      <ExpenseStepIndicator
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
          <p className=" text-lg">Expenses</p>
          <button className=" text-primary-blue flex items-center gap-x-2">
            Mark as received <Check className=" w-4 h-4" />
          </button>
        </div>
        <div className=" mt-[-8px] flex flex-col gap-y-7">
          {saleExpenses.map((expense) => (
            <div
              key={expense.id}
              className="grid grid-cols-2 grid-rows-2 gap-5 w-full"
            >
              <div className="text-primary-greytext flex flex-col gap-y-2">
                <p>Title</p>
                <p className="border text-gray-700 cursor-not-allowed border-gray-100 px-3 bg-gray-50 py-2 rounded-[8px]">
                  {expense.title}
                </p>
              </div>
              <div className="text-primary-greytext flex flex-col gap-y-2">
                <p>Amount</p>
                <p className="border cursor-not-allowed text-gray-700 border-gray-100 px-3 bg-gray-50 py-2 rounded-[8px]">
                  {expense.amount}
                </p>
              </div>
              <div className="text-primary-greytext flex flex-col gap-y-2">
                <p>Quantity ordered</p>
                <p className="border cursor-not-allowed text-gray-700 border-gray-100 px-3 bg-gray-50 py-2 rounded-[8px]">
                  {expense.quantity}
                </p>
              </div>
              <div className="text-primary-greytext flex flex-col gap-y-2">
                <p>Quantity received</p>
                <input
                  className="w-full text-primary-black rounded-lg border border-gray-200 p-[8px] pl-[12px] text-[15px] focus:outline-none"
                  type="text"
                  placeholder="Enter quantity"
                  value={expense.quantityreceived}
                  onChange={(e) =>
                    handleQuantityChange(expense.id, e.target.value)
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

export default ConfirmItems;
