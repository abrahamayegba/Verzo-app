"use client";
import React, { useState } from "react";
import { ChevronLeft, Plus, Trash2, X } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import VerveIcon from "@/components/ui/icons/VerveIcon";
import MastercardIcon from "@/components/ui/icons/MastercardIcon";
import CardIcon from "@/components/ui/icons/CardIcon";

interface CardProps {
  open: boolean;
  onClose: () => void;
  deleteCard: () => void;
  saveAsDefault: () => void;
}

const CardSheet: React.FC<CardProps> = ({
  open,
  onClose,
  deleteCard,
  saveAsDefault,
}) => {
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
              <CardIcon />
            </span>
          </div>
          <p className=" mt-[14px] text-lg text-primary-black">Card</p>
          <p className="font-light text-primary-greytext mt-2">
            Update your payment cards
          </p>
          <div className=" w-full mt-[30px] flex flex-col gap-y-6">
            {currentStep === 1 ? (
              <>
                <RadioGroup
                  className=" max-h-[300px] overflow-y-scroll"
                  defaultValue="option-one"
                >
                  <div className="flex items-center justify-between border border-[#D9D9D9] border-opacity-70 pl-4 pr-[34px] py-4 rounded-[10px]">
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
                    <Trash2
                      onClick={() => {
                        onClose();
                        deleteCard();
                      }}
                      className=" w-[18px] h-[18px] text-primary-red absolute right-10 cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center justify-between border border-[#D9D9D9] border-opacity-70 pl-4 pr-[34px] py-4 rounded-[10px]">
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
                      className=" w-5 h-5 relative"
                      value="option-two"
                      id="option-two"
                    />
                    <Trash2
                      onClick={() => {
                        onClose();
                        deleteCard();
                      }}
                      className=" w-[18px] h-[18px] text-primary-red absolute cursor-pointer right-10"
                    />
                  </div>
                  <button
                    onClick={handleNext}
                    className=" flex items-center gap-x-2 text-sm text-primary-blue"
                  >
                    <Plus className=" w-4 h-4" />
                    Add a new card
                  </button>
                </RadioGroup>
              </>
            ) : (
              <>
                <form className=" gap-y-6 flex flex-col mb-3">
                  <div className=" flex flex-col gap-y-2">
                    <label htmlFor="name">Name on card</label>
                    <input
                      className=" w-full rounded-lg border border-gray-300 p-[10px] text-[15px] focus:outline-none"
                      type="text"
                      placeholder="Name"
                    />
                  </div>
                  <div className=" flex flex-col gap-y-2">
                    <label htmlFor="cardnumber">Card number</label>
                    <input
                      className=" w-full rounded-lg border border-gray-200 p-[10px] text-[15px] focus:outline-none"
                      type="text"
                      placeholder="16 digits"
                      maxLength={16}
                    />
                  </div>
                  <div className=" flex flex-col gap-y-2">
                    <div className=" flex flex-row gap-x-6">
                      <div className=" flex flex-col gap-y-2">
                        <label htmlFor="expiry">Expiry</label>
                        <input
                          className=" w-full rounded-lg border border-gray-200 p-[10px] text-[15px] focus:outline-none"
                          type="text"
                          placeholder="MM/YY"
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
              onClick={() => {
                onClose();
                saveAsDefault();
              }}
              className=" bg-primary-blue text-white rounded-[10px] py-[10px] "
            >
              {currentStep === 1 ? "Save as default" : "Save card"}
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CardSheet;
