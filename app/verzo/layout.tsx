"use client";
export default function CreateLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" bg-blue-50 bg-opacity-60">
      <div className="min-h-screen flex flex-col">
        <main>{children}</main>
      </div>
    </div>
  );
}
