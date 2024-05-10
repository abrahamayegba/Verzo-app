"use client";
import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useToast } from "@/app/hooks/use-toast";
import {
  SendVerificationOtpDocument,
  SetUpBusinessAccountDocument,
  ViewBusinessAccountDocument,
  useSendVerificationOtpMutation,
  useSetUpBusinessAccountMutation,
} from "@/src/generated/graphql";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
  openModal: () => void;
  onClose: () => void;
}

const CreateVerzoAccount: React.FC<Props> = ({ open, openModal, onClose }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [sendOTPStep, setSendOTPStep] = useState(true);
  const [identityId, setIdentityId] = useState("");
  const [otp, setOtp] = useState("");
  const [sendVerificationOtpMutation, { loading: sendOTPLoading }] =
    useSendVerificationOtpMutation();
  const [setUpBusinessAccountMutation, { loading }] =
    useSetUpBusinessAccountMutation();
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [dob, setDob] = useState("");
  const [bvnNumber, setBvnNumber] = useState("");
  const [addDetailsStep, setAddDetailsStep] = useState(false);
  const handleSendOTP = () => {
    setSendOTPStep(false);
    setAddDetailsStep(true);
  };
  const resetInputs = () => {
    setState("");
    setPostalCode("");
    setDob("");
    setBvnNumber("");
    setAddress("");
    setOtp("");
    setIdentityId("");
    setSendOTPStep(true);
    setAddDetailsStep(false);
  };
  const handleSendOTPMutation = async () => {
    try {
      await sendVerificationOtpMutation({
        variables: {
          bvnNumber: bvnNumber,
        },
        refetchQueries: [SendVerificationOtpDocument],
        onCompleted(data) {
          const identityId = data?.sendVerificationOTP?.data?._id!;
          setIdentityId(identityId);
          handleSendOTP();
        },
      });
    } catch (error) {
      console.error(error);
      onClose();
      showFailureToast(error);
    }
  };
  const handleAddDetails = async () => {
    try {
      await setUpBusinessAccountMutation({
        variables: {
          identityId: identityId,
          identityNumber: bvnNumber,
          otp: otp,
          city: city,
          state: state,
          addressLine1: address,
          postalCode: postalCode,
          dob: dob,
        },
        refetchQueries: [
          SetUpBusinessAccountDocument,
          ViewBusinessAccountDocument,
        ],
      });
      resetInputs();
      onClose();
      showSuccessToast();
    } catch (error) {
      console.error(error);
      onClose();
      // router.refresh();
      showFailureToast(error);
    }
  };

  const showSuccessToast = () => {
    toast({
      title: "Success!",
      description: "You have successfully created a Verzo account",
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
                  <div className="flex w-[500px] flex-col items-center justify-center">
                    <div className="border-b border-b-gray-200 w-full pb-4">
                      <div className="flex flex-col gap-y-5 w-full px-10">
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
                              } rounded-xl w-[280px] mt-[-20px]`}
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
                                2
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
                              htmlFor="BVN"
                            >
                              Bank verification number (BVN)
                            </label>
                            <input
                              type="text"
                              required
                              disabled={sendOTPLoading}
                              className="max-w-[450px] tracking-wider px-4 py-[8px] border-gray-300 rounded-[8px] border placeholder:text-sm focus:outline-none"
                              id="BVN"
                              value={bvnNumber}
                              onChange={(e) => setBvnNumber(e.target.value)}
                            />
                          </div>
                          <div className="flex mt-4">
                            <button
                              onClick={handleSendOTPMutation}
                              type="button"
                              disabled={sendOTPLoading || !bvnNumber}
                              className={`${
                                sendOTPLoading ? " opacity-50" : ""
                              } px-7 py-[10px] disabled:opacity-50 disabled:cursor-not-allowed w-full rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white`}
                            >
                              {sendOTPLoading ? "Loading" : " Send OTP"}
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
                          <div className="flex flex-col gap-y-[6px] mt-[-2px]">
                            <label
                              className="text-gray-700 text-[15px]"
                              htmlFor="otp"
                            >
                              Enter OTP Code
                            </label>
                            <input
                              type="number"
                              required
                              className="max-w-[450px] px-4 py-[8px] border-gray-300 rounded-[8px] border placeholder:text-sm focus:outline-none"
                              id="otp"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                            />
                          </div>
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
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                          </div>
                          <div className="flex flex-row w-full gap-x-4">
                            <div className="w-1/2 flex flex-col gap-y-2">
                              <label
                                className="text-[15px] text-gray-600"
                                htmlFor="postalCode"
                              >
                                Postal code
                              </label>
                              <input
                                type="text"
                                required
                                id="postalCode"
                                className="w-full px-3 py-[8px] border-gray-300 rounded-[8px] border focus:outline-none"
                                placeholder="100001"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                              />
                            </div>
                            <div className="w-1/2 flex flex-col gap-y-2">
                              <label
                                className="text-[15px] text-gray-600"
                                htmlFor="dob"
                              >
                                Date of birth (DOB)
                              </label>
                              <input
                                className="w-full px-3 py-[8px] border-gray-300 rounded-[8px] border focus:outline-none"
                                type="date"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
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
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
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
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="flex mt-4">
                            <button
                              type="button"
                              disabled={loading}
                              onClick={handleAddDetails}
                              className={`px-7 py-[10px] w-full rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white ${
                                loading ? "opacity-50" : ""
                              }`}
                            >
                              {loading ? "Loading" : "Complete"}
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

export default CreateVerzoAccount;
