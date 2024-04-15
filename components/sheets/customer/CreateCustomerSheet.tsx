import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import ActiveCustomerIcon from "@/components/ui/icons/ActiveCustomerIcon";
import { useToast } from "@/app/hooks/use-toast";
import { useForm } from "react-hook-form";
import localStorage from "local-storage-fallback";
import {
  GetCustomerByBusinessDocument,
  useCreateCustomerMutation,
} from "@/src/generated/graphql";

interface CreateCustomerProps {
  open: boolean;
  onClose: () => void;
}

type FormData = {
  name: string;
  mobile: string;
  email: string;
};

const CreateCustomerSheet: React.FC<CreateCustomerProps> = ({
  open,
  onClose,
}) => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const { toast } = useToast();
  const { register, reset, handleSubmit, getValues } = useForm<FormData>();
  const [address, setAddress] = useState("");
  const [createCustomerMutation, { loading }] = useCreateCustomerMutation();
  const showSuccessToast = () => {
    toast({
      title: "Successful!",
      description: "Your customer has been successfully created",
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
  const onCreateCustomerHandler = async (data: FormData) => {
    try {
      await createCustomerMutation({
        variables: {
          businessId: businessId,
          address: address ? address : null,
          ...data,
        },
        refetchQueries: [GetCustomerByBusinessDocument],
      });
      onClose();
      showSuccessToast();
      reset();
    } catch (error) {
      console.error(error);
      onClose();
      showFailureToast(error);
      reset();
    }
  };
  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className=" py-[60px]">
          <button
            onClick={onClose}
            className=" flex gap-x-2 text-primary-greytext items-center text-sm"
          >
            <ChevronLeft className=" w-4 h-4" />
            Back
          </button>
          <div className=" mt-[30px] flex">
            <span className=" p-3 rounded-full bg-[#EDF6FF] flex">
              <ActiveCustomerIcon />
            </span>
          </div>
          <p className=" mt-[14px] text-lg text-primary-black">New customer</p>
          <p className=" font-light text-primary-greytext mt-2">
            Add a new customer to your business
          </p>
          <form
            onSubmit={handleSubmit(onCreateCustomerHandler)}
            className=" w-full mt-[30px] flex flex-col gap-y-4 "
          >
            <div className=" flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="fullname">
                Full name
              </label>
              <input
                type="text"
                required
                id="fullname"
                placeholder="Full name"
                className=" w-full border p-[10px] pl-3 focus:outline-none rounded-lg text-sm border-gray-200"
                {...register("name")}
              />
            </div>
            <div className=" flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="email">
                Email address
              </label>
              <input
                type="email"
                id="email"
                required
                placeholder="Email address"
                className=" w-full border p-[10px] pl-3 focus:outline-none rounded-lg text-sm border-gray-200"
                {...register("email")}
              />
            </div>
            <div className=" flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="phone">
                Phone number
              </label>
              <input
                type="tel"
                required
                id="phone"
                placeholder="Phone number"
                className=" w-full border p-[10px] pl-3 focus:outline-none rounded-lg text-sm border-gray-200"
                {...register("mobile")}
              />
            </div>
            <div className=" flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="address">
                Customer address
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Customer address"
                className=" w-full border p-[10px] pl-3 focus:outline-none rounded-lg text-sm border-gray-200"
              />
            </div>
            <button
              type="submit"
              className={`bg-primary-blue text-white rounded-[10px] py-[10px] mt-[15px] ${
                loading ? " opacity-50" : ""
              }`}
            >
              {loading ? "Loading..." : "Save customer"}
            </button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CreateCustomerSheet;
