import {
  Archive,
  Download,
  Eye,
  MoreHorizontal,
  Pen,
  Trash2,
} from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetCustomerByBusinessQuery } from "@/src/generated/graphql";
import RecentMetricEmptyState from "./emptystates/RecentMetricEmptyState";
import localStorage from "local-storage-fallback";
import Link from "next/link";
import RecentCustomerEmptyIcon from "./ui/icons/RecentCustomerEmptyIcon";

const RecentCustomers = () => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const getCustomersByBusiness = useGetCustomerByBusinessQuery({
    variables: {
      businessId: businessId,
    },
  });

  const customers =
    getCustomersByBusiness.data?.getCustomerByBusiness?.customerByBusiness ??
    [];

  return (
    <>
      {customers?.length === 0 ? (
        <RecentMetricEmptyState
          name="Customers"
          icon={<RecentCustomerEmptyIcon />}
          emptytext="No customers added"
        />
      ) : (
        <div className=" min-h-[241px] rounded-[16px] flex flex-col border border-gray-100">
          <div className=" flex justify-between items-center py-[14px]  max-h-[50px] px-6 rounded-t-[10px] ">
            <p className=" text-primary-greytext text-sm">Recent Customers</p>
            <Link href="/dashboard/customers">
              <button className=" text-primary-blue text-sm tracking-[-0.2px]">
                View all
              </button>
            </Link>
          </div>
          <div className=" flex flex-col bg-white h-full rounded-b-[16px]">
            {customers.slice(0, 3).map((customer, index) => (
              <div
                key={customer?.id}
                className={`min-h-[63px] flex justify-between text-sm items-center px-6 ${
                  index === 2 ? "" : "border-b border-b-gray-100"
                }`}
              >
                <p>{customer?.name}</p>
                <p className="text-primary-greytext">
                  {customer?.createdAt
                    ? new Date(customer.createdAt).toDateString()
                    : ""}
                </p>
                <p className="text-primary-greytext">{customer?.email}</p>
                {/* <DropdownMenu>
                  <DropdownMenuTrigger className=" focus:outline-none">
                    <MoreHorizontal className=" text-[#c4c4c4]" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className=" bg-white mt-1 text-primary-greytext shadow1 w-[160px] ml-1">
                    <DropdownMenuItem className=" hover:cursor-pointer hover:bg-gray-100 gap-x-2 py-2">
                      <Eye className=" w-4 h-4 text-primary-greytext text-opacity-80" />
                      View Customer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu> */}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RecentCustomers;
