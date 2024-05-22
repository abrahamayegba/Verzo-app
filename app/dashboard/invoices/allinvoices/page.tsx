"use client";
import React, { useEffect } from "react";
import AllInvoicesList from "@/components/Invoice/Allinvoices";
import { ArrowLeft, ListFilter, PlusCircle } from "lucide-react";
import Link from "next/link";
import FilterDataDropdown from "@/components/FilterDataDropdown";
import MainLoader from "@/components/loading/MainLoader";
import {
  useGetArchivedSalesByBusinessQuery,
  useGetBusinessesByUserIdQuery,
  useGetSaleByBusinessQuery,
} from "@/src/generated/graphql";
import Loader2 from "@/components/loading/Loader2";
import localStorage from "local-storage-fallback";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

const AllInvoices = () => {
  const getBusinessesByUserId = useGetBusinessesByUserIdQuery();
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      if (!authenticated) {
        router.push("/auth/signin");
      }
    };
    checkAuth();
  }, [router]);

  const getSalesByBusiness = useGetSaleByBusinessQuery({
    variables: {
      businessId: businessId,
    },
  });
  const getArchivedSales = useGetArchivedSalesByBusinessQuery({
    variables: {
      businessId: businessId,
    },
  });
  if (getBusinessesByUserId.loading) {
    return <MainLoader />;
  }
  const salesLoading = getSalesByBusiness.loading || getArchivedSales.loading;
  return (
    <>
      {salesLoading ? (
        <Loader2 />
      ) : (
        <div className=" px-[52px] bg-primary-whiteTint pt-[47px] pb-[20px] gap-y-[30px] flex flex-col">
          <div className=" flex flex-row justify-between items-center">
            <div className=" flex flex-col gap-y-5">
              <Link href="/dashboard/invoices">
                <button className=" flex flex-row gap-x-2 text-primary-greytext items-center">
                  <ArrowLeft className=" w-4 h-4" /> Back to invoices
                </button>
              </Link>
              <p className=" text-primary-black text-2xl">
                Complete invoice list
              </p>
            </div>
            <div className=" flex gap-x-[14px] max-h-[48px]">
              {/* <FilterDataDropdown /> */}
              <button className=" px-6 py-3 rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white">
                Create invoice
                <PlusCircle className=" w-5 h-5" />
              </button>
            </div>
          </div>
          <AllInvoicesList />
        </div>
      )}
    </>
  );
};

export default AllInvoices;
