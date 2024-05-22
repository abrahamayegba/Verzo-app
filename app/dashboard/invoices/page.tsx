"use client";
import React, { useEffect, useState } from "react";
import InvoiceList from "@/components/Invoice/InvoiceList";
import InvoiceMetrics from "@/components/Invoice/InvoiceMetrics";
import { PlusCircle } from "lucide-react";
import FilterDataDropdown from "@/components/FilterDataDropdown";
import Link from "next/link";
import localStorage from "local-storage-fallback";
import {
  useGetArchivedSalesByBusinessQuery,
  useGetBusinessesByUserIdQuery,
  useGetSaleByBusinessQuery,
  useTotalMonthlyInvoicesAmountQuery,
  useTotalQuarterlyInvoicesAmountQuery,
  useTotalWeeklyInvoicesAmountQuery,
  useTotalYearlyInvoicesAmountQuery,
} from "@/src/generated/graphql";
import MainLoader from "@/components/loading/MainLoader";
import Loader2 from "@/components/loading/Loader2";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

const Invoices = () => {
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

  const [selectedFilter, setSelectedFilter] = useState("weekly");
  const handleFilterChange = (filter: any) => {
    setSelectedFilter(filter);
  };
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

  const totalWeeklyInvoicesAmountQuery = useTotalWeeklyInvoicesAmountQuery({
    variables: {
      businessId: businessId,
      weekly: true,
    },
  });

  const totalMonthlyInvoicesAmountQuery = useTotalMonthlyInvoicesAmountQuery({
    variables: {
      businessId: businessId,
      monthly: true,
    },
  });

  const totalQuarterlyInvoicesAmountQuery =
    useTotalQuarterlyInvoicesAmountQuery({
      variables: {
        businessId: businessId,
        quarterly: true,
      },
    });
  const totalYearlyInvoicesAmountQuery = useTotalYearlyInvoicesAmountQuery({
    variables: {
      businessId: businessId,
      yearly: true,
    },
  });

  if (getBusinessesByUserId.loading) {
    return <MainLoader />;
  }

  const metricsLoading =
    getSalesByBusiness.loading ||
    totalWeeklyInvoicesAmountQuery.loading ||
    totalMonthlyInvoicesAmountQuery.loading ||
    totalQuarterlyInvoicesAmountQuery.loading ||
    totalYearlyInvoicesAmountQuery.loading ||
    getArchivedSales.loading;

  return (
    <>
      {metricsLoading ? (
        <Loader2 />
      ) : (
        <div className=" px-[52px] bg-primary-whiteTint pt-[47px] pb-[20px] gap-y-[36px] flex flex-col">
          <div className=" flex flex-row justify-between items-center">
            <div className=" flex flex-col  gap-y-2">
              <p className=" text-primary-black font-medium text-3xl">
                Invoices
              </p>
              <p className=" text-primary-greytext">
                Create and manage your invoices
              </p>
            </div>
            <div className=" flex gap-x-[14px] max-h-[48px]">
              <FilterDataDropdown
                onFilterChange={handleFilterChange}
                selectedFilter={selectedFilter}
              />
              <Link href="/invoice/createinvoice">
                <button className=" px-6 py-3 rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white">
                  Create invoice
                  <PlusCircle className=" w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
          <InvoiceMetrics filter={selectedFilter} />
          <InvoiceList />
        </div>
      )}
    </>
  );
};

export default Invoices;
