"use client";
import React, { useEffect, useState } from "react";
import SettingsContent from "@/components/Settings/SettingsContent";
import Banner from "@/components/Settings/SettingsBanner";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import localStorage from "local-storage-fallback";
import {
  useGetBusinessByIdQuery,
  useGetBusinessesByUserIdQuery,
  useGetCurrentSubscriptionByBusinessQuery,
  useViewBusinessAccountQuery,
} from "@/src/generated/graphql";
import MainLoader from "@/components/loading/MainLoader";

const Settings = () => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const [showBillingBanner, setShowBillingBanner] = useState(true);
  const getBusinessById = useGetBusinessByIdQuery({
    variables: {
      businessId: businessId,
    },
  });

  const getCurrentSubscriptionByBusiness =
    useGetCurrentSubscriptionByBusinessQuery({
      variables: {
        businessId: businessId,
      },
    });

  const getBusinessesByUserId = useGetBusinessesByUserIdQuery();
  const viewBusinessAccount = useViewBusinessAccountQuery({
    variables: {
      businessId: businessId,
    },
  });
  const handleBillingBannerClick = () => {
    setShowBillingBanner(false);
  };
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

  if (
    getBusinessesByUserId.loading ||
    getBusinessById.loading ||
    getCurrentSubscriptionByBusiness.loading ||
    viewBusinessAccount.loading
  ) {
    return <MainLoader />;
  }

  return (
    <>
      {showBillingBanner && <Banner onClose={handleBillingBannerClick} />}
      <div className=" px-[52px] bg-primary-whiteTint mt-[24px] pb-[20px] gap-y-[36px] flex flex-col">
        <div className=" flex flex-col  gap-y-2">
          <p className=" text-primary-black font-medium text-3xl">Settings</p>
          <p className=" text-primary-greytext">
            Adjust personal and business settings
          </p>
        </div>
        <SettingsContent />
      </div>
    </>
  );
};

export default Settings;
