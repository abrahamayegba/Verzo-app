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
import { Eye, Lock } from "lucide-react";
import localStorage from "local-storage-fallback";
import TableEmptyState from "../emptystates/TableEmptyState";
import {
  useGetCardsByBusinessQuery,
  useGetCustomerByBusinessQuery,
} from "@/src/generated/graphql";
import CreatedAtIcon from "../ui/icons/CreatedAtIcon";
import { FaRegCreditCard } from "react-icons/fa6";
import CardTableEmptyIcon from "../ui/icons/CardTableEmptyIcon";
import Link from "next/link";

const CardTabContentAll = () => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const { data, loading, error } = useGetCardsByBusinessQuery({
    variables: {
      businessId: businessId,
    },
  });
  const cards = data?.getCardsByBusiness ?? [];

  const handleRowSelect = (rowId: string) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((id) => id !== rowId)
      );
    } else {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, rowId]);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px] flex gap-x-3 items-center font-normal text-sm text-primary-greytext">
            <Checkbox
              className=" w-5 h-5 text-primary-greytext rounded bg-white data-[state=checked]:bg-primary-blue data-[state=checked]:text-white"
              checked={
                selectedRows.length === cards?.length && cards.length > 0
              }
              disabled
            />
            Card holder
          </TableHead>
          <TableHead className=" font-normal text-sm text-primary-greytext">
            Card
          </TableHead>
          <TableHead className=" font-normal text-sm text-primary-greytext">
            Type
          </TableHead>
          {/* <TableHead className=" font-normal text-sm text-primary-greytext">
            Balance
          </TableHead> */}
          <TableHead className="text-right font-normal text-sm text-primary-greytext">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className=" bg-white">
        {cards?.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={7}
              className="text-center text-primary-greytext py-4 h-[293px]"
            >
              <TableEmptyState
                icon={<CardTableEmptyIcon />}
                emptytext="No cards added"
              />
            </TableCell>
          </TableRow>
        ) : (
          cards?.map((card) => (
            <TableRow
              className={` ${
                selectedRows.includes(card?.id!)
                  ? " bg-blue-50 bg-opacity-20"
                  : ""
              }`}
              key={card?.id}
            >
              <TableCell className="flex gap-x-4 items-center py-[22px]">
                <Checkbox
                  className=" w-5 h-5 text-primary-greytext rounded bg-white data-[state=checked]:bg-primary-blue data-[state=checked]:text-white"
                  checked={selectedRows.includes(card?.id!)}
                  onCheckedChange={() => handleRowSelect(card?.id!)}
                />
                <div className=" flex flex-col">
                  <p className=" text-base">{card?.user?.fullname}</p>
                  <p className=" mt-1 flex flex-row items-center gap-x-1 font-light text-[13px] text-gray-600">
                    <CreatedAtIcon /> {card?.createdAt}
                  </p>
                </div>
              </TableCell>
              <TableCell className=" text-primary-greytext tracking-wide">
                {card?.maskedPan}
              </TableCell>
              <TableCell className=" text-primary-greytext flex flex-row items-center gap-x-1">
                {" "}
                <FaRegCreditCard />{" "}
                <span className=" border-l border-gray-300 px-2 ml-1.5">
                  Virtual
                </span>
              </TableCell>
              <TableCell className="text-right text-primary-blue">
                <DropdownMenu>
                  <DropdownMenuTrigger className=" focus:outline-none">
                    More
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className=" bg-white mt-1 text-primary-greytext shadow1 w-[130px]">
                    <DropdownMenuItem
                      //   onClick={() => openEditModal(customer?.id!)}
                      className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
                    >
                      <Link
                        className=" flex flex-row gap-x-2 items-center"
                        href={`/card/viewcard?cardId=${card?.id}`}
                      >
                        <Eye className=" w-4 h-4 text-primary-greytext " />
                        View card
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      //   onClick={() => openArchiveModal(customer?.id!)}
                      className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
                    >
                      <Lock className=" w-4 h-4 text-primary-greytext" />
                      Lock card
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

export default CardTabContentAll;
