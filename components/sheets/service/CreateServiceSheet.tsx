import React, { useState } from "react";
import { ChevronLeft, Plus } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import localStorage from "local-storage-fallback";
import ActiveServiceIcon from "@/components/ui/icons/ActiveServiceIcon";
import { useToast } from "@/app/hooks/use-toast";
import { useForm } from "react-hook-form";
import {
  GetCombinesServiceUnitsDocument,
  GetServiceByBusinessDocument,
  useCreateBusinessServiceUnitMutation,
  useCreateServiceMutation,
  useGetCombinesServiceUnitsQuery,
} from "@/src/generated/graphql";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreateServiceProps {
  open: boolean;
  onClose: () => void;
}

type FormData = {
  name: string;
  price: number;
};

type UnitData = {
  unitName: string;
};

const CreateServiceSheet: React.FC<CreateServiceProps> = ({
  open,
  onClose,
}) => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const { toast } = useToast();
  const { register, reset, handleSubmit } = useForm<FormData>();
  const {
    register: registerUnit,
    reset: resetUnit,
    handleSubmit: handleUnitSubmit,
  } = useForm<UnitData>();
  const [serviceUnitId, setServiceUnitId] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };
  const [createServiceMutation, { loading }] = useCreateServiceMutation();
  const [createBusinessServiceUnitMutation, { loading: unitLoading }] =
    useCreateBusinessServiceUnitMutation();
  const combinedServiceUnits = useGetCombinesServiceUnitsQuery({
    variables: {
      businessId: businessId,
    },
  });

  const allServiceUnits = combinedServiceUnits.data?.getCombinedServiceUnits;

  const showSuccessToast = () => {
    toast({
      title: "Service Successfully Created!",
      description: "Your service has been successfully created",
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
  const onCreateServiceHandler = async (data: FormData) => {
    try {
      await createServiceMutation({
        variables: {
          businessId: businessId,
          serviceUnitId: serviceUnitId,
          ...data,
        },
        refetchQueries: [GetServiceByBusinessDocument],
      });
      onClose();
      reset();
      setServiceUnitId("");
      showSuccessToast();
    } catch (error) {
      console.error(error);
      showFailureToast(error);
    }
  };

  const onCreateServiceUnitHandler = async (data: UnitData) => {
    try {
      await createBusinessServiceUnitMutation({
        variables: {
          businessId: businessId,
          ...data,
        },
        refetchQueries: [
          GetServiceByBusinessDocument,
          GetCombinesServiceUnitsDocument,
        ],
      });
      resetUnit();
      setCurrentStep(1);
    } catch (error) {
      console.error(error);
      showFailureToast(error);
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className=" py-[70px]">
          <button
            onClick={currentStep === 1 ? onClose : () => setCurrentStep(1)}
            className=" flex gap-x-2 text-primary-greytext items-center text-sm"
          >
            <ChevronLeft className=" w-4 h-4" />
            Back
          </button>
          <div className=" mt-[40px] flex">
            <span className=" p-3 rounded-full bg-[#EDF6FF] flex">
              <ActiveServiceIcon />
            </span>
          </div>
          <p className=" mt-[14px] text-lg text-primary-black">
            {currentStep === 1 ? "New service" : "New service unit"}
          </p>
          <p className=" font-light text-primary-greytext mt-2">
            {currentStep === 1
              ? "Enter the service details"
              : "Enter the unit details"}
          </p>
          {currentStep === 1 ? (
            <form
              onSubmit={handleSubmit(onCreateServiceHandler)}
              className=" gap-y-4 flex flex-col mt-6"
            >
              <div className=" flex flex-col gap-y-1">
                <label htmlFor="servicename">Service name</label>
                <input
                  className=" w-full rounded-lg border border-gray-200 p-[8px] pl-3 text-[15px] focus:outline-none"
                  type="text"
                  placeholder="Service name"
                  required
                  {...register("name")}
                />
              </div>
              <div className=" flex flex-col gap-y-1">
                <label htmlFor="price">Price</label>
                <input
                  className=" w-full rounded-lg border border-gray-200 p-[8px] pl-3 text-[15px] focus:outline-none"
                  type="number"
                  required
                  placeholder="Price"
                  {...register("price", {
                    valueAsNumber: true,
                  })}
                />
              </div>
              <div className=" flex flex-col gap-y-1">
                <label htmlFor="serviceunit">Service unit</label>
                <Select value={serviceUnitId} onValueChange={setServiceUnitId}>
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
                      <button
                        type="button"
                        onClick={handleNext}
                        className=" flex items-center text-primary-blue py-2 px-2 gap-x-2 hover:bg-gray-100 cursor-pointer w-full text-[15px]"
                      >
                        <Plus className=" w-[18px] h-[18px] " /> Add service
                        unit
                      </button>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <button
                type="submit"
                className={` bg-primary-blue text-white rounded-[10px] py-[10px] mt-[15px] ${
                  loading ? " opacity-50" : ""
                }`}
              >
                {loading ? "Loading..." : "Create Service"}
              </button>
            </form>
          ) : (
            <form
              onSubmit={handleUnitSubmit(onCreateServiceUnitHandler)}
              className=" gap-y-4 flex flex-col mt-6"
            >
              <div className=" flex flex-col gap-y-1">
                <label htmlFor="serviceunit">Unit name</label>
                <input
                  className=" w-full rounded-lg border border-gray-200 p-[8px] pl-3 text-[15px] focus:outline-none"
                  type="text"
                  placeholder="Unit name"
                  required
                  {...registerUnit("unitName")}
                />
              </div>
              <button
                type="submit"
                className={` bg-primary-blue text-white rounded-[10px] py-[10px] mt-[10px] ${
                  unitLoading ? " opacity-50" : ""
                }`}
              >
                {unitLoading ? "Loading..." : "Save unit"}
              </button>
            </form>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CreateServiceSheet;
