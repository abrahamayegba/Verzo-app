"use client";
import MainLoader from "@/components/loading/MainLoader";
import CardChipIcon from "@/components/ui/icons/CardChipIcon";
import CreatedAtIcon from "@/components/ui/icons/CreatedAtIcon";
import VerzoLogoWhite from "@/components/ui/icons/VerzoLogoWhite";
import { Progress } from "@/components/ui/progress";
import {
  useGenerateCardTokenMutation,
  useGetCardByIdQuery,
  useViewCardTransactionsQuery,
} from "@/src/generated/graphql";
import { Eye, MoveLeft, Copy, Loader } from "lucide-react";
import localStorage from "local-storage-fallback";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import VerveCardIcon from "@/components/ui/icons/VerveCardIcon";
import { isAuthenticated } from "@/lib/auth";
import { useToast } from "@/app/hooks/use-toast";

interface Transaction {
  id: string;
  amount: number;
  fee: number;
  vat: number;
  currency: string;
  type: string;
  merchantAmount: number;
  merchantCurrency: string;
  authorization: {
    authorizationFeeDetails: {
      amount: number;
      description: string;
    }[];
    requestsHistory: {
      amount: number;
      currency: string;
      approved: boolean;
      reason: string;
    }[];
  };
  createdAt: string; // Assuming date is in ISO format
  updatedAt: string;
}

declare global {
  interface Window {
    VGSShow: any;
  }
}

const ViewCard = () => {
  const cardParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const cardId = cardParams.get("cardId");
  const [isGenerated, setIsGenerated] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
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
  const [generateCardTokenMutation] = useGenerateCardTokenMutation();
  const showOtherFailureToast = (error: any) => {
    toast({
      variant: "destructive",
      description: error,
      duration: 3000,
    });
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://js.verygoodvault.com/vgs-show/1.5/ACcHSbXEBmKzyoAT5fzzyLTu.js";
    script.async = true;
    script.onload = () => {
      console.log("VGSShow script loaded.");
      setIsScriptLoaded(true);
    };
    script.onerror = () => {
      console.error("Error loading VGSShow script.");
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  const handleGenerateToken = async () => {
    try {
      console.log("Starting token generation...");
      setLoadingDetails(true);
      const response = await generateCardTokenMutation({
        variables: {
          businessId: businessId,
          cardId: cardId!,
        },
      });
      console.log("Token generation successful. Response:", response);
      const cardToken = response?.data?.generateCardToken!;
      console.log("Card token obtained:", cardToken);
      waitForVGSShow(cardToken);
      setLoadingDetails(false);
    } catch (error) {
      console.error("Error during token generation:", error);
      setLoadingDetails(false);
      showOtherFailureToast(
        "Error loading details, please refresh the page and retry"
      );
    }
  };
  // const waitForVGSShow = (cardToken: string) => {
  //   if (typeof window.VGSShow === "undefined") {
  //     // window.location.reload();
  //     console.log("vgs show not available");
  //   } else {
  //     console.log("VGSShow is available, proceeding with setup...");
  //     setupVGSShow(cardToken);
  //   }
  // };
  const waitForVGSShow = (cardToken: string) => {
    if (!isScriptLoaded) {
      console.log("VGSShow not available, retrying in 100ms...");
      setTimeout(() => waitForVGSShow(cardToken), 100);
    } else {
      console.log("VGSShow is available, proceeding with setup...");
      setupVGSShow(cardToken);
    }
  };
  const setupVGSShow = (cardToken: string) => {
    try {
      console.log("Starting VGSShow setup...");
      const show = window.VGSShow.create("tntpaxvvvet");
      console.log("VGSShow instance created.");
      const cvv2iframe = show.request({
        name: "cvv-text",
        method: "GET",
        path: `/cards/${sourceId}/secure-data/cvv2`,
        headers: {
          Authorization: `Bearer ${cardToken}`,
        },
        htmlWrapper: "text",
        jsonPathSelector: "data.cvv2",
      });
      console.log("CVV2 iframe request created.");
      cvv2iframe.render("#cvv2");
      console.log("CVV2 iframe rendered.");
      const cardNumberIframe = show.request({
        name: "pan-text",
        method: "GET",
        path: `/cards/${sourceId}/secure-data/number`,
        headers: {
          Authorization: `Bearer ${cardToken}`,
        },
        htmlWrapper: "text",
        jsonPathSelector: "data.number",
      });
      console.log("Card number iframe request created.");
      cardNumberIframe.render("#cardNumber");
      console.log("Card number iframe rendered.");
      const pinIframe = show.request({
        name: "pin-text",
        method: "GET",
        path: `/cards/${sourceId}/secure-data/defaultPin`,
        headers: {
          Authorization: `Bearer ${cardToken}`,
        },
        htmlWrapper: "text",
        jsonPathSelector: "data.defaultPin",
      });
      console.log("PIN iframe request created.");
      pinIframe.render("#pin");
      console.log("PIN iframe rendered.");
      console.log("VGSShow setup complete.");
      setIsGenerated(true);
    } catch (error) {
      console.error("Error during VGSShow setup:", error);
    }
  };
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
  const transactions = useMemo(() => {
    return getTransactions.data?.viewCardTransactions ?? [];
  }, [getTransactions.data?.viewCardTransactions]);
  const accountNumber = cardData?.account?.accountNumber;
  const cardHolder = cardData?.user?.fullname;
  const sourceId = cardData?.sourceId;
  const maskedPan = cardData?.maskedPan;
  const expiryDate = cardData?.expiryDate;
  const spendLimit = cardData?.spendingLimits!;
  const accountBalance = cardData?.account?.accountBalance;
  const updatedAt = cardData?.updatedAt;
  const cardType = cardData?.type;
  const createdAt = cardData?.createdAt;
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
  const calculateSpentAmount = (
    transactions: Transaction[],
    interval: string
  ): number => {
    const now = new Date();
    const filteredTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.createdAt);

      if (interval === "daily") {
        return (
          transactionDate.getDate() === now.getDate() &&
          transactionDate.getMonth() === now.getMonth() &&
          transactionDate.getFullYear() === now.getFullYear()
        );
      }

      if (interval === "weekly") {
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return transactionDate >= weekStart && transactionDate <= weekEnd;
      }

      if (interval === "monthly") {
        return (
          transactionDate.getMonth() === now.getMonth() &&
          transactionDate.getFullYear() === now.getFullYear()
        );
      }

      return false;
    });
    return filteredTransactions.reduce(
      (sum, transaction) => sum + Math.abs(transaction.merchantAmount),
      0
    );
  };
  const [spentAmount, setSpentAmount] = useState<number>(0);
  useEffect(() => {
    if (spendLimit?.length > 0) {
      const currentLimit = spendLimit[0]; // Assuming one limit for simplicity
      const validTransactions = transactions.filter(
        (transaction): transaction is Transaction => transaction !== null
      );
      const totalSpent = calculateSpentAmount(
        validTransactions,
        currentLimit?.interval!
      );
      setSpentAmount(totalSpent);
    }
  }, [spendLimit, transactions]);
  const currentLimit = spendLimit?.length > 0 ? spendLimit[0] : null;
  const queriesLoading = loading || getTransactions.loading;
  return (
    <>
      {queriesLoading && <MainLoader />}
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
              <div className=" w-[45%] flex flex-col gap-y-2 border-r-2 justify-center h-full border-r-gray-200">
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
                <p className=" text-sm font-medium text-gray-600">
                  Expiry date
                </p>
                <p className=" text-2xl tracking-wide flex items-center font-medium">
                  {expiryDate}
                </p>
              </div>
              <div className=" flex flex-col w-[20%] gap-y-2 border-r-2 px-4 justify-center h-full border-r-gray-200">
                <p className=" text-sm font-medium text-gray-600">CVV</p>
                <div
                  id="cvv2"
                  className={` h-[20px] w-[20px] relative ${
                    isGenerated ? " " : " "
                  }`}
                ></div>
                {!isGenerated && (
                  <div className=" absolute mb-[-40px]">***</div>
                )}
              </div>
              <div className=" flex flex-col w-[15%] gap-y-2 pl-4 justify-center h-full ">
                <p className=" text-sm font-medium text-gray-600">PIN</p>
                <div
                  id="pin"
                  className={` h-[20px] w-[20px] relative ${
                    isGenerated ? " " : " "
                  }`}
                ></div>
                {!isGenerated && (
                  <div className=" absolute mb-[-40px]">***</div>
                )}
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
                </div>
                <div className=" flex flex-col gap-y-3">
                  <div className=" flex flex-col gap-y-1">
                    <Progress
                      className="h-[10px]"
                      value={
                        (spentAmount /
                          (currentLimit ? currentLimit.amount : 1)) *
                        100
                      }
                    />
                    <p className="text-gray-500">
                      ₦
                      {(spentAmount / 100).toLocaleString("en-NG", {
                        maximumFractionDigits: 2,
                      })}{" "}
                      spent of ₦
                      {(currentLimit
                        ? currentLimit.amount / 100
                        : 0
                      ).toLocaleString("en-NG", { maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <p className="text-gray-500">
                    <span className="capitalize">
                      {currentLimit ? currentLimit.interval : ""}
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
                          <div
                            id="cardNumber"
                            className={` className=" tracking-[7px] mt-[15px] relative h-[20px] text-white" ${
                              isGenerated ? " " : " "
                            }`}
                          ></div>
                          {!isGenerated && (
                            <p className=" tracking-[7px] h-[20px] absolute mt-[-10px]">
                              {maskedPan}
                            </p>
                          )}
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
                <button
                  disabled={isGenerated || loadingDetails}
                  onClick={handleGenerateToken}
                  className="  gap-y-[6px] disabled:opacity-50 disabled:cursor-not-allowed justify-center items-center flex flex-col"
                >
                  <span className=" px-4 py-3 rounded-lg border border-gray-200">
                    <Eye className=" w-5 h-5 text-primary-blue" />
                  </span>
                  <p className="text-sm">
                    {loadingDetails ? "loading" : !isGenerated ? "Show" : ""}
                  </p>
                </button>
                {loadingDetails && (
                  <Loader className=" animate-spin w-6 h-6 mt-[-20px] ml-[-20px]" />
                )}
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
                  {transactions
                    ?.slice(0)
                    .reverse()
                    .map((transaction) => (
                      <tr key={transaction?.id}>
                        <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                          {(transaction?.amount / 100)?.toLocaleString(
                            "en-NG",
                            {
                              style: "currency",
                              currency: "NGN",
                            }
                          )}
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
              {spendLimit?.length === 0 ? (
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
                  {spendLimit
                    ?.slice(0)
                    .reverse()
                    .map((limit) => (
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
                          {new Date(limit?.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long",
                              day: "2-digit",
                              month: "long",
                            }
                          )}
                          ,{" "}
                          {new Date(limit?.createdAt).toLocaleTimeString(
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
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ViewCard;
