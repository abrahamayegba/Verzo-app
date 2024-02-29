"use client";
import { useGetSaleByIdQuery } from "@/src/generated/graphql";
import { notFound, useSearchParams } from "next/navigation";
import React from "react";
import Image from "next/image";
import MainLoader from "@/components/loading/MainLoader";
import Link from "next/link";

const Pdf = () => {
  const invoiceParams = useSearchParams();
  const saleId = invoiceParams.get("invoiceId")?.toString();
  const getSaleById = useGetSaleByIdQuery({
    variables: {
      saleId: saleId!,
    },
  });
  const sales = getSaleById.data?.getSaleById;
  if (getSaleById.loading == false && !sales) {
    notFound();
  }
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
  if (getSaleById.loading) {
    return <MainLoader />;
  }
  return (
    <div className=" flex flex-col w-full justify-center items-center gap-y-[20px]">
      <div className=" w-full flex flex-col max-w-[790px] min-h-[1024px] bg-white shadow-xl pt-[30px] pb-[36px]">
        <div className=" flex flex-row justify-between items-center px-[44px]">
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
          <div className="grid grid-cols-3 pt-8 gap-4 px-[44px]">
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
          <div className=" grid grid-cols-3 gap-4 w-full pt-8 px-[44px]">
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
            <p className=" text-lg px-[44px]">Invoice details</p>
            <table className=" w-full ">
              <thead>
                <tr className=" text-sm text-primary-greytext border-y border-y-gray-200">
                  <th className=" text-start font-normal py-3 pl-[44px]">
                    Item
                  </th>
                  <th className=" text-end font-normal py-3">Qty</th>
                  <th className=" text-end font-normal py-3 pr-[44px]">
                    Unit price
                  </th>
                </tr>
              </thead>
              <tbody>
                {saleItem?.map((item) => (
                  <tr key={item?.id}>
                    <td className=" py-4 pl-[44px]">{item?.itemName}</td>
                    <td className=" text-end py-4">{item?.quantity}</td>
                    <td className=" text-end py-4 pr-[44px]">
                      ₦{item?.price?.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className=" flex justify-between items-center mt-3 px-[44px]">
            <div className=" text-sm text-[#c4c4c4] max-w-[250px] flex flex-col gap-y-2">
              <p>Thanks for your patronage</p>
              <div className="flex">
                Reach out to us{" "}
                <Link href="mailto:info@verzo.com">
                  <p className="text-primary-blue focus:underline underline-offset-2 ml-1 font-medium">
                    info@verzo.com
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
        <p className=" mt-auto text-sm text-gray-500 text-center tracking-wide">
          Thank you for your business.
        </p>
      </div>
    </div>
  );
};

export default Pdf;
