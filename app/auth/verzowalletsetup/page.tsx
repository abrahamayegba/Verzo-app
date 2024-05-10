"use client";
import React, { useState } from "react";
import AuthSidebar from "@/components/AuthSidebar";
import Link from "next/link";
import {
  GetBusinessesByUserIdDocument,
  useSetUpBusinessAccountMutation,
} from "@/src/generated/graphql";
import { useForm } from "react-hook-form";
import { useToast } from "@/app/hooks/use-toast";
import { client } from "@/src/apollo/ApolloClient";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

type FormData = {
  bvn: string;
  addressLine1: string;
  city: string;
  state: string;
  postalCode: string;
};

const VerzowalletSetup = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const { toast } = useToast();
  const router = useRouter();
  const [dobValue, setDobValue] = useState("");
  const [setUpBusinessAccountMutation, { loading }] =
    useSetUpBusinessAccountMutation();
  const [openDateOfBirthPicker, setOpenDateOfBirthPicker] =
    React.useState(false);
  const [dateOfBirth, setDateOfBirth] = React.useState<Date | null>(null);

  React.useEffect(() => {
    if (dateOfBirth) {
      const formattedDate = format(dateOfBirth, "yyyy-MM-dd").toString();
      setDobValue(formattedDate);
    }
  }, [dateOfBirth]);

  const showFailureToast = (error: any) => {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: error?.message,
      duration: 3000,
    });
  };
  const showdobToast = () => {
    toast({
      variant: "destructive",
      title: "Pick your date of birth",
      duration: 3000,
    });
  };

  // const onCreateBusinessAccountHandler = async (data: FormData) => {
  //   if (!dobValue) {
  //     showdobToast();
  //     return;
  //   }
  //   try {
  //     await setUpBusinessAccountMutation({
  //       variables: {
  //         dob: dobValue,
  //         ...data,
  //       },
  //       update: (cache) => {
  //         cache.evict({ fieldName: "getBusinessesByUserId" });
  //       },
  //     });
  //     await client.query({ query: GetBusinessesByUserIdDocument });
  //     router.push("/dashboard");
  //   } catch (error) {
  //     console.error(error);
  //     showFailureToast(error);
  //   }
  // };

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
                Create your Verzo account
              </p>
            </div>
            <form
              // onSubmit={handleSubmit(onCreateBusinessAccountHandler)}
              className=" flex flex-col mt-[20px] gap-y-5"
            >
              <div className=" flex flex-col gap-y-2">
                <label className=" text-primary-black" htmlFor="BVN">
                  Bank verification number (BVN)
                </label>
                <input
                  type="text"
                  required
                  className="max-w-[450px] px-3 py-[10px] border-gray-300 rounded-[8px] border placeholder:text-sm focus:outline-none "
                  id="bvn"
                  placeholder="BVN"
                  {...register("bvn")}
                />
              </div>
              <div className="flex flex-row w-full max-w-[450px] gap-x-4">
                <div className=" w-1/2 flex flex-col gap-y-2">
                  <label className=" text-[15px]" htmlFor="category">
                    Postal code
                  </label>
                  <input
                    type="text"
                    required
                    id="reference"
                    className="max-w-[450px] px-3 py-[10px] border-gray-300 rounded-[8px] border focus:outline-none "
                    placeholder="100001"
                    {...register("postalCode")}
                  />
                </div>
                <div className=" w-1/2 flex flex-col gap-y-2">
                  <label className=" text-[15px]" htmlFor="category">
                    Date of birth (DOB)
                  </label>
                  <Popover
                    open={openDateOfBirthPicker}
                    onOpenChange={setOpenDateOfBirthPicker}
                  >
                    <PopoverTrigger asChild>
                      <button className=" text-left text-sm font-normal flex items-center border border-gray-300 h-[46px] px-3 rounded-[8px]">
                        {dateOfBirth ? (
                          format(dateOfBirth, "PPP")
                        ) : (
                          <div className=" justify-between flex items-center w-full">
                            <span className=" text-sm">Pick a date</span>
                            <ChevronDown className=" w-4 h-4 text-primary-greytext" />
                          </div>
                        )}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0 bg-white">
                      <Calendar
                        mode="single"
                        selected={dateOfBirth!}
                        onSelect={(date) => {
                          setDateOfBirth(date!);
                          setOpenDateOfBirthPicker(false);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className=" flex flex-col gap-y-2">
                <label className=" text-primary-black" htmlFor="address">
                  Address
                </label>
                <input
                  type="text"
                  required
                  id="address"
                  className="max-w-[450px] px-3 py-[10px] border-gray-300 rounded-[8px] border focus:outline-none "
                  placeholder="Address"
                  {...register("addressLine1")}
                />
              </div>
              <div className="flex flex-row w-full max-w-[450px] gap-x-4">
                <div className=" w-1/2 flex flex-col gap-y-2">
                  <label className=" text-[15px]" htmlFor="city">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    id="city"
                    className="max-w-[450px] px-3 py-[10px] border-gray-300 rounded-[8px] border focus:outline-none "
                    placeholder="Lekki"
                    {...register("city")}
                  />
                </div>
                <div className=" w-1/2 flex flex-col gap-y-2">
                  <label className=" text-[15px]" htmlFor="state">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    id="state"
                    className="max-w-[450px] px-3 py-[10px] border-gray-300 rounded-[8px] border focus:outline-none "
                    placeholder="Lagos"
                    {...register("state")}
                  />
                </div>
              </div>
              <div className=" flex flex-col mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`rounded-[10px] px-[100px] max-w-[450px] py-[10px]  text-white bg-primary-blue text-lg flex items-center justify-center ${
                    loading ? "opacity-50" : ""
                  }`}
                >
                  {loading ? "Loading..." : "Create account"}
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

export default VerzowalletSetup;
