"use client";
import FilterDataDropdown from "@/components/FilterDataDropdown";
import PurchaseList from "@/components/Purchase/PurchaseList";
import PurchaseMetrics from "@/components/Purchase/PurchaseMetrics";
import {
  useGetBusinessesByUserIdQuery,
  useGetPurchaseByBusinessQuery,
  useGetPurchaseForMonthQuery,
  useGetPurchaseForQuarterQuery,
  useGetPurchaseForWeekQuery,
  useGetPurchaseForYearQuery,
} from "@/src/generated/graphql";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import localStorage from "local-storage-fallback";
import React, { useEffect, useState } from "react";
import MainLoader from "@/components/loading/MainLoader";
import Loader2 from "@/components/loading/Loader2";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

const Purchases = () => {
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

  const getPurchasesByBusiness = useGetPurchaseByBusinessQuery({
    variables: {
      businessId: businessId,
      cursor: null,
      sets: 1,
    },
  });

  const getPurchaseForWeek = useGetPurchaseForWeekQuery({
    variables: {
      businessId: businessId,
      weekly: true,
    },
  });

  const getPurchaseForMonth = useGetPurchaseForMonthQuery({
    variables: {
      businessId: businessId,
      monthly: true,
    },
  });

  const getPurchaseForQuarter = useGetPurchaseForQuarterQuery({
    variables: {
      businessId: businessId,
      quarterly: true,
    },
  });

  const getPurchaseForYear = useGetPurchaseForYearQuery({
    variables: {
      businessId: businessId,
      yearly: true,
    },
  });

  if (getBusinessesByUserId.loading) {
    return <MainLoader />;
  }

  const metricsLoading =
    getPurchaseForWeek.loading ||
    getPurchaseForMonth.loading ||
    getPurchaseForQuarter.loading ||
    getPurchaseForYear.loading ||
    getPurchasesByBusiness.loading;

  return (
    <>
      {metricsLoading ? (
        <Loader2 />
      ) : (
        <div className=" px-[52px] bg-primary-whiteTint pt-[47px] pb-[20px] gap-y-[36px] flex flex-col">
          <div className=" flex flex-row justify-between items-center">
            <div className=" flex flex-col  gap-y-2">
              <p className=" text-primary-black font-medium text-3xl">
                Purchases
              </p>
              <p className=" text-primary-greytext">
                Create and manage purchases
              </p>
            </div>
            <div className=" flex gap-x-[14px] max-h-[48px]">
              <FilterDataDropdown
                selectedFilter={selectedFilter}
                onFilterChange={handleFilterChange}
              />
              <Link href="/purchase/createpurchase">
                <button className=" px-6 py-3 rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white">
                  Create order
                  <PlusCircle className=" w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
          <PurchaseMetrics filter={selectedFilter} />
          <PurchaseList />
        </div>
      )}
    </>
  );
};

export default Purchases;
