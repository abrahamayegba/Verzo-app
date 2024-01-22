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
import { ArchiveRestore, Trash2 } from "lucide-react";
import TableEmptyState from "./emptystates/TableEmptyState";
import ProductTableEmptyIcon from "./ui/icons/ProductTableEmptyIcon";
import { useGetArchivedProductsByBusinessQuery } from "@/src/generated/graphql";

interface ProductTabContentArchivedProps {
  openUnarchiveModal: (productId: string) => void;
  openDeleteModal: (productId: string) => void;
  productSearchId: string;
}

const ProductTabContentArchived: React.FC<ProductTabContentArchivedProps> = ({
  openUnarchiveModal,
  openDeleteModal,
  productSearchId,
}) => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const getArchivedProductsByBusiness = useGetArchivedProductsByBusinessQuery({
    variables: {
      businessId: businessId,
      cursor: null,
      sets: 1,
    },
  });
  const archivedProducts =
    getArchivedProductsByBusiness.data?.getArchivedProductByBusiness
      ?.productByBusiness ?? [];
  const productSearchResult = archivedProducts.find(
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
              disabled
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
        {archivedProducts.length === 0 ? (
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
          archivedProducts.map((product) => (
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
                {product?.price?.toLocaleString("en-NG", {
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
              <TableCell className=" text-primary-greytext">
                {product?.productUnit?.unitName}
              </TableCell>
              <TableCell className="text-right text-primary-blue">
                <DropdownMenu>
                  <DropdownMenuTrigger className=" focus:outline-none">
                    More
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className=" bg-white mt-1 text-primary-greytext mr-1 shadow1 w-[170px]">
                    <DropdownMenuItem
                      onClick={() => openUnarchiveModal(product?.id!)}
                      className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
                    >
                      <ArchiveRestore className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                      Unarchive Product
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

export default ProductTabContentArchived;
