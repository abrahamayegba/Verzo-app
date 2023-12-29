import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownToLine, Contact, ListChecks } from "lucide-react";
import ImportCustomerIcon from "./ui/icons/ImportCustomerIcon";
import ImportProductIcon from "./ui/icons/ImportProductIcon";

interface ImportDataDropdownProps {
  openImportCustomerModal: () => void;
  openImportProductModal: () => void;
  openImportServiceModal: () => void;
  openImportMerchantModal: () => void;
}

const ImportDataDropdown: React.FC<ImportDataDropdownProps> = ({
  openImportCustomerModal,
  openImportMerchantModal,
  openImportProductModal,
  openImportServiceModal,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" focus:outline-none">
        <div className=" px-6 py-3 rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white">
          Import Data
          <ArrowDownToLine className=" w-5 h-5" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" bg-white mt-1 text-primary-greytext shadow1 w-[160px] ml-1">
        <DropdownMenuItem
          onClick={openImportCustomerModal}
          className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
        >
          <ImportCustomerIcon />
          Customers
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={openImportProductModal}
          className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
        >
          <ImportProductIcon />
          Products
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={openImportServiceModal}
          className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
        >
          <ListChecks className=" w-4 h-4 text-[#757575] ml-[2px]" />
          Services
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={openImportMerchantModal}
          className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
        >
          <Contact className=" w-4 h-4 text-[#757575] ml-[2px] opacity-80" />
          Merchants
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ImportDataDropdown;
