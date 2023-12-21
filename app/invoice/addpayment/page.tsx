"use client";
import { useToast } from "@/app/hooks/use-toast";
import InvoiceStepIndicator from "@/components/Invoice/InvoiceTimeline";
import ViewInvoiceSheet from "@/components/sheets/invoice/ViewInvoiceSheet";
import { Calendar } from "@/components/ui/calendar";
import FileIcon from "@/components/ui/icons/FileIcon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { ChevronDown, Eye, MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import * as filestack from "filestack-js";
import localStorage from "local-storage-fallback";
import { useForm } from "react-hook-form";
import {
  GetSaleByBusinessDocument,
  GetSaleByIdDocument,
  useGetBusinessesByUserIdQuery,
  useGetSaleByIdQuery,
  useMakeSalePaymentMutation,
} from "@/src/generated/graphql";
import MainLoader from "@/components/loading/MainLoader";

interface UploadedFile {
  filename: string;
  url: string;
}

type FormData = {
  description: string;
};

const AddPayment = () => {
  const currentStep = 3;
  const [openViewInvoiceSheet, setOpenViewInvoiceSheet] = useState(false);
  const { register, handleSubmit } = useForm<FormData>();
  const { toast } = useToast();
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [date, setDate] = React.useState<Date>();
  const [openPaymentDate, setOpenPaymentDate] = React.useState(false);
  const invoiceIdParams = useSearchParams();
  const getBusinessesByUserId = useGetBusinessesByUserIdQuery();
  const invoiceId = invoiceIdParams.get("invoiceId")?.toString();
  const getSaleById = useGetSaleByIdQuery({
    variables: {
      saleId: invoiceId!,
    },
  });
  const [makeSalePaymentMutation, { loading }] = useMakeSalePaymentMutation();
  const sale = getSaleById?.data?.getSaleById;
  const saleStatusId = sale?.saleStatus?.id;
  const saleRecorded = true;
  const paymentAdded = saleStatusId! >= 3;
  const hasStep2 =
    (sale?.saleExpenses?.length ?? 0) > 0 ||
    (sale?.saleServiceExpenses?.length ?? 0) > 0;
  const amount = sale?.saleAmount;
  const formattedDateReceived = date
    ? format(date, "yyyy-MM-dd")
    : "Pick a date";
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

  const showSuccessToast = () => {
    toast({
      title: "Successful!",
      description: "Payment information sucessfully saved",
      duration: 2500,
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
  if (getBusinessesByUserId.loading || getSaleById.loading) {
    return <MainLoader />;
  }

  const handleUploadReceiptClick = async (data: FormData) => {
    if (!date) {
      showDateFailureToast("Please pick a date and try again.");
      return;
    }
    try {
      await makeSalePaymentMutation({
        variables: {
          saleId: invoiceId!,
          file: uploadedFiles[0]?.url || null,
          transactionDate: formattedDateReceived,
          ...data,
        },
        refetchQueries: [GetSaleByIdDocument, GetSaleByBusinessDocument],
      });
      showSuccessToast();
      router.push("/dashboard/invoices");
    } catch (error) {
      console.error(error);
      showFailureToast(error);
    }
  };

  const handleCloseViewInvoiceSheet = () => {
    setOpenViewInvoiceSheet(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleUploadReceiptClick)}
        className=" pt-[40px] flex flex-col max-w-[850px] gap-y-[20px]"
      >
        <div className=" flex justify-between w-full items-center relative">
          <Link
            className=" absolute top-0 text-primary-greytext "
            href="/dashboard/invoices"
          >
            <button type="button" className=" flex items-center gap-x-2">
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
              <button
                type="button"
                className=" px-10 py-[10px] mt-3 rounded-[10px] flex border border-gray-200 items-center justify-center"
              >
                Back
              </button>
            </Link>
            <button
              type="submit"
              disabled={loading}
              className={`px-10 py-[10px] mt-3 rounded-[10px] flex bg-primary-blue text-white items-center justify-center ${
                loading ? "opacity-50" : ""
              }`}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
        <InvoiceStepIndicator
          saleRecorded={saleRecorded}
          hasStep2={hasStep2}
          currentStep={currentStep}
          paymentAdded={paymentAdded}
        />
        <div className=" w-full flex flex-col mt-[30px] gap-y-[30px]">
          <div className=" flex flex-row justify-between">
            <div className=" flex flex-row items-center gap-x-7">
              <div className=" w-[128px] h-[100px] bg-gray-100 items-end rounded-[10px] flex justify-center">
                <Image src="/preview.png" width={80} height={80} alt="image" />
              </div>
              <div className=" flex flex-col">
                <p className=" text-xl text-primary-black">Invoice #001</p>
                <p className=" text-lg text-primary-greytext font-light">
                  Short description about the invoice
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpenViewInvoiceSheet(true)}
              className="rounded-[10px] flex text-primary-blue items-center gap-x-[6px] justify-center"
            >
              Preview
              <Eye className=" w-5 h-5" />
            </button>
          </div>
          <div className=" flex flex-col mt-[20px] gap-y-9">
            <div className=" flex flex-col gap-y-1 ">
              <p className=" text-lg text-primary-black">
                Upload payment receipt
              </p>
              <p className=" text-sm text-primary-greytext">
                Supported formats: PNG, JPG & JPEG
              </p>
            </div>
            <div>
              <button
                type="button"
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
                <p className=" text-primary-greytext">Payment date</p>
                <Popover
                  open={openPaymentDate}
                  onOpenChange={setOpenPaymentDate}
                >
                  <PopoverTrigger asChild>
                    <button className=" text-left text-sm font-normal bg-white flex items-center border border-gray-200 h-[40px] px-3 rounded-[8px]">
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
                        setOpenPaymentDate(false);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="text-primary-greytext flex flex-col gap-y-2 w-1/2">
                <p>Amount</p>
                <p className="border cursor-not-allowed text-gray-700 border-gray-100 px-3 bg-gray-50 py-2 rounded-[8px]">
                  ₦{amount?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className=" flex flex-col mt-2">
            <p className=" text-lg text-primary-black">Description</p>
            <p className=" text-primary-greytext mt-[2px]">
              Say more to your customer
            </p>
            <Textarea
              id="description"
              className=" mt-5"
              required
              {...register("description")}
            />
          </div>
        </div>
      </form>
      <ViewInvoiceSheet
        open={openViewInvoiceSheet}
        onClose={handleCloseViewInvoiceSheet}
        invoiceId={invoiceId!}
      />
    </>
  );
};

export default AddPayment;
