import React from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Verzologoblue from "@/components/ui/icons/Verzologoblue";
import {
  useGetBusinessesByUserIdQuery,
  useGetPurchaseByIdQuery,
} from "@/src/generated/graphql";

interface ViewPurchaseProps {
  open: boolean;
  onClose: () => void;
  purchaseId: string;
}

const ViewPurchaseSheet: React.FC<ViewPurchaseProps> = ({
  open,
  onClose,
  purchaseId,
}) => {
  const getPurchaseById = useGetPurchaseByIdQuery({
    variables: {
      purchaseId: purchaseId!,
    },
  });
  const getBusinessesByUserId = useGetBusinessesByUserIdQuery();
  const businesses =
    getBusinessesByUserId.data?.getBusinessesByUserId?.businesses;
  const businessName = businesses?.map((business) => business?.businessName);
  const businessEmail = businesses?.map((business) => business?.businessEmail);
  const purchase = getPurchaseById?.data?.getPurchaseById;
  const purchaseItems = purchase?.purchaseItems;
  const purchaseItem = purchaseItems?.map((item) => ({
    id: item?.id,
    itemName: item?.description,
    quantity: item?.quantity,
    price: item?.price / 100,
  }));

  const merchantName = purchase?.merchant?.name;
  const merchantEmail = purchase?.merchant?.email;
  const transactionDate = purchase?.transactionDate;
  const subtotal = purchase?.total / 100;
  const total = subtotal;
  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent
          side="bottom"
          className=" w-[679px] max-h-[700px] mx-auto py-[40px] px-[32px] rounded-[16px] overflow-y-scroll focus:outline-none"
        >
          <span>
            <Verzologoblue />
          </span>
          <div className=" flex flex-col border-t border-t-[#f4f4f4] mt-[20px]">
            <div className="grid grid-cols-3 pt-5">
              <div className=" text-primary-greytext col-span-1 font-light flex flex-col gap-y-2">
                <p>Purchase</p>
                <p className=" text-primary-black font-normal">
                  {purchase?.reference}
                </p>
              </div>
              <div className=" text-primary-greytext col-span-1 text-start font-light flex flex-col gap-y-2">
                <p>Transaction date</p>
                <p className=" text-primary-black font-normal">
                  {" "}
                  {transactionDate
                    ? new Date(transactionDate).toDateString()
                    : ""}
                </p>
              </div>
            </div>
            <div className=" grid grid-cols-3 w-full pt-5">
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
                  {merchantName}
                </p>
                <p className=" text-[16px]">{merchantEmail}</p>
              </div>
            </div>
            <div className=" w-full flex flex-col mt-[20px] gap-y-4 max-h-[250px] overflow-y-scroll">
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
              <div className=" flex flex-col text-sm text-primary-black ml-auto">
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
            <div className=" flex flex-col mt-4 gap-y-1">
              <p>Description</p>
              <p className=" font-light text-gray-700">
                {purchase?.description}
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ViewPurchaseSheet;
