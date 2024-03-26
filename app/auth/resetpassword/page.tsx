"use client";
import React, { useState } from "react";
import AuthSidebar from "@/components/AuthSidebar";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/app/hooks/use-toast";
import { useForm } from "react-hook-form";
import { useChangePasswordMutation } from "@/src/generated/graphql";
import Link from "next/link";
import Verzologoblue2 from "@/components/ui/icons/Verzologoblue2";

type FormData = {
  newPassword: string;
};

const Resetpassword = () => {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const router = useRouter();
  const forgotPasswordId = searchParams.get("forgotPasswordId")?.toString();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormData>();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState("password");
  const togglePasswordVisibility = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
  };
  const [changePasswordMutation, { loading }] = useChangePasswordMutation();

  const handleInputChange = () => {
    setError(null);
  };

  const showSuccessToast = () => {
    toast({
      title: "Password changed successfully",
      description: "Your password has been changed. Please sign in.",
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

  const handleConfirmPasswordChange = (e: any) => {
    setPasswordsMatch(true);
    setConfirmPassword(e.target.value);
  };

  const resetForm = () => {
    reset();
    setPasswordsMatch(true);
    setConfirmPassword("");
  };

  const onResetHandler = async (data: FormData) => {
    setFormSubmitted(true);
    if (getValues("newPassword") !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }
    try {
      await changePasswordMutation({
        variables: { forgotPasswordId: forgotPasswordId!, ...data },
      });
      router.push("/auth/signin");
      showSuccessToast();
      resetForm();
    } catch (error: any) {
      console.error(error);
      showFailureToast(error);
    }
  };

  return (
    <div className=" w-full flex flex-row h-screen">
      <AuthSidebar />
      <div className=" flex-1 md:ml-[34%] h-full flex items-center md:block md:pt-[60px] overflow-y-auto">
        <div className="  w-full lg:flex justify-end hidden items-center gap-x-9 pl-[140px] pr-[60px]">
          <p className=" text-primary-greytext text-lg">
            Don’t have an account?
          </p>
          <Link href="https://verzo.app/waitlist">
            <button className="rounded-[10px] text-primary-black flex text-lg justify-center px-8 py-[9px] items-center border border-primary-border">
              Join waitlist
            </button>
          </Link>
        </div>
        <div className=" flex flex-col w-full px-[28px] md:pl-[140px] md:pr-[60px] mt-[-50px] md:mt-[60px]">
          <span className=" flex items-center md:hidden mb-[20px]">
            <Verzologoblue2 />
          </span>
          <div className=" flex flex-col gap-y-2">
            <p className=" text-primary-black md:text-[32px] text-[28px]">
              Reset password
            </p>
            <p className="  text-primary-greytext md:text-lg text-base">
              Enter a new password
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onResetHandler)}
            className=" flex flex-col md:mt-[30px] mt-5 md:gap-y-5 gap-y-3 items-center md:items-start w-full"
          >
            <div className=" flex flex-col gap-y-2 w-full">
              <label className=" text-primary-black" htmlFor="password">
                Password
              </label>
              <input
                type={type}
                className="md:max-w-[400px] max-w-full px-3 py-[10px] relative border-gray-300 rounded-[8px] border focus:outline-none "
                placeholder="8+ characters"
                {...register("newPassword", {
                  onChange: handleInputChange,
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$#@!&*~])[A-Za-z\d$#@!&*~]{8,}$/,
                    message:
                      "Password must be at least 8 characters, contain at least one uppercase letter, one special character, one lowercase letter, and one number",
                  },
                })}
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm pl-1 max-w-[400px]">
                  {errors.newPassword.message}
                </p>
              )}
              <span
                onClick={togglePasswordVisibility}
                className="absolute cursor-pointer hidden md:block mt-[48px] ml-[360px]"
              >
                {type === "text" ? (
                  <Eye className=" w-4 h-4 text-primary-greytext" />
                ) : (
                  <EyeOff className=" w-4 h-4 text-primary-greytext" />
                )}
              </span>
            </div>
            <div className=" flex flex-col  gap-y-2 md:mt-5 mt-2 w-full">
              <label className=" text-primary-black " htmlFor="confirmpassword">
                Confirm password
              </label>
              <input
                type={type}
                name="confirmpassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="md:max-w-[400px] max-w-full px-3 py-[10px] relative border-gray-300 rounded-[8px] border focus:outline-none "
                placeholder="8+ characters"
              />
              {formSubmitted && !passwordsMatch && (
                <p className="text-red-500 text-sm">Passwords do not match</p>
              )}
              <span
                onClick={togglePasswordVisibility}
                className="absolute cursor-pointer mt-[48px] hidden md:block ml-[360px]"
              >
                {type === "text" ? (
                  <Eye className=" w-4 h-4 text-primary-greytext" />
                ) : (
                  <EyeOff className=" w-4 h-4 text-primary-greytext" />
                )}
              </span>
            </div>
            <div className=" flex flex-col md:mt-6 mt-4 w-full">
              <button
                type="submit"
                disabled={loading}
                className={`rounded-[10px] md:px-[100px] px-[60px] w-full md:max-w-[400px] py-[11px] text-white bg-primary-blue text-base md:text-lg flex items-center justify-center ${
                  loading ? "opacity-50" : ""
                }`}
              >
                {loading ? "Loading..." : "Reset password"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className=" border-t border-t-gray-100 bg-white w-full flex z-[15] absolute bottom-0 px-[28px] md:px-0 md:pl-[34%]">
        <p className=" md:py-6 py-4 md:text-[15px] text-sm md:pl-[140px] leading-6 text-primary-greytext">
          By using the platform you agree to{" "}
          <Link href="https://verzo.app/privacy">
            <span className=" text-primary-blue cursor-pointer text-sm md:text-[15px] underline underline-offset-4">
              Verzo’s Privacy Policy
            </span>{" "}
          </Link>
          and
          <Link href="https://verzo.app/terms">
            <span className=" text-primary-blue cursor-pointer text-sm md:text-[15px] ml-1 underline underline-offset-4">
              Terms of Use
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Resetpassword;
