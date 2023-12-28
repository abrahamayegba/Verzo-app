"use client";
import React, { useEffect } from "react";
import { ArrowLeft, ListFilter, PlusCircle } from "lucide-react";
import Link from "next/link";
import FilterDataDropdown from "@/components/FilterDataDropdown";
import AllExpenseList from "@/components/Expense/AllExpenseList";
import {
  useGetArchivedExpensesByBusinessQuery,
  useGetBusinessesByUserIdQuery,
  useGetExpensesByBusinessQuery,
} from "@/src/generated/graphql";
import MainLoader from "@/components/loading/MainLoader";
import localStorage from "local-storage-fallback";
import Loader2 from "@/components/loading/Loader2";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

const AllExpenses = () => {
  const getBusinessesByUserId = useGetBusinessesByUserIdQuery();
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/signin");
    }
  });
  const getExpensesByBusiness = useGetExpensesByBusinessQuery({
    variables: {
      businessId: businessId,
      cursor: null,
      sets: 1,
    },
  });
  const getArchivedExpenses = useGetArchivedExpensesByBusinessQuery({
    variables: {
      businessId: businessId,
      cursor: null,
      sets: 1,
    },
  });
  if (getBusinessesByUserId.loading) {
    return <MainLoader />;
  }
  const expenseLoading =
    getExpensesByBusiness.loading || getArchivedExpenses.loading;
  return (
    <>
      {expenseLoading ? (
        <Loader2 />
      ) : (
        <div className=" px-[52px] bg-primary-whiteTint pt-[47px] pb-[20px] gap-y-[30px] flex flex-col">
          <div className=" flex flex-row justify-between items-center">
            <div className=" flex flex-col gap-y-5">
              <Link href="/dashboard/expenses">
                <button className=" flex flex-row gap-x-2 text-primary-greytext items-center">
                  <ArrowLeft className=" w-4 h-4" /> Back to expenses
                </button>
              </Link>
              <p className=" text-primary-black text-2xl">
                Complete expense list
              </p>
            </div>
            <div className=" flex gap-x-[14px] max-h-[48px]">
              {/* <FilterDataDropdown /> */}
              <Link href="/expense/createexpense">
                <button className=" px-6 py-3 rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white">
                  Create expenses
                  <PlusCircle className=" w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
          <AllExpenseList />
        </div>
      )}
    </>
  );
};

export default AllExpenses;
