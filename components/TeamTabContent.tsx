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

interface TeamTabContentAllProps {
  openDeleteModal: () => void;
}

const TeamTabContentAll: React.FC<TeamTabContentAllProps> = ({
  openDeleteModal,
}) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const data = Array.from({ length: 1 }, (_, index) => ({
    id: index + 1,
    name: `John Doe`,
    email: `user${index + 1}@example.com`,
    role: "Owner",
  }));

  // Function to handle individual row selection
  const handleRowSelect = (rowId: number) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

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
        {data.map((row) => (
          <TableRow className="" key={row.id}>
            <TableCell className="flex gap-x-3 items-center py-[22px]">
              <Checkbox
                className=" w-5 h-5 text-primary-greytext rounded bg-white data-[state=checked]:bg-primary-blue data-[state=checked]:text-white"
                checked={selectedRows.includes(row.id)}
                onCheckedChange={() => handleRowSelect(row.id)}
              />

              {row.name}
              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                You
              </span>
            </TableCell>
            <TableCell className=" text-primary-greytext">
              {row.email}
            </TableCell>
            <TableCell className=" text-primary-greytext">{row.role}</TableCell>
            <TableCell className="text-right text-primary-blue">
              <DropdownMenu>
                <DropdownMenuTrigger className=" focus:outline-none">
                  More
                </DropdownMenuTrigger>
                <DropdownMenuContent className=" bg-white mt-1 text-primary-greytext shadow1 w-[160px]">
                  <DropdownMenuItem
                    onClick={openDeleteModal}
                    className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
                  >
                    <Trash2 className=" w-4 h-4 text-opacity-80" />
                    Delete Member
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
