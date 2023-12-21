"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ProductTabContentAll from "../ProductTabContentAll";
import ProductTabContentArchived from "../ProductTabContentArchived";
import ProfileContent from "./ProfileContent";
import BusinessProfileContent from "./BusinessProfileContent";
import PlanContent from "./PlanContent";
import AddonsContent from "./AddonsContent";

const SettingsContent = () => {
  return (
    <div className=" w-full flex flex-col">
      <Tabs defaultValue="profile" className="w-full">
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
          </div>
        </TabsList>
        <TabsContent value="profile">
          <ProfileContent />
        </TabsContent>
        <TabsContent value="businessprofile">
          <BusinessProfileContent />
        </TabsContent>
        <TabsContent value="planandbillings">
          <PlanContent />
        </TabsContent>
        <TabsContent value="addons">
          <AddonsContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsContent;
