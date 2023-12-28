import React, { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  GetBusinessByIdDocument,
  useGetBusinessByIdQuery,
  useGetBusinessCategoriesQuery,
  useUpdateBusinessMutation,
} from "@/src/generated/graphql";
import { useForm } from "react-hook-form";
import { useToast } from "@/app/hooks/use-toast";
import ActiveBankIcon from "@/components/ui/icons/ActiveBankIcon";
import localStorage from "local-storage-fallback";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UpdateBusinessProps {
  open: boolean;
  openSheet: () => void;
  onClose: () => void;
}

const UpdateBusinessSheet2: React.FC<UpdateBusinessProps> = ({
  open,
  onClose,
  openSheet,
}) => {
  const { toast } = useToast();
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const [businessCategoryId, setBusinessCategoryId] = useState("");
  const getBusinessById = useGetBusinessByIdQuery({
    variables: {
      businessId: businessId,
    },
  });
  const [updateBusinessMutation, { loading }] = useUpdateBusinessMutation();

  const businessCategoryQuery = useGetBusinessCategoriesQuery();
  const businessCategoryIdValue =
    getBusinessById.data?.getBusinessById?.businessCategory?.id!;

  const { handleSubmit } = useForm<FormData>();

  useEffect(() => {
    setBusinessCategoryId(businessCategoryIdValue);
  }, [getBusinessById, businessCategoryIdValue]);

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

  const onUpdateBusinessHandler = async () => {
    try {
      await updateBusinessMutation({
        variables: {
          businessId: businessId,
          businessCategoryId: businessCategoryId,
        },
        refetchQueries: [GetBusinessByIdDocument],
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
        <SheetContent className=" pt-[100px]">
          <button
            type="button"
            onClick={onClose}
            className=" flex gap-x-2 focus:outline-none text-primary-greytext items-center text-sm"
          >
            <ChevronLeft className=" w-4 h-4" />
            Back
          </button>
          <div className=" mt-[40px] flex">
            <span className=" p-3 rounded-full bg-[#EDF6FF] flex">
              <ActiveBankIcon />
            </span>
          </div>
          <p className=" mt-[14px] text-lg text-primary-black">
            Business profile
          </p>
          <p className=" font-light text-primary-greytext mt-2">
            Update business category
          </p>
          <form
            onSubmit={handleSubmit(onUpdateBusinessHandler)}
            className=" w-full mt-[20px] flex flex-col gap-y-4 "
          >
            <div className="flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="category">
                Business category
              </label>
              <Select
                value={businessCategoryId}
                onValueChange={setBusinessCategoryId}
              >
                <SelectTrigger className="border border-gray-200 bg-transparent rounded-lg h-10 text-sm focus:outline-none px-3 py-2">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-white w-full z-[200] shadow-sm text-gray-800">
                  <SelectGroup>
                    {businessCategoryQuery.data?.getBusinessCategories.map(
                      (category) => (
                        <SelectItem
                          className="hover:bg-gray-100 cursor-pointer py-2 text-[15px]"
                          key={category?.id}
                          value={category?.id!}
                        >
                          {category?.categoryName}
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
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

export default UpdateBusinessSheet2;
