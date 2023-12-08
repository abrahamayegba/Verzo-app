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
import localStorage from "local-storage-fallback";
import { Archive, Eye, Pen, Trash2 } from "lucide-react";
import TableEmptyState from "./emptystates/TableEmptyState";
import ProductTableEmptyIcon from "./ui/icons/ProductTableEmptyIcon";
import { useGetProductsByBusinessQuery } from "@/src/generated/graphql";

interface ProductTabContentArchivedProps {
  onToggleSelectAll: (isChecked: boolean) => void;
  openUnarchiveModal: () => void;
  openDeleteModal: () => void;
}

const ProductTabContentArchived: React.FC<ProductTabContentArchivedProps> = ({
  onToggleSelectAll,
  openUnarchiveModal,
  openDeleteModal,
}) => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const getProductsByBusiness = useGetProductsByBusinessQuery({
    variables: {
      businessId: businessId,
      cursor: null,
      sets: 1,
    },
  });

  const products =
    getProductsByBusiness.data?.getProductsByBusiness?.productByBusiness ?? [];
  const handleRowSelect = (rowId: string) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  const handleSelectAll = () => {
    const isChecked = selectedRows.length !== products?.length;
    if (isChecked) {
      setSelectedRows(
        products?.map((product) => String(product?.id) || "") || []
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
                selectedRows.length === products.length && products.length > 0
              }
              disabled={products.length === 0}
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
        {products?.filter((product) => product?.isArchived).length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={7}
              className="text-center text-primary-greytext py-4 h-[293px]"
            >
              <TableEmptyState
                icon={<ProductTableEmptyIcon />}
                emptytext="No products added"
              />
            </TableCell>
          </TableRow>
        ) : (
          products
            .filter((product) => product?.isArchived) // Filter only archived customers
            .map((product) => (
              <TableRow className="" key={product?.id}>
                <TableCell className="flex gap-x-3 items-center py-[22px]">
                  <Checkbox
                    className=" w-5 h-5 text-primary-greytext rounded bg-white data-[state=checked]:bg-primary-blue data-[state=checked]:text-white"
                    checked={selectedRows.includes(product?.id!)}
                    onCheckedChange={() => handleRowSelect(product?.id!)}
                  />

                  {product?.productName}
                </TableCell>
                <TableCell className=" text-primary-greytext">
                  {product?.price}
                </TableCell>
                <TableCell className=" text-primary-greytext">
                  {product?.stockStatus}
                </TableCell>
                <TableCell className=" text-primary-greytext">
                  {product?.productUnit?.unitName}
                </TableCell>
                <TableCell className="text-right text-primary-blue">
                  <DropdownMenu>
                    <DropdownMenuTrigger className=" focus:outline-none">
                      More
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className=" bg-white mt-1 text-primary-greytext mr-1 shadow1 w-[170px]">
                      <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2">
                        <Pen className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                        Edit Product
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={openUnarchiveModal}
                        className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
                      >
                        <Archive className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                        Unarchive Product
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
            ))
        )}
      </TableBody>
    </Table>
  );
};

export default ProductTabContentArchived;
