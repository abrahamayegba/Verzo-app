"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import localStorage from "local-storage-fallback";
import { ArchiveRestore, Eye, Pen, Trash2 } from "lucide-react";
import TableEmptyState from "../emptystates/TableEmptyState";
import ExpenseTableEmptyIcon from "../ui/icons/ExpenseTableEmptyIcon";
import { useGetArchivedExpensesByBusinessQuery } from "@/src/generated/graphql";

interface ExpenseTabContentArchivedProps {
  onToggleSelectAll: (isChecked: boolean) => void;
  openUnarchiveModal: (expenseId: string) => void;
  openDeleteModal: (expenseId: string) => void;
  numberOfExpensesToShow?: number; // Make the prop optional
}

const ExpenseTabContentArchived: React.FC<ExpenseTabContentArchivedProps> = ({
  onToggleSelectAll,
  openUnarchiveModal,
  openDeleteModal,
  numberOfExpensesToShow,
}) => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const getArchivedExpensesByBusiness = useGetArchivedExpensesByBusinessQuery({
    variables: {
      businessId: businessId,
      sets: 1,
      cursor: null,
    },
  });
  const archivedExpenses =
    getArchivedExpensesByBusiness.data?.getArchivedExpenseByBusiness
      ?.expenseByBusiness ?? [];
  const handleRowSelect = (rowId: string) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  const handleSelectAll = () => {
    const isChecked = selectedRows.length !== archivedExpenses?.length;
    if (isChecked) {
      setSelectedRows(
        archivedExpenses?.map((expense) => String(expense?.id) || "") || []
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
                selectedRows.length === archivedExpenses?.length &&
                archivedExpenses.length > 0
              }
              disabled
              // onCheckedChange={handleSelectAll}
            />
            Expense
          </TableHead>
          <TableHead className=" font-normal text-sm text-primary-greytext">
            Category
          </TableHead>
          <TableHead className=" font-normal text-sm text-primary-greytext">
            Date
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
        {archivedExpenses.length > 0 ? (
          archivedExpenses.slice(0, numberOfExpensesToShow).map((expense) => (
            <TableRow className="" key={expense?.id}>
              <TableCell className="flex gap-x-3 items-center py-[22px]">
                <Checkbox
                  className=" w-5 h-5 text-primary-greytext rounded bg-white data-[state=checked]:bg-primary-blue data-[state=checked]:text-white"
                  checked={selectedRows.includes(expense?.id!)}
                  onCheckedChange={() => handleRowSelect(expense?.id!)}
                />
                {expense?.reference}
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  {expense?.expenseCategory?.name}
                </span>
              </TableCell>
              <TableCell className=" text-primary-greytext">
                {expense?.expenseDate
                  ? new Date(expense.expenseDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""}
              </TableCell>
              <TableCell className=" text-primary-greytext">
                {expense?.merchant?.name}
              </TableCell>
              <TableCell className=" text-primary-greytext">
                {(expense?.amount / 100)?.toLocaleString("en-NG", {
                  style: "currency",
                  currency: "NGN",
                })}
              </TableCell>
              <TableCell className="text-right text-primary-blue">
                <DropdownMenu>
                  <DropdownMenuTrigger className=" focus:outline-none">
                    More
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className=" bg-white mt-1 mr-2 text-primary-greytext shadow1 w-[170px]">
                    <DropdownMenuItem
                      onClick={() => openUnarchiveModal(expense?.id!)}
                      className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
                    >
                      <ArchiveRestore className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                      Unarchive Expense
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => openDeleteModal(expense?.id!)}
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
        ) : (
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
        )}
      </TableBody>
    </Table>
  );
};

export default ExpenseTabContentArchived;
