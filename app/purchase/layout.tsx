"use client";
import Topbar from "@/components/Topbar";

export default function CreateLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" bg-primary-background">
      <div className="min-h-screen flex flex-col">
        <Topbar />
        <main className=" px-[172px] py-[80px]">{children}</main>
      </div>
    </div>
  );
}
