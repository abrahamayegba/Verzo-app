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
import { Archive, Pen, Trash2 } from "lucide-react";
import TableEmptyState from "./emptystates/TableEmptyState";
import ServiceTableEmptyIcon from "./ui/icons/ServiceTableEmptyIcon";
import { useGetServiceByBusinessQuery } from "@/src/generated/graphql";

interface ServiceTabContentArchivedProps {
  onToggleSelectAll: (isChecked: boolean) => void;
  openUnarchiveModal: () => void;
  openDeleteModal: () => void;
}

const ServiceTabContentArchived: React.FC<ServiceTabContentArchivedProps> = ({
  onToggleSelectAll,
  openUnarchiveModal,
  openDeleteModal,
}) => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const getServicesByBusiness = useGetServiceByBusinessQuery({
    variables: {
      businessId: businessId,
      cursor: null,
      sets: 1,
    },
  });

  const services =
    getServicesByBusiness.data?.getServiceByBusiness?.serviceByBusiness ?? [];
  const handleRowSelect = (rowId: string) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };
  const handleSelectAll = () => {
    const isChecked = selectedRows.length !== services?.length;
    if (isChecked) {
      setSelectedRows(
        services?.map((service) => String(service?.id) || "") || []
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
                selectedRows.length === services.length && services.length > 0
              }
              disabled={services.length === 0}
              onCheckedChange={handleSelectAll}
            />
            Name
          </TableHead>
          <TableHead className=" font-normal text-sm text-primary-greytext">
            Amount
          </TableHead>
          <TableHead className=" font-normal text-sm text-primary-greytext">
            Service unit
          </TableHead>
          <TableHead className="text-right font-normal text-sm text-primary-greytext">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className=" bg-white">
        {services?.filter((service) => service?.archived).length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={7}
              className="text-center text-primary-greytext py-4 h-[293px]"
            >
              <TableEmptyState
                icon={<ServiceTableEmptyIcon />}
                emptytext="No services added"
              />
            </TableCell>
          </TableRow>
        ) : (
          services
            .filter((service) => service?.archived) // Filter only archived customers
            .map((service) => (
              <TableRow className="" key={service?.id}>
                <TableCell className="flex gap-x-3 items-center py-[22px]">
                  <Checkbox
                    className=" w-5 h-5 text-primary-greytext rounded bg-white data-[state=checked]:bg-primary-blue data-[state=checked]:text-white"
                    checked={selectedRows.includes(service?.id!)}
                    onCheckedChange={() => handleRowSelect(service?.id!)}
                  />

                  {service?.name}
                </TableCell>
                <TableCell className=" text-primary-greytext">
                  {service?.price.toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  })}
                </TableCell>
                <TableCell className=" text-primary-greytext">
                  {service?.serviceUnit?.unitName}
                </TableCell>
                <TableCell className="text-right text-primary-blue">
                  <DropdownMenu>
                    <DropdownMenuTrigger className=" focus:outline-none">
                      More
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className=" bg-white mt-1 mr-1 text-primary-greytext shadow1 w-[170px]">
                      <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2">
                        <Pen className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                        Edit Service
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={openUnarchiveModal}
                        className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
                      >
                        <Archive className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                        Unarchive Service
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={openDeleteModal}
                        className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2"
                      >
                        <Trash2 className=" w-4 h-4 text-opacity-80" />
                        Delete Service
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

export default ServiceTabContentArchived;
