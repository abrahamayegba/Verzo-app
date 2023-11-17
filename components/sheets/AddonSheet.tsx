import React from "react";
import { Sheet, SheetContent } from "../ui/sheet";
import { ChevronLeft } from "lucide-react";
import PlusIcon from "../ui/icons/PlusIcon";
import useModal from "@/app/hooks/useModal";
import AddonsModal from "../modals/settings/AddonsModal";

interface AddonProps {
  open: boolean;
  onClose: () => void;
}

const AddonSheet: React.FC<AddonProps> = ({ open, onClose }) => {
  const {
    isOpen: isAddonsModalOpen,
    openModal: openAddonsModal,
    closeModal: closeAddonsModal,
  } = useModal();

  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className=" pt-[112px]">
          <button
            onClick={onClose}
            className=" flex gap-x-2 text-primary-greytext items-center text-sm"
          >
            <ChevronLeft className=" w-4 h-4" />
            Back
          </button>
          <div className=" mt-[40px] flex">
            <span className=" p-3 rounded-full bg-[#EDF6FF] flex">
              <PlusIcon />
            </span>
          </div>
          <p className=" mt-[14px] text-lg text-primary-black">Add on</p>
          <p className=" font-light text-primary-greytext mt-2">
            Purchase special add ons
          </p>
          <div className=" w-full mt-[30px] flex flex-col gap-y-4 ">
            <p className=" text-primary-black"> Team members</p>
            <p className=" text-primary-greytext font-light">
              {" "}
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content. Lorem ipsum may
              be used as a placeholder before final copy is available.
            </p>
            <button
              onClick={() => {
                onClose();
                openAddonsModal();
              }}
              className=" bg-primary-blue text-white rounded-[10px] py-3 mt-[18px]"
            >
              Purchase add on for ₦2,500 monthly
            </button>
          </div>
        </SheetContent>
      </Sheet>
      <AddonsModal
        open={isAddonsModalOpen}
        openModal={openAddonsModal}
        onClose={closeAddonsModal}
      />
    </>
  );
};

export default AddonSheet;
