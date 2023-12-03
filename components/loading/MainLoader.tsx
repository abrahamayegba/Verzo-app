"use client";
import React from "react";
import VerzoLoadingLogo from "@/components/ui/icons/VerzoLoadingLogo";
import Link from "next/link";
import BarLoader from "react-spinners/BarLoader";

const MainLoader = () => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-white">
      <BarLoader height={2} width={220} color="#3b82f6" />
      <div className="absolute left-0 top-0 ml-20 mt-14">
        <VerzoLoadingLogo />
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 transform pb-8">
        <div className="flex items-center gap-7 text-[13px] text-slate-800">
          <Link href="#">About Verzo</Link>
          <div className="h-5 border-l border-gray-300"></div>
          <Link href="#">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default MainLoader;
