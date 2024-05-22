"use client";
import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import CustomerList from "@/components/CustomerList";
import CreateCustomerSheet from "@/components/sheets/customer/CreateCustomerSheet";
import {
  useGetArchivedCustomersByBusinessQuery,
  useGetBusinessesByUserIdQuery,
  useGetCustomerByBusinessQuery,
} from "@/src/generated/graphql";
import MainLoader from "@/components/loading/MainLoader";
import localStorage from "local-storage-fallback";
import Loader2 from "@/components/loading/Loader2";
import { isAuthenticated } from "@/lib/auth";
import { useRouter, useSearchParams } from "next/navigation";

const Customers = () => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const router = useRouter();
  const getBusinessesByUserId = useGetBusinessesByUserIdQuery();

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      if (!authenticated) {
        router.push("/auth/signin");
      }
    };
    checkAuth();
  }, [router]);

  const searchResultsParams = useSearchParams();
  const customerSearchId = searchResultsParams.get("searchResult")?.toString();
  const [openCustomerSheet, setOpenCustomerSheet] = useState(false);

  const getCustomerByBusiness = useGetCustomerByBusinessQuery({
    variables: {
      businessId: businessId,
      sets: 1,
      cursor: null,
    },
  });
  const getArchivedCustomer = useGetArchivedCustomersByBusinessQuery({
    variables: {
      businessId: businessId,
      sets: 1,
      cursor: null,
    },
  });
  const handleCloseCustomerSheet = () => {
    setOpenCustomerSheet(false);
  };
  if (getBusinessesByUserId.loading) {
    return <MainLoader />;
  }

  const customersLoading =
    getCustomerByBusiness.loading || getArchivedCustomer.loading;

  return (
    <>
      {customersLoading ? (
        <Loader2 />
      ) : (
        <>
          <div className=" px-[52px] pt-[47px] gap-y-[36px] flex flex-col">
            <div className=" flex flex-row justify-between items-center">
              <div className=" flex flex-col  gap-y-2">
                <p className=" text-primary-black font-medium text-3xl">
                  Customers
                </p>
                <p className=" text-primary-greytext">
                  Add and manage customers
                </p>
              </div>
              <div className=" flex gap-x-[14px] max-h-[48px]">
                <button
                  onClick={() => setOpenCustomerSheet(true)}
                  className=" px-6 py-3 rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white"
                >
                  Add customer
                  <PlusCircle className=" w-5 h-5" />
                </button>
              </div>
            </div>
            <CustomerList customerSearchId={customerSearchId!} />
          </div>
          <CreateCustomerSheet
            open={openCustomerSheet}
            onClose={handleCloseCustomerSheet}
          />
        </>
      )}
    </>
  );
};

export default Customers;
