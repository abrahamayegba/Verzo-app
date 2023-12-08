import React, { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import ActiveCustomerIcon from "@/components/ui/icons/ActiveCustomerIcon";
import { useToast } from "@/app/hooks/use-toast";
import { useForm } from "react-hook-form";
import {
  GetCustomerByBusinessDocument,
  useGetCustomerByIdQuery,
  useUpdateCustomerMutation,
} from "@/src/generated/graphql";

interface EditCustomerProps {
  open: boolean;
  onClose: () => void;
  customerId: string;
}

const EditCustomerSheet: React.FC<EditCustomerProps> = ({
  open,
  onClose,
  customerId,
}) => {
  const { toast } = useToast();
  const [customerData, setCustomerData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    address: "",
  });
  const { handleSubmit } = useForm<FormData>();
  const getCustomerById = useGetCustomerByIdQuery({
    variables: {
      customerId: customerId,
    },
  });
  const [updateCustomerMutation, { loading }] = useUpdateCustomerMutation();
  const showSuccessToast = () => {
    toast({
      title: "Customer Successfully Edited!",
      description: "Your customer has been successfully edited",
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
  const onEditCustomerHandler = async () => {
    try {
      await updateCustomerMutation({
        variables: {
          customerId: customerId,
          name: customerData.fullname,
          email: customerData.email,
          address: customerData.address,
          mobile: customerData.mobile,
        },
        refetchQueries: [GetCustomerByBusinessDocument],
      });
      onClose();
      showSuccessToast();
    } catch (error) {
      console.error(error);
      onClose();
      showFailureToast(error);
    }
  };
  useEffect(() => {
    if (getCustomerById.data) {
      setCustomerData((prevData) => ({
        ...prevData,
        fullname: getCustomerById.data?.getCustomerById?.name || "",
        email: getCustomerById.data?.getCustomerById?.email || "",
        mobile: getCustomerById.data?.getCustomerById?.mobile || "",
        address: getCustomerById.data?.getCustomerById?.address || "",
      }));
    }
  }, [getCustomerById.data]);

  useEffect(() => {
    if (customerId) {
      getCustomerById.refetch({
        customerId: customerId,
      });
    }
  }, [customerId, getCustomerById]);

  const handleFieldChange = (field: string, value: string) => {
    setCustomerData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className=" py-[60px]">
          <button
            onClick={onClose}
            className=" flex gap-x-2 text-primary-greytext items-center text-sm focus:outline-none"
          >
            <ChevronLeft className=" w-4 h-4" />
            Back
          </button>
          <div className=" mt-[30px] flex">
            <span className=" p-3 rounded-full bg-[#EDF6FF] flex">
              <ActiveCustomerIcon />
            </span>
          </div>
          <p className=" mt-[14px] text-lg text-primary-black">Edit customer</p>
          <p className=" font-light text-primary-greytext mt-2">
            Make changes to this customer’s details.
          </p>
          <form
            onSubmit={handleSubmit(onEditCustomerHandler)}
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
                value={customerData.fullname}
                onChange={(e) => handleFieldChange("fullname", e.target.value)}
                className=" w-full border p-[10px] pl-3 focus:outline-none rounded-lg text-sm border-gray-200"
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
                value={customerData.email}
                onChange={(e) => handleFieldChange("email", e.target.value)}
                className=" w-full border p-[10px] pl-3 focus:outline-none rounded-lg text-sm border-gray-200"
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
                value={customerData.mobile}
                onChange={(e) => handleFieldChange("mobile", e.target.value)}
                className=" w-full border p-[10px] pl-3 focus:outline-none rounded-lg text-sm border-gray-200"
              />
            </div>
            <div className=" flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="address">
                Customer address
              </label>
              <input
                type="text"
                required
                id="address"
                placeholder="Customer address"
                value={customerData.address}
                onChange={(e) => handleFieldChange("address", e.target.value)}
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

export default EditCustomerSheet;
