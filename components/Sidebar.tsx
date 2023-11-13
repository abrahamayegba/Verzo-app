"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import DashboardIcon from "./ui/icons/DashboardIcon";
import ActiveDashboardIcon from "./ui/icons/ActiveDashboardIcon";
import InvoiceIcon from "./ui/icons/InvoiceIcon";
import CustomerIcon from "./ui/icons/CustomerIcon";
import ProductsIcon from "./ui/icons/ProductsIcon";
import ExpenseIcon from "./ui/icons/ExpenseIcon";
import PurchaseIcon from "./ui/icons/PurchaseIcon";
import ServiceIcon from "./ui/icons/ServiceIcon";
import Logout from "./ui/icons/Logout";

const sidebarItems = [
  { id: 1, icon: <DashboardIcon />, text: "Dashboard", path: "/dashboard" },
  { id: 2, icon: <InvoiceIcon />, text: "Invoices", path: "/invoices" },
  { id: 3, icon: <CustomerIcon />, text: "Customers", path: "/customers" },
  { id: 4, icon: <ExpenseIcon />, text: "Expenses", path: "/expenses" },
  { id: 5, icon: <PurchaseIcon />, text: "Purchases", path: "/purchases" },
  { id: 6, icon: <ProductsIcon />, text: "Products", path: "/products" },
  { id: 7, icon: <ServiceIcon />, text: "Services", path: "/services" },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="hidden md:fixed md:inset-y-0 md:z-50 md:flex lg:flex-col">
      <div className="group mt-[80px] w-[100px] overflow-hidden border-r border-[#f4f4f4] bg-white transition-all duration-300 ease-in-out hover:w-[284px] hover:shadow-sm">
        <div className="flex h-screen flex-col justify-between pb-[150px] pt-2">
          <div className=" flex flex-col min-h-full justify-between">
            <ul className="mt-9 space-y-3">
              {sidebarItems.map((item) => (
                <li key={item.id} className="min-w-max">
                  <Link href={item.path}>
                    <div
                      className={`relative flex items-center px-6 text-white group-hover:w-[284px]`}
                    >
                      <div
                        className={`group flex flex-row items-center px-3 rounded-lg py-2 gap-x-[14px] text-primary-greytext ${
                          pathname === item.path
                            ? "bg-primary-bluetint"
                            : " hover:bg-gray-50"
                        }`}
                      >
                        <span className="py-[2px]">
                          {pathname === item.path ? (
                            <ActiveDashboardIcon />
                          ) : (
                            item.icon
                          )}
                        </span>
                        <span
                          className={`hidden tracking-[-0.3px] group-hover:block text-[17px] w-[170px] ${
                            pathname === item.path ? " text-primary-blue" : ""
                          }`}
                        >
                          {item.text}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="">
              <li key={8} className="min-w-max">
                <Link href={"/logout"}>
                  <div
                    className={`relative flex items-center px-6 text-white group-hover:w-[284px]`}
                  >
                    <div
                      className={`group flex flex-row items-center px-3 rounded-lg py-2 gap-x-[14px] text-primary-greytext ${
                        pathname === "/logout"
                          ? "bg-primary-bluetint"
                          : " hover:bg-gray-50"
                      }`}
                    >
                      <span className="py-[2px]">
                        {pathname === "/logout" ? <Logout /> : <Logout />}
                      </span>
                      <span
                        className={`hidden tracking-[-0.3px] group-hover:block text-[17px] w-[170px] ${
                          pathname === "logout" ? " text-primary-blue" : ""
                        }`}
                      >
                        {"Logout"}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
