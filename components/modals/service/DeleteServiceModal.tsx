import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Trash2 } from "lucide-react";
import { useToast } from "@/app/hooks/use-toast";
import localStorage from "local-storage-fallback";
import {
  GetArchivedServiceByBusinessDocument,
  GetServiceByBusinessDocument,
  useDeleteServiceMutation,
  useGetServiceByBusinessQuery,
} from "@/src/generated/graphql";

interface DeleteServiceProps {
  open: boolean;
  openModal: () => void;
  onClose: () => void;
  serviceId: string;
}
const DeleteService: React.FC<DeleteServiceProps> = ({
  open,
  openModal,
  onClose,
  serviceId,
}) => {
  const { toast } = useToast();
  const [deleteServiceMutation, { loading }] = useDeleteServiceMutation();
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const getServicesByBusiness = useGetServiceByBusinessQuery({
    variables: {
      businessId: businessId,
    },
  });
  const numberOfServices =
    getServicesByBusiness.data?.getServiceByBusiness?.serviceByBusiness
      .length ?? 0;
  const showSuccessToast = () => {
    toast({
      title: "Deleted!",
      description: "Your service has been successfully deleted",
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
  const handleDeleteServiceClick = async () => {
    try {
      await deleteServiceMutation({
        variables: { serviceId: serviceId },
        refetchQueries: [
          GetServiceByBusinessDocument,
          GetArchivedServiceByBusinessDocument,
        ],
      });
      numberOfServices === 1 && window.location.reload();
      onClose();
      showSuccessToast();
    } catch (error) {
      console.error(error);
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
              <Dialog.Panel className="relative transform gap-y-3 overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow transition-all sm:w-full sm:max-w-[450px] sm:p-9">
                <div className=" flex flex-col gap-y-3">
                  <div className=" flex">
                    <span className=" rounded-full p-3 bg-[#FFF1F1] flex">
                      <Trash2 className=" text-primary-red" />
                    </span>
                  </div>
                  <p className=" text-lg text-[#121212]">Delete service</p>
                  <p className=" text-primary-greytext">
                    Are you sure you want to delete this service? You can’t undo
                    this action
                  </p>
                  <div className=" flex justify-between mt-6">
                    <button
                      onClick={onClose}
                      className=" px-7 py-[10px] rounded-[10px] flex gap-x-2 items-center justify-center border border-primary-border text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteServiceClick}
                      className={`px-7 py-[10px] rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-red text-white ${
                        loading ? "opacity-50" : ""
                      }`}
                    >
                      {loading ? "Loading..." : "Delete"}
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

export default DeleteService;
