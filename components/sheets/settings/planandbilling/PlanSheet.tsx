"use client";
import React, { useState } from "react";
import { ChevronLeft, X } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import PlanIcon from "@/components/ui/icons/PlanIcon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import VerveIcon from "@/components/ui/icons/VerveIcon";
import MastercardIcon from "@/components/ui/icons/MastercardIcon";
import {
  useGetPlanByIdQuery,
  useGetPlansQuery,
  useGetSubscriptionByBusinessQuery,
} from "@/src/generated/graphql";
import localStorage from "local-storage-fallback";

interface PlanProps {
  open: boolean;
  onClose: () => void;
  confirmPlan: (selectedOption: string) => void;
}

const PlanSheet: React.FC<PlanProps> = ({ open, onClose, confirmPlan }) => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );

  const businessId = storedBusinessId[0] || "";
  const [currentStep, setCurrentStep] = useState(1);
  const Plans = useGetPlansQuery();
  const Planlist = Plans.data?.getPlans;
  const { data } = useGetSubscriptionByBusinessQuery({
    variables: {
      businessId: businessId,
    },
  });
  const subscription = data?.getSubscriptionByBusiness[0];
  const planId = subscription?.plan?.id!;
  const [selectedOption, setSelectedOption] = useState<string>(planId);
  const getPlanById = useGetPlanByIdQuery({
    variables: {
      planId: selectedOption,
    },
  });
  const planQueryLoading = getPlanById.loading;
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className=" pt-[40px]">
          <button
            onClick={currentStep === 1 ? onClose : () => setCurrentStep(1)}
            className=" flex gap-x-2 text-primary-greytext items-center text-sm"
          >
            <ChevronLeft className=" w-4 h-4" />
            Back
          </button>
          <div className=" mt-[40px] flex">
            <span className=" p-3 rounded-full bg-[#EDF6FF] flex">
              <PlanIcon />
            </span>
          </div>
          <p className=" mt-[14px] text-lg text-primary-black">Billing</p>
          <p className="font-light text-primary-greytext mt-2">
            {currentStep === 1
              ? "Switch plan or billing frequency"
              : "Select a card to bill"}
          </p>
          <div className=" w-full mt-[20px] flex flex-col gap-y-6">
            {currentStep === 1 ? (
              <>
                <Tabs defaultValue="monthly" className=" w-full">
                  <TabsList className=" bg-primary-borderGrey p-1 rounded-[10px] mb-6">
                    <TabsTrigger
                      className=" w-1/2 data-[state=active]:bg-white"
                      value="monthly"
                    >
                      Monthly
                    </TabsTrigger>
                    <TabsTrigger
                      className=" w-1/2 data-[state=active]:bg-white"
                      value="annually"
                      disabled
                    >
                      Annually
                    </TabsTrigger>
                  </TabsList>
                  {/* <TabsContent
                    className=" flex flex-col gap-y-6"
                    value="monthly"
                  >
                    <button
                      onClick={() => handleOptionSelect("option-one")}
                      className={`flex items-center justify-between border border-[#D9D9D9] border-opacity-70 px-6 py-3 rounded-[10px] cursor-pointer relative ${
                        selectedOption === "option-one"
                          ? "bg-blue-50 bg-opacity-25"
                          : ""
                      }`}
                    >
                      <div className="flex flex-col gap-y-2">
                        <p className="text-primary-black text-start">Basic</p>
                        <p className="text-sm text-primary-greytext">
                          ₦5,500 monthly
                        </p>
                      </div>
                      <div className="relative">
                        <div
                          className={`${"border border-gray-300 w-5 h-5 rounded-full"}`}
                        >
                          <span
                            className={`${
                              selectedOption === "option-one"
                                ? "bg-primary-blue w-3 h-3 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                : "w-3 h-3 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            }`}
                          ></span>
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => handleOptionSelect("option-two")}
                      className={`flex items-center justify-between border border-[#D9D9D9] border-opacity-70 px-6 py-3 rounded-[10px] cursor-pointer relative ${
                        selectedOption === "option-two"
                          ? " bg-blue-50 bg-opacity-25"
                          : ""
                      }`}
                    >
                      <div className="flex flex-col gap-y-2">
                        <p className="text-primary-black text-start">
                          Standard
                        </p>
                        <p className="text-sm text-primary-greytext">
                          ₦5,500 monthly
                        </p>
                      </div>
                      <div className="relative">
                        <div
                          className={`${"border border-gray-300 w-5 h-5 rounded-full"}`}
                        >
                          <span
                            className={`${
                              selectedOption === "option-two"
                                ? "bg-primary-blue w-3 h-3 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                : "w-3 h-3 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            }`}
                          ></span>
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => handleOptionSelect("option-three")}
                      className={`flex items-center justify-between border border-[#D9D9D9] border-opacity-70 px-6 py-3 rounded-[10px] cursor-pointer relative ${
                        selectedOption === "option-three"
                          ? "bg-blue-50 bg-opacity-25"
                          : ""
                      }`}
                    >
                      <div className="flex flex-col gap-y-2">
                        <p className="text-primary-black text-start">Premium</p>
                        <p className="text-sm text-primary-greytext">
                          ₦5,500 monthly
                        </p>
                      </div>
                      <div className="relative">
                        <div
                          className={`${"border border-gray-300 w-5 h-5 rounded-full"}`}
                        >
                          <span
                            className={`${
                              selectedOption === "option-three"
                                ? "bg-primary-blue w-3 h-3 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                : "w-3 h-3 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            }`}
                          ></span>
                        </div>
                      </div>
                    </button>
                  </TabsContent> */}
                  <TabsContent
                    className="flex flex-col gap-y-6"
                    value="monthly"
                  >
                    {Planlist?.map((plan) => (
                      <button
                        key={plan?.id}
                        onClick={() => handleOptionSelect(plan?.id!)}
                        className={`flex items-center justify-between border border-[#D9D9D9] border-opacity-70 px-6 py-3 rounded-[10px] cursor-pointer relative ${
                          selectedOption === plan?.id
                            ? "bg-blue-50 text-primary-blue bg-opacity-25"
                            : ""
                        }`}
                      >
                        <div className="flex flex-col gap-y-2">
                          <p className=" flex flex-row gap-x-2 items-center text-start">
                            {plan?.planName}
                            {plan?.id === planId && (
                              <span className=" bg-blue-100 text-xs text-primary-blue  flex items-center rounded-full px-2 py-[2px]">
                                Current plan
                              </span>
                            )}
                          </p>
                          <p className="text-sm text-primary-greytext text-left">
                            {plan?.currentPrice.toLocaleString("en-NG", {
                              style: "currency",
                              currency: "NGN",
                            })}{" "}
                            monthly
                          </p>
                        </div>
                        <div className="relative">
                          <div className="border border-gray-300 w-5 h-5 rounded-full">
                            <span
                              className={`${
                                selectedOption === plan?.id
                                  ? "bg-primary-blue w-3 h-3 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                  : "w-3 h-3 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                              }`}
                            ></span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </TabsContent>
                  <TabsContent
                    className=" flex flex-col gap-y-6"
                    value="annually"
                  >
                    <button
                      onClick={() => handleOptionSelect("option-one")}
                      className={`flex items-center justify-between border border-[#D9D9D9] border-opacity-70 px-6 py-3 rounded-[10px] cursor-pointer relative ${
                        selectedOption === "option-one"
                          ? "bg-blue-50 bg-opacity-25"
                          : ""
                      }`}
                    >
                      <div className="flex flex-col gap-y-2">
                        <p className="text-primary-black text-start">Basic</p>
                        <p className="text-sm text-primary-greytext">
                          ₦5,500 monthly
                        </p>
                      </div>
                      <div className="relative">
                        <div
                          className={`${"border border-gray-300 w-5 h-5 rounded-full"}`}
                        >
                          <span
                            className={`${
                              selectedOption === "option-one"
                                ? "bg-primary-blue w-3 h-3 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                : "w-3 h-3 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            }`}
                          ></span>
                        </div>
                      </div>
                    </button>
                    {/* Verzo Standard */}
                    <button
                      onClick={() => handleOptionSelect("option-two")}
                      className={`flex items-center justify-between border border-[#D9D9D9] border-opacity-70 px-6 py-3 rounded-[10px] cursor-pointer relative ${
                        selectedOption === "option-two"
                          ? " bg-blue-50 bg-opacity-25"
                          : ""
                      }`}
                    >
                      <div className="flex flex-col gap-y-2">
                        <p className="text-primary-black text-start">
                          Standard
                        </p>
                        <p className="text-sm text-primary-greytext">
                          ₦5,500 monthly
                        </p>
                      </div>
                      <div className="relative">
                        <div
                          className={`${"border border-gray-300 w-5 h-5 rounded-full"}`}
                        >
                          <span
                            className={`${
                              selectedOption === "option-two"
                                ? "bg-primary-blue w-3 h-3 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                : "w-3 h-3 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            }`}
                          ></span>
                        </div>
                      </div>
                    </button>
                    {/* Verzo Premium */}
                    <button
                      onClick={() => handleOptionSelect("option-three")}
                      className={`flex items-center justify-between border border-[#D9D9D9] border-opacity-70 px-6 py-3 rounded-[10px] cursor-pointer relative ${
                        selectedOption === "option-three"
                          ? "bg-blue-50 bg-opacity-25"
                          : ""
                      }`}
                    >
                      <div className="flex flex-col gap-y-2">
                        <p className="text-primary-black text-start">Premium</p>
                        <p className="text-sm text-primary-greytext">
                          ₦5,500 monthly
                        </p>
                      </div>
                      <div className="relative">
                        <div
                          className={`${"border border-gray-300 w-5 h-5 rounded-full"}`}
                        >
                          <span
                            className={`${
                              selectedOption === "option-three"
                                ? "bg-primary-blue w-3 h-3 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                : "w-3 h-3 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            }`}
                          ></span>
                        </div>
                      </div>
                    </button>
                  </TabsContent>
                </Tabs>
              </>
            ) : (
              <>
                <RadioGroup
                  className=" max-h-[300px] overflow-y-scroll"
                  defaultValue="option-one"
                >
                  <div className="flex items-center justify-between border border-[#D9D9D9] border-opacity-70 px-4 py-4 rounded-[10px]">
                    <div className=" flex flex-col gap-y-2">
                      <div className=" text-primary-black flex flex-row gap-x-3 items-center">
                        <span className="">
                          <VerveIcon />
                        </span>
                        <div className=" flex flex-col text-sm">
                          <p className="  text-primary-black">ending in 7160</p>
                          <p className=" text-primary-greytext font-light">
                            Exp 06/2027
                          </p>
                        </div>
                        <span className=" text-xs px-[6px] ml-2 text-primary-blue py-[2px] bg-primary-bluetint rounded-[20px]">
                          default
                        </span>
                      </div>
                    </div>
                    <RadioGroupItem
                      className=" w-5 h-5"
                      value="option-one"
                      id="option-one"
                    />
                  </div>
                  <div className="flex items-center justify-between border border-[#D9D9D9] border-opacity-70 px-4 py-4 rounded-[10px]">
                    <div className=" flex flex-col gap-y-2">
                      <div className=" text-primary-black flex flex-row gap-x-3 items-center">
                        <span className="">
                          <MastercardIcon />
                        </span>
                        <div className=" flex flex-col text-sm">
                          <p className="  text-primary-black">ending in 3460</p>
                          <p className=" text-primary-greytext font-light">
                            Exp 06/2027
                          </p>
                        </div>
                      </div>
                    </div>
                    <RadioGroupItem
                      className=" w-5 h-5"
                      value="option-two"
                      id="option-two"
                    />
                  </div>
                </RadioGroup>
              </>
            )}
            <button
              // onClick={
              //   currentStep === 1
              //     ? handleNext
              //     : () => {
              //         onClose();
              //         confirmPlan();
              //       }
              // }
              onClick={() => {
                onClose();
                confirmPlan(selectedOption);
              }}
              className={`bg-primary-blue text-white rounded-[10px] py-[10px] mt-[10px] ${
                planQueryLoading ? "opacity-50" : ""
              }`}
            >
              {currentStep === 1 ? "Next" : "Update billing"}
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default PlanSheet;
