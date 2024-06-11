"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import GoogleIcon from "@/components/ui/icons/GoogleIcon";
import AuthSidebar from "@/components/AuthSidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSignUpMutation } from "@/src/generated/graphql";
import { saveToken } from "@/lib/auth";
import { useToast } from "@/app/hooks/use-toast";
type FormData = {
  fullname: string;
  email: string;
  password: string;
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();
  const { toast } = useToast();
  const [type, setType] = useState("password");
  const [error, setError] = useState<string | null>(null);
  const togglePasswordVisibility = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
  };
  const handleInputChange = () => {
    setError(null);
  };
  const [signUpMutation, { loading }] = useSignUpMutation();
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
      const response = await signUpMutation({
        variables: {
          ...form,
          email: form.email.toLowerCase(),
        },
      });
      saveToken(response.data?.signUp.access_token!);
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
        <div className=" flex flex-col pl-[140px] pr-[60px] mt-[50px]">
          <div className=" flex flex-col gap-y-2">
            <p className=" text-primary-black text-[32px]">Sign up on Verzo</p>
          </div>
          <form
            onSubmit={handleSubmit(SignUpHandler)}
            className=" flex flex-col mt-[20px] gap-y-6"
          >
            <div className=" flex flex-col gap-y-2">
              <label className=" text-primary-black" htmlFor="fullname">
                Full name
              </label>
              <input
                type="text"
                required
                className="max-w-[400px] px-3 py-[10px] border-gray-300 rounded-[8px] border placeholder:text-sm focus:outline-none "
                placeholder="e.g John doe"
                {...register("fullname")}
              />
            </div>
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
            <div className=" flex flex-col mt-4">
              <button
                type="submit"
                disabled={loading}
                className={`rounded-[10px] px-[100px] max-w-[400px] py-[10px]  text-white bg-primary-blue text-lg flex items-center justify-center ${
                  loading ? "opacity-50" : ""
                }`}
              >
                {loading ? "Loading..." : "Create account"}
              </button>
              {/* <div className="flex space-x-[11px] py-5 items-center">
                <hr className="w-[182px] h-[1px] bg-primary-borderGrey" />
                <span className="text-sm text-primary-greytext">Or</span>
                <hr className="w-[182px] h-[1px] bg-primary-borderGrey" />
              </div>
              <button className="w-[400px] py-[10px] rounded-[10px] border  border-gray-300 bg-white text-lg flex items-center justify-center gap-x-3">
                <GoogleIcon />
                Sign up with Google
              </button> */}
            </div>
          </form>
        </div>
      </div>
      <div className=" border-t border-t-gray-100 bg-white w-full pl-[34%]">
        <p className=" py-6 text-[15px] pl-[140px] text-primary-greytext">
          By using the platform you agree to{" "}
          <Link href="https://verzo.app/privacy">
            <span className=" text-primary-blue text-opacity-70 cursor-pointer text-[15px] ml-1 underline underline-offset-4">
              Verzo’s Privacy Policy
            </span>{" "}
          </Link>
          and
          <Link href="https://verzo.app/terms">
            <span className=" text-primary-blue text-opacity-70 cursor-pointer text-[15px] ml-1 underline underline-offset-4">
              Terms of Use
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
