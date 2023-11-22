import { Trash2 } from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ServiceExpense {
  service: string;
  amount: string;
}

interface ServiceExpenseInputProps {
  expense: ServiceExpense;
  index: number;
  onServiceExpenseChange: (
    index: number,
    field: keyof ServiceExpense,
    value: string
  ) => void;
  onDeleteServiceExpense: (index: number) => void;
}

const ServiceExpenseItem: React.FC<ServiceExpenseInputProps> = ({
  expense,
  index,
  onServiceExpenseChange,
  onDeleteServiceExpense,
}) => {
  return (
    <div className="flex w-full gap-x-6">
      <div className="flex flex-col w-1/2 gap-y-2">
        <label htmlFor={`service${index}`}>Service</label>
        <Select
          value={expense.service}
          onValueChange={(value) =>
            onServiceExpenseChange(index, "service", value)
          }
        >
          <SelectTrigger className="border border-gray-200 bg-transparent rounded-lg h-10 text-sm focus:outline-none px-3 py-2">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent className="bg-white w-full z-[200] shadow-sm text-gray-800">
            <SelectGroup>
              <SelectItem
                className="hover:bg-gray-100 cursor-pointer py-2 text-base"
                value="service a"
              >
                Service A
              </SelectItem>
              <SelectItem
                className="hover:bg-gray-100 cursor-pointer py-2 text-base"
                value="service b"
              >
                Service B
              </SelectItem>
              <SelectItem
                className="hover:bg-gray-100 cursor-pointer py-2 text-base"
                value="service c"
              >
                Service C
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col w-1/2 gap-y-2">
        <label htmlFor={`expenseAmount${index}`}>Amount</label>
        <div className="flex gap-x-3">
          <input
            type="number"
            className="border border-gray-200 bg-transparent rounded-lg h-10 text-sm focus:outline-none px-3 py-2 w-full"
            id={`expenseAmount${index}`}
            placeholder="Enter amount"
            required
            value={expense.amount}
            onChange={(e) =>
              onServiceExpenseChange(index, "amount", e.target.value)
            }
          />
          <Trash2
            onClick={() => onDeleteServiceExpense(index)}
            className="w-[22px] h-[22px] text-primary-red cursor-pointer mt-2"
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceExpenseItem;
