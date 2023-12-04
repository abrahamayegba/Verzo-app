"use client";
import React from "react";
import AuthSidebar from "@/components/AuthSidebar";
import { useForgotPasswordMutation } from "@/src/generated/graphql";
import { useForm } from "react-hook-form";
import { useToast } from "@/app/hooks/use-toast";

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
      <div className=" flex-1 ml-[34%] h-full pt-[60px]">
        <div className=" w-full flex justify-end items-center gap-x-9 pl-[140px] pr-[60px]">
          <p className=" text-primary-greytext text-lg">
            Don’t have an account?
          </p>
          <button className="rounded-[10px] text-primary-black flex text-lg justify-center px-8 py-[9px] items-center border border-primary-border">
            Sign up
          </button>
        </div>
        <div className=" flex flex-col pl-[140px] pr-[60px] mt-[60px]">
          <div className=" flex flex-col gap-y-2">
            <p className=" text-primary-black text-[32px]">Reset Password</p>
            <p className=" text-primary-greytext text-lg">
              A reset link will be sent to your email address
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onResetHandler)}
            className=" flex flex-col mt-[30px] gap-y-5"
          >
            <div className=" flex flex-col gap-y-2">
              <label className=" text-primary-black" htmlFor="email">
                Email address
              </label>
              <input
                type="email"
                required
                className="max-w-[400px] px-3 py-[10px] border-gray-300 rounded-[8px] border focus:outline-none "
                placeholder="e.g john@mail.com"
                {...register("email")}
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
                {loading ? "Loading..." : "Send link"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className=" border-t border-t-gray-100 bg-white w-full flex z-[15] absolute bottom-0 pl-[34%]">
        <p className=" py-6 text-[15px] pl-[140px] text-primary-greytext">
          By using the platform you agree to{" "}
          <span className=" text-primary-blue cursor-pointer text-[15px] ml-1 underline underline-offset-4">
            Verzo’s Privacy Policy
          </span>{" "}
          and
          <span className=" text-primary-blue cursor-pointer text-[15px] ml-1 underline underline-offset-4">
            Terms of Use
          </span>
        </p>
      </div>
    </div>
  );
};

export default Resetlink;
