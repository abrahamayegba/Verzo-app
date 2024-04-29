"use client";
import MainLoader from "@/components/loading/MainLoader";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CardChipIcon from "@/components/ui/icons/CardChipIcon";
import CreatedAtIcon from "@/components/ui/icons/CreatedAtIcon";
import VerzoLogoWhite from "@/components/ui/icons/VerzoLogoWhite";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  SudoCardSpendingInterval,
  useViewCardQuery,
} from "@/src/generated/graphql";
import {
  Download,
  Eye,
  MoveLeft,
  PlusCircle,
  History,
  Copy,
  EyeOff,
  Pen,
  Trash2,
  Plus,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import Image from "next/image";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
];

type SpendingLimitType = {
  amount: number;
  interval: SudoCardSpendingInterval;
};

const ViewCard = () => {
  const cardParams = useSearchParams();
  const cardId = cardParams.get("cardId");
  const [showPassword, setShowPassword] = useState(false);
  const [openAddLimitModal, setOpenAddLimitModal] = useState(false);
  const [spendingLimit, setSpendingLimit] = useState<SpendingLimitType>({
    amount: 0,
    interval: SudoCardSpendingInterval.Daily,
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const CVC = "333";
  const { data, loading } = useViewCardQuery({
    variables: {
      cardId: cardId!,
    },
  });

  const imageSrc = "https://i.imgur.com/kGkSg1v.png";
  const cardData = data?.viewCard;
  const accountNumber = cardData?.data?.account?.accountNumber;
  const cardHolder = cardData?.data?.account?.accountName;
  const maskedPan = cardData?.data?.maskedPan;
  const expiryMonth = cardData?.data?.expiryMonth;
  const expiryYear = cardData?.data?.expiryYear;
  const spendLimit = cardData?.data?.spendingControls?.spendingLimits;
  const accountBalance = cardData?.data?.account?.currentBalance;
  const updatedAt = cardData?.data?.account?.updatedAt;
  const cardType = cardData?.data?.type;
  const createdAt = cardData?.data?.createdAt;
  const status = cardData?.data?.status;

  const handleAmountChange = (event: any) => {
    const amount = parseFloat(event.target.value);
    setSpendingLimit((prev) => ({
      ...prev,
      amount: isNaN(amount) ? 0 : amount, // Set amount to 0 if NaN
    }));
  };

  const handleIntervalChange = (value: string) => {
    setSpendingLimit((prev) => ({
      ...prev,
      interval: value as SudoCardSpendingInterval, // Cast the value to SudoCardSpendingInterval enum
    }));
  };

  // const handleCreateCardLimit = async () => {
  //   try {
  //     await createSudoCardMutation({
  //       variables: {
  //         businessId: businessId,
  //         assignedUserId: assignedId === "myId" ? null : assignedId,
  //         spendingLimits: spendingLimit,
  //       },
  //     });
  //     setOpenAddCardModal(false);
  //     showSuccessToast();
  //     setSpendingLimit({
  //       amount: 0,
  //       interval: SudoCardSpendingInterval.Daily,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     showFailureToast(error);
  //   }
  // };

  if (loading) {
    return <MainLoader />;
  }
  return (
    <div className=" pt-[40px] flex flex-col gap-y-[20px]">
      <div className=" flex w-full items-center relative">
        <Link
          className=" absolute top-0 text-primary-greytext "
          href="/dashboard/cards"
        >
          <button className=" flex items-center gap-x-2">
            <MoveLeft className=" w-5 h-5 " />
            Back to Cards
          </button>
        </Link>
        <div className=" flex flex-col gap-y-[4px] mt-12">
          <p className=" text-[24px] text-primary-black tracking-wide flex items-center">
            {cardHolder}
            <span className=" py-[6px] px-[15px] rounded-sm bg-blue-50 text-[11px] tracking-tighter font-semibold ml-3 uppercase">
              {cardType}
            </span>
          </p>
          <p className="text-primary-greytext font-light flex items-center text-[15px]">
            <span className="mr-1">
              {" "}
              <CreatedAtIcon />{" "}
            </span>
            Created at:{" "}
            {createdAt &&
              new Date(createdAt).toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
              })}
          </p>
        </div>
      </div>
      <div className=" w-full flex flex-row gap-x-[50px]">
        <div className=" w-4/6 flex flex-col gap-y-5">
          <div className=" h-[110px] border border-gray-200 rounded-lg px-6 flex items-center py-3">
            <div className=" w-[45%] flex flex-col gap-y-2 border-r-2 pr-4 justify-center h-full border-r-gray-200">
              <p className=" text-sm font-medium text-gray-600">
                Account number
              </p>
              <p className=" text-2xl tracking-wide flex items-center font-medium">
                {accountNumber}
                <Copy className=" ml-5 w-5 h-5 text-gray-400" />
              </p>
            </div>
            <div className=" flex flex-col w-[20%] px gap-y-2 border-r-2 px-4 justify-center h-full border-r-gray-200">
              <p className=" text-sm font-medium text-gray-600">Expiry date</p>
              <p className=" text-2xl tracking-wide flex items-center font-medium">
                {`${expiryMonth}/${expiryYear}`}
              </p>
            </div>
            <div className=" flex flex-col w-[20%] gap-y-2 border-r-2 px-4 justify-center h-full border-r-gray-200">
              <p className=" text-sm font-medium text-gray-600">CVC</p>
              <p className=" text-2xl tracking-wide flex items-center font-medium">
                {showPassword ? CVC : "*".repeat(CVC.length)}
                {showPassword ? (
                  <EyeOff
                    className="ml-4 text-gray-400"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <Eye
                    className="ml-4 text-gray-400"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </p>
            </div>
            <div className=" flex flex-col w-[15%] gap-y-2 px-4 justify-center h-full ">
              <p className=" text-sm font-medium text-gray-600">Status</p>
              <p className=" text-[16px] border border-green-600 flex items-center px-4 py-[2px] bg-green-50 rounded-2xl justify-center text-green-700">
                {status}
              </p>
            </div>
          </div>
          <div className=" h-[170px] flex flex-row gap-x-5">
            <div className=" w-1/2 border border-gray-200 rounded-lg px-6 flex flex-col justify-center gap-y-5">
              <p className=" font-medium text-gray-600"> Total balance</p>
              <div className=" flex flex-col gap-y-3">
                <p className=" text-3xl tracking-wide flex items-center font-medium">
                  {accountBalance?.toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                    minimumFractionDigits: 2,
                  })}
                </p>
                <p className=" text-gray-500">
                  {updatedAt &&
                    new Date(updatedAt).toLocaleString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                </p>
              </div>
            </div>
            <div className=" w-1/2 border border-gray-200 rounded-lg px-6 flex flex-col justify-center gap-y-5">
              <div className=" flex flex-row justify-between">
                <p className=" font-medium text-gray-600"> Spending limit</p>
                <DropdownMenu>
                  <DropdownMenuTrigger className=" focus:outline-none">
                    <FaEllipsisVertical className=" text-gray-500" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className=" bg-white w-[40px]">
                    <DropdownMenuItem className=" cursor-pointer hover:bg-gray-100">
                      Daily limit
                    </DropdownMenuItem>
                    <DropdownMenuItem className=" cursor-pointer hover:bg-gray-100">
                      Monthly limit
                    </DropdownMenuItem>
                    <DropdownMenuItem className=" cursor-pointer hover:bg-gray-100">
                      Yearly limit
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className=" flex flex-col gap-y-3">
                <div className=" flex flex-col gap-y-1">
                  <Progress className=" h-[10px]" value={38} />
                  <p className=" text-gray-500">₦500.00 spent of ₦10,000.00</p>
                </div>
                <p className=" text-gray-500">Daily transaction limit</p>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-2/6">
          <div className=" px-3.5">
            <div className=" h-[190px] m-auto rounded-lg relative shadow-2xl overflow-hidden">
              <div className="w-full h-full absolute top-0 left-0">
                <div className="w-full h-full absolute top-0 left-0 transform transition-transform ">
                  <Image
                    className="w-full h-full object-cover rounded-lg"
                    alt="Card"
                    width={48}
                    height={48}
                    src={imageSrc}
                  />
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="bg-blue-700 bg-opacity-50 w-full h-full rounded-lg"></div>
                    <div className="absolute top-2 w-full px-3 text-white">
                      <div className="flex justify-end mt-2">
                        <VerzoLogoWhite />
                      </div>
                      <div>
                        <span className=" ml-2 flex ">
                          <CardChipIcon />
                        </span>
                        <p className=" tracking-[7px] mt-[15px]">{maskedPan}</p>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between gap-x-4 items-center">
                          <div className="">
                            <p className=" text-sm uppercase tracking-wide">
                              {cardHolder}
                            </p>
                          </div>
                          <div className="min-w-[50px]">
                            <Image
                              className="w-12 h-12"
                              alt="Logo"
                              width={48}
                              height={48}
                              src={"https://i.imgur.com/bbPHJVe.png"}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" min-h-[80px] gap-x-8 flex flex-row py-2 items-center px-1 mt-7 ">
              <div className="  gap-y-[6px] justify-center items-center flex flex-col">
                <span className=" px-4 py-3 rounded-lg border border-gray-200">
                  <PlusCircle className=" w-5 h-5 text-primary-blue" />
                </span>
                <p className=" text-sm ">Withdraw</p>
              </div>
              <div className="  gap-y-[6px] justify-center items-center flex flex-col">
                <span className=" px-4 py-3 rounded-lg border border-gray-200">
                  <Lock className=" w-5 h-5 text-primary-blue" />
                </span>
                <p className=" text-sm ">Freeze</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-col max-w-[600px]">
        <div className=" flex flex-row justify-between mb-2">
          <p className=" text-[22px] text-gray-800 max-w-[700px] pl-1 pb-1">
            Spending limit
          </p>
          {/* <AlertDialog
            open={openAddLimitModal}
            onOpenChange={() => setOpenAddLimitModal(true)}
          >
            <button
              onClick={() => setOpenAddLimitModal(true)}
              className=" bg-primary-blue text-white rounded-md px-4 py-2 flex items-center gap-x-2"
            >
              <Plus className=" w-[18px] h-[18px]" />
              Add limit
            </button>
            <AlertDialogContent className="sm:max-w-[430px] shadow-md">
              <form>
                <AlertDialogHeader>
                  <AlertDialogTitle className=" font-medium text-[20px]">
                    Create a Verzo Card
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <div className=" flex flex-col gap-5 pb-4 pt-2 mt-1 max-w-[400px]">
                  <div className=" flex flex-col gap-1 ">
                    <label htmlFor="amount" className="text-left ">
                      Spending limit (Amount)
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-3 flex items-center ">
                        &#8358;
                      </span>
                      <input
                        id="amount"
                        type="number"
                        value={spendingLimit.amount}
                        onChange={handleAmountChange}
                        required
                        className="w-full px-4 py-[10px] h-[42px] pl-7 border rounded-md"
                      />
                    </div>
                  </div>
                  <div className=" flex flex-col  gap-1 ">
                    <label htmlFor="interval" className="text-left">
                      Spending limit (Interval)
                    </label>
                    <Select
                      value={spendingLimit.interval}
                      onValueChange={handleIntervalChange}
                    >
                      <SelectTrigger className="border border-gray-200 bg-transparent rounded-md h-[42px] text-[15px] focus:outline-none px-3 py-[10px]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-white w-full z-[200] shadow-sm text-gray-800">
                        <SelectGroup>
                          <SelectItem
                            className="hover:bg-gray-100 cursor-pointer py-2 text-[15px]"
                            value={"daily"}
                          >
                            Daily
                          </SelectItem>
                          <SelectItem
                            className="hover:bg-gray-100 cursor-pointer py-2 text-[15px]"
                            value={"weekly"}
                          >
                            Weekly
                          </SelectItem>
                          <SelectItem
                            className="hover:bg-gray-100 cursor-pointer py-2 text-[15px]"
                            value={"monthly"}
                          >
                            Monthly
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <AlertDialogFooter className=" gap-x-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setOpenAddLimitModal(false)}
                    className=" border border-gray-200 px-5 hover:bg-gray-50 cursor-pointer py-2 text-[15px] rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    // onClick={handleCreateCardLimit}
                    className={` px-6 bg-primary-blue hover:bg-primary-verzobluehover text-white py-2 cursor-pointer text-[15px] rounded-md ${
                      loading ? " opacity-50" : ""
                    }`}
                    disabled={loading}
                  >
                    {loading ? "Loading" : "Submit"}
                  </button>
                </AlertDialogFooter>
              </form>
            </AlertDialogContent>
          </AlertDialog> */}
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                colSpan={2}
                className=" w-[200px] text-[12px] text-gray-600"
              >
                AMOUNT
              </TableHead>
              <TableHead
                colSpan={2}
                className="text-[12px] text-gray-600 w-[200px]"
              >
                INTERVAL
              </TableHead>
              <TableHead colSpan={2} className=" w-[200px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.length > 0 ? (
              <TableRow>
                <TableCell className=" w-full text-center italic">
                  You currently have no spending limit...
                </TableCell>
              </TableRow>
            ) : (
              <>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.invoice}>
                    <TableCell colSpan={2} className=" ">
                      {invoice.totalAmount}
                    </TableCell>
                    <TableCell colSpan={2} className="">
                      Daily
                    </TableCell>
                    <TableCell colSpan={2} className="text-right">
                      <div className="flex flex-row gap-x-5 border-l border-l-gray-200 pl-4 text-gray-600">
                        <Pen className=" w-4 h-4" />{" "}
                        <Trash2 className=" w-4 h-4" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ViewCard;
