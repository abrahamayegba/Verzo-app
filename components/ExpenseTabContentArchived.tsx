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
import { ArchiveRestore, Eye, Pen, Trash2 } from "lucide-react";
import TableEmptyState from "./emptystates/TableEmptyState";
import ExpenseTableEmptyIcon from "./ui/icons/ExpenseTableEmptyIcon";

interface ExpenseTabContentArchivedProps {
  onToggleSelectAll: (isChecked: boolean) => void;
  openUnarchiveModal: () => void;
  openDeleteModal: () => void;
}

const ExpenseTabContentArchived: React.FC<ExpenseTabContentArchivedProps> = ({
  onToggleSelectAll,
  openUnarchiveModal,
  openDeleteModal,
}) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const data = Array.from({ length: 3 }, (_, index) => ({
    id: index + 1,
    expense: `#EXP00${index + 1}`,
    sentDate: new Date(2023, 0, index + 1),
    category:
      index % 3 === 0
        ? "Category A"
        : index % 3 === 1
        ? "Category B"
        : "Category C",
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
            Expense
          </TableHead>
          <TableHead className=" font-normal text-sm text-primary-greytext">
            Category
          </TableHead>
          <TableHead className=" font-normal text-sm text-primary-greytext">
            Sent date
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
        {data.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={7}
              className="text-center text-primary-greytext py-4 h-[293px]"
            >
              <TableEmptyState
                icon={<ExpenseTableEmptyIcon />}
                emptytext="No expenses available"
              />
            </TableCell>
          </TableRow>
        ) : (
          data.map((row) => (
            <TableRow className="" key={row.id}>
              <TableCell className="flex gap-x-3 items-center py-[22px]">
                <Checkbox
                  className=" w-5 h-5 text-primary-greytext rounded bg-white data-[state=checked]:bg-primary-blue data-[state=checked]:text-white"
                  checked={selectedRows.includes(row.id)}
                  onCheckedChange={() => handleRowSelect(row.id)}
                />
                {row.expense}
              </TableCell>
              <TableCell>
                {row.category === "Category A" && (
                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    Category A
                  </span>
                )}
                {row.category === "Category B" && (
                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    Category C
                  </span>
                )}
                {row.category === "Category C" && (
                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    Category B
                  </span>
                )}
              </TableCell>
              <TableCell className=" text-primary-greytext">
                {row.sentDate.toDateString()}
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
                  <DropdownMenuContent className=" bg-white mt-1 mr-2 text-primary-greytext shadow1 w-[170px]">
                    <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2">
                      <Eye className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                      View Expense
                    </DropdownMenuItem>
                    <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2">
                      <Pen className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                      Edit Expense
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={openUnarchiveModal}
                      className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
                    >
                      <ArchiveRestore className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                      Unarchive Expense
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={openDeleteModal}
                      className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
                    >
                      <Trash2 className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                      Delete Expense
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

export default ExpenseTabContentArchived;
