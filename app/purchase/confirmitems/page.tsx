"use client";
import { useToast } from "@/app/hooks/use-toast";
import PurchaseStepIndicator from "@/components/Purchase/PurchaseTimeline";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import localStorage from "local-storage-fallback";
import { format } from "date-fns";
import { Check, ChevronDown, MoveLeft } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  GetPurchaseByBusinessDocument,
  GetPurchaseByIdDocument,
  useGetBusinessesByUserIdQuery,
  useGetPurchaseByIdQuery,
  useMarkPurchaseItemAsReceivedMutation,
} from "@/src/generated/graphql";
import MainLoader from "@/components/loading/MainLoader";

const ConfirmPurchaseItems = () => {
  const [date, setDate] = React.useState<Date>();
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const { toast } = useToast();
  const [openIssueDate, setOpenIssueDate] = React.useState(false);
  const [receivedQuantities, setReceivedQuantities] = useState<{
    [itemId: string]: number;
  }>({});
  const [markAsReceivedLoading, setMarkAsReceivedLoading] = useState<{
    [itemId: string]: boolean;
  }>({});
  const [quantityInputErrors, setQuantityInputErrors] = useState<{
    [itemId: string]: boolean;
  }>({});
  const currentStep = 2;
  const purchaseIdParams = useSearchParams();
  const purchaseId = purchaseIdParams.get("purchaseId")?.toString();
  const getBusinessesByUserId = useGetBusinessesByUserIdQuery();
  const getPurchaseById = useGetPurchaseByIdQuery({
    variables: {
      purchaseId: purchaseId!,
    },
  });
  const [markAsReceivedMutation] = useMarkPurchaseItemAsReceivedMutation();
  const purchase = getPurchaseById?.data?.getPurchaseById;
  const purchaseStatusId = purchase?.purchaseStatusId;

  const purchaseItems = purchase?.purchaseItems;

  const allItemsReceived = purchaseItems?.every((item) => item?.received);

  const formattedDateReceived = date
    ? format(date, "yyyy-MM-dd")
    : "Pick a date";
  const itemsConfirmed = purchaseStatusId! >= 2 || allItemsReceived == true;
  const paymentAdded = purchaseStatusId! >= 3;
  const merchantInvoiceAdded = purchaseStatusId! >= 4;
  const merchantName = purchase?.merchant?.name;
  const merchantEmail = purchase?.merchant?.email;

  const showSuccessToast = () => {
    toast({
      title: "Item Confirmed!",
      description: "Your item has been successfully received",
      duration: 3000,
    });
  };

  const showFailureToast = (error: any) => {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: error?.message,
      duration: 3000,
    });
  };

  if (getBusinessesByUserId.loading || getPurchaseById.loading) {
    return <MainLoader />;
  }

  const handleQuantityChange = (itemId: string, newValue: any) => {
    const newQuantityReceived = parseFloat(newValue);
    setReceivedQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: newQuantityReceived,
    }));
    setQuantityInputErrors((prevErrors) => ({
      ...prevErrors,
      [itemId]: false,
    }));
  };

  const handleMarkAsReceived = async (itemId: string) => {
    try {
      const receivedQuantity = receivedQuantities[itemId];
      if (!receivedQuantity) {
        setQuantityInputErrors((prevErrors) => ({
          ...prevErrors,
          [itemId]: true,
        }));
        return;
      }
      setMarkAsReceivedLoading((prevLoading) => ({
        ...prevLoading,
        [itemId]: true,
      }));
      await markAsReceivedMutation({
        variables: {
          purchaseItemId: itemId,
          businessId: businessId,
          quantity: receivedQuantity,
          transactionDate: formattedDateReceived,
        },
        refetchQueries: [
          GetPurchaseByIdDocument,
          GetPurchaseByBusinessDocument,
        ],
      });
      showSuccessToast();
    } catch (error) {
      console.error(error);
      showFailureToast(error);
    } finally {
      setMarkAsReceivedLoading((prevLoading) => ({
        ...prevLoading,
        [itemId]: false,
      }));
    }
  };

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
        <div className=" flex gap-x-4">
          <Link href={`/purchase/viewpurchase?purchaseId=${purchaseId}`}>
            <button className=" px-10 py-[10px] mt-6 rounded-[10px] flex text-primary-black border border-gray-200 items-center justify-center">
              Previous
            </button>
          </Link>
          {allItemsReceived ? (
            <Link href={`/purchase/merchantinvoice?purchaseId=${purchaseId}`}>
              <button className=" px-12 py-[10px] mt-6 rounded-[10px] flex bg-primary-blue text-white items-center justify-center">
                Next
              </button>
            </Link>
          ) : (
            <button
              className=" px-12 py-[10px] mt-6 rounded-[10px] flex bg-primary-blue text-white items-center opacity-70 justify-center disabled:cursor-not-allowed"
              disabled
            >
              Next
            </button>
          )}
        </div>
      </div>
      <PurchaseStepIndicator
        merchantInvoiceAdded={merchantInvoiceAdded}
        currentStep={currentStep}
        itemsConfirmed={itemsConfirmed}
        paymentAdded={paymentAdded}
      />
      <div className=" w-full flex flex-col mt-[30px] gap-y-[30px]">
        <div className=" flex flex-col gap-y-5">
          <p className=" text-lg text-primary-black">Merchant details</p>
          <div className=" flex w-full gap-x-6">
            <div className=" text-primary-greytext flex flex-col gap-y-2 w-1/2">
              <p>Merchant</p>
              <p className=" border text-gray-700 border-gray-100 px-3 bg-gray-50 py-2 rounded-[8px]">
                {merchantName}
              </p>
            </div>
            <div className=" text-primary-greytext flex-col flex gap-y-2 w-1/2">
              <p>Email address</p>
              <p className=" border text-gray-700 border-gray-100 px-3 bg-gray-50 py-2 ">
                {merchantEmail}
              </p>
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-y-5">
          <p className=" text-lg text-primary-black">Date</p>
          <div className=" flex w-full gap-x-6">
            <div className=" flex flex-col gap-y-2 w-1/2">
              <p className=" text-primary-greytext">Issue date</p>
              <Popover open={openIssueDate} onOpenChange={setOpenIssueDate}>
                <PopoverTrigger
                  className=" disabled:cursor-not-allowed"
                  disabled={purchaseStatusId! >= 2}
                  asChild
                >
                  <button className=" text-left text-sm font-normal flex items-center border border-gray-200 h-[40px] px-3 rounded-[8px]">
                    {date ? (
                      format(date, "PPP")
                    ) : (
                      <div className=" justify-between flex items-center w-full">
                        <span className=" text-sm">Pick a date</span>
                        <ChevronDown className=" w-4 h-4 text-primary-greytext" />
                      </div>
                    )}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 bg-white">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => {
                      setDate(date);
                      setOpenIssueDate(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className=" text-primary-greytext flex-col flex gap-y-2 w-1/2"></div>
          </div>
        </div>
        <div className=" w-full flex justify-between mt-2">
          <p className=" text-lg">Purchase items</p>
        </div>
        <div className=" mt-[-8px] flex flex-col gap-y-7">
          {purchaseItems?.map((purchase) => (
            <div key={purchase?.id} className="flex flex-col mb-3">
              <div className=" flex w-full justify-end">
                {purchase?.quantity === purchase?.quantityReceived ? (
                  <p className=" text-primary-blue flex items-center gap-x-2 cursor-not-allowed">
                    Item Received
                    <Check className="w-4 h-4" />
                  </p>
                ) : (
                  <button
                    type="button"
                    disabled={markAsReceivedLoading[purchase?.id!]}
                    onClick={async () => {
                      handleMarkAsReceived(purchase?.id!);
                    }}
                    className={`text-primary-blue flex items-center gap-x-2 ${
                      markAsReceivedLoading[purchase?.id!] ? "opacity-50" : ""
                    }`}
                  >
                    {markAsReceivedLoading[purchase?.id!] ? (
                      <>Saving...</>
                    ) : (
                      <>
                        Mark item as received
                        <Check className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 grid-rows-2 gap-5 w-full">
                <div className="text-primary-greytext flex flex-col gap-y-2">
                  <p>Title</p>
                  <p className="border text-gray-700 cursor-not-allowed border-gray-100 px-3 bg-gray-50 py-2 rounded-[8px]">
                    {purchase?.description}
                  </p>
                </div>
                <div className="text-primary-greytext flex flex-col gap-y-2">
                  <p>Amount</p>
                  <p className="border cursor-not-allowed text-gray-700 border-gray-100 px-3 bg-gray-50 py-2 rounded-[8px]">
                    {purchase?.price}
                  </p>
                </div>
                <div className="text-primary-greytext flex flex-col gap-y-2">
                  <p>Quantity ordered</p>
                  <p className="border cursor-not-allowed text-gray-700 border-gray-100 px-3 bg-gray-50 py-2 rounded-[8px]">
                    {purchase?.quantity}
                  </p>
                </div>
                <div className="text-primary-greytext flex flex-col gap-y-2">
                  <p>Quantity received</p>
                  {purchase?.quantity === purchase?.quantityReceived ? (
                    <p className="border cursor-not-allowed text-gray-700 border-gray-100 px-3 bg-gray-50 py-2 rounded-[8px]">
                      {purchase?.quantityReceived}
                    </p>
                  ) : (
                    <input
                      className={` w-full text-primary-black rounded-lg border border-gray-200 p-[8px] pl-[12px] text-[15px] focus:outline-none disabled:opacity-50 ${
                        quantityInputErrors[purchase?.id!]
                          ? "border-red-500"
                          : "border-gray-200"
                      }`}
                      type="text"
                      placeholder="Enter quantity"
                      required
                      disabled={
                        purchase?.quantity === purchase?.quantityReceived
                      }
                      value={
                        purchase?.quantity === purchase?.quantityReceived
                          ? purchase?.quantityReceived?.toString()
                          : receivedQuantities[purchase?.id!] || ""
                      }
                      onChange={(e) =>
                        handleQuantityChange(purchase?.id!, e.target.value)
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConfirmPurchaseItems;
