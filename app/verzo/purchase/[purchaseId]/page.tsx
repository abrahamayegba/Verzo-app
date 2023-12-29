"use client";
import {
  useGetBusinessesByUserIdQuery,
  useGetPurchaseByIdQuery,
} from "@/src/generated/graphql";
import { useParams } from "next/navigation";
import React from "react";
import Image from "next/image";
import MainLoader from "@/components/loading/MainLoader";
import Verzologoblue from "@/components/ui/icons/Verzologoblue";
import Link from "next/link";

const PurchaseDetailPage = () => {
  const { purchaseId } = useParams();
  const purchaseIdString = Array.isArray(purchaseId)
    ? purchaseId[0]
    : purchaseId;
  const getPurchaseById = useGetPurchaseByIdQuery({
    variables: {
      purchaseId: purchaseIdString,
    },
  });
  const getBusinessesByUserId = useGetBusinessesByUserIdQuery();
  const purchase = getPurchaseById?.data?.getPurchaseById;
  console.log(purchaseId);
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

  if (getBusinessesByUserId.loading || getPurchaseById.loading) {
    return <MainLoader />;
  }
  return (
    <div className=" py-[40px] flex flex-col w-full justify-center items-center gap-y-[20px]">
      <div className=" w-full flex flex-col max-w-[750px] bg-white shadow2 rounded-[18px] mt-[40px] border-t border-t-gray-100 pt-[20px] pb-[36px] px-[44px]">
        <div className=" flex flex-col">
          <Image
            className=" ml-[-15px]"
            alt="Logo"
            src={businessLogo!}
            width={100}
            height={80}
          />
          <p className=" text-xl">PURCHASE ORDER</p>
        </div>
        <div className=" flex flex-col border-t border-t-[#f4f4f4] mt-2">
          <div className="grid grid-cols-3 pt-8 gap-4">
            <div className=" text-primary-greytext col-span-1 font-light flex flex-col gap-y-2">
              <p>Purchase</p>
              <p className=" text-primary-black font-normal">
                #{purchase?.reference}
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
            <p className=" text-lg">Purchase details</p>
            <table className=" w-full ">
              <thead>
                <tr className=" text-sm text-primary-greytext border-y border-y-gray-100">
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
              <div className="flex">
                Reach out to us{" "}
                <Link href="mailto:technology@verzo.com">
                  <p className="text-primary-blue focus:underline underline-offset-2 ml-1 font-medium">
                    technology@verzo.com
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
      <div className=" flex flex-col gap-y-3 mt-2">
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
