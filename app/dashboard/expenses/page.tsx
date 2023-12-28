"use client";
import ExpenseList from "@/components/Expense/ExpenseList";
import ExpenseMetrics from "@/components/Expense/ExpenseMetrics";
import FilterDataDropdown from "@/components/FilterDataDropdown";
import {
  useGetArchivedExpensesByBusinessQuery,
  useGetBusinessesByUserIdQuery,
  useGetExpenseForMonthQuery,
  useGetExpenseForQuarterQuery,
  useGetExpenseForWeekQuery,
  useGetExpenseForYearQuery,
  useGetExpensesByBusinessQuery,
} from "@/src/generated/graphql";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import localStorage from "local-storage-fallback";
import React, { useEffect, useState } from "react";
import MainLoader from "@/components/loading/MainLoader";
import Loader2 from "@/components/loading/Loader2";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

const Expenses = () => {
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
  }, [router]);
  const [selectedFilter, setSelectedFilter] = useState("weekly");
  const handleFilterChange = (filter: any) => {
    setSelectedFilter(filter);
  };

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
  // Weekly Queries
  const getExpenseForWeek = useGetExpenseForWeekQuery({
    variables: {
      businessId: businessId,
      weekly: true,
    },
  });
  // Monthly Queries
  const getExpenseForMonth = useGetExpenseForMonthQuery({
    variables: {
      businessId: businessId,
      monthly: true,
    },
  });
  // Quarterly Queries
  const getExpenseForQuarter = useGetExpenseForQuarterQuery({
    variables: {
      businessId: businessId,
      quarterly: true,
    },
  });

  // Yearly Queries
  const getExpenseForYear = useGetExpenseForYearQuery({
    variables: {
      businessId: businessId,
      yearly: true,
    },
  });

  console.log(businessId);
  if (getBusinessesByUserId.loading) {
    return <MainLoader />;
  }

  const metricsLoading =
    getExpenseForWeek.loading ||
    getExpenseForMonth.loading ||
    getExpenseForQuarter.loading ||
    getExpenseForYear.loading ||
    getExpensesByBusiness.loading ||
    getArchivedExpenses.loading;

  return (
    <>
      {metricsLoading ? (
        <Loader2 />
      ) : (
        <div className=" px-[52px] bg-primary-whiteTint pt-[47px] pb-[20px] gap-y-[36px] flex flex-col">
          <div className=" flex flex-row justify-between items-center">
            <div className=" flex flex-col  gap-y-2">
              <p className=" text-primary-black font-medium text-3xl">
                Expenses
              </p>
              <p className=" text-primary-greytext">
                Record and manage expenses
              </p>
            </div>
            <div className=" flex gap-x-[14px] max-h-[48px]">
              <FilterDataDropdown
                selectedFilter={selectedFilter}
                onFilterChange={handleFilterChange}
              />
              <Link href="/expense/createexpense">
                <button className=" px-6 py-3 rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white">
                  Record expense
                  <PlusCircle className=" w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
          <ExpenseMetrics filter={selectedFilter} />
          <ExpenseList />
        </div>
      )}
    </>
  );
};

export default Expenses;
