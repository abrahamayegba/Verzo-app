import {
  Archive,
  Check,
  Download,
  Eye,
  MoreHorizontal,
  Pen,
  Trash2,
} from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const RecentInvoices = () => {
  return (
    <div className=" min-h-[241px] rounded-[16px] flex flex-col border border-gray-100">
      <div className=" flex justify-between items-center py-[14px] px-6 rounded-t-[10px] ">
        <p className=" text-primary-greytext text-sm">Recent Invoices</p>
        <button className=" text-primary-blue text-sm tracking-[-0.2px]">
          View all
        </button>
      </div>
      <div className=" flex flex-col bg-white h-full rounded-b-[16px]">
        <div className=" border-b border-b-gray-100 min-h-[63px] flex justify-between text-sm items-center px-6">
          <p>#001</p>
          <p className=" text-primary-greytext">Jan 9, 2023</p>
          <div className="bg-green-100 h-[20px] text-xs text-green-800 flex items-baseline rounded-full px-2.5 py-0.5 ">
            <Check className="-ml-1 mr-0.5 h-3 w-3 flex-shrink-0 self-center text-green-500" />
            Paid
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className=" focus:outline-none">
              <MoreHorizontal className=" text-[#c4c4c4]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" bg-white mt-1 text-primary-greytext shadow1 w-[160px] ml-1">
              <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2">
                <Eye className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                View Invoice
              </DropdownMenuItem>
              <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2">
                <Pen className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                Edit Invoice
              </DropdownMenuItem>
              <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2">
                <Download className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                Download Invoice
              </DropdownMenuItem>
              <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2">
                <Archive className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                Archive Invoice
              </DropdownMenuItem>
              <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2">
                <Trash2 className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                Delete Invoice
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className=" border-b border-b-gray-100 min-h-[63px] flex justify-between text-sm items-center px-6">
          <p>#001</p>
          <p className=" text-primary-greytext">Jan 9, 2023</p>
          <div className="bg-green-100 h-[20px] text-xs text-green-800 flex items-baseline rounded-full px-2.5 py-0.5 ">
            <Check className="-ml-1 mr-0.5 h-3 w-3 flex-shrink-0 self-center text-green-500" />
            Paid
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className=" focus:outline-none">
              <MoreHorizontal className=" text-[#c4c4c4]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" bg-white mt-1 text-primary-greytext shadow1 w-[160px] ml-1">
              <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2">
                <Eye className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                View Invoice
              </DropdownMenuItem>
              <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2">
                <Pen className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                Edit Invoice
              </DropdownMenuItem>
              <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2">
                <Download className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                Download Invoice
              </DropdownMenuItem>
              <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2">
                <Archive className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                Archive Invoice
              </DropdownMenuItem>
              <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2">
                <Trash2 className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                Delete Invoice
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className=" min-h-[63px] flex justify-between text-sm items-center px-6">
          <p>#001</p>
          <p className=" text-primary-greytext">Jan 9, 2023</p>
          <div className="bg-green-100 h-[20px] text-xs text-green-800 flex items-baseline rounded-full px-2.5 py-0.5 ">
            <Check className="-ml-1 mr-0.5 h-3 w-3 flex-shrink-0 self-center text-green-500" />
            Paid
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className=" focus:outline-none">
              <MoreHorizontal className=" text-[#c4c4c4]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" bg-white mt-1 text-primary-greytext shadow1 w-[160px] ml-1">
              <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2">
                <Eye className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                View Invoice
              </DropdownMenuItem>
              <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2">
                <Pen className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                Edit Invoice
              </DropdownMenuItem>
              <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2">
                <Download className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                Download Invoice
              </DropdownMenuItem>
              <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2">
                <Archive className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                Archive Invoice
              </DropdownMenuItem>
              <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2">
                <Trash2 className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                Delete Invoice
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default RecentInvoices;
