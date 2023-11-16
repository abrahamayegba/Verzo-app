"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import useModal from "@/app/hooks/useModal";
import DeleteCustomer from "./modals/customer/DeleteCustomerModal";
import UnarchiveCustomer from "./modals/customer/UnarchiveCustomerModal";
import ArchiveCustomer from "./modals/customer/ArchiveCustomerModal";
import CustomerTabContentAll from "./CustomerTabContentAll";
import CustomerTabContentArchived from "./CustomerTabContentArchived";

const CustomerList = () => {
  const allCustomers = "(15)";
  const archivedCustomers = "(0)";
  const [isChecked, setIsChecked] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isDeleteCustomerOpen,
    openModal: openDeleteCustomerModal,
    closeModal: closeDeleteCustomerModal,
  } = useModal();

  const {
    isOpen: isUnarchiveOpen,
    openModal: openUnarchiveModal,
    closeModal: closeUnarchiveModal,
  } = useModal();

  const handleToggleSelectAll = (isChecked: boolean) => {
    setIsChecked(isChecked);
  };

  return (
    <div className=" w-full flex flex-col">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className=" mb-3 flex justify-between border-b border-b-gray-100">
          <div className=" gap-x-[30px] flex">
            <TabsTrigger
              className=" text-[17px]  data-[state=active]:text-primary-black data-[state=active]:border-b-2 data-[state=active]:border-b-gray-400  text-primary-greytext"
              value="all"
            >
              All <span className=" text-primary-mainGrey">{allCustomers}</span>
            </TabsTrigger>
            <TabsTrigger
              className=" text-[17px]  data-[state=active]:text-primary-black text-primary-greytext data-[state=active]:border-b-2 data-[state=active]:border-b-gray-400"
              value="archived"
            >
              Archived{" "}
              <span className=" text-primary-mainGrey">
                {" "}
                {archivedCustomers}
              </span>
            </TabsTrigger>
          </div>
          {isChecked ? (
            <div className=" flex gap-x-4">
              <button
                onClick={openModal}
                className=" px-6 py-[10px] rounded-[10px] flex gap-x-2 items-center text-sm justify-center border border-primary-border"
              >
                Archive
              </button>
              <button
                onClick={openDeleteCustomerModal}
                className=" px-6 py-[10px] rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-red text-sm text-white"
              >
                Delete
              </button>
            </div>
          ) : null}
        </TabsList>
        <TabsContent value="all">
          <CustomerTabContentAll
            openDeleteModal={openDeleteCustomerModal}
            openArchiveModal={openModal}
            onToggleSelectAll={handleToggleSelectAll}
          />
        </TabsContent>
        <TabsContent value="archived">
          <CustomerTabContentArchived
            openDeleteModal={openDeleteCustomerModal}
            openUnarchiveModal={openUnarchiveModal}
            onToggleSelectAll={handleToggleSelectAll}
          />
        </TabsContent>
      </Tabs>
      <ArchiveCustomer
        open={isOpen}
        openModal={openModal}
        onClose={closeModal}
      />
      <UnarchiveCustomer
        open={isUnarchiveOpen}
        openModal={openUnarchiveModal}
        onClose={closeUnarchiveModal}
      />
      <DeleteCustomer
        open={isDeleteCustomerOpen}
        openModal={openDeleteCustomerModal}
        onClose={closeDeleteCustomerModal}
      />
    </div>
  );
};

export default CustomerList;
