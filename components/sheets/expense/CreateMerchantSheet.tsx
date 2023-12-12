import React from "react";
import { ChevronLeft } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import ActiveCustomerIcon from "@/components/ui/icons/ActiveCustomerIcon";
import { useToast } from "@/app/hooks/use-toast";
import { useForm } from "react-hook-form";
import localStorage from "local-storage-fallback";
import {
  GetMerchantsByBusinessDocument,
  useCreateMerchantMutation,
} from "@/src/generated/graphql";

interface CreateMerchantProps {
  open: boolean;
  onClose: () => void;
}

type MerchantData = {
  name: string;
  email: string;
};

const CreateMerchantSheet: React.FC<CreateMerchantProps> = ({
  open,
  onClose,
}) => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const { toast } = useToast();
  const { register, reset, handleSubmit } = useForm<MerchantData>();
  const [createMerchantMutation, { loading: createMerchantLoading }] =
    useCreateMerchantMutation();

  const showSuccessToast = () => {
    toast({
      title: "Successful!",
      description: "Your merchant has been successfully created.",
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

  const onSubmitMerchantHandler = async (data: MerchantData) => {
    try {
      await createMerchantMutation({
        variables: { businessId: businessId, ...data },
        refetchQueries: [GetMerchantsByBusinessDocument],
      });
      onClose();
      showSuccessToast();
      reset();
    } catch (error) {
      onClose();
      showFailureToast(error);
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className=" py-[80px]">
          <button
            onClick={onClose}
            className=" flex gap-x-2 text-primary-greytext items-center text-sm"
          >
            <ChevronLeft className=" w-4 h-4" />
            Back
          </button>
          <div className=" mt-[50px] flex">
            <span className=" p-3 rounded-full bg-[#EDF6FF] flex">
              <ActiveCustomerIcon />
            </span>
          </div>
          <p className=" mt-[14px] text-lg text-primary-black">New merchant</p>
          <p className=" font-light text-primary-greytext mt-2">
            This can be your supplier or manufacturer
          </p>
          <form
            onSubmit={handleSubmit(onSubmitMerchantHandler)}
            className=" w-full mt-[30px] flex flex-col gap-y-4 "
          >
            <div className=" flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="merchantname">
                Merchant name
              </label>
              <input
                type="text"
                id="merchantname"
                required
                placeholder="Merchant name"
                className=" w-full border p-[10px] focus:outline-none rounded-lg text-sm border-gray-200"
                {...register("name")}
              />
            </div>
            <div className=" flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="email">
                Merchant email
              </label>
              <input
                type="email"
                id="email"
                required
                placeholder="Email address"
                className=" w-full border p-[10px] focus:outline-none rounded-lg text-sm border-gray-200"
                {...register("email")}
              />
            </div>
            <button
              type="submit"
              className={`bg-primary-blue text-white rounded-[10px] py-[10px] mt-[15px] ${
                createMerchantLoading ? "opacity-50" : ""
              }`}
            >
              {createMerchantLoading ? "Loading..." : "Save merchant"}
            </button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CreateMerchantSheet;
