"use client";
import React from "react";
import AuthSidebar from "@/components/AuthSidebar";
import { useForgotPasswordMutation } from "@/src/generated/graphql";
import { useForm } from "react-hook-form";
import { useToast } from "@/app/hooks/use-toast";
import Link from "next/link";
import Verzologoblue2 from "@/components/ui/icons/Verzologoblue2";

type FormData = {
  email: string;
};

const Resetlink = () => {
  const { toast } = useToast();
  const { register, handleSubmit, reset } = useForm<FormData>();

  const [forgotPasswordMutation, { loading }] = useForgotPasswordMutation();

  const showSuccessToast = () => {
    toast({
      title: "Check your email",
      description: "We sent you a reset link. Be sure to check your spam too.",
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

  const onResetHandler = async (data: FormData) => {
    try {
      await forgotPasswordMutation({
        variables: data,
      });
      reset();
      showSuccessToast();
    } catch (error: any) {
      console.error(error);
      showFailureToast(error);
    }
  };
  return (
    <div className=" w-full flex flex-row h-screen">
      <AuthSidebar />
      <div className=" flex-1 md:ml-[34%] h-full flex items-center md:block overflow-y-auto md:pt-[60px]">
        <div className=" w-full lg:flex justify-end hidden items-center gap-x-6 pl-[140px] pr-[60px]">
          <p className=" text-primary-greytext text-lg">
            Don’t have an account?
          </p>
          <Link href="/auth/signup">
            <button className="rounded-[10px] text-primary-black flex text-lg justify-center px-8 py-[9px] items-center border border-primary-border">
              Sign up
            </button>
          </Link>
        </div>
        <div className=" flex flex-col w-full px-[28px] md:pl-[140px] md:pr-[60px] mt-[-70px] md:mt-[60px]">
          <span className=" flex items-center md:hidden mb-[20px]">
            <Verzologoblue2 />
          </span>
          <div className=" flex flex-col gap-y-2">
            <p className=" text-primary-black md:text-[32px] text-[28px]">
              Reset Password
            </p>
            <p className=" text-primary-greytext md:text-lg text-base ">
              A reset link will be sent to your email address
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onResetHandler)}
            className=" flex flex-col md:mt-[30px] mt-5 gap-y-5 items-center md:items-start w-full"
          >
            <div className=" flex flex-col gap-y-2 w-full">
              <label className=" text-primary-black" htmlFor="email">
                Email address
              </label>
              <input
                type="email"
                required
                className="md:max-w-[400px] max-w-full px-3 py-[10px] border-gray-300 rounded-[8px] border focus:outline-none "
                placeholder="e.g john@mail.com"
                {...register("email")}
              />
            </div>
            <div className=" flex flex-col mt-3 w-full">
              <button
                type="submit"
                disabled={loading}
                className={`rounded-[10px] md:px-[100px] px-[90px] w-full md:max-w-[400px] py-[11px]  text-white bg-primary-blue text-base md:text-lg flex items-center justify-center ${
                  loading ? "opacity-50" : ""
                }`}
              >
                {loading ? "Loading..." : "Send link"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className=" border-t border-t-gray-100 bg-white w-full flex z-[15] absolute bottom-0 px-[28px] md:px-0 md:pl-[34%]">
        <p className=" py-6 md:text-[15px] text-sm md:pl-[140px] leading-6 text-primary-greytext">
          By using the platform you agree to{" "}
          <Link href="https://verzo.app/privacy">
            <span className=" text-primary-blue text-opacity-70 cursor-pointer text-sm md:text-[15px] ml-1 underline underline-offset-4">
              Verzo’s Privacy Policy
            </span>{" "}
          </Link>
          and
          <Link href="https://verzo.app/terms">
            <span className=" text-primary-blue text-opacity-70 cursor-pointer text-sm md:text-[15px] ml-1 underline underline-offset-4">
              Terms of Use
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Resetlink;
