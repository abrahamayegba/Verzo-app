"use client";
import CardList from "@/components/Card/CardList";
import Loader2 from "@/components/loading/Loader2";
import MainLoader from "@/components/loading/MainLoader";
import {
  SudoCardSpendingInterval,
  useCreateSudoCardMutation,
  useGetBusinessesByUserIdQuery,
  useGetCardsByBusinessQuery,
} from "@/src/generated/graphql";
import { PlusCircle, X } from "lucide-react";
import React, { useState } from "react";
import localStorage from "local-storage-fallback";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/app/hooks/use-toast";

type SpendingLimitType = {
  amount: number;
  interval: SudoCardSpendingInterval;
};

const Cards = () => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const { toast } = useToast();
  const [openAddCardModal, setOpenAddCardModal] = useState(false);
  const [assignedId, setAssignedId] = useState("");
  const getBusinessesByUserId = useGetBusinessesByUserIdQuery();
  const [spendingLimit, setSpendingLimit] = useState<SpendingLimitType>({
    amount: 0,
    interval: SudoCardSpendingInterval.Daily,
  });

  const [createSudoCardMutation, { loading }] = useCreateSudoCardMutation();
  const getCardsByBusiness = useGetCardsByBusinessQuery({
    variables: {
      businessId: businessId,
    },
  });

  const showFailureToast = (error: any) => {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: error?.message,
      duration: 3000,
    });
  };

  const showSuccessToast = () => {
    toast({
      title: "Successful!",
      description: "Your card has been successfully created",
      duration: 3500,
    });
  };

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

  const handleCreateCard = async () => {
    try {
      await createSudoCardMutation({
        variables: {
          businessId: businessId,
          assignedUserId: assignedId === "myId" ? null : assignedId,
          spendingLimits: spendingLimit,
        },
      });
      setOpenAddCardModal(false);
      showSuccessToast();
      setSpendingLimit({
        amount: 0,
        interval: SudoCardSpendingInterval.Daily,
      });
    } catch (error) {
      console.error(error);
      showFailureToast(error);
    }
  };

  if (getBusinessesByUserId.loading) {
    return <MainLoader />;
  }

  return (
    <>
      {getCardsByBusiness.loading ? (
        <Loader2 />
      ) : (
        <div>
          <div className=" px-[52px] pt-[47px] gap-y-[36px] flex flex-col">
            <div className=" flex flex-row justify-between items-center">
              <div className=" flex flex-col  gap-y-2">
                <p className=" text-primary-black font-medium text-3xl">
                  Cards
                </p>
                <p className=" text-primary-greytext">Add and manage cards</p>
              </div>
              <div className=" flex gap-x-[14px] max-h-[48px]">
                <AlertDialog
                  open={openAddCardModal}
                  onOpenChange={() => setOpenAddCardModal(true)}
                >
                  <button
                    onClick={() => setOpenAddCardModal(true)}
                    className=" px-6 py-3 rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white"
                  >
                    Add card
                    <PlusCircle className=" w-5 h-5" />
                  </button>
                  <AlertDialogContent className="w-[482px] shadow transition-all pt-6 pb-7 px-0">
                    <div className="flex w-[480px] flex-col items-center justify-center">
                      <div className="border-b border-b-gray-200 w-full pb-4">
                        <div className="flex flex-col gap-y-5 w-full px-6">
                          <div className="flex w-full justify-between">
                            <p className="font-medium text-xl text-gray-700">
                              Create your Verzo account
                            </p>
                            <button
                              onClick={() => setOpenAddCardModal(false)}
                              className="p-1.5 bg-blue-100 rounded-full"
                            >
                              <X className="w-[17px] h-[17px] text-gray-700 stroke-[2.5px]" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="w-full flex flex-col gap-y-3 px-6 mt-5">
                        <div className=" flex flex-col gap-1">
                          <label htmlFor="name" className=" text-gray-600">
                            Assigned user
                          </label>
                          <Select
                            value={assignedId}
                            onValueChange={setAssignedId}
                          >
                            <SelectTrigger className="border border-gray-200 bg-transparent rounded-md h-[42px] text-[15px] focus:outline-none px-3 py-[10px]">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent className="bg-white w-full z-[200] shadow-sm text-gray-800">
                              <SelectGroup>
                                <SelectItem
                                  className="hover:bg-gray-100 cursor-pointer py-2 text-[15px]"
                                  value={"myId"}
                                >
                                  Myself
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className=" flex flex-col gap-1 ">
                          <label htmlFor="amount" className="text-gray-600">
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
                          <label
                            htmlFor="interval"
                            className="text-left text-gray-600"
                          >
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
                        <div className="flex mt-4">
                          <button
                            type="button"
                            className={`px-7 py-[10px] w-full rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white`}
                          >
                            Create
                          </button>
                        </div>
                      </div>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            <CardList />
          </div>
        </div>
      )}
    </>
  );
};

export default Cards;
