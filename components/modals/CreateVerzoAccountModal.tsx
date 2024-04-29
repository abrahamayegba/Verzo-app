"use client";
import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import ArchiveInvoiceIcon from "@/components/ui/icons/ArchiveInvoiceIcon";
import { useToast } from "@/app/hooks/use-toast";
import {
  GetArchivedSalesByBusinessDocument,
  GetSaleByBusinessDocument,
  GetSaleByIdDocument,
  useArchiveSaleMutation,
} from "@/src/generated/graphql";
import { Archive, ChevronDown, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface Props {
  open: boolean;
  openModal: () => void;
  onClose: () => void;
}

const CreateVerzoAccount: React.FC<Props> = ({ open, openModal, onClose }) => {
  const { toast } = useToast();
  const [archiveSaleMutation, { loading }] = useArchiveSaleMutation();
  const showSuccessToast = () => {
    toast({
      title: "Archived!",
      description: "Your invoice has been successfully archived",
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
  const [dobValue, setDobValue] = useState("");
  const [value, setValue] = React.useState(dayjs("2022-04-17"));
  const [openDateOfBirthPicker, setOpenDateOfBirthPicker] =
    React.useState(false);
  const [dateOfBirth, setDateOfBirth] = React.useState<Date | null>(null);

  React.useEffect(() => {
    if (dateOfBirth) {
      const formattedDate = format(dateOfBirth, "yyyy-MM-dd").toString();
      setDobValue(formattedDate);
    }
  }, [dateOfBirth]);

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
              <Dialog.Panel className="relative transform gap-y-3 rounded-lg bg-white pb-9 text-left shadow transition-all px-11 pt-4">
                <>
                  <div className="flex flex-col gap-y-3 relative w-[370px]">
                    <X
                      onClick={onClose}
                      className=" absolute cursor-pointer right-0 mr-[-25px] w-6 h-6 text-gray-700"
                    />
                    <div className="flex ">
                      <div className="w-1/3 p-[16px] flex flex-col items-center justify-center">
                        <div className="relative w-14 h-14">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="bg-primary-blue rounded-full w-14 h-14 flex items-center justify-center text-white text-2xl font-bold">
                              1
                            </span>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-primary-blue rounded-full w-14 h-14 animate-pulse"></div>
                          </div>
                        </div>
                        <p className="text-[13px] mt-2 font-medium">Send OTP</p>
                      </div>
                      <div className="w-1/3 p-[16px] flex flex-col items-center justify-center">
                        <div className="relative w-14 h-14">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="bg-gray-200 rounded-full w-14 h-14 flex items-center justify-center text-gray-700 text-2xl font-bold">
                              2
                            </span>
                          </div>
                        </div>
                        <p className=" text-[13px] mt-2">Verify BVN</p>
                      </div>
                      <div className="w-1/3 p-[16px] flex flex-col items-center justify-center">
                        <div className="relative w-14 h-14">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="bg-gray-200 rounded-full w-14 h-14 flex items-center justify-center text-gray-700 text-2xl font-bold">
                              3
                            </span>
                          </div>
                        </div>
                        <p className=" text-[13px] mt-2">Add details</p>
                      </div>
                    </div>
                    <p className=" text-2xl font-medium text-[#121212] text-center">
                      Create your Verzo account
                    </p>
                    <div className=" flex flex-col gap-y-2">
                      <label className=" text-primary-black" htmlFor="BVN">
                        Enter your Phone number (linked to your BVN)
                      </label>
                      <input
                        type="tel"
                        required
                        className="max-w-[450px] px-4 py-[10px] border-gray-300 rounded-[8px] border placeholder:text-sm focus:outline-none "
                        id="phone"
                      />
                    </div>
                    <div className="flex justify-between mt-4">
                      <button
                        type="button"
                        className={`px-7 py-[10px] w-full rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white ${
                          loading ? "opacity-50" : ""
                        }`}
                      >
                        {loading ? "Loading..." : "Continue"}
                      </button>
                    </div>
                  </div>
                  {/* <div className="flex flex-col gap-y-3 relative w-[370px]">
                    <X
                      onClick={onClose}
                      className=" absolute cursor-pointer right-0 mr-[-25px] w-6 h-6 text-gray-700"
                    />
                    <div className=" flex">
                      <div className="w-1/3 p-[16px] flex flex-col items-center justify-center">
                        <div className="relative w-14 h-14">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="bg-gray-200 rounded-full w-14 h-14 flex items-center justify-center text-gray-700 text-2xl font-bold ">
                              1
                            </span>
                          </div>
                        </div>
                        <p className="text-[13px] mt-2">Send Otp</p>
                      </div>
                      <div className="w-1/3 p-[16px] flex flex-col items-center justify-center">
                        <div className="relative w-14 h-14">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="bg-primary-blue rounded-full w-14 h-14 flex items-center justify-center text-white text-2xl font-bold">
                              2
                            </span>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-primary-blue rounded-full w-14 h-14 animate-pulse"></div>
                          </div>
                        </div>
                        <p className=" text-[13px] mt-2 font-medium">
                          Verify BVN
                        </p>
                      </div>
                      <div className="w-1/3 p-[16px] flex flex-col items-center justify-center">
                        <div className="relative w-14 h-14">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="bg-gray-200 rounded-full w-14 h-14 flex items-center justify-center text-gray-700 text-2xl font-bold">
                              3
                            </span>
                          </div>
                        </div>
                        <p className=" text-[13px] mt-2">Add details</p>
                      </div>
                    </div>
                    <p className=" text-2xl mt-[-10px] font-medium text-[#121212] text-center">
                      Verify Your BVN
                    </p>

                    <div className=" flex flex-col gap-y-2 ">
                      <label className=" text-primary-black" htmlFor="BVN">
                        Bank verification number (BVN)
                      </label>
                      <input
                        type="tel"
                        required
                        className="max-w-[450px] px-4 py-[10px] border-gray-300 rounded-[8px] border placeholder:text-sm focus:outline-none "
                        id="phone"
                      />
                    </div>
                    <div className=" flex flex-col gap-y-2">
                      <label className=" text-primary-black" htmlFor="otp">
                        OTP Code
                      </label>
                      <input
                        type="number"
                        required
                        className="max-w-[450px] px-4 py-[10px] border-gray-300 rounded-[8px] border placeholder:text-sm focus:outline-none "
                        id="otp"
                      />
                    </div>
                    <div className="flex mt-4">
                      <button
                        type="button"
                        className={`px-7 py-[10px] w-full rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white ${
                          loading ? "opacity-50" : ""
                        }`}
                      >
                        {loading ? "Loading..." : "Verify"}
                      </button>
                    </div>
                  </div> */}

                  {/* <div className="flex flex-col gap-y-3 relative w-[400px]">
                    <div className="bg-white h-[120px] flex border border-gray-100 z-[100] rounded-lg absolute top-[-28%] left-0 w-full">
                      <div className="w-1/3 p-[16px] flex flex-col items-center justify-center">
                        <div className="relative w-14 h-14">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="bg-gray-200 rounded-full w-14 h-14 flex items-center justify-center text-gray-700 text-2xl font-bold ">
                              1
                            </span>
                          </div>
                        </div>
                        <p className="text-[13px] mt-2">Send Otp</p>
                      </div>
                      <div className="w-1/3 p-[16px] flex flex-col items-center justify-center">
                        <div className="relative w-14 h-14">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="bg-gray-200 rounded-full w-14 h-14 flex items-center justify-center text-gray-700 text-2xl font-bold">
                              2
                            </span>
                          </div>
                        </div>
                        <p className=" text-[13px] mt-2">Verify BVN</p>
                      </div>
                      <div className="w-1/3 p-[16px] flex flex-col items-center justify-center">
                        <div className="relative w-14 h-14">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="bg-primary-blue rounded-full w-14 h-14 flex items-center justify-center text-white text-2xl font-bold">
                              3
                            </span>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-primary-blue rounded-full w-14 h-14 animate-pulse"></div>
                          </div>
                        </div>
                        <p className=" text-[13px] mt-2 font-medium">
                          Add details
                        </p>
                      </div>
                    </div>
                    <p className=" text-2xl font-medium text-[#121212] mt-[30px] text-center">
                      Add account details
                    </p>
                    <div className=" flex flex-col gap-y-2">
                      <label className=" text-primary-black" htmlFor="address">
                        Address
                      </label>
                      <input
                        type="text"
                        required
                        id="address"
                        className="w-full px-3 py-[10px] border-gray-300 rounded-[8px] border focus:outline-none "
                        placeholder="Address"
                      />
                    </div>
                    <div className="flex flex-row w-full gap-x-4">
                      <div className=" w-1/2 flex flex-col gap-y-2">
                        <label className=" text-[15px]" htmlFor="category">
                          Postal code
                        </label>
                        <input
                          type="text"
                          required
                          id="reference"
                          className="w-full px-3 py-[10px] border-gray-300 rounded-[8px] border focus:outline-none "
                          placeholder="100001"
                        />
                      </div>
                      <div className=" w-1/2 flex flex-col gap-y-2">
                        <label className=" text-[15px]" htmlFor="category">
                          Date of birth (DOB)
                        </label>
                        <input
                          className="w-full px-3 py-[9px] border-gray-300 rounded-[8px] border focus:outline-none "
                          type="date"
                        />
                      </div>
                    </div>
                    <div className="flex flex-row w-full gap-x-4">
                      <div className="w-1/2 max-w-[200px] flex flex-col gap-y-2">
                        <label className=" text-[15px]" htmlFor="city">
                          City
                        </label>
                        <input
                          type="text"
                          required
                          id="city"
                          className="w-full px-3 py-[10px] border-gray-300 rounded-[8px] border focus:outline-none "
                          placeholder="Lekki"
                        />
                      </div>
                      <div className="w-1/2 max-w-[200px] flex flex-col gap-y-2">
                        <label className=" text-[15px]" htmlFor="state">
                          State
                        </label>
                        <input
                          type="text"
                          required
                          id="state"
                          className="w-full px-3 py-[10px] border-gray-300 rounded-[8px] border focus:outline-none "
                          placeholder="Lagos"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between mt-4">
                      <button
                        type="button"
                        className={`px-7 py-[10px] w-full rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white ${
                          loading ? "opacity-50" : ""
                        }`}
                      >
                        {loading ? "Loading..." : "Submit"}
                      </button>
                    </div>
                  </div> */}
                </>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CreateVerzoAccount;
