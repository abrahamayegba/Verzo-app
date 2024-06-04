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
import { Archive, Download, Eye, Pen, Trash2 } from "lucide-react";
import Link from "next/link";
import localStorage from "local-storage-fallback";
import { useGetExpensesByBusinessQuery } from "@/src/generated/graphql";
import TableEmptyState from "../emptystates/TableEmptyState";
import ExpenseTableEmptyIcon from "../ui/icons/ExpenseTableEmptyIcon";

interface ExpenseTabContentAllProps {
  numberOfExpensesToShow?: number; // Make the prop optional
  onToggleSelectAll: (isChecked: boolean) => void;
  openArchiveModal: (expenseId: string) => void;
  openDeleteModal: (expenseId: string) => void;
}

const ExpenseTabContentAll: React.FC<ExpenseTabContentAllProps> = ({
  onToggleSelectAll,
  openArchiveModal,
  openDeleteModal,
  numberOfExpensesToShow,
}) => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const getExpensesByBusiness = useGetExpensesByBusinessQuery({
    variables: {
      businessId: businessId,
      sets: 1,
      cursor: null,
    },
  });
  const expenses =
    getExpensesByBusiness.data?.getExpenseByBusiness?.expenseByBusiness ?? [];
  const handleRowSelect = (rowId: string) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  const handleSelectAll = () => {
    const isChecked = selectedRows.length !== expenses?.length;
    if (isChecked) {
      setSelectedRows(
        expenses?.map((expense) => String(expense?.id) || "") || []
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
                selectedRows.length === expenses?.length && expenses.length > 0
              }
              disabled
              // onCheckedChange={handleSelectAll}
            />
            Expense
          </TableHead>
          <TableHead className=" font-normal text-sm text-primary-greytext">
            Date
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
        {expenses?.length > 0 ? (
          expenses.slice(0, numberOfExpensesToShow).map((expense) => (
            <TableRow key={expense?.id}>
              <TableCell className="flex gap-x-3 items-center py-[22px]">
                <Checkbox
                  className=" w-5 h-5 text-primary-greytext rounded bg-white data-[state=checked]:bg-primary-blue data-[state=checked]:text-white"
                  checked={selectedRows.includes(expense?.id!)}
                  onCheckedChange={() => handleRowSelect(expense?.id!)}
                />
                {expense?.reference}
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
              <TableCell>
                {expense?.paid === true ? (
                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    <span className="mr-2 text-green-500">✔</span>
                    Paid
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">
                    <span className="mr-2 text-yellow-500">⌛</span>
                    Pending
                  </span>
                )}
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
                  <DropdownMenuContent className=" bg-white mt-1 text-primary-greytext shadow1 w-[160px]">
                    <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2">
                      <Link
                        className=" flex gap-x-2 items-center"
                        href={`/expense/viewexpense?expenseId=${expense?.id}`}
                      >
                        <Eye className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                        View Expense
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      disabled={expense?.expenseStatusId! > 1}
                      className=" hover:cursor-pointer disabled:cursor-not-allowed hover:bg-gray-100 gap-x-2 py-2"
                    >
                      <Link
                        className=" flex flex-row gap-x-2"
                        href={`/expense/editexpense?expenseId=${expense?.id}`}
                      >
                        <Pen className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                        Edit Expense
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => openArchiveModal(expense?.id!)}
                      className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
                    >
                      <Archive className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                      Archive Expense
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

export default ExpenseTabContentAll;
