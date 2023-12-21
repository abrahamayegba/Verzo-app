"use client";
import InvoiceStepIndicator from "@/components/Invoice/InvoiceTimeline";
import MainLoader from "@/components/loading/MainLoader";
import Verzologoblue from "@/components/ui/icons/Verzologoblue";
import {
  useGetBusinessesByUserIdQuery,
  useGetSaleByIdQuery,
} from "@/src/generated/graphql";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const ViewInvoice = () => {
  const currentStep = 1;
  const invoiceIdParams = useSearchParams();
  const invoiceId = invoiceIdParams.get("invoiceId")?.toString();
  const getBusinessesByUserId = useGetBusinessesByUserIdQuery();
  const getSaleById = useGetSaleByIdQuery({
    variables: {
      saleId: invoiceId!,
    },
  });
  const sales = getSaleById.data?.getSaleById;
  const saleStatusId = sales?.saleStatus?.id;
  const saleItems = sales?.invoice?.invoiceDetails;
  const saleItem = saleItems?.map((item) => ({
    id: item?.id,
    itemName:
      item?.type === "P"
        ? item?.productInvoiceDetail?.product?.productName
        : item?.serviceInvoiceDetail?.service?.name,
    quantity:
      item?.type === "P"
        ? item?.productInvoiceDetail?.quantity
        : item?.serviceInvoiceDetail?.quantity,
    price:
      item?.type === "P"
        ? item?.productInvoiceDetail?.unitPrice
        : item?.serviceInvoiceDetail?.unitPrice,
  }));
  const saleExpenseRecorded = saleStatusId! >= 2;
  const paymentAdded = saleStatusId! >= 3;
  const hasStep2 =
    (sales?.saleExpenses?.length ?? 0) > 0 ||
    (sales?.saleServiceExpenses?.length ?? 0) > 0;
  const businesses =
    getBusinessesByUserId.data?.getBusinessesByUserId?.businesses;
  const businessName = businesses?.map((business) => business?.businessName);
  const businessEmail = businesses?.map((business) => business?.businessEmail);
  const country = "Nigeria";
  const customerName = sales?.invoice?.customer?.name;
  const customerEmail = sales?.invoice?.customer?.email;
  const transactionDate = sales?.transactionDate;
  const dueDate = sales?.dueDate;
  const subtotal = sales?.invoice?.subtotal;
  const total = sales?.saleAmount;
  let nextRoute = "";
  if (!saleExpenseRecorded) {
    nextRoute = `/invoice/recordsaleexpense?invoiceId=${invoiceId}`;
  } else if (!paymentAdded) {
    nextRoute = `/invoice/addpayment?invoiceId=${invoiceId}`;
  }
  if (getBusinessesByUserId.loading || getSaleById.loading) {
    return <MainLoader />;
  }
  console.log(hasStep2);
  return (
    <div className=" pt-[40px] flex flex-col max-w-[850px] gap-y-[20px]">
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
          <p className=" text-[30px] text-primary-black ">Invoice #001 </p>
          <p className=" text-primary-greytext font-light text-lg">
            Add extra information to the invoice
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
      <InvoiceStepIndicator
        saleRecorded={saleExpenseRecorded}
        hasStep2={hasStep2}
        currentStep={currentStep}
        paymentAdded={paymentAdded}
      />
      <div className=" w-full flex flex-col shadow2 rounded-[18px] mt-[40px] border-t border-t-gray-100 py-[56px] px-[44px]">
        <div className=" flex justify-between items-center">
          <span>
            <Verzologoblue />
          </span>
          <button className=" px-8 py-3 rounded-[10px] flex border border-gray-200 items-center justify-center">
            Edit invoice
          </button>
        </div>
        <div className=" flex flex-col border-t border-t-[#f4f4f4] mt-[40px]">
          <div className="grid grid-cols-3 pt-8">
            <div className=" text-primary-greytext col-span-1 font-light flex flex-col gap-y-2">
              <p>Invoice</p>
              <p className=" text-primary-black font-normal">#001</p>
            </div>
            <div className=" text-primary-greytext col-span-1 font-light flex flex-col gap-y-2">
              <p>Transaction date</p>
              <p className=" text-primary-black font-normal">
                {transactionDate
                  ? new Date(transactionDate).toDateString()
                  : ""}
              </p>
            </div>
            <div className=" text-primary-greytext col-span-1 text-end font-light flex flex-col gap-y-2">
              <p>Due date</p>
              <p className=" text-primary-black font-normal">
                {dueDate ? new Date(dueDate).toDateString() : ""}
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
              <p className=" text-primary-black font-normal">{customerName}</p>
              <p className=" text-[16px]">{customerEmail}</p>
              <p className=" text-[16px]">{country}</p>
            </div>
          </div>
          <div className=" w-full flex flex-col mt-[40px] gap-y-4">
            <p className=" text-lg">Invoice details</p>
            <table className=" w-full ">
              <thead>
                <tr className=" text-sm text-primary-greytext border-y border-y-gray-100">
                  <th className=" text-start font-normal py-3">Item</th>
                  <th className=" text-end font-normal py-3">Qty</th>
                  <th className=" text-end font-normal py-3">Unit price</th>
                </tr>
              </thead>
              <tbody>
                {saleItem?.map((item) => (
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
              <p>
                Reach out to us{" "}
                <span className=" text-primary-blue focus:underline underline-offset-2 ml-1">
                  info@verzo.io
                </span>
              </p>
              <p>Invoice created with Verzo</p>
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

export default ViewInvoice;
