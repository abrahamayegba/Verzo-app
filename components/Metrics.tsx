import React, { useState } from "react";
import MetricsCard1 from "./MetricsCard1";
import MetricsCard2 from "./MetricsCard2";
import Payables from "./PayablesCard";
import Receivables from "./ReceivablesCard";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  History,
  PlusCircle,
  X,
} from "lucide-react";
import CardChipIcon from "./ui/icons/CardChipIcon";
import VerzoLogoWhite from "./ui/icons/VerzoLogoWhite";
import {
  BankCardSpendingInterval,
  CreateSudoCardDocument,
  GetCardsByBusinessDocument,
  useCreateSudoCardMutation,
  useGetCardsByBusinessQuery,
  useGetUsersByBusinessQuery,
  useViewBusinessAccountQuery,
} from "@/src/generated/graphql";
import Link from "next/link";
import { AlertDialog, AlertDialogContent } from "./ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Image from "next/image";
import { useToast } from "@/app/hooks/use-toast";
import VerveCardIcon from "./ui/icons/VerveCardIcon";
import CreateVerzoAccount from "./modals/CreateVerzoAccountModal";
import useModal from "@/app/hooks/useModal";

interface MetricsProps {
  filter: string;
}

type SpendingLimitType = {
  amount: number;
  interval: BankCardSpendingInterval;
};

const Metrics: React.FC<MetricsProps> = ({ filter }) => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const { toast } = useToast();
  const {
    isOpen: isCreateVerzoAccountModalOpen,
    openModal: openVerzoAccountModal,
    closeModal: closeVerzoAccountModal,
  } = useModal();
  const [openAddCardModal, setOpenAddCardModal] = useState(false);
  const [assignedId, setAssignedId] = useState("");
  const [spendingLimit, setSpendingLimit] = useState<SpendingLimitType>({
    amount: 0,
    interval: BankCardSpendingInterval.Daily,
  });
  const businessId = storedBusinessId[0] || "";
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const { data } = useGetCardsByBusinessQuery({
    variables: {
      businessId: businessId,
    },
  });

  const viewBusinessAccounts = useViewBusinessAccountQuery({
    variables: {
      businessId: businessId,
    },
  });

  const doesUserHaveVerzoAccount =
    viewBusinessAccounts?.data?.viewBusinessAccount?.id;

  const getUsersBybusiness = useGetUsersByBusinessQuery({
    variables: {
      businessId: businessId,
    },
  });
  const [createSudoCardMutation, { loading }] = useCreateSudoCardMutation();
  const users = getUsersBybusiness?.data?.getUsersByBusiness;

  const imageSrc =
    "https://verzo.fra1.cdn.digitaloceanspaces.com/undefined%20-%20Imgur.png";

  const cards = data?.getCardsByBusiness ?? [];

  const goToPreviousCard = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === 0 ? cards?.length! - 1 : prevIndex - 1
    );
  };

  const goToNextCard = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === cards?.length! - 1 ? 0 : prevIndex + 1
    );
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
      interval: value as BankCardSpendingInterval, // Cast the value to SudoCardSpendingInterval enum
    }));
  };

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

  const handleCreateCard = async () => {
    try {
      await createSudoCardMutation({
        variables: {
          businessId: businessId,
          assignedUserId: assignedId,
          spendingLimits: spendingLimit,
        },
        refetchQueries: [CreateSudoCardDocument, GetCardsByBusinessDocument],
      });
      setOpenAddCardModal(false);
      showSuccessToast();
      setSpendingLimit({
        amount: 0,
        interval: BankCardSpendingInterval.Daily,
      });
      setAssignedId("");
    } catch (error) {
      console.error(error);
      setOpenAddCardModal(false);
      showFailureToast(error);
    }
  };

  const handleCreateCardClick = () => {
    if (doesUserHaveVerzoAccount) {
      setOpenAddCardModal(true);
    } else {
      openVerzoAccountModal();
    }
  };

  return (
    <>
      <div className=" flex flex-row gap-x-6">
        <div className=" flex-col flex gap-y-6 w-[72%]">
          <div className=" w-full flex min-h-[198px] rounded-[16px] bg-white border border-[#f4f4f4]">
            <div className=" w-1/2 border-r-[0.5px] px-5 py-6 flex flex-col justify-start gap-y-[20px]">
              <MetricsCard1 filter={filter} />
            </div>
            <div className=" w-1/2 px-5 py-6 flex flex-col justify-start gap-y-[20px]">
              <MetricsCard2 filter={filter} />
            </div>
            {/* <div className=" w-1/3 px-5 py-6 flex flex-col justify-start gap-y-[20px]">
              <MetricsCard3 filter={filter} />
            </div> */}
          </div>
          <div className=" flex flex-col gap-y-3">
            <div className=" w-full flex min-h-[148px] rounded-[16px] bg-white border border-[#f4f4f4]">
              {/* <div className=" w-1/3 border-r-[0.5px] px-5 py-6 flex flex-col justify-start gap-y-[20px]">
                <AccountBalanceCard filter={filter} />
              </div> */}
              <div className=" w-1/2 border-r-[0.5px] px-5 py-6 flex flex-col justify-start gap-y-[20px]">
                <Receivables filter={filter} />
              </div>
              <div className=" w-1/2 px-5 py-6 flex flex-col justify-start gap-y-[20px]">
                <Payables filter={filter} />
              </div>
            </div>
          </div>
        </div>
        {cards?.length > 0 ? (
          <div className=" w-[28%] min-w-[330px] flex flex-col gap-y-6 min-h-[417px] rounded-[16px] bg-white border border-[#f4f4f4]">
            <div className=" px-3.5 pt-5">
              <div className="flex flex-row justify-between">
                <p className="text-[20px] tracking-[-0.3px]">My Cards</p>
                <div className="flex flex-row gap-x-3 items-center">
                  <button
                    className=" disabled:opacity-50"
                    disabled={cards?.length === 1}
                    onClick={goToPreviousCard}
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  <button
                    className=" disabled:opacity-50"
                    disabled={cards?.length === 1}
                    onClick={goToNextCard}
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>
              <div className="mt-5 h-[180px] m-auto max-w-[310px] rounded-lg relative shadow-2xl overflow-hidden">
                <div className="w-full h-full absolute top-0 left-0">
                  {cards?.map((card, index) => (
                    <div
                      key={card?.id}
                      className={`w-full h-full absolute top-0 left-0 transform transition-transform ${
                        index === currentCardIndex ? "" : "hidden"
                      }`}
                    >
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
                            <p className=" tracking-[5px] mt-[10px]">
                              {card?.maskedPan}
                            </p>
                          </div>
                          <div className="mt-1">
                            <div className="flex justify-between items-center">
                              <div className="">
                                <p className=" text-sm uppercase">
                                  {card?.user?.fullname}
                                </p>
                              </div>
                              <VerveCardIcon />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-3">
              <div className=" border-t border-t-gray-200 px-1">
                <p className=" font-medium mt-3 text-[15px] ml-1">
                  Quick actions
                </p>
                {cards?.map((card) => (
                  <div
                    key={card?.id}
                    className=" min-h-[80px] flex flex-row py-2 justify-between px-2 mt-1"
                  >
                    <Link
                      href={`/card/viewcard?cardId=${card?.id}`}
                      className="  items-start gap-y-[6px] justify-center w-1/3 flex flex-col"
                    >
                      <span className=" p-3 rounded-[10px] border border-gray-200 hover:bg-blue-50">
                        <Eye className=" w-5 h-5 text-primary-blue" />
                      </span>
                      <p className=" text-sm ml-1">View</p>
                    </Link>
                    <AlertDialog
                      open={openAddCardModal}
                      onOpenChange={() => setOpenAddCardModal(true)}
                    >
                      <button
                        onClick={handleCreateCardClick}
                        className="  items-start gap-y-[6px] justify-center w-1/3 flex flex-col"
                      >
                        <span className=" p-3 rounded-[10px] border border-gray-200 hover:bg-blue-50">
                          <Download className=" w-5 h-5 text-primary-blue" />
                        </span>
                        <p className=" text-sm">Request</p>
                      </button>
                      <AlertDialogContent className="w-[482px] shadow transition-all pt-6 pb-7 px-0">
                        <div className="flex w-[480px] flex-col items-center justify-center">
                          <div className="border-b border-b-gray-200 w-full pb-3">
                            <div className="flex flex-col gap-y-5 w-full px-6">
                              <div className="flex w-full justify-between">
                                <p className="font-medium text-xl text-gray-700">
                                  Create a Verzo card
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
                          <div className="w-full flex flex-col gap-y-3 px-6 mt-4">
                            <div className=" flex flex-col gap-1">
                              <label htmlFor="name" className=" text-gray-600">
                                Assigned user
                              </label>
                              <Select
                                value={assignedId}
                                onValueChange={setAssignedId}
                              >
                                <SelectTrigger
                                  className={`border border-gray-200"
                              } bg-transparent rounded-md h-[42px] text-[15px] focus:outline-none px-3 py-[10px]`}
                                >
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent className="bg-white w-full z-[200] shadow-sm text-gray-800">
                                  <SelectGroup>
                                    {users?.map((user) => (
                                      <SelectItem
                                        key={user?.id}
                                        className="hover:bg-gray-100 cursor-pointer py-2 text-[15px]"
                                        value={user?.id!}
                                      >
                                        {user?.fullname}
                                      </SelectItem>
                                    ))}
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
                                onClick={handleCreateCard}
                                type="button"
                                disabled={loading || !assignedId}
                                className={`px-7 py-[10px] w-full disabled:cursor-not-allowed disabled:opacity-50 rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white ${
                                  loading ? "opacity-50" : ""
                                }`}
                              >
                                {loading ? "Loading" : "Create"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Link
                      href={`/dashboard/transactions`}
                      className="  items-start gap-y-[6px] justify-center w-1/3 flex flex-col "
                    >
                      <span className=" p-3 rounded-[10px] border border-gray-200 hover:bg-blue-50">
                        <History className=" w-5 h-5 text-primary-blue" />
                      </span>
                      <p className=" text-sm ">History</p>
                    </Link>
                    <button
                      disabled
                      className=" items-start gap-y-[6px] disabled:opacity-50 disabled:cursor-not-allowed justify-center w-1/3 flex flex-col"
                    >
                      <span className=" p-3 rounded-[10px] border border-gray-200">
                        <PlusCircle className=" w-5 h-5 text-primary-blue" />
                      </span>
                      <p className=" text-sm ">Top up</p>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className=" w-[28%] min-w-[330px] flex flex-col min-h-[417px] rounded-[16px] bg-white border border-[#f4f4f4]">
            <div className=" px-4 pt-5">
              <div className="mt-1 h-[200px] m-auto rounded-lg relative shadow-2xl overflow-hidden">
                <div className="w-full h-full absolute top-0 left-0">
                  <div className="w-full h-full absolute top-0 left-0 transform transition-transform">
                    <div className="absolute top-0 left-0 w-full h-full">
                      <div className="relative w-full h-full rounded-lg">
                        <svg
                          className="absolute inset-0 w-full h-full"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                        >
                          <defs>
                            <pattern
                              id="circles"
                              width="20"
                              height="20"
                              patternUnits="userSpaceOnUse"
                            >
                              <circle cx="10" cy="10" r="6" fill="white" />
                            </pattern>
                          </defs>
                          <rect
                            className="fill-current text-gray-400 bg-opacity-50"
                            width="100%"
                            height="100%"
                            fill="url(#circles)"
                          />
                        </svg>
                        <div className="absolute top-2 w-full px-3 text-white">
                          <div className="flex justify-end mt-3">
                            <VerzoLogoWhite />
                          </div>
                          <div>
                            <span className="ml-2 flex">
                              <CardChipIcon />
                            </span>
                            <p className="tracking-[5px] mt-[10px] text-[24px]">
                              **** **** **** ****
                            </p>
                          </div>
                          <div className="mt-1">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-sm uppercase">CARD HOLDER</p>
                              </div>
                              <VerveCardIcon />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-4">
                <p className="text-[18px] tracking-[-0.3px] text-center">
                  You have no cards
                </p>
                <p className=" text-[14px] mt-1 text-gray-600 px-2">
                  Create a Verzo card to unlock the full features, such as
                  making payments and transaction linking.
                </p>
              </div>
            </div>
            <div className="px-6 mt-3 ">
              <AlertDialog
                open={openAddCardModal}
                onOpenChange={() => setOpenAddCardModal(true)}
              >
                <button
                  onClick={handleCreateCardClick}
                  className=" w-full bg-primary-blue text-white py-3 px-5 rounded-md"
                >
                  Add new card
                </button>
                <AlertDialogContent className="w-[482px] shadow transition-all pt-6 pb-7 px-0">
                  <div className="flex w-[480px] flex-col items-center justify-center">
                    <div className="border-b border-b-gray-200 w-full pb-3">
                      <div className="flex flex-col gap-y-5 w-full px-6">
                        <div className="flex w-full justify-between">
                          <p className="font-medium text-xl text-gray-700">
                            Create a Verzo card
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
                    <div className="w-full flex flex-col gap-y-3 px-6 mt-4">
                      <div className=" flex flex-col gap-1">
                        <label htmlFor="name" className=" text-gray-600">
                          Assigned user
                        </label>
                        <Select
                          value={assignedId}
                          onValueChange={setAssignedId}
                        >
                          <SelectTrigger
                            className={`border border-gray-200"
                              } bg-transparent rounded-md h-[42px] text-[15px] focus:outline-none px-3 py-[10px]`}
                          >
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="bg-white w-full z-[200] shadow-sm text-gray-800">
                            <SelectGroup>
                              {users?.map((user) => (
                                <SelectItem
                                  key={user?.id}
                                  className="hover:bg-gray-100 cursor-pointer py-2 text-[15px]"
                                  value={user?.id!}
                                >
                                  {user?.fullname}
                                </SelectItem>
                              ))}
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
                          onClick={handleCreateCard}
                          type="button"
                          disabled={loading || !assignedId}
                          className={`px-7 py-[10px] w-full disabled:cursor-not-allowed disabled:opacity-50 rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white ${
                            loading ? "opacity-50" : ""
                          }`}
                        >
                          {loading ? "Loading" : "Create"}
                        </button>
                      </div>
                    </div>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        )}
      </div>
      <CreateVerzoAccount
        open={isCreateVerzoAccountModalOpen}
        onClose={closeVerzoAccountModal}
        openModal={openVerzoAccountModal}
      />
    </>
  );
};

export default Metrics;
