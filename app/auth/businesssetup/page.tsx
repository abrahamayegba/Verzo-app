"use client";
import React, { useState } from "react";
import AuthSidebar from "@/components/AuthSidebar";
import WhiteBankIcon from "@/components/ui/icons/WhiteBankIcon";
import WhiteMoneyIcon from "@/components/ui/icons/WhiteMoneyIcon";
import CreateBusinessSheet from "@/components/sheets/auth/BusinessProfileSheet";
import useModal from "@/app/hooks/useModal";
import BillingSheet from "@/components/sheets/auth/BillingSheet";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { useGetBusinessesByUserIdQuery } from "@/src/generated/graphql";

const BusinessSetup = () => {
  const {
    isOpen: isConfirmPlanModalOpen,
    openModal: openConfirmPlanModal,
    closeModal: closeConfirmPlanModal,
  } = useModal();

  const [openBusinessSheet, setOpenBusinessSheet] = useState(false);
  const [openBillingSheet, setOpenBillingSheet] = useState(false);
  const getBusinessesByUserId = useGetBusinessesByUserIdQuery();
  const handleCloseBusinessSheet = () => {
    setOpenBusinessSheet(false);
  };
  const handleCloseBillingSheet = () => {
    setOpenBillingSheet(false);
  };
  const confirmBilling = () => {
    openConfirmPlanModal();
  };
  const businessNames =
    getBusinessesByUserId.data?.getBusinessesByUserId?.businesses?.map(
      (business) => business?.businessName
    ) || [];
  const businessPresent = businessNames.length > 0;

  return (
    <>
      <div className=" w-full flex flex-row h-screen">
        <AuthSidebar />
        <div className=" flex-1 ml-[34%] flex-col h-full gap-y-[60px] flex mt-[-20px] justify-center pl-[140px] pr-[60px]">
          <div className=" flex flex-col ">
            {businessPresent && (
              <Link href="/dashboard">
                <button className=" flex gap-x-2 mb-3 items-center text-gray-700">
                  <MoveRight className=" w-5 h-5 text-primary-greytext" /> Go to
                  Dashboard
                </button>
              </Link>
            )}
            <p className=" text-primary-black text-[32px]">Business profile</p>
            <p className=" text-primary-greytext text-lg">
              Complete these steps to get your business up and running
            </p>
          </div>
          <div className=" flex gap-x-[40px]">
            <div className=" w-1/2 flex flex-col rounded-[10px] max-w-[270px]">
              <div
                className={` h-[84px] rounded-t-[10px] px-6 flex items-center ${
                  businessPresent ? " bg-green-500" : "purplegradient"
                }`}
              >
                <div className=" flex">
                  <span className=" border border-white rounded-full p-3">
                    <WhiteBankIcon />
                  </span>
                </div>
              </div>
              <div className=" flex flex-col gap-y-2 py-6 border-x min-h-[217px] border-gray-200 border-b rounded-b-[10px] px-[25px]">
                <p className=" text-primary-black text-lg">Business profile</p>
                <p className=" text-primary-greytext font-light">
                  Provide your business details and the category
                </p>
                <div className=" flex mt-auto">
                  {businessPresent ? (
                    <Link href="/dashboard">
                      <button className="rounded-[10px] mt-[10px] text-primary-black flex justify-center px-10 py-[8px] items-center border border-primary-border">
                        Finish
                      </button>
                    </Link>
                  ) : (
                    <button
                      onClick={() => setOpenBusinessSheet(true)}
                      className="rounded-[10px] mt-[10px] text-primary-black flex justify-center px-10 py-[8px] items-center border border-primary-border"
                    >
                      Set up
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className=" w-1/2 flex flex-col rounded-[10px] max-w-[270px]">
              <div className=" purplegradient h-[84px] rounded-t-[10px] px-6 flex items-center">
                <div className=" flex">
                  <span className=" border border-white rounded-full p-3">
                    <WhiteMoneyIcon />
                  </span>
                </div>
              </div>
              <div className=" flex flex-col gap-y-2 py-6 border-x min-h-[217px] border-gray-200 border-b rounded-b-[10px] px-[25px]">
                <p className=" text-primary-black text-lg">Billing</p>
                <p className=" text-primary-greytext font-light">
                  Provide card details, select a plan and billing frequency,
                </p>
                <div className=" flex mt-auto">
                  <button
                    onClick={() => setOpenBillingSheet(true)}
                    className="rounded-[10px] mt-[10px] text-primary-black flex justify-center px-10 py-[8px] items-center border border-primary-border"
                  >
                    Set up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" border-t border-t-gray-100 bg-white w-full flex z-[15] absolute bottom-0 pl-[34%]">
          <p className=" py-6 text-[15px] pl-[140px] text-primary-greytext">
            By using the platform you agree to{" "}
            <span className=" text-primary-blue cursor-pointer text-[15px] ml-1 underline underline-offset-4">
              Verzo’s Privacy Policy
            </span>{" "}
            and
            <span className=" text-primary-blue cursor-pointer text-[15px] ml-1 underline underline-offset-4">
              Terms of Use
            </span>
          </p>
        </div>
      </div>
      <CreateBusinessSheet
        open={openBusinessSheet}
        onClose={handleCloseBusinessSheet}
      />
      <BillingSheet
        open={openBillingSheet}
        onClose={handleCloseBillingSheet}
        confirmPlan={confirmBilling}
      />
    </>
  );
};

export default BusinessSetup;
