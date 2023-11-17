import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ListFilter } from "lucide-react";
import { Checkbox } from "./ui/checkbox";

const FilterDataDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" focus:outline-none">
        <div className=" px-6 py-3 rounded-[10px] flex gap-x-2 items-center justify-center border border-primary-border">
          Filter
          <ListFilter className=" w-5 h-5" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" bg-white mt-1 text-primary-greytext shadow1 w-[160px] ml-1">
        <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2">
          <Checkbox id="weekly" />
          Last 7 days
        </DropdownMenuItem>
        <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2">
          <Checkbox id="monthly" />
          Last 30 days
        </DropdownMenuItem>
        <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2">
          <Checkbox id="quarterly" />
          Last 3 months
        </DropdownMenuItem>
        <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2">
          <Checkbox id="yearly" />
          Last 12 months
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDataDropdown;