"use client";
import React, { useState } from "react";
import { ChevronLeft, X } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import PlanIcon from "@/components/ui/icons/PlanIcon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetCurrentSubscriptionByBusinessQuery,
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

  const Plans = useGetPlansQuery();
  const Plansloading = Plans.loading;
  const Planlist = Plans.data?.getPlans;

  const { data } = useGetCurrentSubscriptionByBusinessQuery({
    variables: {
      businessId: businessId,
    },
  });

  const planId = data?.getCurrentSubscriptionByBusiness?.plan?.id!;

  const [selectedOption, setSelectedOption] = useState<string>(planId);
  // const getPlanById = useGetPlanByIdQuery({
  //   variables: {
  //     planId: selectedOption,
  //   },
  // });
  // const planQueryLoading = getPlanById.loading;

  // console.log(selectedOption, planId);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className=" pt-[40px]">
          <button
            onClick={onClose}
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
            Switch plan or billing frequency
          </p>
          <div className=" w-full mt-[20px] flex flex-col gap-y-6">
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
              <TabsContent className="flex flex-col gap-y-6" value="monthly">
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
              <TabsContent className=" flex flex-col gap-y-6" value="annually">
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
                    <p className="text-primary-black text-start">Standard</p>
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
            <button
              disabled={!selectedOption}
              onClick={() => {
                onClose();
                confirmPlan(selectedOption);
              }}
              className={`bg-primary-blue disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-[10px] py-[10px] mt-[10px] ${
                Plansloading ? "opacity-50" : ""
              }`}
            >
              Next
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default PlanSheet;
