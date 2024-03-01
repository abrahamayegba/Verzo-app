"use client";
import React, { useEffect, useState } from "react";
import PlanSheet from "../sheets/settings/planandbilling/PlanSheet";
import ConfirmPlanModal from "../modals/settings/ConfirmPlan";
import useModal from "@/app/hooks/useModal";
import CardSheet from "../sheets/settings/planandbilling/CardSheet";
import DeleteCard from "../modals/settings/DeleteCardModal";
import DefaultCardModal from "../modals/settings/DefaultCardModal";
import {
  useCreateSubscriptionNewCardBMutation,
  useGetCurrentSubscriptionByBusinessQuery,
  useGetPlanByIdQuery,
  useGetSubscriptionByBusinessQuery,
} from "@/src/generated/graphql";
import localStorage from "local-storage-fallback";
import { useToast } from "@/app/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface PlanProps {
  reference: string;
}

const PlanContent: React.FC<PlanProps> = ({ reference }) => {
  const { toast } = useToast();
  const router = useRouter();
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [paymentReference, setPaymentReference] = useState("");
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

  const [openPlanSheet, setOpenPlanSheet] = useState(false);
  const [openCardSheet, setOpenCardSheet] = useState(false);
  const [openBillingModal, setOpenBillingModal] = useState(false);

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

  const confirmPlan = (selectedOption: string) => {
    setSelectedPlanId(selectedOption);
    openConfirmPlanModal();
  };

  const getPlanById = useGetPlanByIdQuery({
    variables: {
      planId: selectedPlanId,
    },
  });

  const selectedPlanName = getPlanById.data?.getPlanById?.planName!;

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

  const [createSubscriptionNewCardBMutation] =
    useCreateSubscriptionNewCardBMutation();

  const handlePaymentVerification = async (reference: string) => {
    try {
      const storedPlanId = localStorage.getItem("planId")!;
      const { data, errors } = await createSubscriptionNewCardBMutation({
        variables: {
          reference: reference,
          businessId: businessId,
          currentPlanId: storedPlanId,
          tax: 0,
        },
      });
      setPaymentReference("");
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
    }
  };
  // if (reference) {
  //   handlePaymentVerification(reference);
  //   router.replace("/dashboard/settings");
  //   return null;
  // }
  useEffect(() => {
    if (reference) {
      setPaymentReference(reference);
      handlePaymentVerification(paymentReference);
      setPaymentReference("");
      router.replace("/dashboard/settings");
    }
  });

  return (
    <>
      <div className=" flex flex-col w-full pt-[20px] gap-y-3">
        <p className=" text-sm text-primary-greytext px-6">
          Manage subscription
        </p>
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
            {/* <AlertDialog
              open={openBillingModal}
              onOpenChange={() => setOpenBillingModal(true)}
            >
              <button
                onClick={() => setOpenBillingModal(true)}
                className=" px-6 py-3 rounded-[10px] flex text-sm text-primary-black gap-x-2 items-center justify-center border border-primary-border"
              >
                Update
              </button>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    You are on the Beta testing plan!
                  </AlertDialogTitle>
                  <p className=" text-sm text-gray-700 leading-6">
                    Please be informed that our billing and payment
                    functionalities are currently disabled as part of our
                    ongoing beta testing phase. We appreciate your patience and
                    understanding as we work to enhance our platform.
                  </p>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <button
                    className=" border border-gray-200 px-5 hover:border-gray-500 py-2 text-[15px] rounded-md"
                    onClick={() => setOpenBillingModal(false)}
                  >
                    Close
                  </button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog> */}
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
              // onClick={() => setOpenBillingModal(true)}
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
