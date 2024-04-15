import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import ActiveBankIcon from "@/components/ui/icons/ActiveBankIcon";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  GetBusinessesByUserIdDocument,
  useCreateBusinessMutation,
  useGetBusinessCategoriesQuery,
} from "@/src/generated/graphql";
import { useForm } from "react-hook-form";
import { client } from "@/src/apollo/ApolloClient";
import { useToast } from "@/app/hooks/use-toast";

interface CreateBusinessProps {
  open: boolean;
  onClose: () => void;
}

type FormData = {
  businessName: string;
  businessEmail: string;
  businessMobile: string;
};

const VerzoWalletSheet: React.FC<CreateBusinessProps> = ({ open, onClose }) => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { toast } = useToast();
  const [businessCategoryId, setBusinessCategoryId] = useState("");
  const businessCategoryQuery = useGetBusinessCategoriesQuery();
  const [createBusinessMutation, { loading }] = useCreateBusinessMutation();

  const showSuccessToast = () => {
    toast({
      title: "Business creation successful",
      description: "Your business profile has been successfully created!",
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
  const onCreateBusinessHandler = async (data: FormData) => {
    try {
      await createBusinessMutation({
        variables: {
          businessCategoryId: businessCategoryId,
          ...data,
        },
        update: (cache) => {
          cache.evict({ fieldName: "getBusinessesByUserId" });
        },
      });
      await client.query({ query: GetBusinessesByUserIdDocument });
      onClose();
      showSuccessToast();
      reset();
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
            className=" flex gap-x-2 text-primary-greytext items-center text-sm"
          >
            <ChevronLeft className=" w-4 h-4" />
            Back
          </button>
          <div className=" mt-[30px] flex">
            <span className=" p-3 rounded-full bg-[#EDF6FF] flex">
              <ActiveBankIcon />
            </span>
          </div>
          <p className=" mt-[14px] text-lg text-primary-black">Verzo wallet</p>
          <p className=" font-light text-primary-greytext mt-2">
            Complete all input fields
          </p>
          <form
            onSubmit={handleSubmit(onCreateBusinessHandler)}
            className=" w-full mt-[30px] flex flex-col gap-y-4 "
          >
            <div className=" flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="phone">
                Phone number
              </label>
              <input
                type="tel"
                id="phone"
                required
                placeholder="Phone number"
                className=" w-full border p-[10px] pl-3 focus:outline-none rounded-lg text-sm border-gray-200"
                {...register("businessMobile")}
              />
            </div>
            <div className=" flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="businessname">
                Business name
              </label>
              <input
                type="text"
                id="businessname"
                placeholder="Business name"
                required
                className=" w-full border p-[10px] pl-3 focus:outline-none rounded-lg text-sm border-gray-200"
                {...register("businessName")}
              />
            </div>
            <div className=" flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="email">
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Business email"
                required
                className=" w-full border p-[10px] pl-3 focus:outline-none rounded-lg text-sm border-gray-200"
                {...register("businessEmail")}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="category">
                Business category
              </label>
              <Select
                value={businessCategoryId}
                onValueChange={setBusinessCategoryId}
              >
                <SelectTrigger className="border border-gray-200 bg-transparent rounded-lg h-[42px] text-sm focus:outline-none px-3 py-[10px]">
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
              className={`bg-primary-blue text-white rounded-[10px] py-[10px] mt-[15px] ${
                loading ? "opacity-50" : ""
              }`}
            >
              Create wallet
            </button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default VerzoWalletSheet;
