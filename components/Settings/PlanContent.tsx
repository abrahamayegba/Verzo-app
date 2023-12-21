"use client";
import React, { useState } from "react";
import PlanSheet from "../sheets/settings/planandbilling/PlanSheet";
import ConfirmPlanModal from "../modals/settings/ConfirmPlan";
import useModal from "@/app/hooks/useModal";
import CardSheet from "../sheets/settings/planandbilling/CardSheet";
import DeleteCard from "../modals/settings/DeleteCardModal";
import DefaultCardModal from "../modals/settings/DefaultCardModal";

const PlanContent = () => {
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

  const handleClosePlanSheet = () => {
    setOpenPlanSheet(false);
  };

  const handleCloseCardSheet = () => {
    setOpenCardSheet(false);
  };

  const confirmPlan = () => {
    openConfirmPlanModal();
  };

  const deleteCard = () => {
    openDeleteCardModal();
  };

  const setDefaultCard = () => {
    openDefaultCardModal();
  };

  return (
    <>
      <div className=" flex flex-col w-full pt-[20px] gap-y-3">
        <p className=" text-sm text-primary-greytext px-6">
          Manage subscription
        </p>
        <div className=" bg-white min-h-[185px] flex flex-col rounded-b-[16px] w-full">
          <div className=" flex flex-row justify-between p-6 items-center border-b border-b-gray-100">
            <div className=" flex flex-col gap-y-[6px]">
              <p className=" text-primary-black">Plan</p>
              <p className=" text-sm text-primary-greytext">
                Choose a Verzo plan
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
