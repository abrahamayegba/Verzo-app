"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, Plus, Trash2, X } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import VerveIcon from "@/components/ui/icons/VerveIcon";
import MastercardIcon from "@/components/ui/icons/MastercardIcon";
import CardIcon from "@/components/ui/icons/CardIcon";
import { useGetUserCardsQuery } from "@/src/generated/graphql";
import localStorage from "local-storage-fallback";
import VisaIcon from "@/components/ui/icons/VisaIcon";

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
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [defaultCardId, setDefaultCardId] = useState<string | null>(null);
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const { data } = useGetUserCardsQuery({
    variables: {
      businessId: businessId,
    },
  });
  useEffect(() => {
    if (data) {
      const defaultCard = data?.getUserCards?.find((card) => card?.id);
      if (defaultCard) {
        setDefaultCardId(defaultCard.id);
      }
    }
  }, [data]);
  const handleCardSelection = (cardId: string) => {
    setSelectedCardId(cardId);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className=" pt-[70px]">
          <button
            onClick={onClose}
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
          <div className="w-full mt-[30px] flex flex-col gap-y-6">
            {data?.getUserCards?.map((card, index) => (
              <div
                key={index}
                className={`flex items-center justify-between border border-[#D9D9D9] border-opacity-70 pl-4 pr-[34px] py-4 rounded-[10px] cursor-pointer relative ${
                  selectedCardId === card?.id
                    ? " border border-primary-blue bg-blue-50 bg-opacity-70"
                    : ""
                }`}
                onClick={() => handleCardSelection(card?.id!)}
              >
                <div className="flex flex-col gap-y-2">
                  <div className="text-primary-black flex flex-row gap-x-3 items-center">
                    <span>
                      {card?.type?.trim().toLowerCase() === "verve" && (
                        <VerveIcon />
                      )}
                      {card?.type?.trim().toLowerCase() === "mastercard" && (
                        <MastercardIcon />
                      )}
                      {card?.type?.trim().toLowerCase() === "visa" && (
                        <VisaIcon />
                      )}
                    </span>
                    <div className="flex flex-col text-sm">
                      <p className="text-primary-black">
                        ending in {card?.last4Digits}
                      </p>
                      <p className="text-primary-greytext font-light">
                        Exp {card?.expiry}
                      </p>
                    </div>
                    {card?.default && (
                      <span className="text-xs px-[6px] ml-2 text-primary-blue py-[2px] bg-primary-bluetint rounded-[20px]">
                        default
                      </span>
                    )}
                  </div>
                </div>
                <Trash2
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click event from propagating to the card container
                    onClose();
                    deleteCard();
                  }}
                  className="w-[18px] h-[18px] text-primary-red absolute right-4 cursor-pointer"
                />
              </div>
            ))}
            <button
              onClick={() => {
                onClose();
                saveAsDefault();
              }}
              className="bg-primary-blue text-white disabled:opacity-50 disabled:cursor-not-allowed mt-1 rounded-[10px] py-[10px]"
              disabled={selectedCardId === defaultCardId}
            >
              Save as default
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CardSheet;
