"use client";
import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useToast } from "@/app/hooks/use-toast";
import { useArchiveSaleMutation } from "@/src/generated/graphql";
import { Archive, ChevronDown, X } from "lucide-react";

interface Props {
  open: boolean;
  openModal: () => void;
  onClose: () => void;
}

const CreateVerzoAccount2: React.FC<Props> = ({ open, openModal, onClose }) => {
  const { toast } = useToast();
  const [sendOTPStep, setSendOTPStep] = useState(true);
  const [verifyBVNStep, setVerifyBVNStep] = useState(false);
  const [addDetailsStep, setAddDetailsStep] = useState(false);
  const handleSendOTP = () => {
    setSendOTPStep(false);
    setVerifyBVNStep(true);
    setAddDetailsStep(false);
  };

  const handleVerifyBVN = () => {
    setSendOTPStep(false);
    setVerifyBVNStep(false);
    setAddDetailsStep(true);
  };
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
              <Dialog.Panel className="relative transform rounded-lg bg-white text-left pt-6 pb-7 shadow transition-all">
                <>
                  <div className="flex w-[480px] flex-col items-center justify-center">
                    <div className="border-b border-b-gray-200 w-full pb-4">
                      <div className="flex flex-col gap-y-5 w-full px-6">
                        <div className="flex w-full justify-between">
                          <p className="font-medium text-xl text-gray-700">
                            Create your Verzo account
                          </p>
                          <button
                            onClick={onClose}
                            className="p-1.5 bg-blue-100 rounded-full"
                          >
                            <X className="w-[17px] h-[17px] text-gray-700 stroke-[2.5px]" />
                          </button>
                        </div>
                        <div className="flex flex-row justify-between items-center">
                          <div className="flex flex-col items-center">
                            <div className="relative">
                              <div
                                className={`w-8 h-8 bg-${
                                  sendOTPStep ? "primary-blue" : "gray-200"
                                } rounded-full flex items-center justify-center text-${
                                  sendOTPStep ? "white" : "gray-600"
                                }`}
                              >
                                1
                              </div>
                            </div>
                            <p
                              className={`text-xs mt-2 w-[60px] text-center font-${
                                sendOTPStep ? "medium" : "normal"
                              }`}
                            >
                              Send OTP
                            </p>
                          </div>
                          <div className="flex items-center justify-center">
                            <div
                              className={`h-[5px] bg-${
                                sendOTPStep ? "primary-blue" : "gray-200"
                              } rounded-xl w-[120px] mt-[-20px]`}
                            ></div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="relative">
                              <div
                                className={`w-8 h-8 bg-${
                                  verifyBVNStep ? "primary-blue" : "gray-200"
                                } text-${verifyBVNStep ? "white" : "gray-600"}
                                 rounded-full flex items-center justify-center`}
                              >
                                2
                              </div>
                            </div>
                            <p
                              className={`text-xs mt-2 w-[60px] text-center font-${
                                verifyBVNStep ? "medium" : "normal"
                              }`}
                            >
                              Verify BVN
                            </p>
                          </div>
                          <div className="flex items-center justify-center">
                            <div
                              className={`h-[5px] bg-${
                                verifyBVNStep || addDetailsStep
                                  ? "primary-blue"
                                  : "gray-200"
                              } rounded-xl w-[120px] mt-[-20px]`}
                            ></div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="relative">
                              <div
                                className={`w-8 h-8 bg-${
                                  addDetailsStep ? "primary-blue" : "gray-200"
                                }
                               text-${addDetailsStep ? "white" : "gray-600"}
                              rounded-full flex items-center justify-center`}
                              >
                                3
                              </div>
                            </div>
                            <p
                              className={`text-xs mt-2 w-[70px] text-center font-${
                                addDetailsStep ? "medium" : "normal"
                              }`}
                            >
                              Add details
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-y-3 px-6 mt-4">
                      {/* Send OTP Step */}
                      {sendOTPStep && (
                        <>
                          <p className="text-gray-600 font-medium">Send OTP</p>
                          <div className="flex flex-col gap-y-[6px] mt-[-2px]">
                            <label
                              className="text-gray-700 text-[15px]"
                              htmlFor="phone"
                            >
                              Enter Phone Number (linked to BVN)
                            </label>
                            <input
                              type="tel"
                              required
                              className="max-w-[450px] px-4 py-[8px] border-gray-300 rounded-[8px] border placeholder:text-sm focus:outline-none"
                              id="phone"
                            />
                          </div>
                          <div className="flex mt-4">
                            <button
                              onClick={handleSendOTP}
                              type="button"
                              className={`px-7 py-[10px] w-full rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white`}
                            >
                              Send OTP
                            </button>
                          </div>
                        </>
                      )}
                      {/* Verify BVN Step */}
                      {verifyBVNStep && (
                        <>
                          <p className="text-gray-600 font-medium">
                            Verify Your BVN
                          </p>
                          <div className="flex flex-col gap-y-[6px] mt-[-2px]">
                            <label
                              className="text-gray-700 text-[15px]"
                              htmlFor="BVN"
                            >
                              Bank verification number (BVN)
                            </label>
                            <input
                              type="text"
                              required
                              className="max-w-[450px] px-4 py-[8px] border-gray-300 rounded-[8px] border placeholder:text-sm focus:outline-none"
                              id="BVN"
                            />
                          </div>
                          <div className="flex flex-col gap-y-[6px] mt-[-2px]">
                            <label
                              className="text-gray-700 text-[15px]"
                              htmlFor="otp"
                            >
                              OTP Code
                            </label>
                            <input
                              type="number"
                              required
                              className="max-w-[450px] px-4 py-[8px] border-gray-300 rounded-[8px] border placeholder:text-sm focus:outline-none"
                              id="otp"
                            />
                          </div>
                          <div className="flex mt-4">
                            <button
                              onClick={handleVerifyBVN}
                              type="button"
                              className={`px-7 py-[10px] w-full rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white`}
                            >
                              Verify
                            </button>
                          </div>
                        </>
                      )}
                      {/* Add Details Step */}
                      {addDetailsStep && (
                        <>
                          <p className="text-gray-600 font-medium">
                            Add details
                          </p>
                          <div className="flex flex-col gap-y-2">
                            <label className="text-gray-600" htmlFor="address">
                              Address
                            </label>
                            <input
                              type="text"
                              required
                              id="address"
                              className="w-full px-3 py-[8px] border-gray-300 rounded-[8px] border focus:outline-none"
                              placeholder="Address"
                            />
                          </div>
                          <div className="flex flex-row w-full gap-x-4">
                            <div className="w-1/2 flex flex-col gap-y-2">
                              <label
                                className="text-[15px] text-gray-600"
                                htmlFor="category"
                              >
                                Postal code
                              </label>
                              <input
                                type="text"
                                required
                                id="reference"
                                className="w-full px-3 py-[8px] border-gray-300 rounded-[8px] border focus:outline-none"
                                placeholder="100001"
                              />
                            </div>
                            <div className="w-1/2 flex flex-col gap-y-2">
                              <label
                                className="text-[15px] text-gray-600"
                                htmlFor="category"
                              >
                                Date of birth (DOB)
                              </label>
                              <input
                                className="w-full px-3 py-[8px] border-gray-300 rounded-[8px] border focus:outline-none"
                                type="date"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row w-full gap-x-4">
                            <div className="w-1/2 flex flex-col gap-y-2">
                              <label
                                className="text-[15px] text-gray-600"
                                htmlFor="city"
                              >
                                City
                              </label>
                              <input
                                type="text"
                                required
                                id="city"
                                className="w-full px-3 py-[8px] border-gray-300 rounded-[8px] border focus:outline-none"
                                placeholder="Lekki"
                              />
                            </div>
                            <div className="w-1/2 flex flex-col gap-y-2">
                              <label
                                className="text-[15px] text-gray-600"
                                htmlFor="state"
                              >
                                State
                              </label>
                              <input
                                type="text"
                                required
                                id="state"
                                className="w-full px-3 py-[8px] border-gray-300 rounded-[8px] border focus:outline-none"
                                placeholder="Lagos"
                              />
                            </div>
                          </div>
                          <div className="flex mt-4">
                            {/* Add onClick handler to close modal */}
                            <button
                              type="button"
                              className={`px-7 py-[10px] w-full rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white`}
                            >
                              Complete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CreateVerzoAccount2;
