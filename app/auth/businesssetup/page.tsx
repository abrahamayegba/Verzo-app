"use client";
import React, { useState } from "react";
import AuthSidebar from "@/components/AuthSidebar";
import WhiteBankIcon from "@/components/ui/icons/WhiteBankIcon";
import WhiteMoneyIcon from "@/components/ui/icons/WhiteMoneyIcon";
import CreateBusinessSheet from "@/components/sheets/auth/BusinessProfileSheet";
import useModal from "@/app/hooks/useModal";
import BillingSheet from "@/components/sheets/auth/BillingSheet";
import { CheckCircle2, MoveRight } from "lucide-react";
import Link from "next/link";
import { useGetBusinessesByUserIdQuery } from "@/src/generated/graphql";
import { IoWalletOutline } from "react-icons/io5";
import VerzoWalletSheet from "@/components/sheets/auth/VerzoWalletSheet";

const BusinessSetup = () => {
  const {
    isOpen: isConfirmPlanModalOpen,
    openModal: openConfirmPlanModal,
    closeModal: closeConfirmPlanModal,
  } = useModal();

  const [openBusinessSheet, setOpenBusinessSheet] = useState(false);
  const [openBillingSheet, setOpenBillingSheet] = useState(false);
  const [openVerzoWalletSheet, setOpenVerzoWalletSheet] = useState(false);
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
      <div className="w-full flex flex-row">
        <AuthSidebar />
        <div className="ml-[34%] flex-col gap-y-[30px] overflow-y-scroll flex mt-[130px] mb-[100px] justify-center pl-[60px] pr-[60px]">
          <div className="flex flex-col ">
            {businessPresent && (
              <Link href="/dashboard">
                <button className="flex gap-x-2 mb-3 items-center text-gray-700">
                  <MoveRight className="w-5 h-5 text-primary-greytext" /> Go to
                  Dashboard
                </button>
              </Link>
            )}
            <p className="text-primary-black text-[32px]">Business profile</p>
            <p className="text-primary-greytext text-lg">
              Complete these steps to get your business up and running
            </p>
          </div>
          <div className="flex gap-x-[40px] gap-y-[50px] flex-wrap ">
            <div className=" w-1/2 flex flex-col rounded-[10px] max-w-[250px] ">
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
                <p className=" text-primary-black text-lg gap-x-2 flex flex-row items-center">
                  Business profile{" "}
                  {businessPresent ? (
                    <span className="">
                      <CheckCircle2 className=" text-green-500" />
                    </span>
                  ) : (
                    <span className="  text-[15px] text-gray-700">
                      (required)
                    </span>
                  )}
                </p>
                <p className=" text-primary-greytext font-light">
                  Provide your business details and the category
                </p>
                <div className=" flex mt-auto">
                  {businessPresent ? (
                    <Link href="/dashboard">
                      <button
                        disabled
                        className="rounded-[10px] mt-[10px] text-primary-black text-opacity-50 cursor-not-allowed flex justify-center px-8 py-[8px] items-center border bg-gray-100 border-primary-border"
                      >
                        Completed
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
            <div className=" w-1/2 flex flex-col rounded-[10px] max-w-[250px] ">
              <div className=" purplegradient h-[84px] rounded-t-[10px] px-6 flex items-center">
                <div className=" flex">
                  <span className=" border border-white rounded-full p-3">
                    <IoWalletOutline className=" text-white w-6 h-6" />
                  </span>
                </div>
              </div>
              <div className=" flex flex-col gap-y-2 py-6 border-x min-h-[217px] border-gray-200 border-b rounded-b-[10px] px-[25px]">
                <p className=" text-primary-black text-lg">Verzo wallet</p>
                <p className=" text-primary-greytext font-light">
                  Provide details to create a verzo wallet
                </p>
                <div className=" flex mt-auto">
                  <button
                    onClick={() => setOpenVerzoWalletSheet(true)}
                    className="rounded-[10px] mt-[10px] text-primary-black flex justify-center px-10 py-[8px] items-center border border-primary-border"
                  >
                    Set up
                  </button>
                </div>
              </div>
            </div>
            <div className=" w-1/2 flex flex-col rounded-[10px] max-w-[250px] ">
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
        <div className=" border-t border-t-gray-100 bg-white w-full flex z-[15] fixed bottom-0 pl-[34%]">
          <p className=" py-6 text-[15px] pl-[140px] text-primary-greytext">
            By using the platform you agree to{" "}
            <span className=" text-primary-blue text-opacity-70 cursor-pointer text-[15px] ml-1 underline underline-offset-4">
              Verzo’s Privacy Policy
            </span>{" "}
            and
            <span className=" text-primary-blue text-opacity-70 cursor-pointer text-[15px] ml-1 underline underline-offset-4">
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
      <VerzoWalletSheet
        open={openVerzoWalletSheet}
        onClose={() => setOpenVerzoWalletSheet(false)}
      />
    </>
  );
};

export default BusinessSetup;
