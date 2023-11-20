"use client";
import React, { useState } from "react";
import SettingsContent from "@/components/SettingsContent";
import Banner from "@/components/SettingsBanner";

const Settings = () => {
  const [showDiscountBanner, setShowDiscountBanner] = useState(true);

  const handleDiscountBannerClick = () => {
    setShowDiscountBanner(false);
  };

  return (
    <>
      {showDiscountBanner && <Banner onClose={handleDiscountBannerClick} />}
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
