"use client";
import React, { useEffect } from "react";
import { ArrowLeft, ListFilter, PlusCircle } from "lucide-react";
import Link from "next/link";
import FilterDataDropdown from "@/components/FilterDataDropdown";
import AllPurchaseList from "@/components/Purchase/AllPurchaseList";
import {
  useGetArchivedPurchasesByBusinessQuery,
  useGetBusinessesByUserIdQuery,
  useGetPurchaseByBusinessQuery,
} from "@/src/generated/graphql";
import MainLoader from "@/components/loading/MainLoader";
import Loader2 from "@/components/loading/Loader2";
import localStorage from "local-storage-fallback";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

const AllPurchases = () => {
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
  const getPurchasesByBusiness = useGetPurchaseByBusinessQuery({
    variables: {
      businessId: businessId,
      cursor: null,
      sets: 1,
    },
  });
  const getArchivedPurchases = useGetArchivedPurchasesByBusinessQuery({
    variables: {
      businessId: businessId,
      cursor: null,
      sets: 1,
    },
  });
  if (getBusinessesByUserId.loading) {
    return <MainLoader />;
  }
  const purchaseLoading =
    getPurchasesByBusiness.loading || getArchivedPurchases.loading;
  return (
    <>
      {purchaseLoading ? (
        <Loader2 />
      ) : (
        <div className=" px-[52px] bg-primary-whiteTint pt-[47px] pb-[20px] gap-y-[30px] flex flex-col">
          <div className=" flex flex-row justify-between items-center">
            <div className=" flex flex-col gap-y-5">
              <Link href="/dashboard/purchases">
                <button className=" flex flex-row gap-x-2 text-primary-greytext items-center">
                  <ArrowLeft className=" w-4 h-4" /> Back to purchases
                </button>
              </Link>
              <p className=" text-primary-black text-2xl">
                Complete purchase list
              </p>
            </div>
            <div className=" flex gap-x-[14px] max-h-[48px]">
              {/* <FilterDataDropdown /> */}
              <Link href="/purchase/createpurchase">
                <button className=" px-6 py-3 rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white">
                  Create order
                  <PlusCircle className=" w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
          <AllPurchaseList />
        </div>
      )}
    </>
  );
};

export default AllPurchases;
