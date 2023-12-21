"use client";
import { Check } from "lucide-react";
import React, { useState } from "react";

interface SaleExpenseItemProps {
  expense: {
    id?: string;
    effected?: boolean;
    description?: string;
    amount?: number;
  };
  loading: { [key: string]: boolean };
  setLoading: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  effectSaleExpense: (id: string, description: string) => Promise<void>;
}

const SalesExpenseItem: React.FC<SaleExpenseItemProps> = ({
  expense,
  loading,
  setLoading,
  effectSaleExpense,
}) => {
  const [descriptions, setDescriptions] = useState<{
    [expenseId: string]: string;
  }>({});

  const handleButtonClick = async () => {
    try {
      setLoading((prevState) => ({
        ...prevState,
        [expense?.id!]: true,
      }));
      const description = descriptions[expense?.id!]; // Get the description from state
      await effectSaleExpense(expense?.id!, description);
      setLoading((prevState) => ({
        ...prevState,
        [expense?.id!]: false,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div key={expense?.id} className="flex flex-col mb-3">
      <div className="flex w-full justify-end">
        {expense?.effected === true ? (
          <p className="text-primary-blue flex items-center gap-x-2 cursor-not-allowed">
            Expense effected
            <Check className="w-4 h-4" />
          </p>
        ) : (
          <button
            type="button"
            disabled={loading[expense?.id!]}
            onClick={handleButtonClick}
            className={`text-primary-blue flex items-center gap-x-2 ${
              loading[expense?.id!] ? "opacity-50" : ""
            }`}
          >
            {loading[expense?.id!] ? (
              <>Saving...</>
            ) : (
              <>
                Effect sale expense
                <Check className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>
      <div className="flex flex-col w-full gap-y-4">
        <div className="flex flex-row gap-x-5">
          <div className="text-primary-greytext flex flex-col w-1/2 gap-y-2">
            <p>Title</p>
            <p className="border text-gray-700 cursor-not-allowed border-gray-100 px-3 bg-gray-50 py-2 rounded-[8px]">
              {expense?.description}
            </p>
          </div>
          <div className="text-primary-greytext flex flex-col w-1/2 gap-y-2">
            <p>Amount</p>
            <p className="border cursor-not-allowed text-gray-700 border-gray-100 px-3 bg-gray-50 py-2 rounded-[8px]">
              ₦{expense?.amount}
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col gap-y-2">
          <label htmlFor="description">Description</label>
          <input
            className="w-full border border-gray-100 disabled:cursor-not-allowed focus:outline-none rounded-[8px] py-2 px-4"
            type="text"
            name="description"
            id="description"
            disabled={expense?.effected}
            value={descriptions[expense?.id!] || ""}
            onChange={(e) => {
              const updatedDescriptions = { ...descriptions };
              updatedDescriptions[expense?.id!] = e.target.value;
              setDescriptions(updatedDescriptions);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SalesExpenseItem;
