"use client";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function Dashboard2Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" bg-primary-whiteTint">
      <div className="min-h-screen flex flex-col">
        <Topbar />
        <Sidebar />
        <main className="py-[80px] md:pl-[100px]">{children}</main>
      </div>
    </div>
  );
}
