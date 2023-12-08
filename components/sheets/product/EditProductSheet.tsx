import React, { useEffect, useState } from "react";
import { ChevronLeft, Plus } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import ActiveProductIcon from "@/components/ui/icons/ActiveProductIcon";
import {
  GetProductsByBusinessDocument,
  useGetBusinessProductUnitsQuery,
  useGetProductByIdQuery,
  useGetProductUnitsQuery,
  useUpdateProductMutation,
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
import { Checkbox } from "@/components/ui/checkbox";

interface EditProductProps {
  open: boolean;
  onClose: () => void;
  productId: string;
}

const EditProductSheet: React.FC<EditProductProps> = ({
  open,
  onClose,
  productId,
}) => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const { handleSubmit } = useForm<FormData>();
  const { toast } = useToast();
  const [productData, setProductData] = useState({
    productName: "",
    price: 0,
    productUnitName: "",
    productUnitId: "",
  });
  const [reorderLevel, setReorderLevel] = useState(0);
  const [isReorderChecked, setIsReorderChecked] = useState(false);
  const [updateProductMutation, { loading }] = useUpdateProductMutation();
  const getProductUnits = useGetProductUnitsQuery();
  const getBusinessProductUnits = useGetBusinessProductUnitsQuery({
    variables: {
      businessId: businessId,
    },
  });
  const getProductsById = useGetProductByIdQuery({
    variables: {
      productId: productId,
    },
  });
  const productUnits = getProductUnits.data?.getProductUnits || [];
  const businessProductUnits =
    getBusinessProductUnits.data?.getBusinessProductUnits || [];
  const allProductUnits = [...productUnits, ...businessProductUnits];
  const showSuccessToast = () => {
    toast({
      title: "Product Successfully Edited!",
      description: "Your product has been successfully edited",
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
  const handleCheckboxChange = () => {
    setIsReorderChecked(!isReorderChecked);
  };

  useEffect(() => {
    if (getProductsById.data) {
      setProductData((prevData) => ({
        ...prevData,
        productName: getProductsById.data?.getProductById?.productName || "",
        price: getProductsById.data?.getProductById?.price || 0,
        productUnitId:
          getProductsById.data?.getProductById?.productUnitId || "",
        productUnitName:
          getProductsById.data?.getProductById?.productUnit?.unitName || "",
      }));
    }
  }, [getProductsById.data]);

  useEffect(() => {
    if (productId) {
      getProductsById.refetch({
        productId: productId,
      });
    }
  }, [productId, getProductsById]);

  const handleFieldChange = (field: string, value: string | number) => {
    setProductData((prevData) => ({
      ...prevData,
      [field]: field === "price" ? parseFloat(value as string) : value,
    }));
  };

  const handleProductUnitChange = (newValue: string) => {
    setProductData((prevData) => ({
      ...prevData,
      productUnitId: newValue,
    }));
  };

  const onEditProductHandler = async () => {
    try {
      await updateProductMutation({
        variables: {
          productId: productId,
          productName: productData.productName,
          price: productData.price,
          productUnitId: productData.productUnitId,
          reorderLevel: reorderLevel,
        },
        refetchQueries: [GetProductsByBusinessDocument],
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
              <ActiveProductIcon />
            </span>
          </div>
          <p className=" mt-[14px] text-lg text-primary-black">Edit Product</p>
          <p className=" font-light text-primary-greytext mt-2">
            Edit the product details
          </p>
          <form
            onSubmit={handleSubmit(onEditProductHandler)}
            className=" gap-y-4 flex flex-col mt-6"
          >
            <div className=" flex flex-col gap-y-1">
              <label htmlFor="productname">Product name</label>
              <input
                className=" w-full rounded-lg border border-gray-200 p-[8px] pl-3 text-[15px] focus:outline-none"
                type="text"
                placeholder="Product name"
                value={productData.productName}
                onChange={(e) =>
                  handleFieldChange("productName", e.target.value)
                }
                required
              />
            </div>
            <div className=" flex flex-col gap-y-1">
              <label htmlFor="price">Price</label>
              <input
                className=" w-full rounded-lg border border-gray-200 p-[8px] pl-3 text-[15px] focus:outline-none"
                type="number"
                required
                value={productData.price}
                onChange={(e) => handleFieldChange("price", e.target.value)}
                placeholder="Price"
              />
            </div>
            <div className=" flex flex-col gap-y-1">
              <label htmlFor="productunit">Product unit</label>
              <Select
                value={productData.productUnitId}
                onValueChange={handleProductUnitChange}
              >
                <SelectTrigger className="border border-gray-200 bg-transparent rounded-lg h-10 text-sm focus:outline-none px-3 py-2">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-white w-full z-[200] shadow-sm text-gray-800 max-h-[250px] overflow-y-scroll">
                  <SelectGroup>
                    {allProductUnits.map((productUnit) => (
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
            <div>
              <p className=" flex items-center gap-x-3 text-[15px]">
                Track reorder level
                <Checkbox
                  checked={isReorderChecked}
                  onCheckedChange={handleCheckboxChange}
                />
              </p>
              {isReorderChecked && (
                <div className=" flex flex-col gap-y-1 mt-2">
                  <label htmlFor="reorderLevel">Reorder Level</label>
                  <input
                    className=" w-full rounded-lg border border-gray-200 p-[8px] pl-3 text-[15px] focus:outline-none"
                    type="number"
                    value={reorderLevel}
                    onChange={(e) =>
                      setReorderLevel(parseFloat(e.target.value))
                    }
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              className={` bg-primary-blue text-white rounded-[10px] py-[10px] mt-[10px] ${
                loading ? " opacity-50" : ""
              }`}
            >
              {loading ? "Loading..." : "Edit Product"}
            </button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditProductSheet;
