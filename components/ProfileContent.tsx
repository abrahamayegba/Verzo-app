import React, { useState } from "react";
import ProfileSheet from "./sheets/settings/profile/ProfileSheet";
import SecuritySheet from "./sheets/settings/profile/SecuritySheet";

const ProfileContent = () => {
  const [openProfileSheet, setOpenProfileSheet] = useState(false);
  const [openSecuritySheet, setOpenSecuritySheet] = useState(false);

  const handleCloseProfileSheet = () => {
    setOpenProfileSheet(false);
  };

  const handleCloseSecuritySheet = () => {
    setOpenSecuritySheet(false);
  };

  return (
    <>
      <div className=" flex flex-col w-full pt-[20px] gap-y-3">
        <p className=" text-sm text-primary-greytext px-6">
          Manage data and security
        </p>
        <div className=" bg-white min-h-[366px] flex flex-col rounded-b-[16px] w-full">
          <div className=" flex flex-row justify-between p-6 items-center border-b border-b-gray-100">
            <div className=" flex flex-col gap-y-[6px]">
              <p className=" text-primary-black">Personal information</p>
              <p className=" text-sm text-primary-greytext">
                {" "}
                Name and email address
              </p>
            </div>
            <button
              onClick={() => setOpenProfileSheet(true)}
              className=" px-6 py-3 rounded-[10px] flex text-sm text-primary-black gap-x-2 items-center justify-center border border-primary-border"
            >
              Update
            </button>
          </div>
          <div className=" flex flex-row justify-between p-6 items-center border-b border-b-gray-100">
            <div className=" flex flex-col gap-y-[6px]">
              <p className=" text-primary-black">Security</p>
              <p className=" text-sm text-primary-greytext">Password</p>
            </div>
            <button
              onClick={() => setOpenSecuritySheet(true)}
              className=" px-6 py-3 rounded-[10px] text-sm text-primary-black flex gap-x-2 items-center justify-center border border-primary-border"
            >
              Update
            </button>
          </div>
          <div className=" flex flex-row justify-between p-6 items-center border-b border-b-gray-100">
            <div className=" flex flex-col gap-y-[6px]">
              <p className=" text-primary-black">Authentication</p>
              <p className=" text-sm text-primary-greytext">2FA</p>
            </div>
            <button className=" px-6 py-3 rounded-[10px] text-sm text-primary-black flex gap-x-2 items-center justify-center border border-primary-border">
              Set up
            </button>
          </div>
          <div className=" flex flex-row justify-between p-6 items-center border-b border-b-gray-100">
            <div className=" flex flex-col gap-y-[6px]">
              <p className=" text-primary-black">Notifications</p>
              <p className=" text-sm text-primary-greytext">
                Choose preference
              </p>
            </div>
            <button className=" px-6 py-3 text-sm text-primary-black rounded-[10px] flex gap-x-2 items-center justify-center border border-primary-border">
              Set up
            </button>
          </div>
        </div>
      </div>
      <ProfileSheet open={openProfileSheet} onClose={handleCloseProfileSheet} />
      <SecuritySheet
        open={openSecuritySheet}
        onClose={handleCloseSecuritySheet}
      />
    </>
  );
};

export default ProfileContent;
