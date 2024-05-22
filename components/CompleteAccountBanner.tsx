import { X } from "lucide-react";
import React from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  openModal: () => void;
};

const CompleteAccountBanner: React.FC<Props> = ({
  open,
  onClose,
  openModal,
}) => {
  return (
    <>
      {open && (
        <div className="w-full max-w-[1340px] z-[40] isolate fixed flex items-center gap-x-6 overflow-hidden bg-blue-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 ">
            <p className="text-sm leading-6 text-gray-900 ml-[-60px]">
              <strong className="font-semibold">Complete setup</strong>
              <svg
                viewBox="0 0 2 2"
                className="mx-2 inline h-0.5 w-0.5 fill-current"
                aria-hidden="true"
              >
                <circle cx={1} cy={1} r={1} />
              </svg>
              Complete your Verzo account setup to enjoy exclusive features
            </p>
            <button
              onClick={openModal}
              className="flex-none rounded-full bg-primary-blue px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-primary-verzobluehover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              Complete now <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
          <div className="flex flex-1 justify-end">
            <button
              type="button"
              className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
              onClick={onClose}
            >
              <span className="sr-only">Dismiss</span>
              <X className="h-5 w-5 text-gray-900" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CompleteAccountBanner;
