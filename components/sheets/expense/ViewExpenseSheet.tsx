import React from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Verzologoblue from "@/components/ui/icons/Verzologoblue";

interface ViewExpenseProps {
  open: boolean;
  onClose: () => void;
}

interface TableData {
  item: string;
  qty: number;
  amount: number;
}

const sampleData: TableData[] = [
  { item: "Expense 1", qty: 3, amount: 100000 },
  { item: "Expense 2", qty: 2, amount: 5000 },
  { item: "Expense 3", qty: 1, amount: 300 },
  { item: "Expense 4", qty: 1, amount: 300 },
  { item: "Expense 5", qty: 1, amount: 300 },
];

const ViewExpenseSheet: React.FC<ViewExpenseProps> = ({ open, onClose }) => {
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
                <p>Expense</p>
                <p className=" text-primary-black font-normal">#001</p>
              </div>
              <div className=" text-primary-greytext col-span-1 font-light flex flex-col gap-y-2">
                <p>Issue date</p>
                <p className=" text-primary-black font-normal">
                  {" "}
                  January 10, 2023
                </p>
              </div>
              <div className=" text-primary-greytext col-span-1 text-end font-light flex flex-col gap-y-2">
                <p>Due date</p>
                <p className=" text-primary-black font-normal">March 7, 2023</p>
              </div>
            </div>
            <div className=" grid grid-cols-3 w-full pt-5">
              <div className=" text-primary-greytext col-span-1 font-light flex flex-col gap-y-2">
                <p>From</p>
                <p className=" text-primary-black font-normal mb-2">
                  Verzo Inc.
                </p>
                <p className=" text-sm">Address</p>
                <p className=" text-sm">Country</p>
              </div>
              <div className=" text-primary-greytext col-span-1 font-light flex flex-col gap-y-2">
                <p>For</p>
                <p className=" text-primary-black font-normal mb-2">
                  Olivia Doe
                </p>
                <p className=" text-sm">Address</p>
                <p className=" text-sm">Country</p>
              </div>
            </div>
            <div className=" w-full flex flex-col mt-[20px] gap-y-4 max-h-[250px] overflow-y-scroll">
              <p className=" text-lg">Expense details</p>
              <table className=" w-full ">
                <thead>
                  <tr className=" text-sm text-primary-greytext border-y border-y-gray-100">
                    <th className=" text-start font-normal py-3">Item</th>
                    <th className=" text-end font-normal py-3">Qty</th>
                    <th className=" text-end font-normal py-3">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleData.map((data, index) => (
                    <tr key={index}>
                      <td className=" py-4">{data.item}</td>
                      <td className=" text-end py-4">{data.qty}</td>
                      <td className=" text-end py-4">
                        ₦{data.amount.toLocaleString()}
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
                <p>Expense created with Verzo</p>
              </div>
              <div className=" flex flex-col text-sm text-primary-black">
                <div className=" flex justify-between gap-x-[96px] items-center py-3 border-b border-b-gray-100">
                  <p className=" text-primary-greytext">Sub total</p>
                  <p className=" text-base">₦30,000</p>
                </div>
                <div className=" flex justify-between py-3 items-center">
                  <p className=" text-primary-greytext">Amount due</p>
                  <p className=" text-base">₦30,000</p>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ViewExpenseSheet;
