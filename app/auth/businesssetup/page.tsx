"use client";
import React, { useState } from "react";
import AuthSidebar from "@/components/AuthSidebar";
import useModal from "@/app/hooks/useModal";
import Link from "next/link";
import {
  GetBusinessesByUserIdDocument,
  useCreateBusinessMutation,
  useGetBusinessCategoriesQuery,
  useGetBusinessesByUserIdQuery,
} from "@/src/generated/graphql";
import { IoWalletOutline } from "react-icons/io5";
import VerzoWalletSheet from "@/components/sheets/auth/VerzoWalletSheet";
import { useForm } from "react-hook-form";
import { useToast } from "@/app/hooks/use-toast";
import { client } from "@/src/apollo/ApolloClient";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

type FormData = {
  businessName: string;
  businessEmail: string;
  businessMobile: string;
};

const BusinessSetup = () => {
  const {
    isOpen: isConfirmPlanModalOpen,
    openModal: openConfirmPlanModal,
    closeModal: closeConfirmPlanModal,
  } = useModal();

  const [openVerzoWalletSheet, setOpenVerzoWalletSheet] = useState(false);

  const { register, handleSubmit, reset } = useForm<FormData>();
  const { toast } = useToast();
  const router = useRouter();
  const [businessCategoryId, setBusinessCategoryId] = useState("");
  const businessCategoryQuery = useGetBusinessCategoriesQuery();
  const [createBusinessMutation, { loading }] = useCreateBusinessMutation();

  const showFailureToast = (error: any) => {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: error?.message,
      duration: 3000,
    });
  };
  const showBusinessCategoryToast = () => {
    toast({
      variant: "destructive",
      title: "Select a business category",
      duration: 3000,
    });
  };

  const onCreateBusinessHandler = async (data: FormData) => {
    if (!businessCategoryId) {
      showBusinessCategoryToast();
      return;
    }
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
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      showFailureToast(error);
    }
  };

  return (
    <>
      <div className="w-full flex flex-row">
        <AuthSidebar />
        <div className="flex-1 ml-0 lg:ml-[34%] overflow-y-auto pt-[50px]">
          <div className=" w-full flex justify-end items-center gap-x-6 pl-[140px] pr-[60px]">
            <p className=" text-primary-greytext text-lg">
              Already have an account?
            </p>
            <Link href="/auth/signin">
              <button className="rounded-[10px] text-primary-black flex text-lg justify-center px-8 py-[9px] items-center border border-primary-border">
                Sign in
              </button>
            </Link>
          </div>
          <div className=" flex flex-col pl-[140px] pr-[60px] mt-[20px]">
            <div className=" flex flex-col gap-y-2">
              <p className=" text-primary-black text-[32px]">
                Create your business
              </p>
            </div>
            <form
              onSubmit={handleSubmit(onCreateBusinessHandler)}
              className=" flex flex-col mt-[20px] gap-y-6"
            >
              <div className=" flex flex-col gap-y-2">
                <label className=" text-primary-black" htmlFor="businessname">
                  Business name
                </label>
                <input
                  type="text"
                  required
                  className="max-w-[400px] px-3 py-[10px] border-gray-300 rounded-[8px] border focus:outline-none "
                  id="businessname"
                  placeholder="Business name"
                  {...register("businessName")}
                />
              </div>
              <div className=" flex flex-col gap-y-2">
                <label className=" text-primary-black" htmlFor="email">
                  Business email
                </label>
                <input
                  type="email"
                  required
                  id="email"
                  className="max-w-[400px] px-3 py-[10px] border-gray-300 rounded-[8px] border focus:outline-none "
                  placeholder="Business email"
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
                  <SelectTrigger className="border max-w-[400px] border-gray-200 bg-transparent rounded-lg h-[46px] text-base focus:outline-none px-3 py-[10px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="bg-white max-w-[400px] w-full z-[200] shadow-sm text-gray-800">
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
              <div className=" flex flex-col gap-y-2">
                <label className=" text-[15px]" htmlFor="phone">
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  placeholder="Phone number"
                  className=" max-w-[400px] border p-[10px] pl-3 focus:outline-none rounded-lg text-base border-gray-200"
                  {...register("businessMobile")}
                />
              </div>
              <div className=" flex flex-col mt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className={`rounded-[10px] px-[100px] max-w-[400px] py-[10px]  text-white bg-primary-blue text-lg flex items-center justify-center ${
                    loading ? "opacity-50" : ""
                  }`}
                >
                  {loading ? "Loading..." : "Create business"}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className=" border-t border-t-gray-100 bg-white w-full flex z-[15] fixed bottom-0 pl-[34%]">
          <p className=" py-6 text-[15px] pl-[140px] text-primary-greytext">
            By using the platform you agree to{" "}
            <span className=" text-primary-blue text-opacity-70 cursor-pointer text-[15px] ml-1 underline underline-offset-4">
              Verzo’s Privacy Policy
            </span>{" "}
            and
            <span className=" text-primary-blue text-opacity-70 cursor-pointer text-[15px] ml-1 underline underline-offset-4">
              Terms of Use
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default BusinessSetup;
