import { Trash2 } from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import localStorage from "local-storage-fallback";
import { useGetCombinedCoAsQuery } from "@/src/generated/graphql";

interface ExpenseItem {
  description: string;
  quantity: number;
  index: number;
  unitPrice: number;
  creditAccountId: string;
}
interface ExpenseInputProps {
  expense: ExpenseItem;
  index: number;
  onExpenseChange: (
    index: number,
    field: keyof ExpenseItem,
    value: string
  ) => void;
  onDeleteExpense: (index: number) => void;
}

const ExpenseItem: React.FC<ExpenseInputProps> = ({
  expense,
  index,
  onExpenseChange,
  onDeleteExpense,
}) => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";

  const getCOAs = useGetCombinedCoAsQuery({
    variables: {
      businessId: businessId,
    },
  });
  const COAs = getCOAs.data?.getCombinedCOAs ?? [];
  return (
    <div className="flex w-full gap-x-3 mb-6">
      <div className="flex flex-col w-1/2 gap-y-2">
        <input
          type="text"
          id={`expenseName${index}`}
          placeholder="Expense title"
          required
          className="border border-gray-200 bg-transparent rounded-lg h-10 text-sm focus:outline-none px-3 py-2"
          value={expense.description}
          onChange={(e) =>
            onExpenseChange(index, "description", e.target.value)
          }
        />
      </div>
      <div className="flex flex-col w-1/8 gap-y-2">
        <div className="flex gap-x-3">
          <input
            type="number"
            className="border border-gray-200 bg-transparent rounded-lg h-10 text-sm focus:outline-none px-3 py-2 w-full"
            id={`expenseAmount${index}`}
            placeholder="Amount"
            required
            value={expense?.unitPrice}
            onChange={(e) =>
              onExpenseChange(index, "unitPrice", e.target.value)
            }
          />
        </div>
      </div>
      <div className="flex flex-col w-1/8 gap-y-2">
        <div className="flex gap-x-3">
          <input
            type="number"
            className="border border-gray-200 bg-transparent rounded-lg h-10 text-sm focus:outline-none px-3 py-2 w-full"
            id={`expenseQuantity${index}`}
            placeholder="Quantity"
            required
            value={expense.quantity}
            onChange={(e) => onExpenseChange(index, "quantity", e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col w-1/3 gap-y-2">
        <div className="flex gap-x-3">
          <Select
            value={expense?.creditAccountId}
            onValueChange={(value) =>
              onExpenseChange(index, "creditAccountId", value)
            }
          >
            <SelectTrigger className=" w-full rounded-lg flex border border-gray-200 items-center">
              <SelectValue
                placeholder="Select account"
                className=" text-primary-greytext flex items-start placeholder:items-center"
              />
            </SelectTrigger>
            <SelectContent className=" bg-white w-[200px] max-h-[300px] overflow-y-scroll">
              <SelectGroup>
                {COAs.map((account) => (
                  <SelectItem
                    key={account?.id}
                    className=" hover:bg-gray-100 cursor-pointer py-2 text-[15px]"
                    value={account?.id!}
                  >
                    {account?.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Trash2
            onClick={() => onDeleteExpense(index)}
            className="w-[22px] h-[22px] text-primary-red cursor-pointer mt-2"
          />
        </div>
      </div>
    </div>
  );
};

export default ExpenseItem;
