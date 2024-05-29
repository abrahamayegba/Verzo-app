"use client";
import { useToast } from "@/app/hooks/use-toast";
import ExpenseStepIndicator from "@/components/Expense/ExpenseTimeline";
import ViewExpenseSheet from "@/components/sheets/expense/ViewExpenseSheet";
import { Calendar } from "@/components/ui/calendar";
import FileIcon from "@/components/ui/icons/FileIcon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ChevronDown, Eye, MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import localStorage from "local-storage-fallback";
import { useRouter, useSearchParams } from "next/navigation";
import * as filestack from "filestack-js";
import {
  GetExpenseByIdDocument,
  GetExpensesByBusinessDocument,
  useGetBusinessesByUserIdQuery,
  useGetExpenseByIdQuery,
  useUploadMerchantInvoiceMutation,
} from "@/src/generated/graphql";
import MainLoader from "@/components/loading/MainLoader";

interface UploadedFile {
  filename: string;
  url: string;
}

const AddMerchantInvoice = () => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const { toast } = useToast();
  const router = useRouter();
  const currentStep = 3;
  const itemsConfirmed = true;
  const paymentAdded = false;
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [date, setDate] = React.useState<Date>();
  const [openPaymentDate, setOpenPaymentDate] = React.useState(false);
  const [openViewExpenseSheet, setOpenViewExpenseSheet] = useState(false);

  const expenseIdParams = useSearchParams();
  const expenseId = expenseIdParams.get("expenseId")?.toString();

  const getBusinessesByUserId = useGetBusinessesByUserIdQuery();
  const [uploadMerchantInvoiceMutation, { loading }] =
    useUploadMerchantInvoiceMutation();
  const getExpenseById = useGetExpenseByIdQuery({
    variables: {
      expenseId: expenseId!,
    },
  });
  const expense = getExpenseById?.data?.getExpenseById;
  const expenseStatusId = expense?.expenseStatusId;
  const expenseReference = expense?.reference;
  const merchantInvoiceAdded = expenseStatusId! >= 3;
  const amount = expense?.amount / 100;
  const apiKey = "Am510qpybQ3i95Kv17umgz";
  const client = filestack.init(apiKey);
  const showPickerSuccessToast = (filename: any) => {
    toast({
      title: "Uploaded!",
      description: `${filename} has been successfully uploaded`,
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

  const openPicker = () => {
    const pickerOptions = {
      fromSources: ["local_file_system", "facebook", "instagram"],
      accept: ["image/*"],
      maxFiles: 1,
      maxSize: 4 * 1024 * 1024,
      transformations: {
        crop: true,
        rotate: true,
      },
      onUploadDone: (response: any) => {
        if (response.filesFailed && response.filesFailed.length > 0) {
          // Show failure toast if there's an error
          showFailureToast(response?.error);
        } else {
          console.log("Upload done:", response);
          const { filesUploaded } = response;
          const uploadedFilesInfo: UploadedFile[] = filesUploaded.map(
            (file: any) => ({
              filename: file.filename,
              url: file.url,
            })
          );
          setUploadedFiles(uploadedFilesInfo);
          setIsPickerOpen(false);
          // Call showSuccessToast with the uploaded filename
          if (uploadedFilesInfo.length > 0) {
            showPickerSuccessToast(uploadedFilesInfo[0].filename);
          }
        }
      },
    };
    const picker = client.picker(pickerOptions);
    picker.open();
    setIsPickerOpen(true);
  };
  const handleCloseViewExpenseSheet = () => {
    setOpenViewExpenseSheet(false);
  };
  const formattedExpenseDate = date
    ? format(date, "yyyy-MM-dd")
    : "Pick a date";

  if (getBusinessesByUserId.loading || getExpenseById.loading) {
    return <MainLoader />;
  }
  const handleSaveInvoiceClick = () => {
    if (!date) {
      showDateFailureToast("Please pick a date and try again.");
      return;
    }
    try {
      uploadMerchantInvoiceMutation({
        variables: {
          expenseId: expenseId!,
          businessId: businessId,
          file: uploadedFiles[0]?.url || null,
          invoiceDate: formattedExpenseDate,
          match: true,
        },
        refetchQueries: [GetExpenseByIdDocument, GetExpensesByBusinessDocument],
      });
      router.push(`/expense/addpayment?expenseId=${expenseId}`);
    } catch (error) {
      console.error(error);
      showFailureToast(error);
    }
  };
  return (
    <>
      <div className=" pt-[40px] flex flex-col max-w-[850px] gap-y-[20px]">
        <div className=" flex justify-between w-full items-center relative">
          <Link
            className=" absolute top-0 text-primary-greytext "
            href="/dashboard/expenses"
          >
            <button className=" flex items-center gap-x-2">
              <MoveLeft className=" w-5 h-5 " />
              Back to Expenses
            </button>
          </Link>
          <div className=" flex flex-col gap-y-[4px] mt-9">
            <p className=" text-[28px] text-primary-black ">
              Expense #{expenseReference}
            </p>
            <p className=" text-primary-greytext font-light text-lg">
              Upload the merchant invoice linked to this expense
            </p>
          </div>
          <div className=" flex gap-x-4">
            <Link href={`/expense/viewexpense?expenseId=${expenseId}`}>
              <button className=" px-10 py-[10px] mt-3 rounded-[10px] flex border border-gray-200 items-center justify-center">
                Back
              </button>
            </Link>
            <button
              disabled={loading}
              onClick={handleSaveInvoiceClick}
              className={`px-10 py-[10px] mt-3 rounded-[10px] flex bg-primary-blue text-white items-center justify-center ${
                loading ? " opacity-50" : ""
              }`}
            >
              Next
            </button>
          </div>
        </div>
        <ExpenseStepIndicator
          merchantInvoiceAdded={merchantInvoiceAdded}
          currentStep={currentStep}
          itemsConfirmed={itemsConfirmed}
          paymentAdded={paymentAdded}
        />
        <div className=" w-full flex flex-col mt-[30px] gap-y-[30px]">
          <div className=" flex flex-row justify-between">
            <div className=" flex flex-row items-center gap-x-7">
              <div className=" w-[128px] h-[100px] bg-gray-100 items-end rounded-[10px] flex justify-center">
                <Image src="/preview.png" width={80} height={80} alt="image" />
              </div>
              <div className=" flex flex-col">
                <p className=" text-xl text-primary-black">
                  Expense #{expenseReference}
                </p>
                <p className=" text-lg text-primary-greytext font-light">
                  {expense?.description}
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpenViewExpenseSheet(true)}
              className="rounded-[10px] flex text-primary-blue items-center gap-x-[6px] justify-center"
            >
              Preview
              <Eye className=" w-5 h-5" />
            </button>
          </div>
          <div className=" flex flex-col mt-[20px] gap-y-9">
            <div className=" flex flex-col gap-y-1 ">
              <p className=" text-lg text-primary-black">
                Upload merchant invoice{" "}
                <span className=" text-gray-500">(optional)</span>
              </p>
              <p className=" text-sm text-primary-greytext">
                Supported formats: PNG, JPG & JPEG
              </p>
            </div>
            <div>
              <button
                onClick={openPicker}
                className={`border items-center flex-col gap-y-3 cursor-pointer justify-center flex border-dashed  border-gray-300 rounded-[8px] w-full h-[130px] ${
                  uploadedFiles[0] ? "bg-[#F9FCFF]" : "bg-transparent"
                }`}
              >
                {uploadedFiles[0] ? (
                  <p>
                    <a
                      href={uploadedFiles[0]?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {uploadedFiles[0]?.filename}
                    </a>
                    <span
                      onClick={() => setUploadedFiles([])}
                      className=" text-primary-red underline underline-offset-2 ml-2"
                    >
                      Remove file
                    </span>
                  </p>
                ) : (
                  <div className=" flex items-center justify-center flex-col gap-y-2">
                    <FileIcon />
                    <p>
                      Drag and Drop or
                      <span className="text-primary-blue underline underline-offset-2 ml-1">
                        Upload file
                      </span>
                    </p>
                  </div>
                )}
              </button>
            </div>
          </div>
          <div className=" flex flex-col gap-y-4 mt-[20px]">
            <p>Details</p>
            <div className=" flex flex-row gap-x-6">
              <div className=" flex flex-col gap-y-2 w-1/2">
                <p className=" text-primary-greytext">Date</p>
                <Popover
                  open={openPaymentDate}
                  onOpenChange={setOpenPaymentDate}
                >
                  <PopoverTrigger
                    className=" disabled:cursor-not-allowed"
                    disabled={expenseStatusId! >= 3}
                    asChild
                  >
                    <button className=" text-left text-[16px] font-normal bg-white flex items-center border border-gray-200 h-[45px] px-3 rounded-[8px]">
                      {date ? (
                        format(date, "PPP")
                      ) : (
                        <div className=" justify-between flex items-center w-full">
                          <span className=" text-[16px]">Pick a date</span>
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
                        setOpenPaymentDate(false);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="text-primary-greytext flex flex-col gap-y-2 w-1/2">
                <p>Amount</p>
                <p className="border cursor-not-allowed text-gray-700 text-[18px] border-gray-100 px-3 bg-gray-50 py-2 rounded-[8px]">
                  ₦{amount?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ViewExpenseSheet
        open={openViewExpenseSheet}
        onClose={handleCloseViewExpenseSheet}
        expenseId={expenseId!}
      />
    </>
  );
};

export default AddMerchantInvoice;
