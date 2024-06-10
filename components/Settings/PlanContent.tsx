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
} from "@/src/generated/graphql";
import localStorage from "local-storage-fallback";
import { useToast } from "@/app/hooks/use-toast";
import { useRouter } from "next/navigation";
import PaymentLoader from "../loading/Paymentloader";
import VerveIcon from "../ui/icons/VerveIcon";
import MastercardIcon from "../ui/icons/MastercardIcon";
import VisaIcon from "../ui/icons/VisaIcon";
import { Mail } from "lucide-react";

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

  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [selectedPlanName, setSelectedPlanName] = useState<string>("");
  const [mutationExecuted, setMutationExecuted] = useState(false);
  const [mutationInProgress, setMutationInProgress] = useState(false);
  const [openPlanSheet, setOpenPlanSheet] = useState(false);
  const [openCardSheet, setOpenCardSheet] = useState(false);

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

  const deleteCard = () => {
    openDeleteCardModal();
  };

  const setDefaultCard = () => {
    openDefaultCardModal();
  };

  const { data } = useGetCurrentSubscriptionByBusinessQuery({
    variables: {
      businessId: businessId,
    },
  });

  const planName = data?.getCurrentSubscriptionByBusiness?.plan?.planName;
  const dateSubscribed = new Date(
    data?.getCurrentSubscriptionByBusiness?.dateSubscribed
  );
  const validTo = new Date(data?.getCurrentSubscriptionByBusiness?.validTo);

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
      {planName == "Basic" && (
        <div className=" w-full flex flex-col border rounded-lg bg-white mt-[30px]">
          <div className=" flex flex-row justify-between px-6 mb-[-5px] py-3 w-full bg-gray-100 bg-opacity-80 items-center">
            <p className=" font-medium text-[22px] flex gap-x-3 items-center">
              {planName}{" "}
              <span className="inline-flex items-center mt-[2px] rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                {"Billed monthly"}
              </span>
            </p>
            <p>
              {subscriptionDaysLeft}{" "}
              {subscriptionDaysLeft === 1 ? "day" : "days"} remaining
            </p>
          </div>
          <div className=" flex flex-row bg-white px-3 mb-1 py-2 justify-between items-center">
            <div className=" flex flex-row">
              <span>
                {cardType?.trim().toLowerCase() === "verve" && <VerveIcon />}
                {cardType?.trim().toLowerCase() === "mastercard" && (
                  <MastercardIcon />
                )}
                {cardType?.trim().toLowerCase() === "visa" && <VisaIcon />}
              </span>
              <div className=" flex flex-col text-[15px]">
                <p>{"Visa ending in 2342"}</p>
                <p className=" font-light text-gray-600">
                  Plan expires {expiryDate}
                </p>
                <p className=" flex items-center mt-1.5 font-light text-gray-600 gap-x-1.5">
                  <Mail className=" w-4 h-4 text-gray-600" /> {"mail@mail.com"}
                </p>
              </div>
            </div>
            <div className=" pr-4">
              <button className=" bg-gray-100 border hover:bg-gray-200 border-gray-200 rounded-lg flex items-center justify-center py-[10px] px-4">
                Cancel subscription
              </button>
            </div>
          </div>
        </div>
      )}
      <div className=" flex w-full pt-[20px]">
        <div className=" bg-white min-h-[185px] flex flex-col rounded-b-[16px] w-full">
          <div className=" flex flex-row justify-between p-6 items-center border-b border-b-gray-100">
            <div className=" flex flex-col gap-y-[8px]">
              <p className=" text-primary-black gap-x-3 flex items-center">
                Plan
                {planName && (
                  <span className="inline-flex items-center mt-[2px] rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {planName}
                  </span>
                )}
              </p>
              <p className=" text-sm text-primary-greytext">
                Update your Verzo plan
              </p>
            </div>
            <button
              onClick={() => setOpenPlanSheet(true)}
              className=" px-6 py-3 rounded-[10px] flex text-sm text-primary-black gap-x-2 items-center justify-center border border-primary-border"
            >
              Update
            </button>
          </div>
          <div className=" flex flex-row justify-between p-6 items-center border-b border-b-gray-100">
            <div className=" flex flex-col gap-y-[6px]">
              <p className=" text-primary-black">Card details</p>
              <p className=" text-sm text-primary-greytext">
                Provide your card details
              </p>
            </div>
            <button
              onClick={() => setOpenCardSheet(true)}
              className=" px-6 py-3 rounded-[10px] text-sm text-primary-black flex gap-x-2 items-center justify-center border border-primary-border"
            >
              Update
            </button>
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
      <DefaultCardModal
        open={isDefaultCardModalOpen}
        openModal={openDefaultCardModal}
        onClose={closeDefaultCardModal}
      />
      <DeleteCard
        open={isDeleteCardModalOpen}
        openModal={openDeleteCardModal}
        onClose={closeDeleteCardModal}
      />
    </>
  );
};

export default PlanContent;
