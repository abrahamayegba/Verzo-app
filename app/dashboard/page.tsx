"use client";
import React, { useEffect, useState } from "react";
import ImportDataDropdown from "@/components/ImportDataDropdown";
import Metrics from "@/components/Metrics";
import RecentMetrics from "@/components/RecentMetrics";
import useModal from "../hooks/useModal";
import FilterDataDropdown from "@/components/FilterDataDropdown";
import {
  useGetBusinessesByUserIdQuery,
  useGetExpenseForMonthQuery,
  useGetExpenseForQuarterQuery,
  useGetExpenseForWeekQuery,
  useGetExpenseForYearQuery,
  useGetExpensesByBusinessQuery,
  useGetPurchaseByBusinessQuery,
  useGetPurchaseForMonthQuery,
  useGetPurchaseForQuarterQuery,
  useGetPurchaseForWeekQuery,
  useGetPurchaseForYearQuery,
  useGetSaleByBusinessQuery,
  useTotalMonthlyInvoicesAmountQuery,
  useTotalQuarterlyInvoicesAmountQuery,
  useTotalWeeklyInvoicesAmountQuery,
  useTotalYearlyInvoicesAmountQuery,
} from "@/src/generated/graphql";
import localStorage from "local-storage-fallback";
import MainLoader from "@/components/loading/MainLoader";
import Loader2 from "@/components/loading/Loader2";
import { useRouter } from "next/navigation";
import { getToken, isAuthenticated } from "@/lib/auth";
import UploadCustomerCSV from "@/components/modals/customer/UploadCustomerModal";
import UploadMerchantCSV from "@/components/modals/UploadMerchantModal";
import UploadProductCSV from "@/components/modals/product/UploadProductModal";
import UploadServiceCSV from "@/components/modals/service/UploadServiceModal";

const Dashboard = () => {
  const {
    isOpen: isImportMerchantModalOpen,
    openModal: openImportMerchantModal,
    closeModal: closeImportMerchantModal,
  } = useModal();
  const {
    isOpen: isImportProductModalOpen,
    openModal: openImportProductModal,
    closeModal: closeImportProductModal,
  } = useModal();
  const {
    isOpen: isImportServiceModalOpen,
    openModal: openImportServiceModal,
    closeModal: closeImportServiceModal,
  } = useModal();
  const {
    isOpen: isImportCustomerModalOpen,
    openModal: openImportCustomerModal,
    closeModal: closeImportCustomerModal,
  } = useModal();
  const token = getToken();
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
  useEffect(() => {
    if (getBusinessesByUserId.data && !businessId) {
      router.push("/auth/businesssetup");
    }
  }, [getBusinessesByUserId.data, businessId, router]);
  useEffect(() => {
    const fetchData = async () => {
      await getBusinessesByUserId.refetch();
    };
    fetchData();
  }, [token, getBusinessesByUserId]);

  const [selectedFilter, setSelectedFilter] = useState("weekly");
  const handleFilterChange = (filter: any) => {
    setSelectedFilter(filter);
  };
  // Weekly Queries
  const totalWeeklyInvoicesAmountQuery = useTotalWeeklyInvoicesAmountQuery({
    variables: {
      businessId: businessId,
      weekly: true,
    },
  });
  const getExpenseForWeek = useGetExpenseForWeekQuery({
    variables: {
      businessId: businessId,
      weekly: true,
    },
  });
  const getPurchaseForWeek = useGetPurchaseForWeekQuery({
    variables: {
      businessId: businessId,
      weekly: true,
    },
  });
  // Monthly Queries
  const totalMonthlyInvoicesAmount = useTotalMonthlyInvoicesAmountQuery({
    variables: {
      businessId: businessId,
      monthly: true,
    },
  });
  const getExpenseForMonth = useGetExpenseForMonthQuery({
    variables: {
      businessId: businessId,
      monthly: true,
    },
  });
  const getPurchaseForMonth = useGetPurchaseForMonthQuery({
    variables: {
      businessId: businessId,
      monthly: true,
    },
  });
  // Quarterly Queries
  const totalQuarterlyInvoicesAmount = useTotalQuarterlyInvoicesAmountQuery({
    variables: {
      businessId: businessId,
      quarterly: true,
    },
  });
  const getExpenseForQuarter = useGetExpenseForQuarterQuery({
    variables: {
      businessId: businessId,
      quarterly: true,
    },
  });
  const getPurchaseForQuarter = useGetPurchaseForQuarterQuery({
    variables: {
      businessId: businessId,
      quarterly: true,
    },
  });
  // Yearly Queries
  const totalYearlyInvoicesAmount = useTotalYearlyInvoicesAmountQuery({
    variables: {
      businessId: businessId,
      yearly: true,
    },
  });
  const getExpenseForYear = useGetExpenseForYearQuery({
    variables: {
      businessId: businessId,
      yearly: true,
    },
  });
  const getPurchaseForYear = useGetPurchaseForYearQuery({
    variables: {
      businessId: businessId,
      yearly: true,
    },
  });

  const getExpensesByBusiness = useGetExpensesByBusinessQuery({
    variables: {
      businessId: businessId,
    },
  });

  const getPurchasesByBusiness = useGetPurchaseByBusinessQuery({
    variables: {
      businessId: businessId,
    },
  });

  const getSalesByBusiness = useGetSaleByBusinessQuery({
    variables: {
      businessId: businessId,
    },
  });

  if (getBusinessesByUserId.loading) {
    return <MainLoader />;
  }

  const metricsLoading =
    getExpenseForWeek.loading ||
    getPurchaseForWeek.loading ||
    getSalesByBusiness.loading ||
    totalWeeklyInvoicesAmountQuery.loading ||
    totalMonthlyInvoicesAmount.loading ||
    getExpenseForMonth.loading ||
    getPurchaseForMonth.loading ||
    totalQuarterlyInvoicesAmount.loading ||
    getExpenseForQuarter.loading ||
    getPurchaseForQuarter.loading ||
    totalYearlyInvoicesAmount.loading ||
    getExpenseForYear.loading ||
    getPurchaseForYear.loading ||
    getExpensesByBusiness.loading ||
    getPurchasesByBusiness.loading;

  return (
    <>
      {metricsLoading ? (
        <Loader2 />
      ) : (
        <div className=" px-[52px] bg-primary-whiteTint pt-[47px] pb-[20px] gap-y-[36px] flex flex-col max-w-[1680px] mx-auto">
          <div className=" flex flex-row justify-between items-center">
            <div className=" flex flex-col  gap-y-2">
              <p className=" text-primary-black font-medium text-3xl">
                Dashboard
              </p>
              <p className=" text-primary-greytext">
                Manage your business on Verzo
              </p>
            </div>
            <div className=" flex gap-x-[14px] max-h-[48px]">
              <FilterDataDropdown
                selectedFilter={selectedFilter}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>
          <Metrics filter={selectedFilter!} />
          <RecentMetrics />
          <UploadCustomerCSV
            open={isImportCustomerModalOpen}
            openModal={openImportCustomerModal}
            onClose={closeImportCustomerModal}
          />
          <UploadMerchantCSV
            open={isImportMerchantModalOpen}
            openModal={openImportMerchantModal}
            onClose={closeImportMerchantModal}
          />
          <UploadProductCSV
            open={isImportProductModalOpen}
            openModal={openImportProductModal}
            onClose={closeImportProductModal}
          />
          <UploadServiceCSV
            open={isImportServiceModalOpen}
            openModal={openImportServiceModal}
            onClose={closeImportServiceModal}
          />
        </div>
      )}
    </>
  );
};

export default Dashboard;
