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
import { ArchiveRestore, Eye, Pen, Trash2 } from "lucide-react";
import TableEmptyState from "../emptystates/TableEmptyState";
import localStorage from "local-storage-fallback";
import PurchaseTableEmptyIcon from "../ui/icons/PurchaseTableEmptyIcon";
import { useGetArchivedPurchasesByBusinessQuery } from "@/src/generated/graphql";

interface PurchaseTabContentArchivedProps {
  openUnarchiveModal: (purchaseId: string) => void;
  numberOfPurchasesToShow?: number; // Make the prop optional
  onToggleSelectAll: (isChecked: boolean) => void;
  openDeleteModal: (purchaseId: string) => void;
}

const PurchaseTabContentArchived: React.FC<PurchaseTabContentArchivedProps> = ({
  onToggleSelectAll,
  openUnarchiveModal,
  openDeleteModal,
  numberOfPurchasesToShow,
}) => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const getArchivedPurchasesByBusiness = useGetArchivedPurchasesByBusinessQuery(
    {
      variables: {
        businessId: businessId,
        sets: 1,
        cursor: null,
      },
    }
  );
  const archivedPurchases =
    getArchivedPurchasesByBusiness.data?.getArchivedPurchaseByBusiness
      ?.purchaseByBusiness ?? [];
  const handleRowSelect = (rowId: string) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  const handleSelectAll = () => {
    const isChecked = selectedRows.length !== archivedPurchases?.length;
    if (isChecked) {
      setSelectedRows(
        archivedPurchases?.map((purchase) => String(purchase?.id) || "") || []
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
                selectedRows.length === archivedPurchases?.length &&
                archivedPurchases.length > 0
              }
              disabled={archivedPurchases?.length === 0}
              onCheckedChange={handleSelectAll}
            />
            Purchase
          </TableHead>
          <TableHead className=" font-normal text-sm text-primary-greytext">
            Transaction date
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
        {archivedPurchases?.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={7}
              className="text-center text-primary-greytext py-4 h-[293px]"
            >
              <TableEmptyState
                icon={<PurchaseTableEmptyIcon />}
                emptytext="No purchase recorded"
              />
            </TableCell>
          </TableRow>
        ) : (
          archivedPurchases
            .slice(0, numberOfPurchasesToShow)
            .map((purchase) => (
              <TableRow key={purchase?.id}>
                <TableCell className="flex gap-x-3 items-center py-[22px]">
                  <Checkbox
                    className=" w-5 h-5 text-primary-greytext rounded bg-white data-[state=checked]:bg-primary-blue data-[state=checked]:text-white"
                    checked={selectedRows.includes(purchase?.id!)}
                    onCheckedChange={() => handleRowSelect(purchase?.id!)}
                  />
                  #{purchase?.reference}
                </TableCell>
                <TableCell className=" text-primary-greytext">
                  {purchase?.transactionDate
                    ? new Date(purchase.transactionDate).toDateString()
                    : ""}
                </TableCell>
                <TableCell>
                  {purchase?.paid === true ? (
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
                  {purchase?.merchant?.name}
                </TableCell>
                <TableCell className=" text-primary-greytext">
                  {purchase?.total?.toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  })}
                </TableCell>
                <TableCell className="text-right text-primary-blue">
                  <DropdownMenu>
                    <DropdownMenuTrigger className=" focus:outline-none">
                      More
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className=" bg-white mt-1 mr-2 text-primary-greytext shadow1 w-[180px]">
                      <DropdownMenuItem
                        onClick={() => openUnarchiveModal(purchase?.id!)}
                        className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
                      >
                        <ArchiveRestore className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                        Unarchive Purchase
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => openDeleteModal(purchase?.id!)}
                        className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
                      >
                        <Trash2 className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                        Delete Purchase
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

export default PurchaseTabContentArchived;
