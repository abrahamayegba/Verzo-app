"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import GoogleIcon from "@/components/ui/icons/GoogleIcon";
import AuthSidebar from "@/components/AuthSidebar";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSignUpFromWaitlistMutation } from "@/src/generated/graphql";
import { saveToken } from "@/lib/auth";
import { useToast } from "@/app/hooks/use-toast";
type FormData = {
  password: string;
};

const WaitlistSignup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();
  const waitlistIdParams = useSearchParams();
  const waitlistId = waitlistIdParams.get("waitlistId")!;
  const { toast } = useToast();
  const [type, setType] = useState("password");
  const [error, setError] = useState<string | null>(null);
  const togglePasswordVisibility = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
  };
  const handleInputChange = () => {
    setError(null);
  };
  const [signUpFromWaitlistMutation, { loading }] =
    useSignUpFromWaitlistMutation();
  const showFailureToast = (error: any) => {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: error?.message,
      duration: 3000,
    });
  };
  const SignUpHandler = async (form: FormData) => {
    try {
      const response = await signUpFromWaitlistMutation({
        variables: {
          waitlistId: waitlistId,
          ...form,
        },
      });
      saveToken(response.data?.signupFromWaitlist.access_token!);
      router.push("/auth/verifyemail");
    } catch (error: any) {
      console.error(error);
      showFailureToast(error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <AuthSidebar />
      <div className="flex-1 ml-0 lg:ml-[34%] overflow-y-auto pt-[50px]">
        <div className=" w-full flex justify-end items-center gap-x-9 pl-[140px] pr-[60px]">
          <p className=" text-primary-greytext text-lg">
            Already have an account?
          </p>
          <Link href="/auth/signin">
            <button className="rounded-[10px] text-primary-black flex text-lg justify-center px-8 py-[9px] items-center border border-primary-border">
              Sign in
            </button>
          </Link>
        </div>
        <div className=" flex flex-col pl-[140px] pr-[60px] mt-[100px]">
          <div className=" flex flex-col gap-y-2">
            <p className=" text-primary-black text-[32px]">Sign up on Verzo</p>
            <p className=" text-primary-greytext text-lg">
              Let’s get you set up
            </p>
          </div>
          <form
            onSubmit={handleSubmit(SignUpHandler)}
            className=" flex flex-col mt-[25px] gap-y-6"
          >
            <div className=" relative flex flex-col  gap-y-2">
              <label className=" text-primary-black " htmlFor="password">
                Password
              </label>
              <div className={`relative max-w-[400px] group`}>
                <input
                  type={type}
                  required
                  className={`max-w-[400px] w-full px-3 py-[10px] relative  rounded-[8px] border focus:outline-none ${
                    errors.password
                      ? " border border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="8+ characters"
                  {...register("password", {
                    onChange: handleInputChange,
                    pattern: {
                      value:
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$#@!&*~])[A-Za-z\d$#@!&*~]{8,}$/,
                      message:
                        "Password must be at least 8 characters, contain at least one uppercase letter, one special character, one lowercase letter, and one number",
                    },
                  })}
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute cursor-pointer top-[25px] right-[30px] transform translate-y-[-50%] -translate-x-[-100%] opacity-50 group-hover:opacity-100"
                >
                  {type === "password" ? (
                    <EyeOff className="w-4 h-4 text-primary-greytext" />
                  ) : (
                    <Eye className="w-4 h-4 text-primary-greytext" />
                  )}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm pl-1 max-w-[400px]">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className=" flex flex-col mt-3">
              <button
                type="submit"
                disabled={loading}
                className={`rounded-[10px] px-[100px] max-w-[400px] py-[10px]  text-white bg-primary-blue text-lg flex items-center justify-center ${
                  loading ? "opacity-50" : ""
                }`}
              >
                {loading ? "Loading..." : "Create account"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className=" border-t border-t-gray-100 bg-white w-full pl-[34%]">
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
  );
};

export default WaitlistSignup;
