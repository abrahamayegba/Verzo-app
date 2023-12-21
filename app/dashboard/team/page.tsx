"use client";
import React, { useEffect } from "react";
import { PlusCircle } from "lucide-react";
import TeamList from "@/components/TeamList";
import { useGetBusinessesByUserIdQuery } from "@/src/generated/graphql";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import MainLoader from "@/components/loading/MainLoader";
import localStorage from "local-storage-fallback";

const Team = () => {
  const getBusinessesByUserId = useGetBusinessesByUserIdQuery();
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/signin");
    }
  }, [router]);

  if (getBusinessesByUserId.loading) {
    return <MainLoader />;
  }

  return (
    <div className=" px-[52px] bg-primary-whiteTint pt-[47px] pb-[20px] gap-y-[36px] flex flex-col">
      <div className=" flex flex-row justify-between items-center">
        <div className=" flex flex-col  gap-y-2">
          <p className=" text-primary-black font-medium text-3xl">Teams</p>
          <p className=" text-primary-greytext">
            Invite members of your team to Verzo
          </p>
        </div>
        <div className=" flex gap-x-[14px] max-h-[48px]">
          <button className=" px-6 py-3 rounded-[10px] flex gap-x-2 items-center justify-center border border-primary-border">
            Roles
          </button>
          <button className=" px-6 py-3 rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white">
            Add member
            <PlusCircle className=" w-5 h-5" />
          </button>
        </div>
      </div>
      <TeamList />
    </div>
  );
};

export default Team;
