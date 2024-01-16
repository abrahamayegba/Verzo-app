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
import {
  useGetArchivedServiceByBusinessQuery,
  useGetServiceByBusinessQuery,
} from "@/src/generated/graphql";
import EditServiceSheet from "./sheets/service/EditServiceSheet";

interface ServicelistProps {
  serviceSearchId: string;
}

const ServiceList: React.FC<ServicelistProps> = ({ serviceSearchId }) => {
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

  const getArchivedServicesByBusiness = useGetArchivedServiceByBusinessQuery({
    variables: {
      businessId: businessId,
      cursor: null,
      sets: 1,
    },
  });

  const archivedServices =
    getArchivedServicesByBusiness.data?.getArchivedServicesByBusiness
      ?.serviceByBusiness ?? [];

  const services =
    getServicesByBusiness.data?.getServiceByBusiness?.serviceByBusiness ?? [];

  const serviceSearchResult = services.find(
    (service) => service?.id === serviceSearchId
  );

  const archivedServiceSearchResult = archivedServices.find(
    (service) => service?.id === serviceSearchId
  );

  const defaultValue = serviceSearchResult
    ? "all"
    : archivedServiceSearchResult
    ? "archived"
    : "all";

  const allServices = services.length;
  const allArchivedServices = archivedServices.length;

  const handleToggleSelectAll = (isChecked: boolean) => {
    setIsChecked(isChecked);
  };

  const handleOpenArchiveModal = (serviceId: string) => {
    setSelectedId(serviceId);
    openModal();
  };

  const handleOpenUnarchiveModal = (serviceId: string) => {
    setSelectedId(serviceId);
    openUnarchiveModal();
  };

  const handleOpenDeleteModal = (serviceId: string) => {
    setSelectedId(serviceId);
    openDeleteServiceModal();
  };

  const handleOpenEditModal = (serviceId: string) => {
    setSelectedId(serviceId);
    openEditModal();
  };

  return (
    <div className=" w-full flex flex-col">
      <Tabs defaultValue={defaultValue} className="w-full">
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
                ({allArchivedServices})
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
            serviceSearchId={serviceSearchId}
          />
        </TabsContent>
        <TabsContent value="archived">
          <ServiceTabContentArchived
            openDeleteModal={handleOpenDeleteModal}
            openUnarchiveModal={handleOpenUnarchiveModal}
            serviceSearchId={serviceSearchId}
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
