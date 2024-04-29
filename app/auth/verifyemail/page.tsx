"use client";
import { useToast } from "@/app/hooks/use-toast";
import useModal from "@/app/hooks/useModal";
import AuthSidebar from "@/components/AuthSidebar";
import OTPModal from "@/components/modals/auth/OTPModal";
import ActiveMailIcon from "@/components/ui/icons/ActiveMailIcon";
import CircleMailIcon from "@/components/ui/icons/CircleMailIcon";
import { useResendVerificationMutation } from "@/src/generated/graphql";
import Link from "next/link";
import React from "react";

const VerifyEmail = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const { toast } = useToast();
  const [resendVerificationMutation, { loading: resendLoading }] =
    useResendVerificationMutation();

  const showSuccessToast = () => {
    toast({
      title: "Check your email",
      description: "We resent you a link. Be sure to check your spam too.",
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

  const handleResendClick = async () => {
    try {
      await resendVerificationMutation();
      showSuccessToast();
    } catch (error: any) {
      console.error(error);
      showFailureToast(error);
    }
  };

  return (
    <>
      <div className=" w-full flex flex-row h-screen">
        <AuthSidebar />
        <div className=" flex-1 ml-[34%] h-full pt-[40px]">
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
          <div className=" flex flex-col pt-[150px] gap-y-2 pl-[140px] pr-[60px] mt-[40px]">
            <div className=" flex mb-[30px]">
              <span>
                <CircleMailIcon />
                <ActiveMailIcon />
              </span>
            </div>
            <p className=" text-[32px]">Verify email</p>
            <p className=" text-primary-greytext text-base flex">
              Click on the link sent to ******@mail.com
              <button
                onClick={openModal}
                className=" text-primary-blue underline underline-offset-4 ml-2 cursor-pointer"
              >
                Enter code
              </button>
            </p>
            <p className=" text-primary-greytext">
              Didn’t receive the code?{" "}
              <button
                onClick={handleResendClick}
                disabled={resendLoading}
                className={` text-primary-blue underline underline-offset-4 ml-[6px] ${
                  resendLoading ? "opacity-50" : ""
                }`}
              >
                Resend
              </button>
            </p>
          </div>
        </div>
        <div className=" border-t border-t-gray-100 bg-white w-full flex z-[15] absolute bottom-0 pl-[34%]">
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
      <OTPModal open={isOpen} openModal={openModal} onClose={closeModal} />
    </>
  );
};

export default VerifyEmail;
