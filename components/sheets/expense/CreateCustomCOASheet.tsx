import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useToast } from "@/app/hooks/use-toast";
import { useForm } from "react-hook-form";
import localStorage from "local-storage-fallback";
import {
  GetBusinessCoAsDocument,
  GetBusinessCoaByBusinessDocument,
  GetChartOfAccountsDocument,
  GetCombinedCoAsDocument,
  useCreateNewBusinessCoaMutation,
  useGetAccountCategoryTypesQuery,
} from "@/src/generated/graphql";
import ActiveExpenseIcon from "@/components/ui/icons/ActiveExpenseIcon";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreateCOAProps {
  open: boolean;
  onClose: () => void;
}

interface COAData {
  name: string;
  code: string;
  description: string;
}

const CreateCustomCOASheet: React.FC<CreateCOAProps> = ({ open, onClose }) => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const { toast } = useToast();
  const [accountCategoryTypeId, setAccountCategoryTypeId] = useState("");
  const { register, reset, getValues } = useForm<COAData>();
  const getAccountCategoryTypes = useGetAccountCategoryTypesQuery();
  const accountCategoryTypes =
    getAccountCategoryTypes.data?.getAccountCategoryTypes;
  const [createNewBusinessCoaMutation, { loading: chartLoading }] =
    useCreateNewBusinessCoaMutation();
  const showSuccessToast = () => {
    toast({
      title: "Successful!",
      description: "Your COA has been successfully created.",
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

  const onSubmitCOAHandler = async () => {
    try {
      await createNewBusinessCoaMutation({
        variables: {
          businessId: businessId,
          accountCategoryTypeId: accountCategoryTypeId,
          name: getValues("name"),
          description: getValues("description"),
          code: getValues("code"),
        },
        refetchQueries: [
          GetBusinessCoAsDocument,
          GetBusinessCoaByBusinessDocument,
          GetChartOfAccountsDocument,
          GetCombinedCoAsDocument,
        ],
      });
      onClose();
      showSuccessToast();
      reset();
      setAccountCategoryTypeId("");
    } catch (error) {
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
          <div className=" mt-[40px] flex">
            <span className=" p-3 rounded-full bg-[#EDF6FF] flex">
              <ActiveExpenseIcon />
            </span>
          </div>
          <p className=" mt-[14px] text-lg text-primary-black">
            Custom chart of account
          </p>
          <p className=" font-light text-primary-greytext mt-2">
            A custom account for your expense
          </p>
          <form className=" w-full mt-[20px] flex flex-col gap-y-3 ">
            <div className=" flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="accountname">
                Name
              </label>
              <input
                type="text"
                id="accountname"
                required
                placeholder="Account name"
                className=" w-full border p-[10px] focus:outline-none rounded-lg text-sm border-gray-200"
                {...register("name")}
              />
            </div>
            <div className=" flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="description">
                Description
              </label>
              <input
                type="text"
                id="description"
                required
                placeholder="Description"
                className=" w-full border p-[10px] focus:outline-none rounded-lg text-sm border-gray-200"
                {...register("description")}
              />
            </div>
            <div className=" flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="code">
                Code
              </label>
              <input
                type="text"
                id="code"
                required
                placeholder="Enter a code"
                className=" w-full border p-[10px] focus:outline-none rounded-lg text-sm border-gray-200"
                {...register("code")}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="category">
                Account category type
              </label>
              <Select
                value={accountCategoryTypeId}
                onValueChange={setAccountCategoryTypeId}
              >
                <SelectTrigger className="border border-gray-200 bg-transparent rounded-lg h-10 text-sm focus:outline-none px-3 py-2">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-white w-full z-[200] shadow-sm text-gray-800">
                  <SelectGroup>
                    {accountCategoryTypes?.map((type) => (
                      <SelectItem
                        className="hover:bg-gray-100 cursor-pointer py-2 text-[15px]"
                        key={type?.id}
                        value={type?.id!}
                      >
                        {type?.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <button
              type="button"
              onClick={() => onSubmitCOAHandler()}
              disabled={chartLoading}
              className={`bg-primary-blue text-white rounded-[10px] py-[10px] mt-[20px] ${
                chartLoading ? "opacity-50" : ""
              }`}
            >
              {chartLoading ? "Loading..." : "Save"}
            </button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CreateCustomCOASheet;
