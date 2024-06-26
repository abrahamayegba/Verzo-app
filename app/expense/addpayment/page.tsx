"use client";
import { useToast } from "@/app/hooks/use-toast";
import ExpenseStepIndicator from "@/components/Expense/ExpenseTimeline";
import MainLoader from "@/components/loading/MainLoader";
import ViewExpenseSheet from "@/components/sheets/expense/ViewExpenseSheet";
import { Calendar } from "@/components/ui/calendar";
import FileIcon from "@/components/ui/icons/FileIcon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import {
  GetExpenseByIdDocument,
  GetExpensesByBusinessDocument,
  ViewBusinessAccountStatementDocument,
  useGetBusinessesByUserIdQuery,
  useGetExpenseByIdQuery,
  useMakeExpensePaymentMutation,
  useViewBusinessAccountStatementQuery,
} from "@/src/generated/graphql";
import { format } from "date-fns";
import * as filestack from "filestack-js";
import { ChevronDown, Eye, MoveLeft, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import localStorage from "local-storage-fallback";
import { IoReceiptOutline } from "react-icons/io5";
import { IoIosLink } from "react-icons/io";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { isAuthenticated } from "@/lib/auth";

interface UploadedFile {
  filename: string;
  url: string;
}

type FormData = {
  description: string;
  reference: string;
  total: number;
};

const AddPayment = () => {
  const currentStep = 4;
  const merchantInvoiceAdded = true;
  const itemsConfirmed = true;
  const handleCloseViewExpenseSheet = () => {
    setOpenViewExpenseSheet(false);
  };
  const { register, reset, handleSubmit, getValues } = useForm<FormData>();
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const { toast } = useToast();
  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      if (!authenticated) {
        router.push("/auth/signin");
      }
    };
    checkAuth();
  }, [router]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionDate, setTransactionDate] = useState("");
  const [transactionReference, setTransactionReference] = useState("");
  const [transactionNarration, setTransactionNarration] = useState("");
  const [selectedTab, setSelectedTab] = useState(1);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [date, setDate] = React.useState<Date>();
  const [openPaymentDate, setOpenPaymentDate] = React.useState(false);
  const [openViewExpenseSheet, setOpenViewExpenseSheet] = useState(false);

  const expenseIdParams = useSearchParams();
  const expenseId = expenseIdParams.get("expenseId")?.toString();
  const getBusinessesByUserId = useGetBusinessesByUserIdQuery();

  const getExpenseById = useGetExpenseByIdQuery({
    variables: {
      expenseId: expenseId!,
    },
  });
  const { data } = useViewBusinessAccountStatementQuery({
    variables: {
      businessId: businessId,
    },
  });

  const transactions = data?.viewBusinessAccountStatement;

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);
  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);
  const [openTransactionsModal, setOpenTransactionsModal] = useState(false);
  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
    filterTransactions(e.target.value);
  };

  const filterTransactions = (query: string) => {
    const filtered = transactions?.filter(
      (transaction) =>
        transaction?.narration.toLowerCase().includes(query.toLowerCase()) ||
        new Date(transaction?.transactionDate)
          .toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })
          .toLowerCase()
          .includes(query.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };
  const expense = getExpenseById?.data?.getExpenseById;
  const expenseStatusId = expense?.expenseStatusId;
  const expenseReference = expense?.reference;
  const paymentAdded = expenseStatusId! >= 4;
  const amount = expense?.amount / 100;
  const [makeExpensePaymentMutation, { loading }] =
    useMakeExpensePaymentMutation();
  const apiKey = "Am510qpybQ3i95Kv17umgz";
  const client = filestack.init(apiKey);
  const showPickerSuccessToast = (filename: any) => {
    toast({
      title: "Successful!",
      description: `${filename} has been successfully uploaded`,
      duration: 2500,
    });
  };
  const showSuccessToast = () => {
    toast({
      title: "Successful!",
      description: "Payment information sucessfully saved",
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
  const handleTransactionSelect = (transaction: any) => {
    setOpenTransactionsModal(false);
    setTransactionId(transaction?.id);
    setSelectedTransaction(transaction);
    setTransactionAmount(transaction.cardTransaction.merchantAmount);
    setTransactionDate(transaction.transactionDate);
    const transactionDate = new Date(transaction.transactionDate);
    const transactionDateWithoutTime = new Date(
      transactionDate.getFullYear(),
      transactionDate.getMonth(),
      transactionDate.getDate()
    );
    setDate(transactionDateWithoutTime);
    setTransactionReference(transaction.paymentReference);
    setTransactionNarration(transaction.narration);
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

  const handleTabClick = (tabNumber: number) => {
    setSelectedTab(tabNumber);
  };
  const showDateFailureToast = (error: any) => {
    toast({
      variant: "destructive",
      description: error,
      duration: 2500,
    });
  };

  console.log(amount);

  const formattedExpenseDate = date
    ? format(date, "yyyy-MM-dd")
    : "Pick a date";

  const handleUploadReceiptSubmit = async () => {
    if (!date) {
      showDateFailureToast("Please pick a date and try again.");
      return;
    }
    if (!transactionId && selectedTab === 2) {
      showDateFailureToast("Select a transaction and try again");
      return;
    }
    try {
      await makeExpensePaymentMutation({
        variables: {
          expenseId: expenseId!,
          businessId: businessId,
          transactionId: selectedTab === 2 ? transactionId : null,
          file: uploadedFiles[0]?.url || null,
          transactionDate: formattedExpenseDate,
          total: amount * 100!,
          description: getValues("description"),
        },
        refetchQueries: [
          GetExpenseByIdDocument,
          GetExpensesByBusinessDocument,
          ViewBusinessAccountStatementDocument,
        ],
      });
      showSuccessToast();
      router.push("/dashboard/expenses");
    } catch (error) {
      console.error(error);
      showFailureToast(error);
    }
  };
  if (getBusinessesByUserId.loading || getExpenseById.loading) {
    return <MainLoader />;
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleUploadReceiptSubmit)}
        className=" pt-[40px] flex flex-col max-w-[850px] gap-y-[20px]"
      >
        <div className=" flex justify-between w-full items-center relative">
          <Link
            className=" absolute top-0 text-primary-greytext "
            href="/dashboard/expenses"
          >
            <button type="button" className=" flex items-center gap-x-2">
              <MoveLeft className=" w-5 h-5 " />
              Back to Expenses
            </button>
          </Link>
          <div className=" flex flex-col gap-y-[4px] mt-9">
            <p className=" text-[28px] text-primary-black ">
              Expense {expenseReference}
            </p>
            <p className=" text-primary-greytext font-light text-lg">
              Record the payment process for this expense
            </p>
          </div>
          <div className=" flex gap-x-4">
            <Link href={`/expense/viewexpense?expenseId=${expenseId}`}>
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
                  Expense {expense?.reference}
                </p>
                <p className=" text-lg text-primary-greytext font-light">
                  {expense?.description}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpenViewExpenseSheet(true)}
              className="rounded-[10px] flex text-primary-blue items-center gap-x-[6px] justify-center"
            >
              Preview
              <Eye className=" w-5 h-5" />
            </button>
          </div>
          <div>
            <div className="flex mb-4 gap-x-4">
              <button
                type="button"
                className={`px-4 focus:outline-none rounded-md py-5 border-gray-300 flex flex-row items-center gap-x-2 ${
                  selectedTab === 1
                    ? "border-primary-blue border-[1.5px] bg-blue-50 text-primary-blue font-medium bg-primary-blue-light"
                    : "text-gray-500 border"
                }`}
                onClick={() => handleTabClick(1)}
              >
                <IoReceiptOutline
                  className={`${
                    selectedTab === 1 ? " text-primary-blue" : " text-gray-500"
                  }`}
                />
                <span>Add Payment Receipt</span>
                <input
                  type="radio"
                  className="form-radio h-[18px] w-[18px] ml-3 text-primary-blue-light focus:ring-primary-blue"
                  checked={selectedTab === 1}
                  onChange={() => handleTabClick(1)}
                />
              </button>
              <button
                type="button"
                className={`rounded-md py-5 border-gray-300 px-7 focus:outline-none flex flex-row items-center gap-x-2 ${
                  selectedTab === 2
                    ? " border-primary-blue bg-blue-50 border-[1.5px] text-primary-blue font-medium bg-primary-blue-light"
                    : "text-gray-500 border"
                }`}
                onClick={() => handleTabClick(2)}
              >
                <IoIosLink
                  className={`${
                    selectedTab === 2 ? " text-primary-blue" : " text-gray-500"
                  }`}
                />
                <span>Link Transaction</span>
                <input
                  type="radio"
                  className="form-radio h-[18px] w-[18px] ml-3 text-primary-blue-light focus:ring-primary-blue"
                  checked={selectedTab === 2}
                  onChange={() => handleTabClick(2)}
                />
              </button>
            </div>
            {selectedTab === 1 && (
              <>
                <div className=" flex flex-col mt-[20px] gap-y-4">
                  <div className=" flex flex-col gap-y-1 ">
                    <p className=" text-lg text-primary-black">
                      Upload payment receipt{" "}
                      <span className=" text-gray-500 text-[15px]">
                        (optional)
                      </span>
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
              </>
            )}
            {selectedTab === 2 && (
              <div className=" flex flex-col mt-[30px] gap-y-2">
                <p className=" text-lg text-primary-black">Link transaction</p>
                <AlertDialog
                  open={openTransactionsModal}
                  onOpenChange={setOpenTransactionsModal}
                >
                  <button
                    onClick={() => setOpenTransactionsModal(true)}
                    type="button"
                    className=" text-gray-600 border hover:bg-gray-100 border-gray-300 rounded-md py-[12px] px-6 max-w-[500px]"
                  >
                    Select transaction
                  </button>
                  <AlertDialogContent className="w-[600px] shadow transition-all pt-5 pb-6 px-0">
                    <div className="flex w-[598px] flex-col items-center justify-start">
                      <div className="border-b border-b-gray-200 w-full pb-3">
                        <div className="flex flex-col gap-y-5 w-full px-6">
                          <div className="flex w-full justify-between">
                            <p className="font-medium text-xl text-gray-700">
                              Select the matching transaction
                            </p>
                            <button
                              onClick={() => setOpenTransactionsModal(false)}
                              className="p-1.5 bg-blue-100 rounded-full"
                            >
                              <X className="w-[17px] h-[17px] text-gray-700 stroke-[2.5px]" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="w-full flex flex-col gap-y-1 px-6">
                        {transactions?.length! > 0 ? (
                          <>
                            <div className="mt-7">
                              <div className="relative">
                                <input
                                  className="w-full rounded-md py-2 placeholder:text-[15px] px-3 pl-10 border border-gray-200 bg-gray-50"
                                  type="text"
                                  placeholder="Search for a transaction.."
                                  value={searchQuery}
                                  onChange={handleSearchChange}
                                />
                                <Search className="absolute top-0 left-0 mt-3 ml-3 h-5 w-5 text-gray-400 pointer-events-none" />
                              </div>
                              <div className=" h-[320px] mt-1 flex flex-col overflow-y-scroll gap-y-1">
                                {filteredTransactions?.map(
                                  (transaction) =>
                                    transaction?.type === "Debit" && (
                                      <button
                                        className=" flex flex-row gap-x-8 justify-between text-start items-start border-b border-b-gray-200 py-2 px-1 hover:bg-gray-100 cursor-pointer"
                                        key={transaction?.id}
                                        onClick={() =>
                                          handleTransactionSelect(transaction)
                                        }
                                      >
                                        <div className=" flex flex-col gap-y-1 max-w-[350px]">
                                          <p className=" font-medium text-gray-700">
                                            {transaction?.narration}
                                          </p>
                                          <p className=" text-gray-600 text-sm font-light">
                                            {new Date(
                                              transaction?.transactionDate
                                            ).toLocaleString("en-US", {
                                              year: "numeric",
                                              month: "short",
                                              day: "numeric",
                                              hour: "numeric",
                                              minute: "numeric",
                                            })}
                                          </p>
                                        </div>
                                        <div className=" flex flex-col gap-y-1">
                                          <p className=" font-medium mt-1 text-[18px] text-gray-800 min-w-[150px] text-end">
                                            {(
                                              transaction?.cardTransaction
                                                ?.merchantAmount / 100
                                            )?.toLocaleString("en-NG", {
                                              style: "currency",
                                              currency: "NGN",
                                            })}
                                          </p>
                                          <p className=" text-end text-gray-600 font-light">
                                            Fee:
                                            {(
                                              transaction?.cardTransaction
                                                ?.fee / 100
                                            )?.toLocaleString("en-NG", {
                                              style: "currency",
                                              currency: "NGN",
                                            })}
                                          </p>
                                        </div>
                                      </button>
                                    )
                                )}
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="text-center">
                            <h3 className=" font-medium text-gray-700 pt-5">
                              No transactions
                            </h3>
                          </div>
                        )}
                      </div>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
                {selectedTransaction && (
                  <div className="mt-4 flex flex-col gap-y-4 w-[500px]">
                    <div>
                      <label className="block text-gray-800 mb-2">
                        Transaction amount
                      </label>
                      <p className="border border-gray-100 bg-gray-50 cursor-not-allowed rounded-md px-3 py-2 w-full">
                        {(transactionAmount / 100)?.toLocaleString("en-NG", {
                          style: "currency",
                          currency: "NGN",
                        })}
                      </p>
                    </div>
                    <div>
                      <label className="block text-gray-800 mb-2">
                        Transaction date
                      </label>
                      <p className="border border-gray-100 bg-gray-50 cursor-not-allowed rounded-md px-3 py-2 w-full">
                        {new Date(transactionDate).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <label className="block text-gray-800 mb-2">
                        Transaction reference
                      </label>
                      <p className="border border-gray-100 bg-gray-50 cursor-not-allowed rounded-md px-3 py-2 w-full">
                        {transactionReference}
                      </p>
                    </div>
                    <div>
                      <label className="block text-gray-800 mb-2">
                        Transaction narration
                      </label>
                      <p className="border border-gray-100 bg-gray-50 cursor-not-allowed rounded-md px-3 py-2 w-full">
                        {transactionNarration}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className=" flex flex-col gap-y-2">
            <p>Details</p>
            <div className=" flex flex-row gap-x-6">
              <div className=" flex flex-col gap-y-2 w-1/2">
                <p className=" text-primary-greytext">Payment date</p>
                <Popover
                  open={openPaymentDate}
                  onOpenChange={setOpenPaymentDate}
                >
                  <PopoverTrigger
                    className=" disabled:cursor-not-allowed"
                    disabled={expenseStatusId! >= 4}
                    asChild
                  >
                    <button className=" text-left text-base font-normal bg-white flex items-center border border-gray-200 h-[45px] px-3 rounded-[8px]">
                      {date ? (
                        format(date, "PPP")
                      ) : (
                        <div className=" justify-between flex items-center w-full">
                          <span className=" text-base">Pick a date</span>
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
                <p className="border cursor-not-allowed text-[18px] text-gray-700 border-gray-100 px-3 bg-gray-50 py-2 rounded-[8px]">
                  ₦{amount?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className=" flex flex-col mt-2">
            <p className=" text-lg text-primary-black">Description</p>
            <Textarea
              id="description"
              className=" mt-3"
              required
              {...register("description")}
            />
          </div>
        </div>
      </form>
      <ViewExpenseSheet
        open={openViewExpenseSheet}
        onClose={handleCloseViewExpenseSheet}
        expenseId={expenseId!}
      />
    </>
  );
};

export default AddPayment;
