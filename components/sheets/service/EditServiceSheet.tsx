import React, { useEffect, useState } from "react";
import { ChevronLeft, Plus } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  GetProductOrServiceByBusinessDocument,
  GetServiceByBusinessDocument,
  useGetCombinesServiceUnitsQuery,
  useGetServiceByIdQuery,
  useUpdateServiceMutation,
} from "@/src/generated/graphql";
import localStorage from "local-storage-fallback";
import { useToast } from "@/app/hooks/use-toast";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ActiveServiceIcon from "@/components/ui/icons/ActiveServiceIcon";

interface EditServiceProps {
  open: boolean;
  onClose: () => void;
  serviceId: string;
}

const EditServiceSheet: React.FC<EditServiceProps> = ({
  open,
  onClose,
  serviceId,
}) => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const { handleSubmit } = useForm<FormData>();
  const { toast } = useToast();
  const [serviceData, setServiceData] = useState({
    name: "",
    price: 0,
    serviceUnitName: "",
    serviceUnitId: "",
  });
  const [updateServiceMutation, { loading }] = useUpdateServiceMutation();
  const combinedServiceUnits = useGetCombinesServiceUnitsQuery({
    variables: {
      businessId: businessId,
    },
  });
  const allServiceUnits =
    combinedServiceUnits.data?.getCombinedServiceUnits?.filter(
      (unit) => unit?.unitName !== "Other"
    );
  const getServicesById = useGetServiceByIdQuery({
    variables: {
      serviceId: serviceId,
    },
  });
  const showSuccessToast = () => {
    toast({
      title: "Service Successfully Edited!",
      description: "Your service has been successfully edited",
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
  useEffect(() => {
    if (getServicesById.data) {
      setServiceData((prevData) => ({
        ...prevData,
        name: getServicesById.data?.getServiceById?.name || "",
        price: getServicesById.data?.getServiceById?.price || 0,
        serviceUnitId: getServicesById.data?.getServiceById?.businessServiceUnit
          ?.id
          ? getServicesById?.data?.getServiceById?.businessServiceUnit?.id
          : getServicesById?.data?.getServiceById?.serviceUnitId || "",
        serviceUnitName: getServicesById.data?.getServiceById
          ?.businessServiceUnit?.unitName
          ? getServicesById?.data?.getServiceById?.businessServiceUnit?.unitName
          : getServicesById?.data?.getServiceById?.serviceUnit?.unitName || "",
      }));
    }
  }, [getServicesById.data]);

  useEffect(() => {
    if (serviceId) {
      getServicesById.refetch({
        serviceId: serviceId,
      });
    }
  }, [serviceId, getServicesById]);

  const handleFieldChange = (field: string, value: string) => {
    setServiceData((prevData) => ({
      ...prevData,
      [field]:
        field === "price"
          ? isNaN(parseFloat(value))
            ? value
            : parseFloat(value)
          : value,
    }));
  };

  const handleServiceUnitChange = (newValue: string) => {
    setServiceData((prevData) => ({
      ...prevData,
      serviceUnitId: newValue,
    }));
  };

  const onEditServiceHandler = async () => {
    try {
      await updateServiceMutation({
        variables: {
          serviceId: serviceId,
          name: serviceData.name,
          price: serviceData.price * 100,
          serviceUnitId: serviceData.serviceUnitId,
        },
        refetchQueries: [
          GetServiceByBusinessDocument,
          GetProductOrServiceByBusinessDocument,
        ],
      });
      onClose();
      showSuccessToast();
    } catch (error) {
      console.error(error);
      onClose();
      showFailureToast(error);
    }
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
              <ActiveServiceIcon />
            </span>
          </div>
          <p className=" mt-[14px] text-lg text-primary-black">Edit Service</p>
          <p className=" font-light text-primary-greytext mt-2">
            Edit the service details
          </p>
          <form
            onSubmit={handleSubmit(onEditServiceHandler)}
            className=" gap-y-4 flex flex-col mt-6"
          >
            <div className=" flex flex-col gap-y-1">
              <label htmlFor="servicename">Service name</label>
              <input
                className=" w-full rounded-lg border border-gray-200 p-[8px] pl-3 text-[15px] focus:outline-none"
                type="text"
                placeholder="Service name"
                value={serviceData.name}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                required
              />
            </div>
            <div className=" flex flex-col gap-y-1">
              <label htmlFor="price">Price</label>
              <input
                className=" w-full rounded-lg border border-gray-200 p-[8px] pl-3 text-[15px] focus:outline-none"
                type="text"
                required
                value={serviceData.price.toString()}
                onChange={(e) => handleFieldChange("price", e.target.value)}
                placeholder="Price"
              />
            </div>
            <div className=" flex flex-col gap-y-1">
              <label htmlFor="serviceunit">Service unit</label>
              <Select
                value={serviceData.serviceUnitId}
                onValueChange={handleServiceUnitChange}
              >
                <SelectTrigger className="border border-gray-200 bg-transparent rounded-lg h-10 text-sm focus:outline-none px-3 py-2">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-white w-full z-[200] shadow-sm text-gray-800 max-h-[250px] overflow-y-scroll">
                  <SelectGroup>
                    {allServiceUnits?.map((serviceUnit) => (
                      <SelectItem
                        className="hover:bg-gray-100 cursor-pointer py-2 text-[15px]"
                        key={serviceUnit?.id}
                        value={serviceUnit?.id!}
                      >
                        {serviceUnit?.unitName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <button
              type="submit"
              className={` bg-primary-blue text-white rounded-[10px] py-[10px] mt-[10px] ${
                loading ? " opacity-50" : ""
              }`}
            >
              {loading ? "Loading..." : "Edit Service"}
            </button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditServiceSheet;
