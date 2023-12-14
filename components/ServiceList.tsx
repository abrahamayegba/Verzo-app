"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import useModal from "@/app/hooks/useModal";
import ArchiveService from "./modals/service/ArchiveServiceModal";
import localStorage from "local-storage-fallback";
import UnarchiveService from "./modals/service/UnarchiveServiceModal";
import DeleteService from "./modals/service/DeleteServiceModal";
import ServiceTabContentAll from "./ServiceTabContentAll";
import ServiceTabContentArchived from "./ServiceTabContentArchived";
import { useGetServiceByBusinessQuery } from "@/src/generated/graphql";
import EditServiceSheet from "./sheets/service/EditServiceSheet";

const ServiceList = () => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const [isChecked, setIsChecked] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isDeleteServiceOpen,
    openModal: openDeleteServiceModal,
    closeModal: closeDeleteServiceModal,
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

  const getServicesByBusiness = useGetServiceByBusinessQuery({
    variables: {
      businessId: businessId,
      cursor: null,
      sets: 1,
    },
  });

  const services =
    getServicesByBusiness.data?.getServiceByBusiness?.serviceByBusiness ?? [];

  const allServices = services.length;
  const archivedServices = services.filter(
    (service) => service?.archived
  ).length;

  const handleToggleSelectAll = (isChecked: boolean) => {
    setIsChecked(isChecked);
  };

  const handleOpenArchiveModal = (customerId: string) => {
    setSelectedId(customerId);
    openModal();
  };

  const handleOpenDeleteModal = (customerId: string) => {
    setSelectedId(customerId);
    openDeleteServiceModal();
  };

  const handleOpenEditModal = (customerId: string) => {
    setSelectedId(customerId);
    openEditModal();
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
              All{" "}
              <span className=" text-primary-mainGrey">({allServices})</span>
            </TabsTrigger>
            <TabsTrigger
              className=" text-[17px]  data-[state=active]:text-primary-black text-primary-greytext data-[state=active]:border-b-2 data-[state=active]:border-b-gray-400"
              value="archived"
            >
              Archived{" "}
              <span className=" text-primary-mainGrey">
                {" "}
                ({archivedServices})
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
                onClick={openDeleteServiceModal}
                className=" px-6 py-[10px] rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-red text-sm text-white"
              >
                Delete
              </button>
            </div>
          ) : null}
        </TabsList>
        <TabsContent value="all">
          <ServiceTabContentAll
            openDeleteModal={handleOpenDeleteModal}
            openArchiveModal={handleOpenArchiveModal}
            openEditModal={handleOpenEditModal}
            onToggleSelectAll={handleToggleSelectAll}
          />
        </TabsContent>
        <TabsContent value="archived">
          <ServiceTabContentArchived
            openDeleteModal={openDeleteServiceModal}
            openUnarchiveModal={openUnarchiveModal}
            onToggleSelectAll={handleToggleSelectAll}
          />
        </TabsContent>
      </Tabs>
      <ArchiveService
        open={isOpen}
        openModal={openModal}
        onClose={closeModal}
        serviceId={selectedId}
      />
      <EditServiceSheet
        open={isEditModalOpen}
        onClose={closeEditModal}
        serviceId={selectedId}
      />
      <UnarchiveService
        open={isUnarchiveOpen}
        openModal={openUnarchiveModal}
        onClose={closeUnarchiveModal}
        serviceId={selectedId}
      />
      <DeleteService
        open={isDeleteServiceOpen}
        openModal={openDeleteServiceModal}
        onClose={closeDeleteServiceModal}
        serviceId={selectedId}
      />
    </div>
  );
};

export default ServiceList;
