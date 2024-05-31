import React from "react";
import { ChevronLeft } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useViewBusinessAccountQuery } from "@/src/generated/graphql";
import ActiveBankIcon from "@/components/ui/icons/ActiveBankIcon";
import localStorage from "local-storage-fallback";
interface ViewVerzoAccountProps {
  open: boolean;
  openSheet: () => void;
  onClose: () => void;
}

const ViewVerzoAccount: React.FC<ViewVerzoAccountProps> = ({
  open,
  onClose,
  openSheet,
}) => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const { data } = useViewBusinessAccountQuery({
    variables: {
      businessId: businessId,
    },
  });
  const accountName = data?.viewBusinessAccount?.accountName;
  const accountType = data?.viewBusinessAccount?.accountType;
  const accountNumber = data?.viewBusinessAccount?.accountNumber;
  const address = data?.viewBusinessAccount?.customer?.billingAddressLine1;
  const addressCity = data?.viewBusinessAccount?.customer?.billingAddressCity;
  const bvn = data?.viewBusinessAccount?.bvn;
  const accountBalance = data?.viewBusinessAccount?.accountBalance;
  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className=" pt-[40px]">
          <button
            type="button"
            onClick={onClose}
            className=" flex gap-x-2 focus:outline-none text-primary-greytext items-center text-sm"
          >
            <ChevronLeft className=" w-4 h-4" />
            Back
          </button>
          <div className=" mt-[25px] flex">
            <span className=" p-3 rounded-full bg-[#EDF6FF] flex">
              <ActiveBankIcon />
            </span>
          </div>
          <p className=" mt-[14px] text-lg text-primary-black">Verzo account</p>
          <form className=" w-full mt-[15px] flex flex-col gap-y-3 ">
            <div className=" flex flex-col gap-y-[6px]">
              <label
                className=" text-[15px] text-gray-800 ml-1"
                htmlFor="accountName"
              >
                Account name
              </label>
              <div className="w-full border p-[10px] focus:outline-none rounded-lg text-sm border-gray-100">
                {accountName}
              </div>
            </div>
            <div className=" flex flex-col gap-y-[6px]">
              <label
                className=" text-[15px] text-gray-800 ml-1"
                htmlFor="accountNumber"
              >
                Account number
              </label>
              <div className="w-full border p-[10px] focus:outline-none rounded-lg text-sm border-gray-100">
                {accountNumber}
              </div>
            </div>
            <div className=" flex flex-col gap-y-[6px]">
              <label className=" text-[15px] text-gray-800 ml-1" htmlFor="BVN">
                BVN
              </label>
              <div className="w-full border p-[10px] focus:outline-none rounded-lg text-sm border-gray-100">
                {bvn}
              </div>
            </div>
            <div className=" flex flex-col gap-y-[6px]">
              <label
                className=" text-[15px] text-gray-800 ml-1"
                htmlFor="accountBalance"
              >
                Account balance
              </label>
              <div className="w-full border p-[10px] focus:outline-none rounded-lg text-sm border-gray-100">
                {accountBalance?.toLocaleString("en-NG", {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 0,
                })}
              </div>
            </div>
            <div className=" flex flex-col gap-y-[6px]">
              <label
                className=" text-[15px] text-gray-800 ml-1"
                htmlFor="accountType"
              >
                Account type
              </label>
              <div className="w-full border p-[10px] focus:outline-none rounded-lg text-sm border-gray-100">
                {accountType}
              </div>
            </div>
            <div className=" flex flex-col gap-y-[6px]">
              <label
                className=" text-[15px] text-gray-800 ml-1"
                htmlFor="address"
              >
                Address
              </label>
              <div className="w-full border p-[10px] focus:outline-none rounded-lg text-sm border-gray-100">
                {address}, {addressCity}
              </div>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ViewVerzoAccount;
