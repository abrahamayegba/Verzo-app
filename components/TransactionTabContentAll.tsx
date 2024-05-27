"use client";
import React, { useState } from "react";
import localStorage from "local-storage-fallback";
import { useViewBusinessAccountStatementQuery } from "@/src/generated/graphql";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Checkbox } from "./ui/checkbox";
import TableEmptyState from "./emptystates/TableEmptyState";
import TransactionTableEmptyIcon from "./ui/icons/TransactionTableEmptyIcon";

const TransactionTabContentAll = () => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const { data } = useViewBusinessAccountStatementQuery({
    variables: {
      businessId: businessId,
    },
  });

  const transactions = data?.viewBusinessAccountStatement || [];
  const handleRowSelect = (rowId: string) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((id) => id !== rowId)
      );
    } else {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, rowId]);
    }
  };
  console.log(transactions.length);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px] flex gap-x-3 items-center font-normal text-sm text-primary-greytext">
            <Checkbox
              className=" w-5 h-5 text-primary-greytext rounded bg-white data-[state=checked]:bg-primary-blue data-[state=checked]:text-white"
              checked={
                selectedRows.length === transactions?.length &&
                transactions.length > 0
              }
              disabled
            />
            Txn date
          </TableHead>
          <TableHead className=" w-[150px] font-normal text-sm text-primary-greytext">
            Type
          </TableHead>
          <TableHead className=" font-normal text-sm text-primary-greytext">
            Amount
          </TableHead>
          <TableHead className=" font-normal text-sm text-primary-greytext">
            Status
          </TableHead>
          <TableHead className=" font-normal text-sm text-primary-greytext text-right">
            Narration
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className=" bg-white">
        {transactions?.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={7}
              className="text-center text-primary-greytext py-4 h-[293px]"
            >
              <TableEmptyState
                icon={<TransactionTableEmptyIcon />}
                emptytext="No transactions"
              />
            </TableCell>
          </TableRow>
        ) : (
          transactions
            ?.slice()
            .reverse()
            .map((transaction) => (
              <TableRow
                className={` ${
                  selectedRows.includes(transaction?.id!)
                    ? " bg-blue-50 bg-opacity-20"
                    : ""
                }`}
                key={transaction?.id}
              >
                <TableCell className="flex gap-x-4 items-center py-[22px]">
                  <Checkbox
                    className=" w-5 h-5 text-primary-greytext rounded bg-white data-[state=checked]:bg-primary-blue data-[state=checked]:text-white"
                    checked={selectedRows.includes(transaction?.id!)}
                    onCheckedChange={() => handleRowSelect(transaction?.id!)}
                  />
                  <div className=" flex flex-col">
                    <p className=" text-[15px] text-gray-700">
                      {new Date(transaction?.transactionDate).toLocaleString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </TableCell>
                <TableCell className=" text-primary-greytext tracking-wide">
                  {transaction?.type === "Credit" ? (
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      Credit
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                      Debit
                    </span>
                  )}
                </TableCell>

                <TableCell className=" text-[15px] text-gray-700">
                  {(transaction?.amount / 100)?.toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  })}
                </TableCell>
                <TableCell className=" text-primary-greytext tracking-wide">
                  {transaction?.linked ? (
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      linked
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">
                      unlinked
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-primary-greytext text-right max-w-[300px] truncate">
                  {transaction?.narration}
                </TableCell>
              </TableRow>
            ))
        )}
      </TableBody>
    </Table>
  );
};

export default TransactionTabContentAll;
