"use client";
import React, { useEffect, useState } from "react";
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
import { Archive, Eye, Pen, Trash2 } from "lucide-react";
import localStorage from "local-storage-fallback";
import TableEmptyState from "./emptystates/TableEmptyState";
import CustomerTableEmptyIcon from "./ui/icons/CustomerTableEmptyIcon";
import { useGetCustomerByBusinessQuery } from "@/src/generated/graphql";

interface CustomerTabContentAllProps {
  onToggleSelectAll: (isChecked: boolean) => void;
  openArchiveModal: (customerId: string) => void;
  openEditModal: (customerId: string) => void;
  openDeleteModal: (customerId: string) => void;
  customerSearchId: string;
}

const CustomerTabContentAll: React.FC<CustomerTabContentAllProps> = ({
  onToggleSelectAll,
  openArchiveModal,
  openDeleteModal,
  openEditModal,
  customerSearchId,
}) => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const getCustomersByBusiness = useGetCustomerByBusinessQuery({
    variables: {
      businessId: businessId,
      sets: 1,
      cursor: null,
    },
  });
  const customers =
    getCustomersByBusiness.data?.getCustomerByBusiness?.customerByBusiness ??
    [];
  const customerSearchResult = customers.find(
    (customer) => customer?.id === customerSearchId
  );
  const handleRowSelect = (rowId: string) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((id) => id !== rowId)
      );
    } else {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, rowId]);
    }
  };

  useEffect(() => {
    if (customerSearchResult) {
      handleRowSelect(customerSearchId);
    }
  }, [customerSearchResult, customerSearchId]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] flex gap-x-3 items-center font-normal text-sm text-primary-greytext">
            <Checkbox
              className=" w-5 h-5 text-primary-greytext rounded bg-white data-[state=checked]:bg-primary-blue data-[state=checked]:text-white"
              checked={
                selectedRows.length === customers?.length &&
                customers.length > 0
              }
              disabled
              // onCheckedChange={handleSelectAll}
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
        {customers?.length === 0 ? (
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
          customers?.map((customer) => (
            <TableRow
              className={` ${
                selectedRows.includes(customer?.id!)
                  ? " bg-blue-50 bg-opacity-20"
                  : ""
              }`}
              key={customer?.id}
            >
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
                  ? new Date(customer.createdAt).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
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
                  <DropdownMenuContent className=" bg-white mt-1 text-primary-greytext shadow1 w-[160px]">
                    <DropdownMenuItem
                      onClick={() => openEditModal(customer?.id!)}
                      className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
                    >
                      <Pen className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                      Edit Customer
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => openArchiveModal(customer?.id!)}
                      className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
                    >
                      <Archive className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                      Archive Customer
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => openDeleteModal(customer?.id!)}
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

export default CustomerTabContentAll;
