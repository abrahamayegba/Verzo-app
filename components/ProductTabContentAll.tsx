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
import { Archive, Pen, Trash2 } from "lucide-react";

interface ProductTabContentAllProps {
  onToggleSelectAll: (isChecked: boolean) => void;
  openArchiveModal: () => void;
  openDeleteModal: () => void;
}

const ProductTabContentAll: React.FC<ProductTabContentAllProps> = ({
  onToggleSelectAll,
  openArchiveModal,
  openDeleteModal,
}) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const data = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    basicunit: 1,
    amount: `₦${((index + 1) * 2500).toLocaleString("en-NG")}.0`,
    unit: `KG`,
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
            Name
          </TableHead>
          <TableHead className=" font-normal text-sm text-primary-greytext">
            Amount
          </TableHead>
          <TableHead className=" font-normal text-sm text-primary-greytext">
            Basic unit
          </TableHead>
          <TableHead className=" font-normal text-sm text-primary-greytext">
            Product unit
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
            </TableCell>
            <TableCell className=" text-primary-greytext">
              {row.amount}
            </TableCell>
            <TableCell className=" text-primary-greytext">
              {row.basicunit}
            </TableCell>
            <TableCell className=" text-primary-greytext">{row.unit}</TableCell>
            <TableCell className="text-right text-primary-blue">
              <DropdownMenu>
                <DropdownMenuTrigger className=" focus:outline-none">
                  More
                </DropdownMenuTrigger>
                <DropdownMenuContent className=" bg-white mt-1 text-primary-greytext shadow1 w-[160px]">
                  <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2">
                    <Pen className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                    Edit Product
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={openArchiveModal}
                    className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
                  >
                    <Archive className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                    Archive Product
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={openDeleteModal}
                    className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
                  >
                    <Trash2 className=" w-4 h-4 text-opacity-80" />
                    Delete Product
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

export default ProductTabContentAll;
