"use client";
import ExpenseStepIndicator from "@/components/Expense/ExpenseTimeline";
import MainLoader from "@/components/loading/MainLoader";
import Verzologoblue from "@/components/ui/icons/Verzologoblue";
import {
  useGetBusinessesByUserIdQuery,
  useGetExpenseByIdQuery,
} from "@/src/generated/graphql";
import { MoveLeft, Pen } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import Image from "next/image";
import { isAuthenticated } from "@/lib/auth";

const ViewExpense = () => {
  const currentStep = 1;
  const expenseIdParams = useSearchParams();
  const expenseId = expenseIdParams.get("expenseId")?.toString();
  const getExpenseById = useGetExpenseByIdQuery({
    variables: {
      expenseId: expenseId!,
    },
  });
  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      if (!authenticated) {
        router.push("/auth/signin");
      }
    };
    checkAuth();
  }, [router]);

  const expense = getExpenseById?.data?.getExpenseById;
  const expenseStatusId = expense?.expenseStatusId!;

  const expenseItems = expense?.expenseItems;

  const expenseItem = expenseItems?.map((item) => ({
    id: item?.id,
    itemName: item?.description,
    quantity: item?.quantity,
    price: item?.unitPrice,
  }));

  const itemsConfirmed = expenseStatusId! >= 2;
  const merchantInvoiceAdded = expenseStatusId! >= 3;
  const paymentAdded = expenseStatusId! >= 4;

  const businessLogo = expense?.business?.logo;
  const businessName = expense?.business?.businessName;
  const businessEmail = expense?.business?.businessEmail;
  const country = "Nigeria";

  const merchantName = expense?.merchant?.name;
  const merchantEmail = expense?.merchant?.email;
  const expenseDate = expense?.expenseDate;
  const subtotal = expense?.amount;
  const total = subtotal;

  let nextRoute = "";

  if (!itemsConfirmed) {
    nextRoute = `/expense/confirmitems?expenseId=${expenseId}`;
  } else if (!merchantInvoiceAdded) {
    nextRoute = `/expense/merchantinvoice?expenseId=${expenseId}`;
  } else if (!paymentAdded) {
    nextRoute = `/expense/addpayment?expenseId=${expenseId}`;
  }
  if (getExpenseById.loading) {
    return <MainLoader />;
  }

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
          <p className=" text-[30px] text-primary-black ">
            {expense?.reference}
          </p>
          <p className=" text-primary-greytext font-light text-lg">
            Add extra information to the expense
          </p>
        </div>
        <div className=" flex flex-row gap-x-4 items-center mt-6">
          <Link href={`/expense/editexpense?expenseId=${expenseId}`}>
            <button
              disabled={expenseStatusId >= 2}
              className=" px-4 py-[10px] text-blue-600 gap-x-2 rounded-[8px] disabled:cursor-not-allowed disabled:opacity-50 flex border border-blue-500 items-center justify-center"
            >
              <Pen className=" w-4 h-4" />
              Edit
            </button>
          </Link>
          {nextRoute && (
            <Link href={nextRoute}>
              <button className="px-8 py-[10px] rounded-[8px] flex bg-primary-blue text-white items-center justify-center">
                Next
              </button>
            </Link>
          )}
        </div>
      </div>
      <ExpenseStepIndicator
        merchantInvoiceAdded={merchantInvoiceAdded}
        currentStep={currentStep}
        itemsConfirmed={itemsConfirmed}
        paymentAdded={paymentAdded}
      />
      <div className=" w-full flex flex-col max-w-[850px] bg-white shadow-xl border mt-[40px] border-gray-200 pt-[30px] pb-[36px] px-[44px]">
        <div className=" flex flex-row justify-between items-center">
          <div>
            {businessLogo ? (
              <Image
                alt="Logo"
                className=" ml-[-15px]"
                src={businessLogo!}
                width={120}
                height={90}
              />
            ) : null}
          </div>
          <p className=" text-3xl">EXPENSE</p>
        </div>
        <div className=" flex flex-col border-t border-t-gray-200 mt-2">
          <div className="grid grid-cols-3 pt-8 gap-4">
            <div className=" text-primary-greytext col-span-1 font-light flex flex-col gap-y-2">
              <p>Expense</p>
              <p className=" text-primary-black font-normal">
                {expense?.reference}
              </p>
            </div>
            <div className=" text-primary-greytext col-span-1 font-light flex flex-col gap-y-2">
              <p>Transaction date</p>
              <p className=" text-primary-black font-normal">
                {expenseDate ? new Date(expenseDate).toDateString() : ""}
              </p>
            </div>
          </div>
          <div className=" grid grid-cols-3 gap-4 w-full pt-8">
            <div className=" text-primary-greytext col-span-1 font-light flex flex-col gap-y-2">
              <p>From</p>
              <p className=" text-primary-black font-normal">{businessName}</p>
              <p className="text-[16px] max-w-[223px] break-words">
                {businessEmail}
              </p>
            </div>
            <div className=" text-primary-greytext col-span-1 font-light flex flex-col gap-y-2">
              <p>For</p>
              <p className=" text-primary-black font-normal">{merchantName}</p>
              <p className=" text-[16px]">{merchantEmail}</p>
            </div>
          </div>
          <div className=" w-full flex flex-col mt-[30px] gap-y-4">
            <p className=" text-lg">Expense details</p>
            <table className=" w-full ">
              <thead>
                <tr className=" text-sm text-primary-greytext border-y border-y-gray-200">
                  <th className=" text-start font-normal py-3">Item</th>
                  <th className=" text-end font-normal py-3">Qty</th>
                  <th className=" text-end font-normal py-3">Unit price</th>
                </tr>
              </thead>
              <tbody>
                {expenseItems?.map((item) => (
                  <tr key={item?.id}>
                    <td className=" py-4">{item?.description}</td>
                    <td className=" text-end py-4">{item?.quantity}</td>
                    <td className=" text-end py-4">
                      ₦{(item?.unitPrice / 100)?.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className=" flex justify-between items-center mt-3">
            <div className=" flex flex-col text-sm text-primary-black ml-auto">
              <div className=" flex justify-between gap-x-[96px] items-center py-3 border-b border-b-gray-100">
                <p className=" text-primary-greytext">Sub total</p>
                <p className=" text-base">
                  {(subtotal / 100)?.toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                    minimumFractionDigits: 0,
                  })}
                </p>
              </div>
              <div className=" flex justify-between py-3 items-center">
                <p className=" text-gray-800 font-medium">Amount due</p>
                <p className=" text-base">
                  {(total / 100)?.toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                    minimumFractionDigits: 0,
                  })}
                </p>
              </div>
            </div>
          </div>
          <div className=" flex flex-col mt-4 gap-y-1">
            <p>Description</p>
            <p className=" font-light text-gray-700">{expense?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewExpense;
