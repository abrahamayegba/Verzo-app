import { Download } from "lucide-react";
import React from "react";
import UploadCustomerCSV from "../modals/customer/UploadCustomerModal";
import UploadMerchantCSV from "../modals/UploadMerchantModal";
import UploadProductCSV from "../modals/product/UploadProductModal";
import UploadServiceCSV from "../modals/service/UploadServiceModal";
import useModal from "@/app/hooks/useModal";

const BulkUploadContent = () => {
  const {
    isOpen: isImportMerchantModalOpen,
    openModal: openImportMerchantModal,
    closeModal: closeImportMerchantModal,
  } = useModal();
  const {
    isOpen: isImportProductModalOpen,
    openModal: openImportProductModal,
    closeModal: closeImportProductModal,
  } = useModal();
  const {
    isOpen: isImportServiceModalOpen,
    openModal: openImportServiceModal,
    closeModal: closeImportServiceModal,
  } = useModal();
  const {
    isOpen: isImportCustomerModalOpen,
    openModal: openImportCustomerModal,
    closeModal: closeImportCustomerModal,
  } = useModal();
  return (
    <>
      <div className=" flex flex-col w-full pt-[20px] gap-y-3">
        <p className=" text-sm text-primary-greytext px-6">
          Bulk upload your data
        </p>
        <div className=" bg-white min-h-[185px] flex flex-col rounded-b-[16px] w-full">
          <div className=" flex flex-row justify-between p-6 items-center border-b border-b-gray-100">
            <div className=" flex flex-col gap-y-[6px]">
              <p className=" text-primary-black">Customer</p>
              <p className=" text-sm text-primary-greytext">
                Add more customers to your business
              </p>
            </div>
            <button
              onClick={openImportCustomerModal}
              className=" px-6 py-3 rounded-[10px] flex text-sm text-primary-black gap-x-2 items-center justify-center border border-primary-border"
            >
              Import
              <Download className=" w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div className=" flex flex-row justify-between p-6 items-center border-b border-b-gray-100">
            <div className=" flex flex-col gap-y-[6px]">
              <p className=" text-primary-black">Products</p>
              <p className=" text-sm text-primary-greytext">
                Add more products to your business
              </p>
            </div>
            <button
              onClick={openImportProductModal}
              className=" px-6 py-3 rounded-[10px] text-sm disabled:cursor-not-allowed disabled:opacity-50 text-primary-black flex gap-x-2 items-center justify-center border border-primary-border"
            >
              Import
              <Download className=" w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div className=" flex flex-row justify-between p-6 items-center border-b border-b-gray-100">
            <div className=" flex flex-col gap-y-[6px]">
              <p className=" text-primary-black">Services</p>
              <p className=" text-sm text-primary-greytext">
                Add more services to your business
              </p>
            </div>
            <button
              onClick={openImportServiceModal}
              className=" px-6 py-3 rounded-[10px] text-sm disabled:cursor-not-allowed disabled:opacity-50 text-primary-black flex gap-x-2 items-center justify-center border border-primary-border"
            >
              Import
              <Download className=" w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div className=" flex flex-row justify-between p-6 items-center border-b border-b-gray-100">
            <div className=" flex flex-col gap-y-[6px]">
              <p className=" text-primary-black">Merchants</p>
              <p className=" text-sm text-primary-greytext">
                Add more merchants to your business
              </p>
            </div>
            <button
              onClick={openImportMerchantModal}
              className=" px-6 py-3 rounded-[10px] text-sm disabled:cursor-not-allowed disabled:opacity-50 text-primary-black flex gap-x-2 items-center justify-center border border-primary-border"
            >
              Import
              <Download className=" w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      <UploadCustomerCSV
        open={isImportCustomerModalOpen}
        openModal={openImportCustomerModal}
        onClose={closeImportCustomerModal}
      />
      <UploadMerchantCSV
        open={isImportMerchantModalOpen}
        openModal={openImportMerchantModal}
        onClose={closeImportMerchantModal}
      />
      <UploadProductCSV
        open={isImportProductModalOpen}
        openModal={openImportProductModal}
        onClose={closeImportProductModal}
      />
      <UploadServiceCSV
        open={isImportServiceModalOpen}
        openModal={openImportServiceModal}
        onClose={closeImportServiceModal}
      />
    </>
  );
};

export default BulkUploadContent;
