"use client";
import { useGetSaleByIdQuery } from "@/src/generated/graphql";
import { notFound } from "next/navigation";
import React from "react";
import Image from "next/image";
import MainLoader from "@/components/loading/MainLoader";
import Verzologoblue from "@/components/ui/icons/Verzologoblue";

const InvoiceDetailPage = ({ params }: any) => {
  const saleId = params?.invoiceId;
  const getSaleById = useGetSaleByIdQuery({
    variables: {
      saleId: saleId,
    },
  });
  const sales = getSaleById.data?.getSaleById;
  if (getSaleById.loading == false && !sales) {
    notFound();
  }
  const saleItems = sales?.invoice?.invoiceDetails;
  const saleExpense = sales?.saleExpenses?.length ?? 0;
  const totalSaleExpenses = sales?.saleExpenses?.reduce(
    (total, expense) => total + expense?.amount,
    0
  );
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
  const businessName = sales?.business?.businessName;
  const businessEmail = sales?.business?.businessEmail;
  const businessLogo = sales?.business?.logo;
  const customerName = sales?.invoice?.customer?.name;
  const customerEmail = sales?.invoice?.customer?.email;
  const transactionDate = sales?.transactionDate;
  const dueDate = sales?.dueDate;
  const VAT = sales?.invoice?.VAT;
  const subtotal = sales?.invoice?.subtotal;
  const total = sales?.saleAmount;
  const formattedTotal = total?.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
    currencyDisplay: "symbol",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (getSaleById.loading) {
    return <MainLoader />;
  }
  return (
    <div className=" flex flex-col w-full justify-center items-center gap-y-[20px]">
      <div className=" bg-primary-blue h-[9px] w-full"></div>
      <div className=" flex flex-col items-center">
        <p className=" font-bold text-[33px] mb-[14px]">Verzo</p>
        <p className=" font-bold mb-2">Invoice {sales?.reference}</p>
        <p className=" text-[33px]">{formattedTotal}</p>
        <p className=" text-sm">
          Due on{" "}
          {new Date(dueDate).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
      <div className=" w-full flex flex-col max-w-[790px] min-h-[1024px] bg-white shadow-xl border mt-[40px] border-gray-200 pt-[30px] pb-[36px] px-[44px]">
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
                {sales?.reference}
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
            {/* <div className=" text-primary-greytext col-span-1 font-light flex flex-col gap-y-2">
              <p>From</p>
              <p className=" text-primary-black font-normal">{businessName}</p>
              <p className=" text-[16px]">
                {"abrahamabrahamayegbaayegba@gmail.com"}
              </p>
            </div> */}
            <div className="text-primary-greytext col-span-1 font-light flex flex-col gap-y-2">
              <p>From</p>
              <p className="text-primary-black font-normal">{businessName}</p>
              <p className="text-[16px] max-w-[223px] break-words">
                {businessEmail}
              </p>
            </div>
            <div className=" text-primary-greytext col-span-1 font-light flex flex-col gap-y-2">
              <p>For</p>
              <p className=" text-primary-black font-normal">{customerName}</p>
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
          <div className=" flex items-center mt-3">
            <div className=" flex flex-col text-sm text-primary-black ml-auto">
              <div className=" flex justify-between gap-x-[96px] items-center py-2">
                <p className=" text-primary-greytext">Sub total</p>
                <p className=" text-base">
                  {(subtotal / 100)?.toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                    minimumFractionDigits: 0,
                  })}
                </p>
              </div>
              <div className=" flex justify-between gap-x-[96px] items-center py-2">
                <p className=" text-primary-greytext">VAT</p>
                <p className=" text-base">+{VAT}%</p>
              </div>
              {saleExpense > 0 && (
                <div className=" flex gap-x-[180px] py-2">
                  <p className=" text-primary-greytext">Sale expenses</p>
                  <p className=" text-base">
                    ₦{(totalSaleExpenses! / 100)?.toLocaleString("en-NG")}
                  </p>
                </div>
              )}
              <div className=" flex justify-between py-3 items-center border-t border-t-gray-100">
                <p className=" text-primary-greytext">Amount due</p>
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
          {sales?.saleExpenses && (
            <div className=" w-full flex flex-col mt-5 ">
              <p className=" text-lg border-b border-b-gray-200 pb-2">
                Sale expenses
              </p>
              {sales?.saleExpenses.map((saleExpense) => (
                <div
                  key={saleExpense?.id}
                  className=" flex flex-row justify-between py-3 border-b font-light"
                >
                  <div>{saleExpense?.description}</div>
                  <div className=" font-normal">
                    ₦{(saleExpense?.amount / 100)?.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className=" flex flex-col mt-4 gap-y-1">
            <p>Description</p>
            <p className=" font-light text-gray-700">{sales?.description}</p>
          </div>
          {sales?.note && (
            <div className=" flex flex-col my-4 gap-y-1 max-w-[600px]">
              <p>Notes / Terms</p>
              <p className=" font-light text-gray-700">{sales?.note}</p>
            </div>
          )}
        </div>
        <p className=" mt-auto text-sm text-gray-500 text-center tracking-wide">
          Thank you for your business.
        </p>
      </div>
      <div className=" flex flex-col gap-y-2 mt-[15px] mb-[40px]">
        <p className=" flex flex-row text-xl font-medium text-gray-700 items-center">
          Powered by{" "}
          <span className=" ml-2 mt-[-5px]">
            <Verzologoblue />
          </span>
        </p>
        <p className=" text-sm text-gray-500">
          &copy; 2023 Verzo. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default InvoiceDetailPage;
