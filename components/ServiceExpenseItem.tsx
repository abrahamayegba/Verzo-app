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
import { useGetServiceByBusinessQuery } from "@/src/generated/graphql";
import localStorage from "local-storage-fallback";
import { Textarea } from "./ui/textarea";

interface ServiceExpense {
  description: string;
  serviceId: string;
  index: number;
  amount: number;
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
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const getServiceByBusiness = useGetServiceByBusinessQuery({
    variables: {
      businessId: businessId,
    },
  });
  const services =
    getServiceByBusiness.data?.getServiceByBusiness?.serviceByBusiness ?? [];

  return (
    <div className="flex flex-col w-full mt-[-10px]">
      <div className=" flex w-full gap-x-6">
        <div className="flex flex-col w-1/2 gap-y-2">
          <label htmlFor={`service${index}`}>Service</label>
          <Select
            value={expense.serviceId}
            onValueChange={(value) =>
              onServiceExpenseChange(index, "serviceId", value)
            }
          >
            <SelectTrigger className="border border-gray-200 bg-transparent rounded-lg h-10 text-sm focus:outline-none px-3 py-2">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-white w-full z-[200] shadow-sm text-gray-800">
              <SelectGroup>
                {services.map((service) => (
                  <SelectItem
                    key={service?.id}
                    className="hover:bg-gray-100 cursor-pointer py-2 text-base"
                    value={service?.id!}
                  >
                    {service?.name}
                  </SelectItem>
                ))}
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
              value={expense.amount || ""} // Ensure it's a string or an empty string
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
      <div className=" pr-6 mt-4 flex gap-y-2 flex-col">
        <label htmlFor="description">Description</label>
        <input
          className=" w-full border border-gray-200 rounded-[8px] py-2 focus:outline-none px-3"
          type="text"
          required
          id={`expenseDescription${index}`}
          placeholder="Enter a description"
          value={expense.description}
          onChange={(e) =>
            onServiceExpenseChange(index, "description", e.target.value)
          }
        />
      </div>
    </div>
  );
};

export default ServiceExpenseItem;
