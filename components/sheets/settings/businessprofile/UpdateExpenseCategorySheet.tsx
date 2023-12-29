import React from "react";
import { ChevronLeft, Trash2 } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useGetExpenseCategoryWithSetsQuery } from "@/src/generated/graphql";
import ActiveExpenseIcon from "@/components/ui/icons/ActiveExpenseIcon";

interface UpdateProps {
  open: boolean;
  openSheet: () => void;
  onClose: () => void;
}

const UpdateExpenseCategorySheet: React.FC<UpdateProps> = ({
  open,
  onClose,
  openSheet,
}) => {
  const getExpenseCategories = useGetExpenseCategoryWithSetsQuery();
  const expenseCategories =
    getExpenseCategories?.data?.getExpenseCategoryWithSets?.expenseCategories ??
    [];

  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className=" pt-[100px]">
          <button
            type="button"
            onClick={onClose}
            className=" flex gap-x-2 focus:outline-none text-primary-greytext items-center text-sm"
          >
            <ChevronLeft className=" w-4 h-4" />
            Back
          </button>
          <div className=" mt-[50px] flex">
            <span className=" p-3 rounded-full bg-[#EDF6FF] flex">
              <ActiveExpenseIcon />
            </span>
          </div>
          <p className=" mt-[14px] text-lg text-primary-black">
            Expense categories
          </p>
          <p className=" font-light text-primary-greytext mt-2">
            View categories
          </p>
          <div className=" w-full mt-[20px] flex flex-col gap-y-4 ">
            <ul className="flex flex-col gap-y-2 max-h-[250px] overflow-y-scroll">
              {expenseCategories.map((category) => (
                <li
                  className=" py-2 flex flex-row justify-between items-center text-gray-600 hover:bg-gray-100 hover:text-gray-800 px-4 rounded-[6px]"
                  key={category?.id}
                >
                  {category?.name}
                  <Trash2 className=" text-primary-red w-5 h-5 hover:cursor-pointer opacity-50" />
                </li>
              ))}
            </ul>
            <button
              disabled
              type="submit"
              className={`bg-primary-blue disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-[10px] py-[10px] mt-[10px]`}
            >
              Update categories
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default UpdateExpenseCategorySheet;
