import React, { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  GetBusinessByIdDocument,
  GetBusinessesByUserIdDocument,
  useGetBusinessByIdQuery,
  useUpdateBusinessMutation,
} from "@/src/generated/graphql";
import { useForm } from "react-hook-form";
import { useToast } from "@/app/hooks/use-toast";
import ActiveBankIcon from "@/components/ui/icons/ActiveBankIcon";
import localStorage from "local-storage-fallback";
import Image from "next/image";
import * as filestack from "filestack-js";

interface UpdateBusinessProps {
  open: boolean;
  openSheet: () => void;
  onClose: () => void;
}

interface UploadedFile {
  filename: string;
  url: string;
}

type FormData = {
  businessName: string;
  businessEmail: string;
  businessMobile: string;
};

const UpdateBusinessSheet: React.FC<UpdateBusinessProps> = ({
  open,
  onClose,
  openSheet,
}) => {
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const getBusinessById = useGetBusinessByIdQuery({
    variables: {
      businessId: businessId,
    },
  });
  const [updateBusinessMutation, { loading }] = useUpdateBusinessMutation();
  const openPicker = () => {
    const pickerOptions = {
      fromSources: ["local_file_system", "facebook", "instagram"],
      accept: ["image/*"],
      maxFiles: 1,
      maxSize: 4 * 1024 * 1024,
      transformations: {
        crop: true,
        rotate: true,
      },
      onUploadDone: (response: any) => {
        if (response.filesFailed && response.filesFailed.length > 0) {
          // Show failure toast if there's an error
          showFailureToast(response?.error);
        } else {
          console.log("Upload done:", response);
          const { filesUploaded } = response;
          const uploadedFilesInfo: UploadedFile[] = filesUploaded.map(
            (file: any) => ({
              filename: file.filename,
              url: file.url,
            })
          );
          setUploadedFiles(uploadedFilesInfo);
          setIsPickerOpen(false);
          openSheet();
        }
      },
    };
    const picker = client.picker(pickerOptions);
    picker.open();
    setIsPickerOpen(true);
  };
  const apiKey = "Am510qpybQ3i95Kv17umgz";
  const client = filestack.init(apiKey);
  const businessName = getBusinessById.data?.getBusinessById?.businessName!;
  const businessEmail = getBusinessById.data?.getBusinessById?.businessEmail!;
  const businessMobile = getBusinessById.data?.getBusinessById?.businessMobile!;
  const businessLogo = getBusinessById.data?.getBusinessById?.logo;
  const { handleSubmit, register, setValue } = useForm<FormData>();
  useEffect(() => {
    setValue("businessName", businessName);
    setValue("businessEmail", businessEmail);
    setValue("businessMobile", businessMobile);
  }, [setValue, businessName, businessEmail, businessMobile]);

  const showSuccessToast = () => {
    toast({
      title: "Successful!",
      description: "Business information successfully updated.",
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

  const onUpdateBusinessHandler = async (data: FormData) => {
    try {
      await updateBusinessMutation({
        variables: {
          businessId: businessId,
          logo: uploadedFiles[0]?.url ? uploadedFiles[0]?.url : businessLogo,
          ...data,
        },
        refetchQueries: [
          GetBusinessByIdDocument,
          GetBusinessesByUserIdDocument,
        ],
      });
      onClose();
      showSuccessToast();
    } catch (error) {
      console.error(error);
      showFailureToast(error);
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className=" pt-[80px]">
          <button
            type="button"
            onClick={onClose}
            className=" flex gap-x-2 focus:outline-none text-primary-greytext items-center text-sm"
          >
            <ChevronLeft className=" w-4 h-4" />
            Back
          </button>
          <div className=" mt-[25px] flex">
            <span className=" p-3 rounded-full bg-[#EDF6FF] flex">
              <ActiveBankIcon />
            </span>
          </div>
          <p className=" mt-[14px] text-lg text-primary-black">
            Business profile
          </p>
          <p className=" font-light text-primary-greytext mt-2">
            Provide accurate info
          </p>
          <form
            onSubmit={handleSubmit(onUpdateBusinessHandler)}
            className=" w-full mt-[20px] flex flex-col gap-y-4 "
          >
            <div className=" flex flex-row gap-x-6">
              {businessLogo ? (
                <Image
                  className="rounded-full border border-gray-300 border-dashed"
                  src={businessLogo}
                  alt="logo"
                  width={80}
                  height={80}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    openPicker();
                  }}
                  className={`border items-center flex-col gap-y-3 rounded-full cursor-pointer justify-center flex border-dashed  border-gray-300 h-[80px] w-[80px] ${
                    uploadedFiles[0] ? "bg-[#F9FCFF]" : "bg-transparent"
                  }`}
                >
                  {uploadedFiles[0] ? (
                    <div className=" flex">
                      <Image
                        className="rounded-full"
                        src={uploadedFiles[0]?.url}
                        alt="Logo"
                        width={80}
                        height={80}
                      />
                    </div>
                  ) : (
                    <div className=" flex items-center justify-center flex-col gap-y-2">
                      <p className=" text-primary-greytext">LOGO</p>
                    </div>
                  )}
                </button>
              )}
              <div className=" flex flex-row items-center gap-x-[14px]">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    openPicker();
                  }}
                  className=" text-primary-blue"
                >
                  Upload
                </button>
                <button
                  type="button"
                  onClick={() => setUploadedFiles([])}
                  className=" text-primary-red"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className=" flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="businessName">
                Business name
              </label>
              <input
                type="text"
                required
                id="businessName"
                placeholder="Business name"
                {...register("businessName")}
                onChange={(e) => setValue("businessName", e.target.value)}
                className="w-full border p-[10px] focus:outline-none rounded-lg text-sm border-gray-200"
              />
            </div>
            <div className=" flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="businessEmail">
                Business email
              </label>
              <input
                type="email"
                required
                id="businessEmail"
                placeholder="Business email"
                {...register("businessEmail")}
                onChange={(e) => setValue("businessEmail", e.target.value)}
                className=" w-full border p-[10px] focus:outline-none rounded-lg text-sm border-gray-200"
              />
            </div>
            <div className=" flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="businessMobile">
                Business mobile
              </label>
              <input
                type="text"
                id="businessMobile"
                required
                placeholder="Business mobile"
                {...register("businessMobile")}
                onChange={(e) => setValue("businessMobile", e.target.value)}
                className=" w-full border p-[10px] focus:outline-none rounded-lg text-sm border-gray-200"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`bg-primary-blue text-white rounded-[10px] py-[10px] mt-[10px] ${
                loading ? "opacity-50" : ""
              }`}
            >
              {loading ? "Saving.." : "Update business"}
            </button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default UpdateBusinessSheet;
