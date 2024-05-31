"use client";
import MainLoader from "@/components/loading/MainLoader";
import CardChipIcon from "@/components/ui/icons/CardChipIcon";
import CreatedAtIcon from "@/components/ui/icons/CreatedAtIcon";
import VerzoLogoWhite from "@/components/ui/icons/VerzoLogoWhite";
import { Progress } from "@/components/ui/progress";
import {
  useGetCardByIdQuery,
  useViewCardTransactionsQuery,
} from "@/src/generated/graphql";
import { Eye, MoveLeft, PlusCircle, Copy, EyeOff, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import VerveCardIcon from "@/components/ui/icons/VerveCardIcon";
import { isAuthenticated } from "@/lib/auth";

const ViewCard = () => {
  const cardParams = useSearchParams();
  const router = useRouter();
  const cardId = cardParams.get("cardId");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const CVC = "333";
  const { data, loading } = useGetCardByIdQuery({
    variables: {
      cardId: cardId!,
    },
  });
  const getTransactions = useViewCardTransactionsQuery({
    variables: {
      cardId: cardId!,
    },
  });

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      if (!authenticated) {
        router.push("/auth/signin");
      }
    };
    checkAuth();
  }, [router]);

  const imageSrc =
    "https://verzo.fra1.cdn.digitaloceanspaces.com/undefined%20-%20Imgur.png";
  const cardData = data?.getCardById;
  const transactions = getTransactions.data?.viewCardTransactions ?? [];
  const accountNumber = cardData?.account?.accountNumber;
  const cardHolder = cardData?.user?.fullname;
  const maskedPan = cardData?.maskedPan;
  const expiryDate = cardData?.expiryDate;
  const spendLimit = cardData?.spendingLimits!;
  const accountBalance = cardData?.account?.accountBalance;
  const updatedAt = cardData?.updatedAt;
  const cardType = cardData?.type;
  const createdAt = cardData?.createdAt;
  const status = cardData?.status;
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(accountNumber!)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((error) => {
        console.error("Failed to copy:", error);
      });
  };

  if (loading || getTransactions.loading) {
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
                <Copy
                  onClick={handleCopyClick}
                  className="ml-5 w-5 h-5 text-gray-400 cursor-pointer"
                />
                {isCopied && (
                  <span className="ml-2 text-[12px] text-gray-500">
                    Copied!
                  </span>
                )}
              </p>
            </div>
            <div className=" flex flex-col w-[20%] px gap-y-2 border-r-2 px-4 justify-center h-full border-r-gray-200">
              <p className=" text-sm font-medium text-gray-600">Expiry date</p>
              <p className=" text-2xl tracking-wide flex items-center font-medium">
                {expiryDate}
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
                  {(accountBalance / 100)?.toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                    minimumFractionDigits: 2,
                  })}
                </p>
                <p className=" text-gray-500">
                  {updatedAt &&
                    new Date(updatedAt).toLocaleString("en-US", {
                      weekday: "long",
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
                {/* <DropdownMenu>
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
                </DropdownMenu> */}
              </div>
              <div className=" flex flex-col gap-y-3">
                <div className=" flex flex-col gap-y-1">
                  <Progress className=" h-[10px]" value={1} />
                  <p className=" text-gray-500">
                    ₦0 spent of ₦
                    {spendLimit?.map((limit) => limit?.amount / 100)}
                  </p>
                </div>
                <p className=" text-gray-500">
                  <span className=" capitalize">
                    {spendLimit.map((limit) => limit?.interval)}
                  </span>{" "}
                  transaction limit
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-2/6">
          <div className=" px-3.5">
            <div className=" h-[190px] max-w-[320px] rounded-lg relative shadow-2xl overflow-hidden">
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
                            <VerveCardIcon />
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
            Card transactions
          </p>
        </div>
        <table className=" text-left">
          <thead>
            <tr>
              <th
                scope="col"
                className="hidden font-medium uppercase text-gray-600 px-3 w-[500px] py-3.5 text-left text-[12px] sm:table-cell"
              >
                Amount
              </th>
              <th
                scope="col"
                className="hidden font-medium uppercase text-gray-600 px-3 w-[200px] py-3.5 text-left text-[12px] sm:table-cell"
              >
                Type
              </th>
              <th
                scope="col"
                className="hidden font-medium uppercase text-gray-600 px-3 w-[500px] py-3.5 text-end text-[12px] sm:table-cell"
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              <>
                {transactions?.map((transaction) => (
                  <tr key={transaction?.id}>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                      {(transaction?.amount / 100)?.toLocaleString("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      })}
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
                      {transaction?.type}
                    </td>
                    <td className="hidden px-1 py-4 text-sm text-end text-gray-500 md:table-cell">
                      {new Date(transaction?.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "long",
                          day: "2-digit",
                          month: "long",
                        }
                      )}
                      ,{" "}
                      {new Date(transaction?.createdAt).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="hidden text-center px-3 py-4 text-sm text-gray-500 sm:table-cell"
                >
                  You currently have no transactions on this card...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className=" flex flex-col max-w-[600px]">
        <div className=" flex flex-row justify-between mb-2">
          <p className=" text-[22px] text-gray-800 max-w-[700px] pl-1 pb-1">
            Spending limit
          </p>
        </div>
        <table className=" text-left">
          <thead>
            <tr>
              <th
                scope="col"
                className="hidden font-medium uppercase text-gray-800 px-3 w-[500px] py-3.5 text-left text-[12px] sm:table-cell"
              >
                Amount
              </th>
              <th
                scope="col"
                className="hidden font-medium uppercase text-gray-800 px-3 w-[200px] py-3.5 text-left text-[12px] sm:table-cell"
              >
                Interval
              </th>
              <th
                scope="col"
                className="hidden font-medium uppercase text-gray-800 px-3 w-[400px] py-3.5 text-end text-[12px] sm:table-cell"
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {spendLimit.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="hidden text-center px-3 py-4 text-sm text-gray-500 sm:table-cell"
                >
                  You currently have no spending limits on this card...
                </td>
              </tr>
            ) : (
              <>
                {spendLimit?.map((limit) => (
                  <tr key={limit?.id}>
                    <td className="hidden px-3 py-2 text-sm text-gray-800 sm:table-cell">
                      {(limit?.amount / 100)?.toLocaleString("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      })}
                    </td>
                    <td className="hidden px-3 capitalize py-2 text-sm text-gray-800 md:table-cell">
                      {limit?.interval}
                    </td>
                    <td className="hidden px-1 py-4 text-sm text-end text-gray-500 md:table-cell">
                      {new Date(limit?.createdAt).toLocaleDateString("en-US", {
                        weekday: "long",
                        day: "2-digit",
                        month: "long",
                      })}
                      ,{" "}
                      {new Date(limit?.createdAt).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewCard;
