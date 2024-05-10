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
import { Trash2 } from "lucide-react";
import { useGetUsersByBusinessQuery } from "@/src/generated/graphql";
import localStorage from "local-storage-fallback";

const TeamTabContentAll = () => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";

  const { data } = useGetUsersByBusinessQuery({
    variables: {
      businessId: businessId,
    },
  });

  const users = data?.getUsersByBusiness;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] flex gap-x-3 items-center font-normal text-sm text-primary-greytext">
            <Checkbox
              className=" w-5 h-5 text-primary-greytext rounded bg-white data-[state=checked]:bg-primary-blue data-[state=checked]:text-white"
              disabled
            />
            Name
          </TableHead>
          <TableHead className=" font-normal text-sm text-primary-greytext">
            Email
          </TableHead>
          <TableHead className=" font-normal text-sm text-primary-greytext">
            Role
          </TableHead>
          <TableHead className="text-right font-normal text-sm text-primary-greytext">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className=" bg-white">
        {users?.map((user) => (
          <TableRow key={user?.id}>
            <TableCell className="flex gap-x-3 items-center py-[22px]">
              <Checkbox
                className=" w-5 h-5 text-primary-greytext rounded bg-white data-[state=checked]:bg-primary-blue data-[state=checked]:text-white"
                // checked={selectedRows.includes(user?.id!)}
                // onCheckedChange={() => handleRowSelect(user?.id!)}
              />
              {user?.fullname}
              {/* <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                You
              </span> */}
            </TableCell>
            <TableCell className=" text-primary-greytext">
              {user?.email}
            </TableCell>
            <TableCell className=" text-primary-greytext">
              {" "}
              {user?.role?.roleName}
            </TableCell>
            <TableCell className="text-right text-primary-blue">
              <DropdownMenu>
                <DropdownMenuTrigger className=" focus:outline-none">
                  More
                </DropdownMenuTrigger>
                <DropdownMenuContent className=" bg-white mt-1 text-primary-greytext shadow1 w-[160px]">
                  <DropdownMenuItem
                    disabled
                    className=" hover:cursor-pointer disabled:opacity-50 text-primary-red hover:bg-gray-100 gap-x-2 py-2"
                  >
                    <Trash2 className=" w-4 h-4 text-opacity-80" />
                    Remove Member
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

export default TeamTabContentAll;
