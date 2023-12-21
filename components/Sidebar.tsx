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
import ActiveInvoiceIcon from "./ui/icons/ActiveInvoiceIcon";
import ActiveCustomerIcon from "./ui/icons/ActiveCustomerIcon";
import ActiveExpenseIcon from "./ui/icons/ActiveExpenseIcon";
import ActivePurchaseIcon from "./ui/icons/ActivePurchaseIcon";
import ActiveProductIcon from "./ui/icons/ActiveProductIcon";
import ActiveServiceIcon from "./ui/icons/ActiveServiceIcon";
import LogoutModal from "./modals/LogoutModal";
import useModal from "@/app/hooks/useModal";

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
    path: "/dashboard/customers",
  },
  {
    id: 4,
    icon: <ExpenseIcon />,
    activeicon: <ActiveExpenseIcon />,
    text: "Expenses",
    path: "/dashboard/expenses",
    path2: "/dashboard/expenses/allexpenses",
  },
  {
    id: 5,
    icon: <PurchaseIcon />,
    activeicon: <ActivePurchaseIcon />,
    text: "Purchases",
    path: "/dashboard/purchases",
    path2: "/dashboard/purchases/allpurchases",
  },
  {
    id: 6,
    icon: <ProductsIcon />,
    activeicon: <ActiveProductIcon />,
    text: "Products",
    path: "/dashboard/products",
  },
  {
    id: 7,
    icon: <ServiceIcon />,
    activeicon: <ActiveServiceIcon />,
    text: "Services",
    path: "/dashboard/services",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  const {
    isOpen: isLogoutModalOpen,
    openModal: openLogoutModal,
    closeModal: closeLogoutModal,
  } = useModal();

  return (
    <div className="hidden md:fixed md:inset-y-0 md:z-50 md:flex lg:flex-col">
      <div className="group mt-[80px] w-[100px] overflow-hidden border-r border-[#f4f4f4] bg-white transition-all duration-300 ease-in-out hover:w-[284px] hover:shadow-sm">
        <div className="flex h-screen flex-col justify-between pb-[150px] pt-2">
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
                          pathname === item.path ||
                          (item.path2 && pathname.startsWith(item.path2))
                            ? "bg-primary-bluetint"
                            : " hover:bg-gray-50"
                        }`}
                      >
                        <span className="py-[2px]">
                          {pathname === item.path ||
                          (item.path2 && pathname.startsWith(item.path2))
                            ? item.activeicon
                            : item.icon}
                        </span>
                        <span
                          className={`hidden tracking-[-0.3px] group-hover:block text-[17px] w-[170px] ${
                            pathname === item.path ||
                            (item.path2 && pathname.startsWith(item.path2))
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
            <ul className="">
              <li key={12} className="min-w-max">
                <button
                  onClick={openLogoutModal}
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
                      className={`hidden text-start tracking-[-0.3px] group-hover:block text-[17px] w-[170px] ${
                        pathname === "logout" ? " text-primary-blue" : ""
                      }`}
                    >
                      {"Logout"}
                    </span>
                  </div>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <LogoutModal
        open={isLogoutModalOpen}
        openModal={openLogoutModal}
        onClose={closeLogoutModal}
      />
    </div>
  );
};

export default Sidebar;
