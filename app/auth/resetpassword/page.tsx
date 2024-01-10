"use client";
import React, { useState } from "react";
import AuthSidebar from "@/components/AuthSidebar";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/app/hooks/use-toast";
import { useForm } from "react-hook-form";
import { useChangePasswordMutation } from "@/src/generated/graphql";
import Link from "next/link";

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
      <div className=" flex-1 ml-[34%] h-full pt-[60px]">
        <div className=" w-full flex justify-end items-center gap-x-9 pl-[140px] pr-[60px]">
          <p className=" text-primary-greytext text-lg">
            Don’t have an account?
          </p>
          <Link href="/auth/signup">
            <button className="rounded-[10px] text-primary-black flex text-lg justify-center px-8 py-[9px] items-center border border-primary-border">
              Sign up
            </button>
          </Link>
        </div>
        <div className=" flex flex-col pl-[140px] pr-[60px] mt-[40px]">
          <div className=" flex flex-col gap-y-2">
            <p className=" text-primary-black text-[32px]">Reset password</p>
            <p className=" text-primary-greytext text-lg">
              Enter a new password
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onResetHandler)}
            className=" flex flex-col mt-[30px]"
          >
            <div className=" flex flex-col gap-y-2">
              <label className=" text-primary-black" htmlFor="password">
                Password
              </label>
              <input
                type={type}
                className="max-w-[400px] px-3 py-[10px] relative border-gray-300 rounded-[8px] border focus:outline-none "
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
                className="absolute cursor-pointer mt-[48px] ml-[360px]"
              >
                {type === "text" ? (
                  <Eye className=" w-4 h-4 text-primary-greytext" />
                ) : (
                  <EyeOff className=" w-4 h-4 text-primary-greytext" />
                )}
              </span>
            </div>
            <div className=" flex flex-col  gap-y-2 mt-5">
              <label className=" text-primary-black " htmlFor="confirmpassword">
                Confirm password
              </label>
              <input
                type={type}
                name="confirmpassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="max-w-[400px] px-3 py-[10px] relative border-gray-300 rounded-[8px] border focus:outline-none "
                placeholder="8+ characters"
              />
              {formSubmitted && !passwordsMatch && (
                <p className="text-red-500 text-sm">Passwords do not match</p>
              )}
              <span
                onClick={togglePasswordVisibility}
                className="absolute cursor-pointer mt-[48px] ml-[360px]"
              >
                {type === "text" ? (
                  <Eye className=" w-4 h-4 text-primary-greytext" />
                ) : (
                  <EyeOff className=" w-4 h-4 text-primary-greytext" />
                )}
              </span>
            </div>
            <div className=" flex flex-col mt-6">
              <button
                type="submit"
                disabled={loading}
                className={`rounded-[10px] px-[100px] max-w-[400px] py-[10px]  text-white bg-primary-blue text-lg flex items-center justify-center ${
                  loading ? "opacity-50" : ""
                }`}
              >
                {loading ? "Loading..." : "Reset password"}
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

export default Resetpassword;
