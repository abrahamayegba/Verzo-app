import React from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Verzologoblue from "@/components/ui/icons/Verzologoblue";
import { useGetSaleByIdQuery } from "@/src/generated/graphql";

interface ViewInvoiceProps {
  open: boolean;
  onClose: () => void;
  invoiceId: string;
}
const ViewInvoiceSheet: React.FC<ViewInvoiceProps> = ({
  open,
  onClose,
  invoiceId,
}) => {
  const getSaleById = useGetSaleByIdQuery({
    variables: {
      saleId: invoiceId!,
    },
  });
  const sales = getSaleById.data?.getSaleById;
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
        ? item?.productInvoiceDetail?.price
        : item?.serviceInvoiceDetail?.price,
  }));
  const country = "Nigeria";
  const customerName = sales?.invoice?.customer?.name;
  const customerEmail = sales?.invoice?.customer?.email;
  const transactionDate = sales?.transactionDate;
  const dueDate = sales?.dueDate;
  const subtotal = sales?.invoice?.subtotal;
  const total = sales?.saleAmount;
  const business = getSaleById.data?.getSaleById?.business;
  const businessName = business?.businessName;
  const businessEmail = business?.businessEmail;
  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent
          side="bottom"
          className=" w-[679px] min-h-[700px] mx-auto py-[40px] px-[32px] rounded-[16px] overflow-y-scroll focus:outline-none"
        >
          <span>
            <Verzologoblue />
          </span>
          <div className=" flex flex-col border-t border-t-[#f4f4f4] mt-[20px]">
            <div className="grid grid-cols-3 pt-5">
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
            <div className=" w-full flex flex-col mt-[20px] gap-y-4 max-h-[250px] overflow-y-scroll">
              <p className=" text-lg">Invoice details</p>
              <table className=" w-full ">
                <thead>
                  <tr className=" text-sm text-primary-greytext border-y border-y-gray-100">
                    <th className=" text-start font-normal py-3">Item</th>
                    <th className=" text-end font-normal py-3">Qty</th>
                    <th className=" text-end font-normal py-3">Amount</th>
                  </tr>
                </thead>
                {saleItem?.map((item) => (
                  <tr key={item?.id}>
                    <td className=" py-4">{item?.itemName}</td>
                    <td className=" text-end py-4">{item?.quantity}</td>
                    <td className=" text-end py-4">
                      ₦{item?.price?.toLocaleString()}
                    </td>
                  </tr>
                ))}
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
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ViewInvoiceSheet;
