"use client";
import useModal from "@/app/hooks/useModal";
import PurchaseStepIndicator from "@/components/Purchase/PurchaseTimeline";
import MainLoader from "@/components/loading/MainLoader";
import SendPurchase from "@/components/modals/purchase/SendPurchase";
import {
  useGetBusinessesByUserIdQuery,
  useGetPurchaseByIdQuery,
} from "@/src/generated/graphql";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const ViewPurchase = () => {
  const currentStep = 1;
  const {
    isOpen: isSendModalOpen,
    openModal: openSendModal,
    closeModal: closeSendModal,
  } = useModal();
  const purchaseIdParams = useSearchParams();
  const purchaseId = purchaseIdParams.get("purchaseId")?.toString();
  const getBusinessesByUserId = useGetBusinessesByUserIdQuery();
  const getPurchaseById = useGetPurchaseByIdQuery({
    variables: {
      purchaseId: purchaseId!,
    },
  });
  const purchase = getPurchaseById?.data?.getPurchaseById;
  const purchaseStatusId = purchase?.purchaseStatusId!;
  const purchaseItems = purchase?.purchaseItems;
  const purchaseItem = purchaseItems?.map((item) => ({
    id: item?.id,
    itemName: item?.description,
    quantity: item?.quantity,
    price: item?.unitPrice,
  }));
  const itemsConfirmed = purchaseStatusId! >= 2;
  const merchantInvoiceAdded = purchaseStatusId! >= 3;
  const paymentAdded = purchaseStatusId! >= 4;
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
    <>
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
            <p className=" text-[30px] text-primary-black ">
              #{purchase?.reference}
            </p>
            <p className=" text-primary-greytext font-light text-lg">
              Add extra information to the purchase
            </p>
          </div>
          <div className=" flex flex-row gap-x-4">
            <button
              onClick={openSendModal}
              className=" px-8 hover:border-gray-400 py-[10px] mt-6 rounded-[10px] flex border border-gray-200 items-center justify-center"
            >
              Send purchase
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
        <PurchaseStepIndicator
          merchantInvoiceAdded={merchantInvoiceAdded}
          currentStep={currentStep}
          itemsConfirmed={itemsConfirmed}
          paymentAdded={paymentAdded}
        />
        <div className=" w-full flex flex-col shadow2 rounded-[18px] mt-[40px] border-t border-t-gray-100 py-[36px] px-[44px]">
          <div className=" flex justify-between items-center">
            <Image alt="Logo" src={businessLogo!} width={100} height={80} />
            <Link href={`/purchase/editpurchase?purchaseId=${purchaseId}`}>
              <button
                disabled={purchaseStatusId >= 2}
                className=" px-8 py-3 hover:border-gray-400 rounded-[10px] disabled:opacity-50 disabled:cursor-not-allowed flex border border-gray-200 items-center justify-center"
              >
                Edit purchase
              </button>
            </Link>
          </div>
          <div className=" flex flex-col border-t border-t-[#f4f4f4] mt-2">
            <div className="grid grid-cols-3 pt-8">
              <div className=" text-primary-greytext col-span-1 font-light flex flex-col gap-y-2">
                <p>Purchase</p>
                <p className=" text-primary-black font-normal">
                  #{purchase?.reference}
                </p>
              </div>
              <div className=" text-primary-greytext col-span-1 font-light flex flex-col gap-y-2">
                <p>Created date</p>
                <p className=" text-primary-black font-normal">
                  {createdDate ? new Date(createdDate).toDateString() : ""}
                </p>
              </div>
              <div className=" text-primary-greytext col-span-1 text-end font-light flex flex-col gap-y-2">
                <p>Transaction date</p>
                <p className=" text-primary-black font-normal">
                  {" "}
                  {transactionDate
                    ? new Date(transactionDate).toDateString()
                    : ""}
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
                  {merchantName}
                </p>
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
                <p className=" flex flex-row">
                  Reach out to us{" "}
                  <Link href="mailto:technology@verzo.com">
                    <p className="text-primary-blue focus:underline underline-offset-2 ml-1 font-medium">
                      technology@verzo.com
                    </p>
                  </Link>
                </p>
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
      <SendPurchase
        open={isSendModalOpen}
        openModal={openSendModal}
        onClose={closeSendModal}
        purchaseId={purchaseId!}
        merchantEmail={merchantEmail!}
        merchantName={merchantName!}
      />
    </>
  );
};

export default ViewPurchase;
