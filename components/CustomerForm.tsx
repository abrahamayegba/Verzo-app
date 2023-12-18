"use client";
import { Plus } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import localStorage from "local-storage-fallback";
import {
  useGetBusinessesByUserIdQuery,
  useGetCustomerByBusinessQuery,
} from "@/src/generated/graphql";
import MainLoader from "./loading/MainLoader";

interface CustomerFormProps {
  openCustomerSheet: () => void;
  onCustomerChange: (id: string) => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  openCustomerSheet,
  onCustomerChange,
}) => {
  const [customerId, setCustomerId] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const getBusinessesByUserId = useGetBusinessesByUserIdQuery();

  const getCustomers = useGetCustomerByBusinessQuery({
    variables: { businessId: businessId },
  });
  const customers = useMemo(
    () => getCustomers.data?.getCustomerByBusiness?.customerByBusiness ?? [],
    [getCustomers.data?.getCustomerByBusiness]
  );

  useEffect(() => {
    if (customerId) {
      const foundCustomer = customers.find(
        (customer) => customer?.id === customerId
      );
      if (foundCustomer) {
        setCustomerEmail(foundCustomer?.email!);
      }
    }
  }, [customerId, customers]);

  useEffect(() => {
    onCustomerChange(customerId);
  }, [customerId, onCustomerChange]);

  if (getBusinessesByUserId.loading || getCustomers.loading) {
    return <MainLoader />;
  }

  return (
    <div className=" flex w-full justify-between flex-col gap-y-7">
      <div className=" flex flex-row w-full justify-between">
        <p className=" text-primary-black text-lg">Customer details</p>
        <button
          type="button"
          onClick={openCustomerSheet}
          className=" text-primary-blue flex items-center gap-x-2"
        >
          Add customer <Plus className=" w-5 h-5" />
        </button>
      </div>
      <form className=" flex flex-col gap-y-[50px]">
        <div className=" flex flex-row gap-x-6">
          <div className=" flex flex-col gap-y-[6px] w-1/2">
            <label className="" htmlFor="customer">
              Customer
            </label>
            <Select value={customerId} onValueChange={setCustomerId}>
              <SelectTrigger className=" w-full rounded-lg border border-gray-200">
                <SelectValue
                  className=" text-primary-greytext"
                  placeholder="Select a customer"
                />
              </SelectTrigger>
              <SelectContent className=" bg-white w-full">
                <SelectGroup>
                  {customers.map((customer) => (
                    <SelectItem
                      key={customer?.id}
                      className=" hover:bg-gray-100 cursor-pointer py-2 text-[15px]"
                      value={customer?.id!}
                    >
                      {customer?.name}
                    </SelectItem>
                  ))}
                  {customers.length === 0 && (
                    <button
                      onClick={openCustomerSheet}
                      className="hover:bg-gray-100 cursor-pointer py-2 px-2 text-[15px] w-full flex items-start"
                    >
                      Create merchant
                    </button>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className=" flex flex-col gap-y-[6px] w-1/2">
            <label className="" htmlFor="customer">
              Customer email
            </label>
            <p className="border border-gray-200 rounded-lg h-10 text-sm focus:outline-none px-3 py-2">
              {customerEmail}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
