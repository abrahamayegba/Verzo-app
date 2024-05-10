"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import TeamTabContentAll from "./TeamTabContent";
import { useGetUsersByBusinessQuery } from "@/src/generated/graphql";
import localStorage from "local-storage-fallback";
import Loader2 from "./loading/Loader2";

const TeamList = () => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";

  const { data, loading } = useGetUsersByBusinessQuery({
    variables: {
      businessId: businessId,
    },
  });
  const users = data?.getUsersByBusiness ?? [];
  const allUsers = users?.length;
  return (
    <>
      {loading ? (
        <Loader2 />
      ) : (
        <div className=" w-full flex flex-col">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className=" mb-3 flex justify-between border-b border-b-gray-100">
              <div className=" gap-x-[30px] flex">
                <TabsTrigger
                  className=" text-[17px]  data-[state=active]:text-primary-black data-[state=active]:border-b-2 data-[state=active]:border-b-gray-400  text-primary-greytext"
                  value="all"
                >
                  All{" "}
                  <span className=" text-primary-mainGrey">({allUsers})</span>
                </TabsTrigger>
              </div>
            </TabsList>
            <TabsContent value="all">
              <TeamTabContentAll />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  );
};

export default TeamList;
