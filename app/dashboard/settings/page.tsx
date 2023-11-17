import React from "react";
import SettingsContent from "@/components/SettingsContent";

const Settings = () => {
  return (
    <div className=" px-[52px] bg-primary-whiteTint pt-[47px] pb-[20px] gap-y-[36px] flex flex-col">
      <div className=" flex flex-col  gap-y-2">
        <p className=" text-primary-black font-medium text-3xl">Settings</p>
        <p className=" text-primary-greytext">
          Adjust personal and business settings
        </p>
      </div>
      <SettingsContent />
    </div>
  );
};

export default Settings;
