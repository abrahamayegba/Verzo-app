"use client";
import React, { useState } from "react";
import { ChevronLeft, X } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import PlanIcon from "@/components/ui/icons/PlanIcon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";

interface BillingProps {
  open: boolean;
  onClose: () => void;
  confirmPlan: () => void;
}

const BillingSheet: React.FC<BillingProps> = ({
  open,
  onClose,
  confirmPlan,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [inputValue, setInputValue] = useState("");

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
    setInputValue(value);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className=" pt-[60px]">
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
              ? "First 30 days are free. You can set up later"
              : "Select a card to bill"}
          </p>
          <div className=" w-full mt-[30px] flex flex-col gap-y-6">
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
                <form className=" gap-y-5 flex flex-col">
                  <div className=" flex flex-col gap-y-[6px]">
                    <label htmlFor="name">Name on card</label>
                    <input
                      className=" w-full rounded-lg border border-gray-300 p-[10px] text-[15px] focus:outline-none"
                      type="text"
                      placeholder="Name"
                    />
                  </div>
                  <div className=" flex flex-col gap-y-[6px]">
                    <label htmlFor="cardnumber">Card number</label>
                    <input
                      className=" w-full rounded-lg border border-gray-200 p-[10px] text-[15px] focus:outline-none"
                      type="text"
                      placeholder="16 digits"
                      maxLength={16}
                    />
                  </div>
                  <div className=" flex flex-col gap-y-[6px]">
                    <div className=" flex flex-row gap-x-6">
                      <div className=" flex flex-col gap-y-2">
                        <label htmlFor="expiry">Expiry</label>
                        <input
                          className=" w-full rounded-lg border border-gray-200 p-[10px] text-[15px] focus:outline-none"
                          type="text"
                          placeholder="MM/YY"
                          value={inputValue}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className=" flex flex-col gap-y-2">
                        <label htmlFor="cvv">CVV</label>
                        <input
                          className=" w-full rounded-lg border border-gray-200 p-[10px] text-[15px] focus:outline-none"
                          type="text"
                          maxLength={3}
                          placeholder="3 digits"
                        />
                      </div>
                    </div>
                  </div>
                </form>
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
              {currentStep === 1 ? "Next" : "Puchase plan"}
            </button>
            <Link
              className=" flex justify-center items-center"
              href="/dashboard"
            >
              <button className=" text-primary-blue underline underline-offset-4">
                Set up later
              </button>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default BillingSheet;
