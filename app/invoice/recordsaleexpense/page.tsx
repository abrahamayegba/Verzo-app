"use client";
import { useToast } from "@/app/hooks/use-toast";
import InvoiceStepIndicator from "@/components/Invoice/InvoiceTimeline";
import SaleExpenseItem from "@/components/Invoice/SaleExpenseItem";
import MainLoader from "@/components/loading/MainLoader";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  GetSaleByIdDocument,
  useEffectSaleExpenseMutation,
  useGetBusinessesByUserIdQuery,
  useGetSaleByIdQuery,
} from "@/src/generated/graphql";
import { format } from "date-fns";
import { ChevronDown, MoveLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const RecordSaleExpense = () => {
  const [date, setDate] = React.useState<Date>();
  const { toast } = useToast();
  const [openIssueDate, setOpenIssueDate] = React.useState(false);
  const [loading, setLoading] = useState<{
    [expenseId: string]: boolean;
  }>({});
  const currentStep = 2;
  const invoiceIdParams = useSearchParams();
  const invoiceId = invoiceIdParams.get("invoiceId")?.toString();
  const getBusinessesByUserId = useGetBusinessesByUserIdQuery();
  const getSaleById = useGetSaleByIdQuery({
    variables: {
      saleId: invoiceId!,
    },
  });
  const [effectSaleExpenseMutation] = useEffectSaleExpenseMutation();
  const sales = getSaleById.data?.getSaleById;
  const saleStatusId = sales?.saleStatus?.id;
  const saleItems = sales?.invoice?.invoiceDetails;
  const saleExpenseItemsWithDescriptions = sales?.saleExpenses?.map((item) => ({
    id: item?.id!,
    effected: item?.effected!,
    index: item?.index,
    description: item?.description!,
    amount: item?.amount!,
  }));

  const saleServiceExpensesWithDescriptions = sales?.saleServiceExpenses?.map(
    (item) => ({
      id: item?.id!,
      effected: item?.effected!,
      index: item?.index,
      description: `Expense assigned to ${item?.service?.name}`!,
      amount: item?.amount!,
    })
  );

  const allSaleExpenses = [
    ...(saleExpenseItemsWithDescriptions || []),
    ...(saleServiceExpensesWithDescriptions || []),
  ];

  const allExpensesEffected =
    sales?.saleExpenses?.every((item) => item?.effected) &&
    sales?.saleServiceExpenses?.every((item) => item?.effected);

  const formattedDateReceived = date
    ? format(date, "yyyy-MM-dd")
    : "Pick a date";
  const saleExpenseRecorded = saleStatusId! >= 2 || allExpensesEffected!;
  const paymentAdded = saleStatusId! >= 3;
  const hasStep2 =
    (sales?.saleExpenses?.length ?? 0) > 0 ||
    (sales?.saleServiceExpenses?.length ?? 0) > 0;
  const customerName = sales?.invoice?.customer?.name;
  const customerEmail = sales?.invoice?.customer?.email;
  if (getBusinessesByUserId.loading || getSaleById.loading) {
    return <MainLoader />;
  }
  const showSuccessToast = () => {
    toast({
      title: "Successful!",
      description: "Your expense has been successfully effected",
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

  const showDateFailureToast = (error: any) => {
    toast({
      variant: "destructive",
      description: error,
      duration: 3000,
    });
  };

  const effectSaleExpense = async (itemId: string, description: string) => {
    if (!date) {
      showDateFailureToast("Please pick a date and try again.");
      return;
    }
    try {
      setLoading((prevLoading) => ({
        ...prevLoading,
        [itemId]: true,
      }));
      await effectSaleExpenseMutation({
        variables: {
          expenseId: itemId,
          description: description,
          transactionDate: formattedDateReceived,
        },
        refetchQueries: [GetSaleByIdDocument],
      });
      showSuccessToast();
    } catch (error) {
      console.error(error);
      showFailureToast(error);
    } finally {
      setLoading((prevLoading) => ({
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
          href="/dashboard/invoices"
        >
          <button className=" flex items-center gap-x-2">
            <MoveLeft className=" w-5 h-5 " />
            Back to Invoices
          </button>
        </Link>
        <div className=" flex flex-col gap-y-[4px] mt-9">
          <p className=" text-[30px] text-primary-black ">Invoice #001 </p>
          <p className=" text-primary-greytext font-light text-lg">
            Add extra information to the invoice
          </p>
        </div>
        <div className=" flex gap-x-4">
          <Link href={`/invoice/viewinvoice?invoiceId=${invoiceId}`}>
            <button className=" px-10 py-[10px] mt-6 rounded-[10px] flex text-primary-black border border-gray-200 items-center justify-center">
              Previous
            </button>
          </Link>
          {allExpensesEffected ? (
            <Link href={`/invoice/addpayment?invoiceId=${invoiceId}`}>
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
      <InvoiceStepIndicator
        saleRecorded={saleExpenseRecorded}
        hasStep2={hasStep2}
        currentStep={currentStep}
        paymentAdded={paymentAdded}
      />
      <div className=" w-full flex flex-col mt-[30px] gap-y-[30px]">
        <div className=" flex flex-col gap-y-5">
          <p className=" text-lg text-primary-black">Customer details</p>
          <div className=" flex w-full gap-x-6">
            <div className=" text-primary-greytext flex flex-col gap-y-2 w-1/2">
              <p>Customer</p>
              <p className=" border text-gray-700 cursor-not-allowed border-gray-100 px-3 bg-gray-50 py-2 rounded-[8px]">
                {customerName}
              </p>
            </div>
            <div className=" text-primary-greytext flex-col flex gap-y-2 w-1/2">
              <p>Email address</p>
              <p className=" border cursor-not-allowed text-gray-700 border-gray-100 px-3 bg-gray-50 py-2 ">
                {customerEmail}
              </p>
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-y-5">
          <p className=" text-lg text-primary-black">Date</p>
          <div className=" flex w-full gap-x-6">
            <div className=" flex flex-col gap-y-2 w-1/2">
              <p className=" text-primary-greytext"> Expense date</p>
              <Popover open={openIssueDate} onOpenChange={setOpenIssueDate}>
                <PopoverTrigger asChild>
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
          <p className=" text-lg"> Sale and Sale service expenses</p>
        </div>
        <div className=" mt-[-8px] flex flex-col gap-y-7">
          {allSaleExpenses?.map((expense) => (
            <SaleExpenseItem
              key={expense?.id}
              expense={expense}
              loading={loading}
              setLoading={setLoading}
              effectSaleExpense={effectSaleExpense}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecordSaleExpense;
