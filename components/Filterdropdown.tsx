import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowDownToLine,
  HelpingHand,
  ListFilter,
  ShoppingCart,
} from "lucide-react";

const Filterdropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" focus:outline-none">
        <div className=" px-6 py-3 rounded-[10px] flex gap-x-2 items-center justify-center border border-primary-border text-primary-black">
          Filter
          <ListFilter className=" w-5 h-5" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" bg-white mt-1 text-gray-700 shadow1">
        <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M5.85002 5.85H12.15M5.85002 9.45H12.15M4.32002 2.25H13.68C14.3262 2.25 14.85 2.85442 14.85 3.6V15.75L12.9 14.4L10.95 15.75L9.00002 14.4L7.05002 15.75L5.10002 14.4L3.15002 15.75V3.6C3.15002 2.85442 3.67385 2.25 4.32002 2.25Z"
                stroke="#757575"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Invoice
        </DropdownMenuItem>
        <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M14.4 10.2643C15.3505 10.9745 16.2 12.7625 16.2 13.8642C16.2 14.2075 15.9496 14.4857 15.6407 14.4857H15.3M11.7 7.35336C12.3149 6.99767 12.7286 6.33286 12.7286 5.57143C12.7286 4.80999 12.3149 4.14518 11.7 3.78949M2.35932 14.4857H12.2121C12.521 14.4857 12.7714 14.2075 12.7714 13.8642C12.7714 11.7068 10.969 9.95782 7.2857 9.95782C3.60244 9.95782 1.79999 11.7068 1.79999 13.8642C1.79999 14.2075 2.05041 14.4857 2.35932 14.4857ZM9.34284 5.57142C9.34284 6.70755 8.42183 7.62857 7.2857 7.62857C6.14957 7.62857 5.22856 6.70755 5.22856 5.57142C5.22856 4.4353 6.14957 3.51428 7.2857 3.51428C8.42183 3.51428 9.34284 4.4353 9.34284 5.57142Z"
                stroke="#757575"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          </span>
          Customers
        </DropdownMenuItem>
        <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="16"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M16.1491 5.39999H1.85086M11.2497 7.87497C9.49234 7.87497 6.74969 7.87497 6.74969 7.87497M16.2 5.82491V14.4C16.2 15.3941 15.3941 16.2 14.4 16.2H3.59999C2.60588 16.2 1.79999 15.3941 1.79999 14.4V5.82491C1.79999 5.54547 1.86505 5.26987 1.99002 5.01993L3.22686 2.54625C3.45554 2.08889 3.92299 1.79999 4.43433 1.79999H13.5656C14.077 1.79999 14.5444 2.08889 14.7731 2.54625L16.01 5.01993C16.1349 5.26987 16.2 5.54547 16.2 5.82491Z"
                stroke="#757575"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Products
        </DropdownMenuItem>
        <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              className=" ml-[2px]"
              fill="none"
            >
              <path
                d="M10.241 14.1749H3.04122C2.04713 14.1749 1.24125 13.3691 1.24122 12.375L1.24103 5.62512C1.241 4.63099 2.0469 3.82507 3.04103 3.82507H13.8406C14.8348 3.82507 15.6407 4.6305 15.6406 5.62464L15.6407 8.77507M1.69068 6.97496H15.1907M12.9404 12.0342L16.7589 12.0341"
                stroke="#757575"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Expenses
        </DropdownMenuItem>
        <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2">
          <ShoppingCart className=" w-4 h-4 text-[#757575] ml-[2px]" />
          Purchases
        </DropdownMenuItem>
        <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2">
          <HelpingHand className=" w-4 h-4 text-[#757575] ml-[2px]" />
          Services
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Filterdropdown;
