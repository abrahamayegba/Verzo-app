"use client";
import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useToast } from "@/app/hooks/use-toast";
import { useSendInvoiceBMutation } from "@/src/generated/graphql";
import { Checkbox } from "@/components/ui/checkbox";
import { Send } from "lucide-react";

interface SendInvoiceProps {
  open: boolean;
  openModal: () => void;
  onClose: () => void;
  invoiceId: string;
  customerName: string;
  customerEmail: string;
}

const SendInvoice: React.FC<SendInvoiceProps> = ({
  open,
  openModal,
  onClose,
  customerName,
  customerEmail,
  invoiceId,
}) => {
  const { toast } = useToast();
  const [copy, setCopy] = useState(false);
  const [sendInvoiceBMutation, { loading }] = useSendInvoiceBMutation();
  const showSuccessToast = () => {
    toast({
      title: "Sent!",
      description: "Your invoice has been successfully sent!",
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
  const handleCheckboxChange = () => {
    setCopy(!copy);
  };
  const handleSendInvoiceClick = async () => {
    try {
      await sendInvoiceBMutation({
        variables: { invoiceId: invoiceId, copy: copy },
      });
      onClose();
      setCopy(false);
      showSuccessToast();
    } catch (error) {
      console.error(error);
      onClose();
      showFailureToast(error);
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
              <Dialog.Panel className="relative transform gap-y-3 overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow transition-all sm:w-full sm:max-w-[450px] sm:p-7">
                <div className=" flex flex-col gap-y-3">
                  <div className=" flex">
                    <span className=" rounded-full p-3 bg-[#F9FCFF] flex">
                      <Send className=" text-primary-blue" />
                    </span>
                  </div>
                  <p className=" text-lg text-[#121212]">Send invoice</p>
                  <p className=" text-primary-greytext">
                    Send this invoice to {customerName} at {customerEmail}
                  </p>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={copy}
                      onCheckedChange={handleCheckboxChange}
                      className=" h-5 w-5"
                      id="copy"
                    />
                    <label
                      htmlFor="copy"
                      className=" text-[15px] text-[#121212]"
                    >
                      Send me this invoice
                    </label>
                  </div>
                  <div className=" flex justify-between mt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className=" px-7 py-[10px] rounded-[10px] flex gap-x-2 items-center justify-center border border-primary-border text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleSendInvoiceClick}
                      className={` px-7 py-[10px] rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white ${
                        loading ? "opacity-50" : ""
                      }`}
                    >
                      {loading ? "Loading..." : "Send"}
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

export default SendInvoice;
