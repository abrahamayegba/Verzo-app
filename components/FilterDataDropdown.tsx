import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ListFilter } from "lucide-react";
import { Checkbox } from "./ui/checkbox";

interface FilterDataDropdownProps {
  selectedFilter: string | null;
  onFilterChange: (filter: string) => void;
}

const FilterDataDropdown: React.FC<FilterDataDropdownProps> = ({
  selectedFilter,
  onFilterChange,
}) => {
  const handleFilterSelection = (filter: string) => {
    onFilterChange(filter);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" focus:outline-none">
        <div className=" px-8 py-3 rounded-[10px] flex gap-x-2 items-center justify-center border border-primary-border">
          Filter
          <ListFilter className=" w-5 h-5" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" bg-white mt-1 text-primary-greytext shadow1 w-[160px] ml-1">
        <DropdownMenuItem
          className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
          onClick={() => handleFilterSelection("weekly")}
        >
          <Checkbox id="weekly" checked={selectedFilter === "weekly"} />
          This Week
        </DropdownMenuItem>
        <DropdownMenuItem
          className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
          onClick={() => handleFilterSelection("monthly")}
        >
          <Checkbox id="monthly" checked={selectedFilter === "monthly"} />
          This Month
        </DropdownMenuItem>
        <DropdownMenuItem
          className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
          onClick={() => handleFilterSelection("quarterly")}
        >
          <Checkbox id="quarterly" checked={selectedFilter === "quarterly"} />
          This Quarter
        </DropdownMenuItem>
        <DropdownMenuItem
          className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
          onClick={() => handleFilterSelection("yearly")}
        >
          <Checkbox id="yearly" checked={selectedFilter === "yearly"} />
          This Year
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDataDropdown;
