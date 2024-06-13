"use client";
import React, { useEffect, useState } from "react";
import PlanSheet from "../sheets/settings/planandbilling/PlanSheet";
import ConfirmPlanModal from "../modals/settings/ConfirmPlan";
import useModal from "@/app/hooks/useModal";
import CardSheet from "../sheets/settings/planandbilling/CardSheet";
import DeleteCard from "../modals/settings/DeleteCardModal";
import DefaultCardModal from "../modals/settings/DefaultCardModal";
import {
  GetCurrentSubscriptionByBusinessDocument,
  useCreateSubscriptionNewCardBMutation,
  useGetCurrentSubscriptionByBusinessQuery,
  useGetUserCardsQuery,
} from "@/src/generated/graphql";
import localStorage from "local-storage-fallback";
import { useToast } from "@/app/hooks/use-toast";
import { useRouter } from "next/navigation";
import PaymentLoader from "../loading/Paymentloader";
import { Switch } from "@headlessui/react";
import EndSubscriptionModal from "../modals/settings/EndSubscriptionModal";

interface PlanProps {
  reference: string;
}

const PlanContent: React.FC<PlanProps> = ({ reference }) => {
  const { toast } = useToast();
  const router = useRouter();
  const {
    isOpen: isConfirmPlanModalOpen,
    openModal: openConfirmPlanModal,
    closeModal: closeConfirmPlanModal,
  } = useModal();

  const {
    isOpen: isEndSubscriptionModalOpen,
    openModal: openEndSubscriptionModal,
    closeModal: closeEndSubscrptionModal,
  } = useModal();

  const {
    isOpen: isDeleteCardModalOpen,
    openModal: openDeleteCardModal,
    closeModal: closeDeleteCardModal,
  } = useModal();

  const {
    isOpen: isDefaultCardModalOpen,
    openModal: openDefaultCardModal,
    closeModal: closeDefaultCardModal,
  } = useModal();

  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const [enabled, setEnabled] = useState(false);
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  const getUserCards = useGetUserCardsQuery({
    variables: {
      businessId: businessId,
    },
  });
  const userCards = getUserCards?.data?.getUserCards ?? [];
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [selectedPlanName, setSelectedPlanName] = useState<string>("");
  const [mutationExecuted, setMutationExecuted] = useState(false);
  const [mutationInProgress, setMutationInProgress] = useState(false);
  const [openPlanSheet, setOpenPlanSheet] = useState(false);
  const [openCardSheet, setOpenCardSheet] = useState(false);
  const [cardId, setCardId] = useState("");
  const showSuccessToast = () => {
    toast({
      title: "Successful!",
      description: "Your payment was successfully completed",
      duration: 3000,
    });
  };

  const showFailureToast = (error: any) => {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: error?.message,
      duration: 5000,
    });
  };

  const handleClosePlanSheet = () => {
    setOpenPlanSheet(false);
  };

  const handleCloseCardSheet = () => {
    setOpenCardSheet(false);
  };

  const confirmPlan = (selectedOption: { id: string; name: string }) => {
    setSelectedPlanId(selectedOption.id);
    setSelectedPlanName(selectedOption.name);
    openConfirmPlanModal();
  };
  const deleteCard = (cardId: string) => {
    openDeleteCardModal();
    setCardId(cardId);
  };

  const setDefaultCard = (cardId: string) => {
    openDefaultCardModal();
    setCardId(cardId);
  };

  const { data } = useGetCurrentSubscriptionByBusinessQuery({
    variables: {
      businessId: businessId,
    },
  });

  const planName = data?.getCurrentSubscriptionByBusiness?.plan?.planName;
  const planPrice = data?.getCurrentSubscriptionByBusiness?.plan?.currentPrice;
  const dateSubscribed = new Date(
    data?.getCurrentSubscriptionByBusiness?.dateSubscribed
  );
  const validTo = new Date(data?.getCurrentSubscriptionByBusiness?.validTo);
  const subscriptionId = data?.getCurrentSubscriptionByBusiness?.id!;

  const subscriptionDaysLeft = Math.ceil(
    (validTo.getTime() - dateSubscribed.getTime()) / (1000 * 60 * 60 * 24)
  );
  const [createSubscriptionNewCardBMutation, { loading }] =
    useCreateSubscriptionNewCardBMutation();

  let isMutationInProgress = false;
  const handlePaymentVerification = async (reference: string) => {
    try {
      setMutationInProgress(true);
      const storedPlanId = localStorage.getItem("planId")!;
      const { data, errors } = await createSubscriptionNewCardBMutation({
        variables: {
          reference: reference,
          businessId: businessId,
          currentPlanId: storedPlanId,
          tax: 0,
        },
        refetchQueries: [GetCurrentSubscriptionByBusinessDocument],
      });
      setMutationExecuted(true);
      setMutationInProgress(false);
      if (errors && errors.length > 0) {
        throw new Error(errors[0].message);
      }
      if (data) {
        showSuccessToast();
      } else {
        showFailureToast(errors);
      }
    } catch (error: any) {
      console.error("Error verifying payment:", error.message);
      showFailureToast(error);
    } finally {
      isMutationInProgress = false;
    }
  };
  const cardType = "Visa";

  const validToDate = new Date(data?.getCurrentSubscriptionByBusiness?.validTo);
  const expiryDate = validToDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    if (reference && !mutationExecuted && !mutationInProgress) {
      handlePaymentVerification(reference);
    }
    if (mutationExecuted && !mutationInProgress) {
      router.replace("/dashboard/settings");
    }
  }, [reference, mutationExecuted, mutationInProgress]);

  return (
    <>
      {loading && <PaymentLoader />}
      <div className=" w-full flex flex-col pt-[20px]">
        <p className=" text-sm text-primary-greytext px-6">Manage biling</p>
        <div className=" w-full flex flex-col bg-white rounded px-8 py-6 mt-3">
          <div className=" flex justify-between ">
            <div className=" flex gap-x-[120px] items-center">
              <div className=" flex flex-col">
                <div className=" font-light text-sm">Plan</div>
                <div className=" text-[22px] font-medium">{planName}</div>
              </div>
              <div className=" flex flex-col">
                <div className=" font-light text-sm">Payment</div>
                <div className=" text-[22px] font-medium">
                  {planPrice?.toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                    minimumFractionDigits: 0,
                  })}
                  <span className=" font-light text-[15px] ml-1">
                    per month
                  </span>
                </div>
              </div>
              <div className=" flex flex-col">
                <div className=" font-light text-sm">Validity</div>
                <div className=" text-[22px] font-medium">
                  {subscriptionDaysLeft}
                  <span className=" font-light text-[15px] ml-1">
                    {subscriptionDaysLeft > 1
                      ? "days remaining"
                      : "day remaining"}
                  </span>
                </div>
              </div>
            </div>
            <div className=" flex text-[15px] items-center gap-x-5">
              <button onClick={() => openEndSubscriptionModal()}>
                Cancel subscription
              </button>
              <button
                onClick={() => setOpenPlanSheet(true)}
                className=" text-primary-blue"
              >
                Upgrade
              </button>
            </div>
          </div>
          <div className=" flex flex-col mt-5">
            <div className=" flex gap-x-8 items-center">
              <p className=" text-lg text-gray-800">Enable auto renew</p>
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={classNames(
                  enabled ? "bg-primary-blue" : "bg-gray-200",
                  "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2"
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    enabled ? "translate-x-5" : "translate-x-0",
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  )}
                />
              </Switch>
            </div>
            <p></p>
          </div>
        </div>
      </div>
      <div className=" flex w-full pt-[20px]">
        <div className=" bg-white flex flex-col w-full">
          <div className=" flex flex-row justify-between p-6 items-center">
            <div className=" flex flex-col gap-y-[6px]">
              <p className=" text-primary-black">Card details</p>
              <p className=" text-sm text-primary-greytext">
                Provide your card details
              </p>
            </div>
            {userCards.length > 0 ? (
              <button
                onClick={() => setOpenCardSheet(true)}
                className=" px-6 py-3 rounded-[10px] text-sm text-primary-black flex gap-x-2 items-center justify-center border border-primary-border"
              >
                Update
              </button>
            ) : (
              <span className=" text-[15px]">No cards saved</span>
            )}
          </div>
        </div>
      </div>
      <PlanSheet
        open={openPlanSheet}
        onClose={handleClosePlanSheet}
        confirmPlan={confirmPlan}
      />
      <CardSheet
        open={openCardSheet}
        onClose={handleCloseCardSheet}
        deleteCard={deleteCard}
        saveAsDefault={setDefaultCard}
      />
      <ConfirmPlanModal
        open={isConfirmPlanModalOpen}
        openModal={openConfirmPlanModal}
        onClose={closeConfirmPlanModal}
        planId={selectedPlanId}
        planName={selectedPlanName}
      />
      <EndSubscriptionModal
        open={isEndSubscriptionModalOpen}
        openModal={openEndSubscriptionModal}
        onClose={closeEndSubscrptionModal}
        subscriptionId={subscriptionId}
      />
      <DefaultCardModal
        open={isDefaultCardModalOpen}
        openModal={openDefaultCardModal}
        onClose={closeDefaultCardModal}
        cardId={cardId}
      />
      <DeleteCard
        open={isDeleteCardModalOpen}
        openModal={openDeleteCardModal}
        onClose={closeDeleteCardModal}
        cardId={cardId}
      />
    </>
  );
};

export default PlanContent;
