"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Checkbox } from "./ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import localStorage from "local-storage-fallback";
import { ArchiveRestore, Trash2 } from "lucide-react";
import TableEmptyState from "./emptystates/TableEmptyState";
import CustomerTableEmptyIcon from "./ui/icons/CustomerTableEmptyIcon";
import { useGetArchivedCustomersByBusinessQuery } from "@/src/generated/graphql";

interface CustomerTabContentArchivedProps {
  onToggleSelectAll: (isChecked: boolean) => void;
  openUnarchiveModal: () => void;
  openDeleteModal: () => void;
}

const CustomerTabContentArchived: React.FC<CustomerTabContentArchivedProps> = ({
  onToggleSelectAll,
  openUnarchiveModal,
  openDeleteModal,
}) => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const getArchivedCustomersByBusiness = useGetArchivedCustomersByBusinessQuery(
    {
      variables: {
        businessId: businessId,
        sets: 1,
        cursor: null,
      },
    }
  );
  const archivedCustomers =
    getArchivedCustomersByBusiness.data?.getArchivedCustomerByBusiness
      ?.customerByBusiness ?? [];

  const handleRowSelect = (rowId: string) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  const handleSelectAll = () => {
    const isChecked = selectedRows.length !== archivedCustomers?.length;
    if (isChecked) {
      setSelectedRows(
        archivedCustomers?.map((customer) => String(customer?.id) || "") || []
      );
    } else {
      setSelectedRows([]);
    }
    onToggleSelectAll(isChecked);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] flex gap-x-3 items-center font-normal text-sm text-primary-greytext">
            <Checkbox
              className=" w-5 h-5 text-primary-greytext rounded bg-white data-[state=checked]:bg-primary-blue data-[state=checked]:text-white"
              checked={
                selectedRows.length === archivedCustomers?.length &&
                archivedCustomers.length > 0
              }
              disabled={archivedCustomers?.length === 0}
              onCheckedChange={handleSelectAll}
            />
            Name
          </TableHead>
          <TableHead className=" font-normal text-sm text-primary-greytext">
            Date added
          </TableHead>
          <TableHead className=" font-normal text-sm text-primary-greytext">
            Email address
          </TableHead>
          <TableHead className=" font-normal text-sm text-primary-greytext">
            Phone number
          </TableHead>
          <TableHead className="text-right font-normal text-sm text-primary-greytext">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className=" bg-white">
        {archivedCustomers?.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={7}
              className="text-center text-primary-greytext py-4 h-[293px]"
            >
              <TableEmptyState
                icon={<CustomerTableEmptyIcon />}
                emptytext="No customers added"
              />
            </TableCell>
          </TableRow>
        ) : (
          archivedCustomers.map((customer) => (
            <TableRow key={customer?.id}>
              <TableCell className="flex gap-x-3 items-center py-[22px]">
                <Checkbox
                  className=" w-5 h-5 text-primary-greytext rounded bg-white data-[state=checked]:bg-primary-blue data-[state=checked]:text-white"
                  checked={selectedRows.includes(customer?.id!)}
                  onCheckedChange={() => handleRowSelect(customer?.id!)}
                />
                {customer?.name}
              </TableCell>
              <TableCell className=" text-primary-greytext">
                {customer?.createdAt
                  ? new Date(customer.createdAt).toDateString()
                  : ""}
              </TableCell>
              <TableCell className=" text-primary-greytext">
                {customer?.email}
              </TableCell>
              <TableCell className=" text-primary-greytext">
                {customer?.mobile}
              </TableCell>
              <TableCell className="text-right text-primary-blue">
                <DropdownMenu>
                  <DropdownMenuTrigger className=" focus:outline-none">
                    More
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className=" bg-white mt-1 text-primary-greytext shadow1 w-[180px]">
                    <DropdownMenuItem
                      onClick={openUnarchiveModal}
                      className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
                    >
                      <ArchiveRestore className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                      Unarchive Customer
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={openDeleteModal}
                      className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
                    >
                      <Trash2 className=" w-4 h-4 text-opacity-80" />
                      Delete Customer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default CustomerTabContentArchived;
