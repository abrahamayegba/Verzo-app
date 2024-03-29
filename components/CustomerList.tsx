"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import useModal from "@/app/hooks/useModal";
import DeleteCustomer from "./modals/customer/DeleteCustomerModal";
import UnarchiveCustomer from "./modals/customer/UnarchiveCustomerModal";
import ArchiveCustomer from "./modals/customer/ArchiveCustomerModal";
import CustomerTabContentAll from "./CustomerTabContentAll";
import localStorage from "local-storage-fallback";
import CustomerTabContentArchived from "./CustomerTabContentArchived";
import {
  useGetArchivedCustomersByBusinessQuery,
  useGetCustomerByBusinessQuery,
} from "@/src/generated/graphql";
import EditCustomerSheet from "./sheets/customer/EditCustomerSheet";

interface CustomerlistProps {
  customerSearchId: string;
}

const CustomerList: React.FC<CustomerlistProps> = ({ customerSearchId }) => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const [isChecked, setIsChecked] = useState(false);
  const [selectedId, setSelectedId] = useState("");
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

  const {
    isOpen: isEditModalOpen,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();

  const handleToggleSelectAll = (isChecked: boolean) => {
    setIsChecked(isChecked);
  };

  const handleOpenArchiveModal = (customerId: string) => {
    setSelectedId(customerId);
    openModal();
  };

  const handleOpenUnarchiveModal = (customerId: string) => {
    setSelectedId(customerId);
    openUnarchiveModal();
  };

  const handleOpenDeleteModal = (customerId: string) => {
    setSelectedId(customerId);
    openDeleteCustomerModal();
  };

  const handleOpenEditModal = (customerId: string) => {
    setSelectedId(customerId);
    openEditModal();
  };

  const getCustomersByBusiness = useGetCustomerByBusinessQuery({
    variables: {
      businessId: businessId,
      sets: 1,
      cursor: null,
    },
  });
  const getArchivedCustomersByBusiness = useGetArchivedCustomersByBusinessQuery(
    {
      variables: {
        businessId: businessId,
        sets: 1,
        cursor: null,
      },
    }
  );
  const archivedCustomers =
    getArchivedCustomersByBusiness.data?.getArchivedCustomerByBusiness
      ?.customerByBusiness ?? [];
  const customers =
    getCustomersByBusiness.data?.getCustomerByBusiness?.customerByBusiness ??
    [];
  const customerSearchResult = customers.find(
    (customer) => customer?.id === customerSearchId
  );
  const archivedCustomerSearchResult = archivedCustomers.find(
    (customer) => customer?.id === customerSearchId
  );

  const defaultValue = customerSearchResult
    ? "all"
    : archivedCustomerSearchResult
    ? "archived"
    : "all";
  const allCustomers = customers.length;
  const allArchivedCustomers = archivedCustomers.length;

  return (
    <>
      <div className=" w-full flex flex-col">
        <Tabs defaultValue={defaultValue} className="w-full">
          <TabsList className=" mb-3 flex justify-between border-b border-b-gray-100">
            <div className=" gap-x-[30px] flex">
              <TabsTrigger
                className=" text-[17px]  data-[state=active]:text-primary-black data-[state=active]:border-b-2 data-[state=active]:border-b-gray-400  text-primary-greytext"
                value="all"
              >
                All{" "}
                <span className=" text-primary-mainGrey">({allCustomers})</span>
              </TabsTrigger>
              <TabsTrigger
                className=" text-[17px]  data-[state=active]:text-primary-black text-primary-greytext data-[state=active]:border-b-2 data-[state=active]:border-b-gray-400"
                value="archived"
              >
                Archived{" "}
                <span className=" text-primary-mainGrey">
                  {" "}
                  ({allArchivedCustomers})
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
              openDeleteModal={handleOpenDeleteModal}
              openArchiveModal={handleOpenArchiveModal}
              openEditModal={handleOpenEditModal}
              onToggleSelectAll={handleToggleSelectAll}
              customerSearchId={customerSearchId}
            />
          </TabsContent>
          <TabsContent value="archived">
            <CustomerTabContentArchived
              openDeleteModal={handleOpenDeleteModal}
              openUnarchiveModal={handleOpenUnarchiveModal}
              customerSearchId={customerSearchId}
            />
          </TabsContent>
        </Tabs>
      </div>
      <ArchiveCustomer
        open={isOpen}
        openModal={openModal}
        onClose={closeModal}
        customerId={selectedId}
      />
      <EditCustomerSheet
        open={isEditModalOpen}
        onClose={closeEditModal}
        customerId={selectedId}
      />
      <UnarchiveCustomer
        open={isUnarchiveOpen}
        openModal={openUnarchiveModal}
        onClose={closeUnarchiveModal}
        customerId={selectedId}
      />
      <DeleteCustomer
        open={isDeleteCustomerOpen}
        openModal={openDeleteCustomerModal}
        onClose={closeDeleteCustomerModal}
        customerId={selectedId}
      />
    </>
  );
};

export default CustomerList;
