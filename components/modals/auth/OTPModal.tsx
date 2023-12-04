"use client";
import React, { useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import OTPIcon from "@/components/ui/icons/OTPIcon";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useVerificationMutation } from "@/src/generated/graphql";
import { useToast } from "@/app/hooks/use-toast";

interface OTPProps {
  open: boolean;
  openModal: () => void;
  onClose: () => void;
}

const OTPModal: React.FC<OTPProps> = ({ open, openModal, onClose }) => {
  const [codes, setCodes] = useState(["", "", "", ""]);
  const { toast } = useToast();

  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (index: number, value: string) => {
    const newCodes = [...codes];
    newCodes[index] = value;

    if (index < codes.length - 1 && value !== "") {
      // Move focus to the next input
      inputRefs.current[index + 1].focus();
    }

    setCodes(newCodes);
  };
  const handleBackspace = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && index > 0 && codes[index] === "") {
      inputRefs.current[index - 1]!.focus();
    }
  };

  const router = useRouter();
  const { handleSubmit } = useForm<FormData>();
  const [verificationMutation, { loading }] = useVerificationMutation();
  const showFailureToast = (error: any) => {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: error.message,
      duration: 3000,
    });
  };

  const onVerifyHandler = async () => {
    const combinedCode = parseInt(codes.join(""), 10);
    try {
      await verificationMutation({
        variables: {
          code: combinedCode,
        },
      });
      router.push("/auth/businesssetup");
      onClose();
      setCodes(["", "", "", ""]);
    } catch (error: any) {
      console.error(error);
      if (error.message === "User already verified") {
        onClose();
        setCodes(["", "", "", ""]);
        return toast({
          title: "User already verified",
          description: "Please sign in to your account",
        });
      }
      onClose();
      showFailureToast(error);
      setCodes(["", "", "", ""]);
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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-400"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform gap-y-3 overflow-hidden rounded-lg bg-white px-9 py-8 text-left shadow transition-all sm:w-full sm:max-w-[430px]">
                <form
                  onSubmit={handleSubmit(onVerifyHandler)}
                  className=" flex flex-col gap-y-3"
                >
                  <div className=" flex">
                    <span className=" rounded-full p-3 items-center justify-center bg-[#EDF6FF] flex">
                      <OTPIcon />
                    </span>
                  </div>
                  <p className=" text-lg text-[#121212]">Enter OTP</p>
                  <p className=" text-primary-greytext">
                    Please enter the OTP sent to your email inbox
                  </p>
                  <div className=" flex flex-row justify-between mt-6">
                    {codes.map((code, index) => (
                      <input
                        key={index}
                        ref={(ref) => (inputRefs.current[index] = ref!)}
                        className="bg-gray-100 focus:outline-none text-center text-xl w-[50px] h-[50px] rounded-lg"
                        type="text"
                        maxLength={1}
                        value={code}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleBackspace(index, e)}
                      />
                    ))}
                  </div>
                  <div className=" flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={onClose}
                      className=" px-7 py-[10px] rounded-[10px] flex gap-x-2 items-center justify-center border border-primary-border text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`px-8 py-[10px] rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white ${
                        loading ? " opacity-50" : ""
                      }`}
                    >
                      Verify
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default OTPModal;
