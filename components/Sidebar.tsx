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
import TeamIcon from "./ui/icons/TeamIcon";
import AccountsIcon from "./ui/icons/AccountsIcon";
import AddBusinessIcon from "./ui/icons/AddBusinessIcon";
import ActiveInvoiceIcon from "./ui/icons/ActiveInvoiceIcon";
import ActiveCustomerIcon from "./ui/icons/ActiveCustomerIcon";

const sidebarItems = [
  {
    id: 1,
    icon: <DashboardIcon />,
    activeicon: <ActiveDashboardIcon />,
    text: "Dashboard",
    path: "/dashboard",
  },
  {
    id: 2,
    icon: <InvoiceIcon />,
    activeicon: <ActiveInvoiceIcon />,
    text: "Invoices",
    path: "/dashboard/invoices",
    path2: "/dashboard/invoices/allinvoices",
  },
  {
    id: 3,
    icon: <CustomerIcon />,
    activeicon: <ActiveCustomerIcon />,
    text: "Customers",
    path: "/customers",
  },
  { id: 4, icon: <ExpenseIcon />, text: "Expenses", path: "/expenses" },
  { id: 5, icon: <PurchaseIcon />, text: "Purchases", path: "/purchases" },
  { id: 6, icon: <ProductsIcon />, text: "Products", path: "/products" },
  { id: 7, icon: <ServiceIcon />, text: "Services", path: "/services" },
  { id: 8, icon: <TeamIcon />, text: "Team", path: "/team" },
  { id: 9, icon: <AccountsIcon />, text: "Accounts", path: "/accounts" },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="hidden md:fixed md:inset-y-0 md:z-50 md:flex lg:flex-col">
      <div className="group mt-[80px] w-[100px] overflow-hidden border-r border-[#f4f4f4] bg-white transition-all duration-300 ease-in-out hover:w-[284px] hover:shadow-sm">
        <div className="flex h-screen flex-col justify-between pb-[100px] pt-2">
          <div className=" flex flex-col min-h-full justify-between">
            <p className=" text-[13px] mt-3.5 absolute text-primary-mainGrey group hidden group-hover:block px-7">
              FEATURES
            </p>
            <ul className="mt-10 relative group group-hover:mt-10 space-y-3">
              {sidebarItems.map((item) => (
                <li key={item.id} className="min-w-max">
                  <Link href={item.path}>
                    <div
                      className={`relative flex items-center px-6 text-white group-hover:w-[284px]`}
                    >
                      <div
                        className={`group flex flex-row items-center px-3 rounded-lg py-2 gap-x-[14px] text-primary-greytext ${
                          pathname === item.path || item.path2
                            ? "bg-primary-bluetint"
                            : " hover:bg-gray-50"
                        }`}
                      >
                        <span className="py-[2px]">
                          {pathname === item.path || item.path2
                            ? item.activeicon
                            : item.icon}
                        </span>
                        <span
                          className={`hidden tracking-[-0.3px] group-hover:block text-[17px] w-[170px] ${
                            pathname === item.path || item.path2
                              ? " text-primary-blue"
                              : ""
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
            <ul className=" relative">
              <p className=" text-[13px] mt-[-3px] absolute text-primary-mainGrey group hidden group-hover:block px-7">
                BUSINESS
              </p>
              <li key={11} className="min-w-max mt-6">
                <Link href={"/logout"}>
                  <div
                    className={`relative flex items-center px-6 text-white group-hover:w-[284px]`}
                  >
                    <div
                      className={`group flex flex-row items-center px-3 rounded-lg py-2 gap-x-[14px] hover:bg-gray-50 text-primary-greytext`}
                    >
                      <span className="py-[2px] rounded-full w-[30px] h-[30px] bg-[#F9FCFF] flex items-center justify-center">
                        <AddBusinessIcon />
                      </span>
                      <span className="hidden tracking-[-0.3px] group-hover:block text-[17px] w-[170px]">
                        {"Add Business"}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            </ul>
            <ul className="">
              <li key={12} className="min-w-max">
                <Link href={"/logout"}>
                  <div
                    className={`relative flex items-center px-6 text-white group-hover:w-[284px]`}
                  >
                    <div
                      className={`group flex flex-row ml-[2.5px] items-center px-3 rounded-lg py-2 gap-x-[14px] text-primary-greytext ${
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

// enw changes
