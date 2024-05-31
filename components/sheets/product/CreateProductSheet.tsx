import React, { useState } from "react";
import { ChevronLeft, Plus } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import ActiveProductIcon from "@/components/ui/icons/ActiveProductIcon";
import {
  GetCombinedProductUnitsDocument,
  GetCombinesServiceUnitsDocument,
  GetProductUnitsDocument,
  GetProductsByBusinessDocument,
  useCreateBusinessProductUnitMutation,
  useCreateProductMutation,
  useGetCombinedProductUnitsQuery,
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

interface CreateProductProps {
  open: boolean;
  onClose: () => void;
}

type FormData = {
  price: number;
  initialStockLevel: number;
};

type UnitData = {
  unitName: string;
};

const CreateProductSheet: React.FC<CreateProductProps> = ({
  open,
  onClose,
}) => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const { toast } = useToast();
  const { register, reset, handleSubmit } = useForm<FormData>();
  const { handleSubmit: handleUnitSubmit } = useForm<UnitData>();
  const [productUnitId, setProductUnitId] = useState("");
  const [productName, setProductName] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [productUnit, setProductUnit] = useState("");

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };
  const [createProductMutation, { loading }] = useCreateProductMutation();
  const [createBusinessProductUnitMutation, { loading: unitLoading }] =
    useCreateBusinessProductUnitMutation();

  const combinedProductUnits = useGetCombinedProductUnitsQuery({
    variables: {
      businessId: businessId,
    },
  });

  const allProductUnits =
    combinedProductUnits.data?.getCombinedProductUnits?.filter(
      (unit) => unit?.unitName !== "Other"
    );

  const showSuccessToast = () => {
    toast({
      title: "Product Successfully Created!",
      description: "Your product has been successfully created",
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
  const onCreateProductHandler = async (data: FormData) => {
    try {
      const modifiedData = {
        ...data,
        price: data.price * 100,
      };
      await createProductMutation({
        variables: {
          businessId: businessId,
          productName: productName,
          productUnitId: productUnitId,
          ...modifiedData,
        },
        refetchQueries: [GetProductsByBusinessDocument],
      });
      onClose();
      reset({
        price: 0,
        initialStockLevel: 0,
      });
      setProductName("");
      setProductUnitId("");
      showSuccessToast();
    } catch (error) {
      console.error(error);
      onClose();
      showFailureToast(error);
    }
  };

  const onCreateProductUnitHandler = async (data: UnitData) => {
    try {
      await createBusinessProductUnitMutation({
        variables: {
          businessId: businessId,
          unitName: productUnit,
        },
        refetchQueries: [
          GetProductUnitsDocument,
          GetCombinedProductUnitsDocument,
        ],
      });
      setProductUnit("");
      setCurrentStep(1);
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
            onClick={currentStep === 1 ? onClose : () => setCurrentStep(1)}
            className=" flex gap-x-2 text-primary-greytext items-center text-sm"
          >
            <ChevronLeft className=" w-4 h-4" />
            Back
          </button>
          <div className=" mt-[30px] flex">
            <span className=" p-3 rounded-full bg-[#EDF6FF] flex">
              <ActiveProductIcon />
            </span>
          </div>
          <p className=" mt-[14px] text-lg text-primary-black">
            {currentStep === 1 ? "New product" : "New product unit"}
          </p>
          <p className=" font-light text-primary-greytext mt-2">
            {currentStep === 1
              ? "Enter the product details"
              : "Enter the unit details"}
          </p>
          {currentStep === 1 ? (
            <form
              onSubmit={handleSubmit(onCreateProductHandler)}
              className=" gap-y-4 flex flex-col mt-6"
            >
              <div className=" flex flex-col gap-y-1">
                <label htmlFor="productname">Product name</label>
                <input
                  className=" w-full rounded-lg border border-gray-200 p-[8px] pl-3 text-[15px] focus:outline-none"
                  type="text"
                  placeholder="Product name"
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className=" flex flex-col gap-y-1">
                <label htmlFor="price">Price</label>
                <input
                  className=" w-full rounded-lg border border-gray-200 p-[8px] pl-3 text-[15px] focus:outline-none"
                  type="tel"
                  required
                  pattern="[0-9]*"
                  placeholder="Price"
                  defaultValue={0}
                  {...register("price", { valueAsNumber: true })}
                />
              </div>
              <div className=" flex flex-col gap-y-1">
                <label htmlFor="productunit">Product unit</label>
                <Select value={productUnitId} onValueChange={setProductUnitId}>
                  <SelectTrigger className="border border-gray-200 bg-transparent rounded-lg h-10 text-sm focus:outline-none px-3 py-2">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="bg-white w-full z-[200] shadow-sm text-gray-800 max-h-[250px] overflow-y-scroll">
                    <SelectGroup>
                      {allProductUnits?.map((productUnit) => (
                        <SelectItem
                          className="hover:bg-gray-100 cursor-pointer py-2 text-[15px]"
                          key={productUnit?.id}
                          value={productUnit?.id!}
                        >
                          {productUnit?.unitName}
                        </SelectItem>
                      ))}
                      <button
                        type="button"
                        onClick={handleNext}
                        className=" flex items-center text-primary-blue py-2 px-2 gap-x-2 hover:bg-gray-100 cursor-pointer w-full text-[15px]"
                      >
                        <Plus className=" w-[18px] h-[18px] " /> Add product
                        unit
                      </button>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className=" flex flex-col gap-y-1">
                <label htmlFor="basicunit">Initial stock level</label>
                <input
                  className=" w-full rounded-lg border border-gray-200 p-[8px] pl-3 text-[15px] focus:outline-none"
                  type="tel"
                  required
                  pattern="[0-9]*"
                  placeholder="0"
                  defaultValue={0}
                  {...register("initialStockLevel", { valueAsNumber: true })}
                />
              </div>
              <button
                type="submit"
                className={` bg-primary-blue text-white rounded-[10px] py-[10px] mt-[15px] ${
                  loading ? " opacity-50" : ""
                }`}
              >
                {loading ? "Loading..." : "Create Product"}
              </button>
            </form>
          ) : (
            <form
              onSubmit={handleUnitSubmit(onCreateProductUnitHandler)}
              className=" gap-y-4 flex flex-col mt-6"
            >
              <div className=" flex flex-col gap-y-1">
                <label htmlFor="productname">Unit name</label>
                <input
                  className=" w-full rounded-lg border border-gray-200 p-[8px] pl-3 text-[15px] focus:outline-none"
                  type="text"
                  placeholder="Unit name"
                  required
                  value={productUnit}
                  onChange={(e) => setProductUnit(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
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

export default CreateProductSheet;
