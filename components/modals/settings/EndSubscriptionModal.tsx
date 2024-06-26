import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";
import { useToast } from "@/app/hooks/use-toast";
import {
  GetCurrentSubscriptionByBusinessDocument,
  GetSubscriptionByBusinessDocument,
  useEndSubscriptionMutation,
} from "@/src/generated/graphql";

interface EndSubscriptionProps {
  open: boolean;
  openModal: () => void;
  subscriptionId: string;
  onClose: () => void;
}
const EndSubscriptionModal: React.FC<EndSubscriptionProps> = ({
  open,
  openModal,
  subscriptionId,
  onClose,
}) => {
  const { toast } = useToast();
  const [endSubscriptionMutation, { data, loading, error }] =
    useEndSubscriptionMutation({
      variables: {
        subscriptionId: subscriptionId,
      },
    });
  const showSuccessToast = () => {
    toast({
      title: "Successful!",
      description: "Your card has been successfully deleted",
      duration: 3000,
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
  const handleEndSubscription = async () => {
    try {
      await endSubscriptionMutation({
        variables: {
          subscriptionId: subscriptionId,
        },
        refetchQueries: [
          GetSubscriptionByBusinessDocument,
          GetCurrentSubscriptionByBusinessDocument,
        ],
      });
      onClose();
      showSuccessToast();
    } catch (error) {
      onClose();
      showFailureToast(error);
      console.error(error);
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
                    <span className=" rounded-full p-3 bg-[#FFF1F1] flex">
                      <AlertTriangle className=" text-primary-red" />
                    </span>
                  </div>
                  <p className=" text-lg text-[#121212]">End subscription</p>
                  <p className=" text-primary-greytext">
                    Are you sure you want to end your subscription plan? You
                    can’t undo this action
                  </p>
                  <div className=" flex justify-between mt-6">
                    <button
                      onClick={onClose}
                      className=" px-7 py-[10px] rounded-[10px] flex gap-x-2 items-center justify-center border border-primary-border text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleEndSubscription}
                      disabled={loading}
                      className={`px-7 py-[10px] rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-red text-white ${
                        loading ? " opacity-50" : ""
                      }`}
                    >
                      {loading ? "Loading" : "Proceed"}
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

export default EndSubscriptionModal;
