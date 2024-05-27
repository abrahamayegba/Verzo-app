"use client";
import ExpenseStepIndicator from "@/components/Expense/ExpenseTimeline";
import MainLoader from "@/components/loading/MainLoader";
import Verzologoblue from "@/components/ui/icons/Verzologoblue";
import {
  useGetBusinessesByUserIdQuery,
  useGetExpenseByIdQuery,
} from "@/src/generated/graphql";
import { MoveLeft } from "lucide-react";
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
            #{expense?.reference}
          </p>
          <p className=" text-primary-greytext font-light text-lg">
            Add extra information to the expense
          </p>
        </div>
        {nextRoute && (
          <Link href={nextRoute}>
            <button className="px-12 py-[10px] mt-6 rounded-[10px] flex bg-primary-blue text-white items-center justify-center">
              Next
            </button>
          </Link>
        )}
      </div>
      <ExpenseStepIndicator
        merchantInvoiceAdded={merchantInvoiceAdded}
        currentStep={currentStep}
        itemsConfirmed={itemsConfirmed}
        paymentAdded={paymentAdded}
      />
      <div className=" w-full flex flex-col shadow2 rounded-[18px] mt-[40px] border-t border-t-gray-100 py-[36px] px-[44px]">
        <div className=" flex justify-between items-center">
          {businessLogo ? (
            <Image alt="Logo" src={businessLogo} width={100} height={80} />
          ) : null}
          <div className=" flex flex-row gap-x-5">
            <Link href={`/expense/editexpense?expenseId=${expenseId}`}>
              <button
                disabled={expenseStatusId >= 2}
                className=" px-6 py-3 rounded-[10px] hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed flex border border-gray-200 items-center justify-center"
              >
                Edit expense
              </button>
            </Link>
          </div>
        </div>
        <div className=" flex flex-col border-t border-t-[#f4f4f4] mt-2">
          <div className="grid grid-cols-3 pt-8">
            <div className=" text-primary-greytext col-span-1 font-light flex flex-col gap-y-2">
              <p>Expense</p>
              <p className=" text-primary-black font-normal">
                #{expense?.reference}
              </p>
            </div>
            <div className=" text-primary-greytext col-span-1 font-light flex flex-col gap-y-2">
              <p>Expense date</p>
              <p className=" text-primary-black font-normal">
                {expenseDate ? new Date(expenseDate).toDateString() : ""}
              </p>
            </div>
          </div>
          <div className=" grid grid-cols-3 w-full pt-8">
            <div className=" text-primary-greytext col-span-1 font-light flex flex-col gap-y-2">
              <p>From</p>
              <p className=" text-primary-black font-normal">{businessName}</p>
              <p className=" text-[16px]">{businessEmail}</p>
              <p className=" text-[16px]">{country}</p>
            </div>
            <div className=" text-primary-greytext col-span-1 font-light flex flex-col gap-y-2">
              <p>For</p>
              <p className=" text-primary-black font-normal">{merchantName}</p>
              <p className=" text-[16px]">{merchantEmail}</p>
              <p className=" text-[16px]">{country}</p>
            </div>
          </div>
          <div className=" w-full flex flex-col mt-[40px] gap-y-4">
            <p className=" text-lg">Expense details</p>
            <table className=" w-full ">
              <thead>
                <tr className=" text-sm text-primary-greytext border-y border-y-gray-100">
                  <th className=" text-start font-normal py-3">Item</th>
                  <th className=" text-end font-normal py-3">Qty</th>
                  <th className=" text-end font-normal py-3">Unit price</th>
                </tr>
              </thead>
              <tbody>
                {expenseItem?.map((item) => (
                  <tr key={item?.id}>
                    <td className=" py-4">{item?.itemName}</td>
                    <td className=" text-end py-4">{item?.quantity}</td>
                    <td className=" text-end py-4">
                      ₦{item?.price?.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className=" flex justify-between items-center mt-3">
            <div className=" text-sm text-[#c4c4c4] max-w-[250px] flex flex-col gap-y-2">
              <p>Thanks for your patronage</p>
              <div className=" flex flex-row">
                Reach out to us{" "}
                <Link href="mailto:info@verzo.app">
                  <p className="text-primary-blue focus:underline underline-offset-2 ml-1 font-medium">
                    info@verzo.app
                  </p>
                </Link>
              </div>
              <p>
                Purchase created with{" "}
                <span className=" text-primary-blue">Verzo</span>{" "}
              </p>
            </div>
            <div className=" flex flex-col text-sm text-primary-black">
              <div className=" flex justify-between gap-x-[96px] items-center py-3 border-b border-b-gray-100">
                <p className=" text-primary-greytext">Sub total</p>
                <p className=" text-base">
                  {subtotal?.toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                    minimumFractionDigits: 0,
                  })}
                </p>
              </div>
              <div className=" flex justify-between py-3 items-center">
                <p className=" text-primary-greytext">Amount due</p>
                <p className=" text-base">
                  {total?.toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                    minimumFractionDigits: 0,
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewExpense;
