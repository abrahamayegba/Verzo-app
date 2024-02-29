"use client";
import useModal from "@/app/hooks/useModal";
import InvoiceStepIndicator from "@/components/Invoice/InvoiceTimeline";
import MainLoader from "@/components/loading/MainLoader";
import SendInvoice from "@/components/modals/invoice/SendInvoice";
import { useGetSaleByIdQuery } from "@/src/generated/graphql";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const ViewInvoice = () => {
  const currentStep = 1;
  const {
    isOpen: isSendModalOpen,
    openModal: openSendModal,
    closeModal: closeSendModal,
  } = useModal();
  const invoiceIdParams = useSearchParams();
  const invoiceId = invoiceIdParams.get("invoiceId")?.toString();
  const getSaleById = useGetSaleByIdQuery({
    variables: {
      saleId: invoiceId!,
    },
  });
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
  const paymentAdded = saleStatusId! >= 3;
  const hasStep2 =
    (sales?.saleExpenses?.length ?? 0) > 0 ||
    (sales?.saleServiceExpenses?.length ?? 0) > 0;

  const businessName = sales?.business?.businessName;
  const businessEmail = sales?.business?.businessEmail;
  const businessLogo = sales?.business?.logo;
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
              #{sales?.reference}
            </p>
            <p className=" text-primary-greytext font-light text-lg">
              Add extra information to the invoice
            </p>
          </div>
          <div className=" flex flex-row gap-x-4">
            <button
              onClick={openSendModal}
              className=" px-8 hover:border-gray-400 py-[10px] mt-6 rounded-[10px] flex border border-gray-200 items-center justify-center"
            >
              Send invoice
            </button>
            {nextRoute && (
              <Link href={nextRoute}>
                <button className="px-12 py-[10px] mt-6 rounded-[10px] flex bg-primary-blue text-white items-center justify-center">
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
        <div className=" w-full flex flex-col shadow2 rounded-[18px] mt-[40px] border-t border-t-gray-100 py-[36px] px-[44px]">
          <div className=" flex justify-between items-center">
            {businessLogo ? (
              <Image alt="Logo" src={businessLogo} width={100} height={80} />
            ) : null}
            <div className=" flex flex-row gap-x-5">
              <Link href={`/invoice/editinvoice?invoiceId=${invoiceId}`}>
                <button
                  disabled={saleStatusId >= 2}
                  className=" px-6 py-3 rounded-[10px] hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed flex border border-gray-200 items-center justify-center"
                >
                  Edit invoice
                </button>
              </Link>
            </div>
          </div>
          <div className=" flex flex-col border-t border-t-[#f4f4f4] mt-2">
            <div className="grid grid-cols-3 pt-8">
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
            <div className=" grid grid-cols-3 w-full pt-8">
              <div className=" text-primary-greytext col-span-1 font-light flex flex-col gap-y-2">
                <p>From</p>
                <p className=" text-primary-black font-normal">
                  {businessName}
                </p>
                <p className=" text-[16px]">{businessEmail}</p>
                <p className=" text-[16px]">{country}</p>
              </div>
              <div className=" text-primary-greytext col-span-1 font-light flex flex-col gap-y-2">
                <p>For</p>
                <p className=" text-primary-black font-normal">
                  {customerName}
                </p>
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
                <div className=" flex flex-row">
                  Reach out to us{" "}
                  <Link href="mailto:info@verzo.app">
                    <p className="text-primary-blue focus:underline underline-offset-2 ml-1 font-medium">
                      info@verzo.app
                    </p>
                  </Link>
                </div>
                <p>
                  Invoice created with{" "}
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
