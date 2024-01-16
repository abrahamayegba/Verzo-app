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
import { Archive, Download, Eye, Pen, Send, Trash2 } from "lucide-react";
import Link from "next/link";
import { useGetSaleByBusinessQuery } from "@/src/generated/graphql";
import InvoiceTableEmptyIcon from "../ui/icons/InvoiceTableEmptyIcon";
import TableEmptyState from "../emptystates/TableEmptyState";

interface InvoiceTabContentAllProps {
  numberOfInvoicesToShow?: number; // Make the prop optional
  onToggleSelectAll: (isChecked: boolean) => void;
  openArchiveModal: (invoiceId: string) => void;
  openDeleteModal: (invoiceId: string) => void;
  openEditModal: (invoiceId: string) => void;
}

const InvoiceTabContentAll: React.FC<InvoiceTabContentAllProps> = ({
  onToggleSelectAll,
  openDeleteModal,
  openArchiveModal,
  numberOfInvoicesToShow,
  openEditModal,
}) => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const getSalesByBusiness = useGetSaleByBusinessQuery({
    variables: {
      businessId: businessId,
    },
  });
  const invoices =
    getSalesByBusiness.data?.getSaleByBusiness?.salesByBusiness ?? [];

  const handleRowSelect = (rowId: string) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  const handleSelectAll = () => {
    const isChecked = selectedRows.length !== invoices?.length;
    if (isChecked) {
      setSelectedRows(
        invoices?.map((invoice) => String(invoice?.id) || "") || []
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
                selectedRows.length === invoices?.length && invoices.length > 0
              }
              disabled
              // onCheckedChange={handleSelectAll}
            />
            Invoice
          </TableHead>
          <TableHead className=" font-normal text-sm text-primary-greytext">
            Sent date
          </TableHead>
          <TableHead className=" font-normal text-sm text-primary-greytext">
            Status
          </TableHead>
          <TableHead className=" font-normal text-sm text-primary-greytext">
            Customer
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
        {invoices?.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={7}
              className="text-center text-primary-greytext py-4 h-[293px]"
            >
              <TableEmptyState
                icon={<InvoiceTableEmptyIcon />}
                emptytext="No invoices available"
              />
            </TableCell>
          </TableRow>
        ) : (
          invoices.slice(0, numberOfInvoicesToShow).map((invoice) => (
            <TableRow key={invoice?.id}>
              <TableCell className="flex gap-x-3 items-center py-[22px]">
                <Checkbox
                  className=" w-5 h-5 text-primary-greytext rounded bg-white data-[state=checked]:bg-primary-blue data-[state=checked]:text-white"
                  checked={selectedRows.includes(invoice?.id!)}
                  onCheckedChange={() => handleRowSelect(invoice?.id!)}
                />
                #{invoice?.reference}
              </TableCell>
              <TableCell className=" text-primary-greytext">
                {invoice?.transactionDate
                  ? new Date(invoice.transactionDate).toDateString()
                  : ""}
              </TableCell>
              <TableCell>
                {invoice?.paid === true ? (
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
                {invoice?.invoice?.customer?.name}
              </TableCell>
              <TableCell className=" text-primary-greytext">
                {invoice?.invoice?.totalAmount.toLocaleString("en-NG", {
                  style: "currency",
                  currency: "NGN",
                })}
              </TableCell>
              <TableCell className="text-right text-primary-blue">
                <DropdownMenu>
                  <DropdownMenuTrigger className=" focus:outline-none">
                    More
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className=" bg-white mt-1 text-primary-greytext shadow1 w-[160px] ml-1">
                    <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2">
                      <Link
                        className=" flex gap-x-2 items-center"
                        href={`/invoice/viewinvoice?invoiceId=${invoice?.id}`}
                      >
                        <Eye className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                        View Invoice
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2">
                      <Link
                        className=" flex gap-x-2 items-center"
                        href={`/invoice/editinvoice?invoiceId=${invoice?.id}`}
                      >
                        <Pen className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                        Edit Invoice
                      </Link>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem
                      onClick={() => openSendModal(invoice?.id!)}
                      className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
                    >
                      <Send className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                      Send Invoice
                    </DropdownMenuItem> */}
                    <DropdownMenuItem
                      onClick={() => openArchiveModal(invoice?.id!)}
                      className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
                    >
                      <Archive className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                      Archive Invoice
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => openDeleteModal(invoice?.id!)}
                      className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
                    >
                      <Trash2 className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                      Delete Invoice
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

export default InvoiceTabContentAll;
