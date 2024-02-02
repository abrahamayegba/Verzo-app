"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ProfileContent from "./ProfileContent";
import BusinessProfileContent from "./BusinessProfileContent";
import PlanContent from "./PlanContent";
import AddonsContent from "./AddonsContent";
import BulkUploadContent from "./BulkUploadContent";
import { useSearchParams } from "next/navigation";

const SettingsContent = () => {
  const referenceParams = useSearchParams();
  const reference = referenceParams.get("reference");
  return (
    <div className=" w-full flex flex-col">
      <Tabs
        defaultValue={reference ? "planandbillings" : "profile"}
        className="w-full"
      >
        <TabsList className=" mb-3 flex justify-between border-b border-b-gray-100">
          <div className=" gap-x-[30px] flex">
            <TabsTrigger
              className=" text-[17px]  data-[state=active]:text-primary-black data-[state=active]:border-b-2 data-[state=active]:border-b-gray-400  text-primary-greytext"
              value="profile"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              className=" text-[17px]  data-[state=active]:text-primary-black text-primary-greytext data-[state=active]:border-b-2 data-[state=active]:border-b-gray-400"
              value="businessprofile"
            >
              Business profile
            </TabsTrigger>
            <TabsTrigger
              className=" text-[17px]  data-[state=active]:text-primary-black text-primary-greytext data-[state=active]:border-b-2 data-[state=active]:border-b-gray-400"
              value="planandbillings"
            >
              Plan and billing
            </TabsTrigger>
            <TabsTrigger
              className=" text-[17px]  data-[state=active]:text-primary-black text-primary-greytext data-[state=active]:border-b-2 data-[state=active]:border-b-gray-400"
              value="addons"
            >
              Add-ons
            </TabsTrigger>
            <TabsTrigger
              className=" text-[17px]  data-[state=active]:text-primary-black text-primary-greytext data-[state=active]:border-b-2 data-[state=active]:border-b-gray-400"
              value="bulkuploads"
            >
              Upload data
            </TabsTrigger>
          </div>
        </TabsList>
        <TabsContent value="profile">
          <ProfileContent />
        </TabsContent>
        <TabsContent value="businessprofile">
          <BusinessProfileContent />
        </TabsContent>
        <TabsContent value="planandbillings">
          <PlanContent reference={reference!} />
        </TabsContent>
        <TabsContent value="addons">
          <AddonsContent />
        </TabsContent>
        <TabsContent value="bulkuploads">
          <BulkUploadContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsContent;
