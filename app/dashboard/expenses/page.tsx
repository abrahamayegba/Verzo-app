import ExpenseList from "@/components/ExpenseList";
import ExpenseMetrics from "@/components/ExpenseMetrics";
import FilterDataDropdown from "@/components/FilterDataDropdown";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const Expenses = () => {
  return (
    <div className=" px-[52px] bg-primary-whiteTint pt-[47px] pb-[20px] gap-y-[36px] flex flex-col">
      <div className=" flex flex-row justify-between items-center">
        <div className=" flex flex-col  gap-y-2">
          <p className=" text-primary-black font-medium text-3xl">Expenses</p>
          <p className=" text-primary-greytext">Record and manage expenses</p>
        </div>
        <div className=" flex gap-x-[14px] max-h-[48px]">
          {/* <FilterDataDropdown /> */}
          <Link href="/expense/createexpense">
            <button className=" px-6 py-3 rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white">
              Record expense
              <PlusCircle className=" w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
      <ExpenseMetrics />
      <ExpenseList />
    </div>
  );
};

export default Expenses;
