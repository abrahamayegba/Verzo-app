"use client";
import React, { useState } from "react";
import { ChevronLeft, X } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import PlanIcon from "@/components/ui/icons/PlanIcon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import VerveIcon from "@/components/ui/icons/VerveIcon";
import MastercardIcon from "@/components/ui/icons/MastercardIcon";

interface PlanProps {
  open: boolean;
  onClose: () => void;
  confirmPlan: () => void;
}

const PlanSheet: React.FC<PlanProps> = ({ open, onClose, confirmPlan }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };
  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className=" pt-[70px]">
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
          <div className=" w-full mt-[30px] flex flex-col gap-y-6">
            {currentStep === 1 ? (
              <>
                <div className=" py-[20px] px-[18px] flex items-center justify-between purplegradient text-white rounded-[10px]">
                  <p>Verzo Plus plan will renew in 21 days</p>
                  <X className=" w-4 h-4 cursor-pointer" />
                </div>
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
                    >
                      Annually
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="monthly">
                    <RadioGroup className=" " defaultValue="option-one">
                      <div className="flex items-center justify-between border border-[#D9D9D9] border-opacity-70 px-6 py-3 rounded-[10px]">
                        <div className=" flex flex-col gap-y-2">
                          <p className=" text-primary-black">
                            Free
                            <span className=" text-xs px-[6px] ml-2 text-primary-blue py-[2px] bg-primary-bluetint rounded-[20px]">
                              current plan
                            </span>
                          </p>
                          <p className=" text-sm font-light text-primary-greytext">
                            A line about the plan
                          </p>
                        </div>
                        <RadioGroupItem
                          className=" w-5 h-5"
                          value="option-one"
                          id="option-one"
                        />
                      </div>
                      <div className="flex items-center justify-between border border-[#D9D9D9] border-opacity-70 px-6 py-3 rounded-[10px]">
                        <div className=" flex flex-col gap-y-2">
                          <p className=" text-primary-black">Verzo plus</p>
                          <p className=" text-sm font-light text-primary-greytext">
                            A line about the plan
                          </p>
                        </div>
                        <RadioGroupItem
                          className=" w-5 h-5"
                          value="option-two"
                          id="option-two"
                        />
                      </div>
                    </RadioGroup>
                  </TabsContent>
                  <TabsContent value="annually">
                    <RadioGroup className=" " defaultValue="option-one">
                      <div className="flex items-center justify-between border border-[#D9D9D9] border-opacity-70 px-6 py-3 rounded-[10px]">
                        <div className=" flex flex-col gap-y-2">
                          <p className=" text-primary-black">
                            Free
                            <span className=" text-xs px-[6px] ml-2 text-primary-blue py-[2px] bg-primary-bluetint rounded-[20px]">
                              current plan
                            </span>
                          </p>
                          <p className=" text-sm font-light text-primary-greytext">
                            A line about the plan
                          </p>
                        </div>
                        <RadioGroupItem
                          className=" w-5 h-5"
                          value="option-one"
                          id="option-one"
                        />
                      </div>
                      <div className="flex items-center justify-between border border-[#D9D9D9] border-opacity-70 px-6 py-3 rounded-[10px]">
                        <div className=" flex flex-col gap-y-2">
                          <p className=" text-primary-black">Verzo plus</p>
                          <p className=" text-sm font-light text-primary-greytext">
                            A line about the plan
                          </p>
                        </div>
                        <RadioGroupItem
                          className=" w-5 h-5"
                          value="option-two"
                          id="option-two"
                        />
                      </div>
                    </RadioGroup>
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
              onClick={
                currentStep === 1
                  ? handleNext
                  : () => {
                      onClose();
                      confirmPlan();
                    }
              }
              className=" bg-primary-blue text-white rounded-[10px] py-[10px] mt-[10px]"
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
