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
import { Archive, Download, Eye, Pen, Trash2 } from "lucide-react";
import Link from "next/link";

interface PurchaseTabContentAllProps {
  onToggleSelectAll: (isChecked: boolean) => void;
  openArchiveModal: () => void;
  openDeleteModal: () => void;
}

const PurchaseTabContentAll: React.FC<PurchaseTabContentAllProps> = ({
  onToggleSelectAll,
  openArchiveModal,
  openDeleteModal,
}) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const data = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    order: `#PUR00${index + 1}`,
    sentDate: new Date(2023, 0, index + 1),
    status: index % 3 === 0 ? "Paid" : index % 3 === 1 ? "Unpaid" : "Pending",
    Merchant: `Merchant ${index + 1}`,
    amount: `₦${((index + 1) * 2500).toLocaleString("en-NG")}.0`,
  }));

  // Function to handle individual row selection
  const handleRowSelect = (rowId: number) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  const handleSelectAll = () => {
    const isChecked = selectedRows.length !== data.length;
    if (isChecked) {
      setSelectedRows(data.map((row) => row.id));
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
              checked={selectedRows.length === data.length && data.length > 0}
              disabled={data.length === 0}
              onCheckedChange={handleSelectAll}
            />
            Purchase
          </TableHead>
          <TableHead className=" font-normal text-sm text-primary-greytext">
            Sent date
          </TableHead>
          <TableHead className=" font-normal text-sm text-primary-greytext">
            Status
          </TableHead>

          <TableHead className=" font-normal text-sm text-primary-greytext">
            Merchant
          </TableHead>
          <TableHead className="font-normal text-sm text-primary-greytext">
            Amount
          </TableHead>
          <TableHead className="text-right font-normal text-sm text-primary-greytext">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className=" bg-white">
        {data.map((row) => (
          <TableRow className="" key={row.id}>
            <TableCell className="flex gap-x-3 items-center py-[22px]">
              <Checkbox
                className=" w-5 h-5 text-primary-greytext rounded bg-white data-[state=checked]:bg-primary-blue data-[state=checked]:text-white"
                checked={selectedRows.includes(row.id)}
                onCheckedChange={() => handleRowSelect(row.id)}
              />

              {row.order}
            </TableCell>

            <TableCell className=" text-primary-greytext">
              {row.sentDate.toDateString()}
            </TableCell>
            <TableCell>
              {row.status === "Paid" && (
                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  <span className="mr-2 text-green-500">✔</span>
                  Paid
                </span>
              )}
              {row.status === "Unpaid" && (
                <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                  <span className="mr-2 text-red-500">✘</span>
                  Canceled
                </span>
              )}
              {row.status === "Pending" && (
                <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">
                  <span className="mr-2 text-yellow-500">⌛</span>
                  Pending
                </span>
              )}
            </TableCell>
            <TableCell className=" text-primary-greytext">
              {row.Merchant}
            </TableCell>
            <TableCell className=" text-primary-greytext">
              {row.amount}
            </TableCell>
            <TableCell className="text-right text-primary-blue">
              <DropdownMenu>
                <DropdownMenuTrigger className=" focus:outline-none">
                  More
                </DropdownMenuTrigger>
                <DropdownMenuContent className=" bg-white mt-1 text-primary-greytext shadow1 w-[160px]">
                  <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 py-2">
                    <Link
                      className=" flex gap-x-2 items-center"
                      href="/purchase/viewpurchase"
                    >
                      <Eye className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                      View Purchase
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2">
                    <Pen className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                    Edit Purchase
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={openArchiveModal}
                    className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
                  >
                    <Archive className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                    Archive Purchase
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={openDeleteModal}
                    className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
                  >
                    <Trash2 className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                    Delete Purchase
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PurchaseTabContentAll;
