"use client";
import React, { useEffect, useState } from "react";
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
import { Archive, Pen, Trash2 } from "lucide-react";
import { useGetProductsByBusinessQuery } from "@/src/generated/graphql";
import TableEmptyState from "./emptystates/TableEmptyState";
import ProductTableEmptyIcon from "./ui/icons/ProductTableEmptyIcon";

interface ProductTabContentAllProps {
  onToggleSelectAll: (isChecked: boolean) => void;
  openArchiveModal: (productId: string) => void;
  openDeleteModal: (productId: string) => void;
  openEditModal: (productId: string) => void;
  productSearchId: string;
}

const ProductTabContentAll: React.FC<ProductTabContentAllProps> = ({
  onToggleSelectAll,
  openArchiveModal,
  openDeleteModal,
  openEditModal,
  productSearchId,
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
  const productSearchResult = products.find(
    (product) => product?.id === productSearchId
  );
  const handleRowSelect = (rowId: string) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((id) => id !== rowId)
      );
    } else {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, rowId]);
    }
  };

  useEffect(() => {
    if (productSearchResult) {
      handleRowSelect(productSearchId);
    }
  }, [productSearchResult, productSearchId]);

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
              disabled
              // onCheckedChange={handleSelectAll}
            />
            Name
          </TableHead>
          <TableHead className=" font-normal text-sm text-primary-greytext">
            Amount
          </TableHead>
          <TableHead className=" font-normal text-sm text-primary-greytext">
            Stock status
          </TableHead>
          <TableHead className=" font-normal text-sm text-primary-greytext">
            Stock count
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
        {products?.length === 0 ? (
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
          products.map((product) => (
            <TableRow
              className={` ${
                selectedRows.includes(product?.id!)
                  ? " bg-blue-50 bg-opacity-20"
                  : ""
              }`}
              key={product?.id}
            >
              <TableCell className="flex gap-x-3 items-center py-[22px]">
                <Checkbox
                  className=" w-5 h-5 text-primary-greytext rounded bg-white data-[state=checked]:bg-primary-blue data-[state=checked]:text-white"
                  checked={selectedRows.includes(product?.id!)}
                  onCheckedChange={() => handleRowSelect(product?.id!)}
                />
                {product?.productName}
              </TableCell>
              <TableCell className=" text-primary-greytext">
                {(product?.price / 100)?.toLocaleString("en-NG", {
                  style: "currency",
                  currency: "NGN",
                })}
              </TableCell>
              <TableCell className=" text-primary-greytext">
                {product?.productsInventory?.quantity! > 0
                  ? "In stock"
                  : "Out of stock"}
              </TableCell>
              <TableCell className=" text-primary-greytext">
                {product?.productsInventory?.quantity}
              </TableCell>
              <TableCell className="text-primary-greytext">
                {product?.businessProductUnit?.unitName
                  ? product.businessProductUnit.unitName
                  : product?.productUnit?.unitName}
              </TableCell>

              <TableCell className="text-right text-primary-blue">
                <DropdownMenu>
                  <DropdownMenuTrigger className=" focus:outline-none">
                    More
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className=" bg-white mt-1 text-primary-greytext shadow1 w-[160px]">
                    <DropdownMenuItem
                      onClick={() => openEditModal(product?.id!)}
                      className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
                    >
                      <Pen className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                      Edit Product
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => openArchiveModal(product?.id!)}
                      className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
                    >
                      <Archive className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                      Archive Product
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => openDeleteModal(product?.id!)}
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

export default ProductTabContentAll;
