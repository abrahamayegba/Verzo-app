"use client";
import PurchaseStepIndicator from "@/components/Purchase/PurchaseTimeline";
import MainLoader from "@/components/loading/MainLoader";
import Verzologoblue from "@/components/ui/icons/Verzologoblue";
import {
  useGetBusinessesByUserIdQuery,
  useGetPurchaseByIdQuery,
} from "@/src/generated/graphql";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const ViewPurchase = () => {
  const currentStep = 1;
  const purchaseIdParams = useSearchParams();
  const purchaseId = purchaseIdParams.get("purchaseId")?.toString();
  const getBusinessesByUserId = useGetBusinessesByUserIdQuery();
  const getPurchaseById = useGetPurchaseByIdQuery({
    variables: {
      purchaseId: purchaseId!,
    },
  });
  const purchase = getPurchaseById?.data?.getPurchaseById;
  const purchaseStatusId = purchase?.purchaseStatusId;

  const purchaseItems = purchase?.purchaseItems;

  const purchaseItem = purchaseItems?.map((item) => ({
    id: item?.id,
    itemName: item?.description,
    quantity: item?.quantity,
    price: item?.price,
  }));

  const itemsConfirmed = purchaseStatusId! >= 2;
  const merchantInvoiceAdded = purchaseStatusId! >= 3;
  const paymentAdded = purchaseStatusId! >= 4;

  const businesses =
    getBusinessesByUserId.data?.getBusinessesByUserId?.businesses;
  const businessName = businesses?.map((business) => business?.businessName);
  const businessEmail = businesses?.map((business) => business?.businessEmail);
  const country = "Nigeria";

  const merchantName = purchase?.merchant?.name;
  const merchantEmail = purchase?.merchant?.email;
  const issueDate = purchase?.createdAt;
  const deliveryDate = purchase?.deliveryDate;
  const subtotal = purchase?.total;
  const total = subtotal;

  let nextRoute = "";

  if (!itemsConfirmed) {
    nextRoute = `/purchase/confirmitems?purchaseId=${purchaseId}`;
  } else if (!merchantInvoiceAdded) {
    nextRoute = `/purchase/merchantinvoice?purchaseId=${purchaseId}`;
  } else if (!paymentAdded) {
    nextRoute = `/purchase/addpayment?purchaseId=${purchaseId}`;
  }

  if (getBusinessesByUserId.loading || getPurchaseById.loading) {
    return <MainLoader />;
  }
  return (
    <div className=" pt-[40px] flex flex-col max-w-[850px] gap-y-[20px]">
      <div className=" flex justify-between w-full items-center relative">
        <Link
          className=" absolute top-0 text-primary-greytext "
          href="/dashboard/purchases"
        >
          <button className=" flex items-center gap-x-2">
            <MoveLeft className=" w-5 h-5 " />
            Back to Purchases
          </button>
        </Link>
        <div className=" flex flex-col gap-y-[4px] mt-9">
          <p className=" text-[30px] text-primary-black ">Purchase #001 </p>
          <p className=" text-primary-greytext font-light text-lg">
            Add extra information to the purchase
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
      <PurchaseStepIndicator
        merchantInvoiceAdded={merchantInvoiceAdded}
        currentStep={currentStep}
        itemsConfirmed={itemsConfirmed}
        paymentAdded={paymentAdded}
      />
      <div className=" w-full flex flex-col shadow2 rounded-[18px] mt-[40px] border-t border-t-gray-100 py-[56px] px-[44px]">
        <div className=" flex justify-between items-center">
          <span>
            <Verzologoblue />
          </span>
          <button className=" px-8 py-3 rounded-[10px] flex border border-gray-200 items-center justify-center">
            Edit purchase
          </button>
        </div>
        <div className=" flex flex-col border-t border-t-[#f4f4f4] mt-[40px]">
          <div className="grid grid-cols-3 pt-8">
            <div className=" text-primary-greytext col-span-1 font-light flex flex-col gap-y-2">
              <p>Purchase</p>
              <p className=" text-primary-black font-normal">#001</p>
            </div>
            <div className=" text-primary-greytext col-span-1 font-light flex flex-col gap-y-2">
              <p>Issue date</p>
              <p className=" text-primary-black font-normal">
                {issueDate ? new Date(issueDate).toDateString() : ""}
              </p>
            </div>
            <div className=" text-primary-greytext col-span-1 text-end font-light flex flex-col gap-y-2">
              <p>Due date</p>
              <p className=" text-primary-black font-normal">
                {" "}
                {deliveryDate ? new Date(deliveryDate).toDateString() : ""}
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
            <p className=" text-lg">Purchase details</p>
            <table className=" w-full ">
              <thead>
                <tr className=" text-sm text-primary-greytext border-y border-y-gray-100">
                  <th className=" text-start font-normal py-3">Item</th>
                  <th className=" text-end font-normal py-3">Qty</th>
                  <th className=" text-end font-normal py-3">Amount</th>
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
              <p>
                Reach out to us{" "}
                <span className=" text-primary-blue focus:underline underline-offset-2 ml-1">
                  info@verzo.io
                </span>
              </p>
              <p>Purchase created with Verzo</p>
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

export default ViewPurchase;
