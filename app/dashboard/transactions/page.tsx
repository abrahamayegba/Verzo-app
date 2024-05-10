"use client";
import React, { useEffect } from "react";
import {
  useGetBusinessesByUserIdQuery,
  useViewBusinessAccountStatementQuery,
} from "@/src/generated/graphql";
import MainLoader from "@/components/loading/MainLoader";
import localStorage from "local-storage-fallback";
import Loader2 from "@/components/loading/Loader2";
import { isAuthenticated } from "@/lib/auth";
import { useRouter } from "next/navigation";
import TransactionList from "@/components/TransactionList";

const Transactions = () => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/signin");
    }
  }, [router]);

  const { loading } = useViewBusinessAccountStatementQuery({
    variables: {
      businessId: businessId,
    },
  });
  const getBusinessesByUserId = useGetBusinessesByUserIdQuery();

  if (getBusinessesByUserId.loading) {
    return <MainLoader />;
  }

  return (
    <>
      {loading ? (
        <Loader2 />
      ) : (
        <>
          <div className=" px-[52px] pt-[47px] gap-y-[36px] flex flex-col">
            <div className=" flex flex-row justify-between items-center">
              <div className=" flex flex-col  gap-y-2">
                <p className=" text-primary-black font-medium text-3xl">
                  Transactions
                </p>
                <p className=" text-primary-greytext">
                  View and manage your transactions
                </p>
              </div>
            </div>
            <TransactionList />
          </div>
        </>
      )}
    </>
  );
};

export default Transactions;
