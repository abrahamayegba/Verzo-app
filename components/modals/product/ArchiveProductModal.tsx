import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import ArchiveInvoiceIcon from "@/components/ui/icons/ArchiveInvoiceIcon";
import { useToast } from "@/app/hooks/use-toast";
import localStorage from "local-storage-fallback";
import {
  GetArchivedProductsByBusinessDocument,
  GetProductsByBusinessDocument,
  useArchiveProductByBusinessMutation,
  useGetProductsByBusinessQuery,
} from "@/src/generated/graphql";

interface ArchiveProductProps {
  open: boolean;
  openModal: () => void;
  onClose: () => void;
  productId: string;
}

const ArchiveProduct: React.FC<ArchiveProductProps> = ({
  open,
  openModal,
  onClose,
  productId,
}) => {
  const { toast } = useToast();
  const [archiveProductByBusinessMutation, { loading }] =
    useArchiveProductByBusinessMutation();
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const getProductsByBusiness = useGetProductsByBusinessQuery({
    variables: {
      businessId: businessId,
    },
  });
  const numberOfProducts =
    getProductsByBusiness?.data?.getProductsByBusiness?.productByBusiness
      .length ?? 0;
  const showSuccessToast = () => {
    toast({
      title: "Successful!",
      description: "Your product has been successfully archived",
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
  const handleArchiveProductClick = async () => {
    try {
      await archiveProductByBusinessMutation({
        variables: { productId: productId },
        refetchQueries: [
          GetProductsByBusinessDocument,
          GetArchivedProductsByBusinessDocument,
        ],
      });
      numberOfProducts === 1 && window.location.reload();
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
                    <span className=" rounded-full p-3 bg-[#F9FCFF] flex">
                      <ArchiveInvoiceIcon />
                    </span>
                  </div>
                  <p className=" text-lg text-[#121212]">Archive product</p>
                  <p className=" text-primary-greytext">
                    Are you sure you want to archive this product? It won’t be
                    visible till unarchive
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
                      disabled={loading}
                      onClick={handleArchiveProductClick}
                      className={`px-7 py-[10px] rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white ${
                        loading ? " opacity-50" : ""
                      }`}
                    >
                      {loading ? "Loading..." : "Archive"}
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

export default ArchiveProduct;
