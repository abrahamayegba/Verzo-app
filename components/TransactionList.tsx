"use client";
import React from "react";
import localStorage from "local-storage-fallback";
import { useViewBusinessAccountStatementQuery } from "@/src/generated/graphql";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import TransactionTabContentAll from "./TransactionTabContentAll";

const TransactionList = () => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";

  const { data } = useViewBusinessAccountStatementQuery({
    variables: {
      businessId: businessId,
    },
  });

  const allTransactions = data?.viewBusinessAccountStatement?.length ?? 0;

  return (
    <>
      <div className=" w-full flex flex-col">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className=" mb-3 flex justify-between border-b border-b-gray-100">
            <div className=" gap-x-[30px] flex">
              <TabsTrigger
                className=" text-[17px]  data-[state=active]:text-primary-black data-[state=active]:border-b-2 data-[state=active]:border-b-gray-400  text-primary-greytext"
                value="all"
              >
                All{" "}
                <span className=" text-primary-mainGrey">
                  ({allTransactions})
                </span>
              </TabsTrigger>
            </div>
          </TabsList>
          <TabsContent value="all">
            <TransactionTabContentAll />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default TransactionList;
