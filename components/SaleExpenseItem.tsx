import { Trash2 } from "lucide-react";
import React from "react";

interface Expense {
  name: string;
  amount: string;
}

interface ExpenseInputProps {
  expense: Expense;
  index: number;
  onExpenseChange: (index: number, field: keyof Expense, value: string) => void;
  onDeleteExpense: (index: number) => void;
}

const SaleExpenseItem: React.FC<ExpenseInputProps> = ({
  expense,
  index,
  onExpenseChange,
  onDeleteExpense,
}) => {
  return (
    <div className="flex w-full gap-x-6">
      <div className="flex flex-col w-1/2 gap-y-2">
        <label htmlFor={`expenseName${index}`}>Title</label>
        <input
          type="text"
          id={`expenseName${index}`}
          placeholder="Expense title"
          required
          className="border border-gray-200 bg-transparent rounded-lg h-10 text-sm focus:outline-none px-3 py-2"
          value={expense.name}
          onChange={(e) => onExpenseChange(index, "name", e.target.value)}
        />
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
            onChange={(e) => onExpenseChange(index, "amount", e.target.value)}
          />
          <Trash2
            onClick={() => onDeleteExpense(index)}
            className="w-[22px] h-[22px] text-primary-red cursor-pointer mt-2"
          />
        </div>
      </div>
    </div>
  );
};

export default SaleExpenseItem;
