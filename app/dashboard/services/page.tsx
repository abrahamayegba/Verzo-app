"use client";
import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import localStorage from "local-storage-fallback";
import ServiceList from "@/components/ServiceList";
import CreateServiceSheet from "@/components/sheets/service/CreateServiceSheet";
import {
  useGetArchivedServiceByBusinessQuery,
  useGetBusinessesByUserIdQuery,
  useGetServiceByBusinessQuery,
} from "@/src/generated/graphql";
import MainLoader from "@/components/loading/MainLoader";
import Loader2 from "@/components/loading/Loader2";
import { useRouter, useSearchParams } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

const Services = () => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const router = useRouter();
  const searchResultsParams = useSearchParams();
  const serviceSearchId = searchResultsParams.get("searchResult")?.toString();
  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      if (!authenticated) {
        router.push("/auth/signin");
      }
    };
    checkAuth();
  }, [router]);

  const [openCreateServiceSheet, setOpenCreateServiceSheet] = useState(false);
  const getBusinessesByUserId = useGetBusinessesByUserIdQuery();
  const getServicesByBusiness = useGetServiceByBusinessQuery({
    variables: {
      businessId: businessId,
      cursor: null,
      sets: 1,
    },
  });
  const getArchivedServices = useGetArchivedServiceByBusinessQuery({
    variables: {
      businessId: businessId,
      cursor: null,
      sets: 1,
    },
  });
  const handleCloseServiceSheet = () => {
    setOpenCreateServiceSheet(false);
  };
  if (getBusinessesByUserId.loading) {
    return <MainLoader />;
  }
  const servicesLoading =
    getServicesByBusiness.loading || getArchivedServices.loading;
  return (
    <>
      {servicesLoading ? (
        <Loader2 />
      ) : (
        <div className=" px-[52px] bg-primary-whiteTint pt-[47px] pb-[20px] gap-y-[36px] flex flex-col">
          <div className=" flex flex-row justify-between items-center">
            <div className=" flex flex-col  gap-y-2">
              <p className=" text-primary-black font-medium text-3xl">
                Services
              </p>
              <p className=" text-primary-greytext">
                Create and manage services
              </p>
            </div>
            <div className=" flex gap-x-[14px] max-h-[48px]">
              <button
                onClick={() => setOpenCreateServiceSheet(true)}
                className=" px-6 py-3 rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white"
              >
                Add service
                <PlusCircle className=" w-5 h-5" />
              </button>
            </div>
          </div>
          <ServiceList serviceSearchId={serviceSearchId!} />
        </div>
      )}
      <CreateServiceSheet
        open={openCreateServiceSheet}
        onClose={handleCloseServiceSheet}
      />
    </>
  );
};

export default Services;
