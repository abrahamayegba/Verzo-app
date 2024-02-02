"use client";
export default function CreateLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" bg-white">
      <div className="min-h-screen flex flex-col">
        <main>{children}</main>
      </div>
    </div>
  );
}
