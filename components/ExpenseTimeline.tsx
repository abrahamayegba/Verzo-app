import { Check } from "lucide-react";
import React from "react";

interface HorizontalStepIndicatorProps {
  currentStep: number;
  itemsConfirmed: boolean;
  merchantInvoiceAdded: boolean;
  paymentAdded: boolean;
}

const ExpenseStepIndicator: React.FC<HorizontalStepIndicatorProps> = ({
  currentStep,
  itemsConfirmed,
  merchantInvoiceAdded,
  paymentAdded,
}) => {
  return (
    <div className="relative w-full mt-8">
      <div
        className={`h-[2px] bg-[#d9d9d9] w-full absolute top-1/2 transform -translate-y-1/2 mt-[-15px]`}
      ></div>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-start flex-col gap-y-1 relative">
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              currentStep >= 1
                ? "bg-blue-500 border-blue-500"
                : "border-gray-500"
            }`}
          >
            {currentStep >= 1 && (
              <Check strokeWidth={3} className="text-white w-4 h-4" />
            )}
          </div>
          <span
            className={`text-lg ${
              currentStep == 1 ? "text-primary-black" : "text-gray-500"
            }`}
          >
            Expense
          </span>
        </div>
        <div className="flex items-center flex-col gap-y-1 relative">
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              itemsConfirmed === true
                ? "bg-blue-500 border-blue-500"
                : "border-gray-300 border-dashed bg-white"
            }`}
          >
            {itemsConfirmed === true && (
              <Check strokeWidth={3} className="text-white w-4 h-4" />
            )}
          </div>
          <span
            className={`text-lg ${
              currentStep == 2 ? "text-primary-black" : "text-gray-500"
            }`}
          >
            Confirm items
          </span>
        </div>
        <div className="flex items-center flex-col gap-y-1 relative">
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              merchantInvoiceAdded === true
                ? "bg-blue-500 border-blue-500"
                : "border-gray-300 border-dashed bg-white"
            }`}
          >
            {merchantInvoiceAdded === true && (
              <Check strokeWidth={3} className="text-white w-4 h-4" />
            )}
          </div>
          <span
            className={`text-lg ${
              currentStep == 3 ? "text-primary-black" : "text-gray-500"
            }`}
          >
            Merchant invoice
          </span>
        </div>
        <div className="flex items-end flex-col gap-y-1 relative">
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              paymentAdded === true
                ? "bg-blue-500 border-blue-500"
                : "border-gray-300 border-dashed bg-white"
            }`}
          >
            {paymentAdded === true && (
              <Check strokeWidth={3} className="text-white w-4 h-4" />
            )}
          </div>
          <span
            className={`text-lg ${
              currentStep == 4 ? " text-primary-black" : "text-gray-500"
            }`}
          >
            Add payment details
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExpenseStepIndicator;
