"use client";
import {
  useGetBusinessesByUserIdQuery,
  useGetPurchaseByIdQuery,
} from "@/src/generated/graphql";
import { notFound } from "next/navigation";
import React from "react";
import Image from "next/image";
import MainLoader from "@/components/loading/MainLoader";
import Verzologoblue from "@/components/ui/icons/Verzologoblue";
import Link from "next/link";

const PurchaseDetailPage = ({ params }: any) => {
  const purchaseId = params?.purchaseId;
  const getPurchaseById = useGetPurchaseByIdQuery({
    variables: {
      purchaseId: purchaseId,
    },
  });
  const getBusinessesByUserId = useGetBusinessesByUserIdQuery();
  const purchase = getPurchaseById?.data?.getPurchaseById;
  if (getPurchaseById.loading == false && !purchase) {
    notFound();
  }
  const purchaseItems = purchase?.purchaseItems;
  const purchaseItem = purchaseItems?.map((item) => ({
    id: item?.id,
    itemName: item?.description,
    quantity: item?.quantity,
    price: item?.unitPrice,
  }));
  const businesses =
    getBusinessesByUserId.data?.getBusinessesByUserId?.businesses;
  const businessName = businesses?.map((business) => business?.businessName);
  const businessEmail = businesses?.map((business) => business?.businessEmail);
  const businessLogo = businesses?.[0]?.logo || "";
  const country = "Nigeria";
  const merchantName = purchase?.merchant?.name;
  const merchantEmail = purchase?.merchant?.email;
  const createdDate = purchase?.createdAt;
  const transactionDate = purchase?.transactionDate;
  const subtotal = purchase?.total;
  const total = subtotal;
  const formattedTotal = total?.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
    currencyDisplay: "symbol",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (getBusinessesByUserId.loading || getPurchaseById.loading) {
    return <MainLoader />;
  }
  return (
    <div className=" flex flex-col w-full justify-center items-center gap-y-[20px]">
      <div className=" bg-primary-blue h-[9px] w-full"></div>
      <div className=" flex flex-col items-center">
        <p className=" font-bold text-[33px] mb-[14px]">Verzo</p>
        <p className=" font-bold mb-2">Purchase {purchase?.reference}</p>
        <p className=" text-[33px]">{formattedTotal}</p>
        <p className=" text-sm">
          Due on{" "}
          {new Date(transactionDate).toLocaleDateString("en-US", {
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
          <p className=" text-3xl">PURCHASE</p>
        </div>
        <div className=" flex flex-col border-t border-t-gray-200 mt-2">
          <div className="grid grid-cols-3 pt-8 gap-4">
            <div className=" text-primary-greytext col-span-1 font-light flex flex-col gap-y-2">
              <p>Purchase</p>
              <p className=" text-primary-black font-normal">
                {purchase?.reference}
              </p>
            </div>
            <div className=" text-primary-greytext col-span-1 font-light flex flex-col gap-y-2">
              <p>Transaction date</p>
              <p className=" text-primary-black font-normal">
                {createdDate ? new Date(createdDate).toDateString() : ""}
              </p>
            </div>
            <div className=" text-primary-greytext col-span-1 text-end font-light flex flex-col gap-y-2">
              <p>Due date</p>
              <p className=" text-primary-black font-normal">
                {transactionDate
                  ? new Date(transactionDate).toDateString()
                  : ""}
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
            <p className=" text-lg">Purchase details</p>
            <table className=" w-full ">
              <thead>
                <tr className=" text-sm text-primary-greytext border-y border-y-gray-200">
                  <th className=" text-start font-normal py-3">Item</th>
                  <th className=" text-end font-normal py-3">Qty</th>
                  <th className=" text-end font-normal py-3">Unit price</th>
                </tr>
              </thead>
              <tbody>
                {purchaseItem?.map((item) => (
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
          <div className=" flex flex-col mt-4 gap-y-1">
            <p>Description</p>
            <p className=" font-light text-gray-700">{purchase?.description}</p>
          </div>
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

export default PurchaseDetailPage;
