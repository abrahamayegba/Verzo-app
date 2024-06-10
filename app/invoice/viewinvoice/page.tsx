"use client";
import useModal from "@/app/hooks/useModal";
import InvoiceStepIndicator from "@/components/Invoice/InvoiceTimeline";
import MainLoader from "@/components/loading/MainLoader";
import SendInvoice from "@/components/modals/invoice/SendInvoice";
import { isAuthenticated } from "@/lib/auth";
import { useGetSaleByIdQuery } from "@/src/generated/graphql";
import { MoveLeft, Pen, Send, Share } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const ViewInvoice = () => {
  const currentStep = 1;
  const {
    isOpen: isSendModalOpen,
    openModal: openSendModal,
    closeModal: closeSendModal,
  } = useModal();
  const router = useRouter();
  const invoiceIdParams = useSearchParams();
  const invoiceId = invoiceIdParams.get("invoiceId")?.toString();
  const getSaleById = useGetSaleByIdQuery({
    variables: {
      saleId: invoiceId!,
    },
  });
  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      if (!authenticated) {
        router.push("/auth/signin");
      }
    };
    checkAuth();
  }, [router]);

  const sales = getSaleById.data?.getSaleById;
  const invoiceSendId = getSaleById?.data?.getSaleById?.invoice?.id!;
  const saleStatusId = sales?.saleStatus?.id!;
  const saleItems = sales?.invoice?.invoiceDetails;
  const saleItem = saleItems?.map((item) => ({
    id:
      item?.type === "P"
        ? item?.productInvoiceDetail?.product?.id
        : item?.serviceInvoiceDetail?.service?.id,
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
  const saleExpense = sales?.saleExpenses?.length ?? 0;
  const paymentAdded = saleStatusId! >= 3;
  const hasStep2 =
    (sales?.saleExpenses?.length ?? 0) > 0 ||
    (sales?.saleServiceExpenses?.length ?? 0) > 0;

  const businessName = sales?.business?.businessName;
  const businessEmail = sales?.business?.businessEmail;
  const businessLogo = sales?.business?.logo;
  const customerName = sales?.invoice?.customer?.name;
  const customerEmail = sales?.invoice?.customer?.email;
  const transactionDate = sales?.transactionDate;
  const dueDate = sales?.dueDate;
  const subtotal = sales?.invoice?.subtotal;
  const description = sales?.description;
  const total = sales?.saleAmount;
  let nextRoute = "";
  if (!saleExpenseRecorded) {
    nextRoute = `/invoice/recordsaleexpense?invoiceId=${invoiceId}`;
  } else if (!paymentAdded) {
    nextRoute = `/invoice/addpayment?invoiceId=${invoiceId}`;
  }
  if (getSaleById.loading) {
    return <MainLoader />;
  }
  return (
    <>
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
            <p className=" text-[30px] text-primary-black ">
              {sales?.reference}
            </p>
            <p className=" text-primary-greytext font-light text-lg">
              Add extra information to the invoice
            </p>
          </div>
          <div className=" flex flex-row gap-x-4 items-center mt-6">
            <Link href={`/invoice/editinvoice?invoiceId=${invoiceId}`}>
              <button
                disabled={saleExpense ? saleStatusId > 1 : saleStatusId > 2}
                className=" px-4 py-[10px] text-blue-600 gap-x-2 rounded-[8px] disabled:cursor-not-allowed disabled:opacity-50 flex border border-blue-500 items-center justify-center"
              >
                <Pen className=" w-4 h-4" />
                Edit
              </button>
            </Link>
            <button
              onClick={openSendModal}
              className=" px-4 py-[10px] text-blue-600 gap-x-2 rounded-[8px] disabled:cursor-not-allowed flex border border-blue-500 items-center justify-center"
            >
              <Send className=" w-4 h-4" />
              Send
            </button>
            {nextRoute && (
              <Link href={nextRoute}>
                <button className="px-8 py-[10px] rounded-[8px] flex bg-primary-blue text-white items-center justify-center">
                  Next
                </button>
              </Link>
            )}
          </div>
        </div>
        <InvoiceStepIndicator
          saleRecorded={saleExpenseRecorded}
          hasStep2={hasStep2}
          currentStep={currentStep}
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
            <p className=" text-3xl">INVOICE</p>
          </div>
          <div className=" flex flex-col border-t border-t-gray-200 mt-2">
            <div className="grid grid-cols-3 pt-8 gap-4">
              <div className=" text-primary-greytext col-span-1 font-light flex flex-col gap-y-2">
                <p>Invoice</p>
                <p className=" text-primary-black font-normal">
                  #{sales?.reference}
                </p>
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
            <div className=" grid grid-cols-3 gap-4 w-full pt-8">
              <div className=" text-primary-greytext col-span-1 font-light flex flex-col gap-y-2">
                <p>From</p>
                <p className=" text-primary-black font-normal">
                  {businessName}
                </p>
                <p className=" text-[16px]">{businessEmail}</p>
              </div>
              <div className=" text-primary-greytext col-span-1 font-light flex flex-col gap-y-2">
                <p>For</p>
                <p className=" text-primary-black font-normal">
                  {customerName}
                </p>
                <p className=" text-[16px]">{customerEmail}</p>
              </div>
            </div>
            <div className=" w-full flex flex-col mt-[30px] gap-y-4">
              <p className=" text-lg">Invoice details</p>
              <table className=" w-full ">
                <thead>
                  <tr className=" text-sm text-primary-greytext border-y border-y-gray-200">
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
                        ₦{(item?.price / 100)?.toLocaleString()}
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
              <p className=" font-light text-gray-700">{description}</p>
            </div>
            {sales?.note && (
              <div className=" flex flex-col my-4 gap-y-1 max-w-[600px]">
                <p>Notes / Terms</p>
                <p className=" font-light text-gray-700">{sales?.note}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <SendInvoice
        open={isSendModalOpen}
        openModal={openSendModal}
        onClose={closeSendModal}
        invoiceId={invoiceSendId}
        customerEmail={customerEmail!}
        customerName={customerName!}
      />
    </>
  );
};

export default ViewInvoice;
