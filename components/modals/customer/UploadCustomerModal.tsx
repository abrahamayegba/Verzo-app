"use client";
import React, { ChangeEvent, useRef, DragEvent, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useToast } from "../../../app/hooks/use-toast";
import UploadCSVIcon from "../../ui/icons/UploadCSVIcon";
import DragDropIcon from "../../ui/icons/DragDropIcon";
import {
  GetCustomerByBusinessDocument,
  NumberOfCustomersThisMonthDocument,
  NumberOfCustomersThisWeekDocument,
  NumberOfCustomersThisYearDocument,
  useCreateCustomerWithCsvMutation,
} from "@/src/generated/graphql";

interface UploadCSVProps {
  open: boolean;
  openModal: () => void;
  onClose: () => void;
}

const UploadCustomerCSV: React.FC<UploadCSVProps> = ({ open, onClose }) => {
  const { toast } = useToast();
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const [createCustomerWithCsvMutation, { data, loading }] =
    useCreateCustomerWithCsvMutation();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDownload = () => {
    const sampleFileName = "SAMPLE_DATA_EXCEL.xlsx";
    const sampleFileUrl = `/SAMPLE_DATA_EXCEL.xlsx`;
    const anchor = document.createElement("a");
    anchor.href = sampleFileUrl;
    anchor.target = "_blank";
    anchor.download = sampleFileName;
    anchor.click();
    onClose();
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    setSelectedFile(file);
  };

  const showSuccessToast = () => {
    toast({
      title: "Imported!",
      description: "Your customers have been successfully imported",
      duration: 3500,
    });
  };
  const showFailureToast = (error: any) => {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: error?.message,
      duration: 3000,
    });
  };

  const handleImportConfirm = async () => {
    try {
      const { data } = await createCustomerWithCsvMutation({
        variables: {
          businessId: businessId,
          csvFile: selectedFile,
        },
        refetchQueries: [
          GetCustomerByBusinessDocument,
          NumberOfCustomersThisWeekDocument,
          NumberOfCustomersThisMonthDocument,
          NumberOfCustomersThisYearDocument,
        ],
      });
      if (data?.createCustomerWithCsv === true) {
        onClose();
        setSelectedFile(null);
        showSuccessToast();
      }
    } catch (error) {
      console.error("Error during import:", error);
      showFailureToast(error);
      onClose();
      setSelectedFile(null);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[110]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-400"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-400 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-400"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform gap-y-3 overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow transition-all sm:w-full sm:max-w-[450px] sm:p-9">
                <div className=" flex flex-col gap-y-3">
                  <div className=" flex">
                    <span className=" rounded-full p-3 bg-[#F9FCFF] flex">
                      <UploadCSVIcon />
                    </span>
                  </div>
                  <p className=" text-lg text-[#121212]">Upload Customers</p>
                  <p className=" text-primary-greytext">
                    Upload a CSV file to help us import your customers.
                    Supported formats: CSV <br />
                    <button
                      onClick={handleDownload}
                      className=" text-primary-blue underline underline-offset-2 cursor-pointer"
                    >
                      Download
                    </button>{" "}
                    sample template
                  </p>
                  <div
                    className="h-[103px] cursor-pointer border-dashed items-center justify-center flex flex-col gap-y-3 border border-primary-mainGrey mt-5 rounded-lg text-sm"
                    onClick={handleFileUpload}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileSelect}
                    />
                    <DragDropIcon />
                    <p>
                      {selectedFile ? (
                        <>
                          <div className=" flex flex-col items-center gap-y-1">
                            <p className=" flex">{selectedFile.name}</p>
                            <span className="underline underline-offset-2 text-primary-blue">
                              Choose another file
                            </span>{" "}
                          </div>
                        </>
                      ) : (
                        <>
                          Drag and Drop or{" "}
                          <span className="underline underline-offset-2 text-primary-blue">
                            Upload file
                          </span>{" "}
                        </>
                      )}
                    </p>
                  </div>
                  <div className=" flex justify-between mt-6">
                    <button
                      onClick={() => {
                        onClose();
                        setSelectedFile(null);
                      }}
                      className=" px-7 py-[10px] rounded-[10px] flex gap-x-2 items-center justify-center border border-primary-border text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={loading || !selectedFile}
                      onClick={handleImportConfirm}
                      className={`px-7 py-[10px] disabled:opacity-50 disabled:cursor-not-allowed rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white ${
                        loading ? "opacity-50" : ""
                      }`}
                    >
                      {loading ? "Importing..." : "Import"}
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default UploadCustomerCSV;
