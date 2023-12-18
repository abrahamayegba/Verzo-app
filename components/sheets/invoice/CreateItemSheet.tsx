"use client";
import React, { useState } from "react";
import { Check, ChevronDown, ChevronLeft, Plus } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PlusIcon from "@/components/ui/icons/PlusIcon";
import { useToast } from "@/app/hooks/use-toast";
import { useForm } from "react-hook-form";
import {
  GetProductOrServiceByBusinessDocument,
  GetProductsByBusinessDocument,
  GetServiceByBusinessDocument,
  useCreateProductMutation,
  useCreateServiceMutation,
  useGetCombinedProductUnitsQuery,
  useGetCombinesServiceUnitsQuery,
  useGetProductOrServiceByBusinessQuery,
} from "@/src/generated/graphql";
import localStorage from "local-storage-fallback";

interface CreateItemProps {
  open: boolean;
  onClose: () => void;
  onItemSelected: (selectedItem: {
    id: string;
    name: string;
    price: number;
    type: string;
    quantity: number;
    index: number;
  }) => void;
}

type FormData = {
  productName: string;
  price: number;
  initialStockLevel: number;
};

type ServiceFormData = {
  name: string;
  price: number;
};

const CreateItemSheet: React.FC<CreateItemProps> = ({
  open,
  onClose,
  onItemSelected,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { toast } = useToast();
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const { register, reset, handleSubmit } = useForm<FormData>();
  const {
    register: registerService,
    reset: resetService,
    handleSubmit: handleServiceSubmit,
  } = useForm<ServiceFormData>();
  const [selectedItem, setSelectedItem] = useState<{
    id: string;
    name: string;
    price: number;
    type: string;
    index: number;
  } | null>(null);
  const [lastIndex, setLastIndex] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [productUnitId, setProductUnitId] = useState("");
  const [serviceUnitId, setServiceUnitId] = useState("");
  const [openPopover, setOpenPopover] = React.useState(false);
  const [itemName, setItemName] = React.useState("");
  const [createProductMutation, { loading }] = useCreateProductMutation();
  const [createServiceMutation, { loading: serviceLoading }] =
    useCreateServiceMutation();
  const getProductOrServiceByBusiness = useGetProductOrServiceByBusinessQuery({
    variables: {
      businessId: businessId,
    },
  });
  const productsOrServices =
    getProductOrServiceByBusiness.data?.getProductOrServiceByBusiness
      ?.productOrServiceByBusiness ?? [];
  const combinedProductUnits = useGetCombinedProductUnitsQuery({
    variables: {
      businessId: businessId,
    },
  });
  const combinedServiceUnits = useGetCombinesServiceUnitsQuery({
    variables: {
      businessId: businessId,
    },
  });
  const allProductUnits = combinedProductUnits.data?.getCombinedProductUnits;
  const allServiceUnits = combinedServiceUnits.data?.getCombinedServiceUnits;

  const handleCategoryChange = (value: any) => {
    setSelectedCategory(value);
    handleNext();
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleItemSelect = () => {
    if (selectedItem) {
      onItemSelected({
        id: selectedItem?.id,
        price: selectedItem.price,
        name: selectedItem?.name,
        quantity: 1,
        index: selectedItem.index,
        type: selectedItem?.type,
      });
      onClose();
      setSelectedItem(null);
      setItemName("");
    }
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
      await createProductMutation({
        variables: {
          businessId: businessId,
          productUnitId: productUnitId,
          ...data,
        },
        refetchQueries: [
          GetProductsByBusinessDocument,
          GetProductOrServiceByBusinessDocument,
        ],
      });
      setCurrentStep(1);
      reset();
      setProductUnitId("");
    } catch (error) {
      console.error(error);
      showFailureToast(error);
    }
  };

  const onCreateServiceHandler = async (data: ServiceFormData) => {
    try {
      await createServiceMutation({
        variables: {
          businessId: businessId,
          serviceUnitId: serviceUnitId,
          ...data,
        },
        refetchQueries: [
          GetServiceByBusinessDocument,
          GetProductOrServiceByBusinessDocument,
        ],
      });
      setCurrentStep(1);
      resetService();
      setServiceUnitId("");
    } catch (error) {
      console.error(error);
      showFailureToast(error);
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className=" pt-[60px]">
          <button
            onClick={currentStep === 1 ? onClose : () => setCurrentStep(1)}
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
          <p className=" mt-[14px] text-lg text-primary-black">Add item</p>
          <p className="font-light text-primary-greytext mt-2">
            Select item to add
          </p>
          <div className=" w-full mt-[30px] flex flex-col gap-y-6">
            {currentStep === 1 ? (
              <>
                <div className=" flex flex-col gap-y-6">
                  <Popover open={openPopover} onOpenChange={setOpenPopover}>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        aria-expanded={openPopover}
                        className=" w-full justify-between capitalize bg-gray-50 text-primary-black flex items-center border border-gray-200 py-2 px-3 rounded-[8px]"
                      >
                        {itemName ? itemName : "Select item..."}
                        <ChevronDown className=" w-5 h-5 text-primary-black text-opacity-70 mt-[2px]" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="  w-[327px] p-0 bg-white z-[200]">
                      <Command>
                        {productsOrServices?.length > 0 && (
                          <CommandInput placeholder="Search items..." />
                        )}
                        {productsOrServices?.length > 0 && (
                          <CommandEmpty className=" p-3 px-5 text-[15px]">
                            No item found
                          </CommandEmpty>
                        )}
                        <CommandGroup>
                          {productsOrServices?.map((item) => (
                            <CommandItem
                              key={item?.id}
                              value={item?.title}
                              className=" hover:cursor-pointer hover:bg-gray-100 py-2 text-base text-gray-800"
                              onSelect={(currentItem) => {
                                setItemName(currentItem);
                                const newIndex = selectedItem
                                  ? selectedItem.index
                                  : lastIndex + 1;
                                setLastIndex(newIndex);
                                setSelectedItem({
                                  id: item?.id!,
                                  price: item?.price!,
                                  name: item?.title!,
                                  type: item?.type!,
                                  index: newIndex,
                                });
                                setOpenPopover(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  itemName === item?.title
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {item?.title}
                            </CommandItem>
                          ))}
                          <button
                            type="button"
                            onClick={() => handleCategoryChange("product")}
                            className=" hover:cursor-pointer hover:bg-gray-100 py-2 text-base text-gray-800 pl-6 w-full flex justify-start"
                          >
                            Create product
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCategoryChange("service")}
                            className=" hover:cursor-pointer hover:bg-gray-100 py-2 text-base text-gray-800 pl-6 w-full flex justify-start"
                          >
                            Create service
                          </button>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <button
                    onClick={handleItemSelect}
                    className=" bg-primary-blue text-white rounded-[10px] py-[9px] "
                  >
                    Add item
                  </button>
                  <div className=" flex flex-col gap-y-[6px]">
                    <label className=" text-primary-black" htmlFor="newitem">
                      Create new item
                    </label>
                    <Select onValueChange={handleCategoryChange}>
                      <SelectTrigger className=" w-full rounded-lg border border-gray-200">
                        <SelectValue
                          className=" text-primary-greytext"
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                      <SelectContent className=" bg-white w-full z-[200] shadow-sm text-gray-800">
                        <SelectGroup>
                          <SelectItem
                            className=" hover:bg-gray-100 cursor-pointer py-2 text-base"
                            value="product"
                          >
                            Product
                          </SelectItem>
                          <SelectItem
                            className=" hover:bg-gray-100 cursor-pointer py-2 text-base"
                            value="service"
                          >
                            Service
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            ) : (
              <>
                {selectedCategory === "product" && (
                  <form
                    onSubmit={handleSubmit(onCreateProductHandler)}
                    className=" gap-y-4 flex flex-col mt-[-10px]"
                  >
                    <div className=" flex flex-col gap-y-1">
                      <label htmlFor="productname">Product name</label>
                      <input
                        className=" w-full rounded-lg border border-gray-200 p-[8px] pl-3 text-[15px] focus:outline-none"
                        type="text"
                        placeholder="Product name"
                        required
                        {...register("productName")}
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
                      <label htmlFor="productunit">Product unit</label>
                      <Select
                        value={productUnitId}
                        onValueChange={setProductUnitId}
                      >
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
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className=" flex flex-col gap-y-1">
                      <label htmlFor="basicunit">Initial stock level</label>
                      <input
                        className=" w-full rounded-lg border border-gray-200 p-[8px] pl-3 text-[15px] focus:outline-none"
                        type="number"
                        required
                        placeholder="0"
                        {...register("initialStockLevel", {
                          valueAsNumber: true,
                        })}
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
                )}
                {selectedCategory === "service" && (
                  <form
                    onSubmit={handleServiceSubmit(onCreateServiceHandler)}
                    className=" gap-y-4 flex flex-col mt-2"
                  >
                    <div className=" flex flex-col gap-y-1">
                      <label htmlFor="servicename">Service name</label>
                      <input
                        className=" w-full rounded-lg border border-gray-200 p-[8px] pl-3 text-[15px] focus:outline-none"
                        type="text"
                        placeholder="Service name"
                        required
                        {...registerService("name")}
                      />
                    </div>
                    <div className=" flex flex-col gap-y-1">
                      <label htmlFor="price">Price</label>
                      <input
                        className=" w-full rounded-lg border border-gray-200 p-[8px] pl-3 text-[15px] focus:outline-none"
                        type="number"
                        required
                        placeholder="Price"
                        {...registerService("price", {
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                    <div className=" flex flex-col gap-y-1">
                      <label htmlFor="serviceunit">Service unit</label>
                      <Select
                        value={serviceUnitId}
                        onValueChange={setServiceUnitId}
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
                            <button
                              type="button"
                              onClick={handleNext}
                              className=" flex items-center text-primary-blue py-2 px-2 gap-x-2 hover:bg-gray-100 cursor-pointer w-full text-[15px]"
                            >
                              <Plus className=" w-[18px] h-[18px] " /> Add
                              service unit
                            </button>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <button
                      type="submit"
                      className={` bg-primary-blue text-white rounded-[10px] py-[10px] mt-[15px] ${
                        serviceLoading ? " opacity-50" : ""
                      }`}
                    >
                      {serviceLoading ? "Loading..." : "Create Service"}
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CreateItemSheet;
