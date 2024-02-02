"use client";
import React, { useState } from "react";
import AuthSidebar from "@/components/AuthSidebar";
import { Eye, EyeOff } from "lucide-react";
import GoogleIcon from "@/components/ui/icons/GoogleIcon";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useSignInMutation } from "@/src/generated/graphql";
import { saveToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
type FormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const router = useRouter();
  const [type, setType] = useState("password");
  const [error, setError] = useState<string | null>(null);
  const togglePasswordVisibility = () => {
    setType((prevType) => (prevType === "text" ? "password" : "text"));
  };

  const handleInputChange = () => {
    setError(null);
  };
  const [signInMutation, { loading }] = useSignInMutation();
  const SignInHandler = async (form: FormData) => {
    try {
      const response = await signInMutation({
        variables: form,
      });
      if (response.data?.signIn.token.access_token) {
        saveToken(response.data.signIn.token.access_token);
        if (response.data.signIn.verified) {
          router.push("/dashboard");
        } else {
          router.push("/auth/verifyemail");
        }
      }
    } catch (error) {
      setError("Incorrect email or password");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <AuthSidebar />
      <div className="flex-1 ml-0 lg:ml-[34%] overflow-y-auto pt-[50px]">
        <div className=" w-full flex justify-end items-center gap-x-9 pl-[140px] pr-[60px]">
          <p className=" text-primary-greytext text-lg">
            Don’t have an account?
          </p>
          <Link href="https://verzo.app/waitlist">
            <button className="rounded-[10px] text-primary-black flex text-lg justify-center px-8 py-[9px] items-center border border-primary-border">
              Join waitlist
            </button>
          </Link>
        </div>
        <div className=" flex flex-col pl-[140px] pr-[60px] mt-[70px]">
          <div className=" flex flex-col gap-y-2">
            <p className=" text-primary-black text-[32px]">Sign in to Verzo</p>
            <p className=" text-primary-greytext text-lg">Welcome back</p>
          </div>
          <form
            onSubmit={handleSubmit(SignInHandler)}
            className=" flex flex-col mt-[30px] gap-y-6"
          >
            <div className=" flex flex-col gap-y-2">
              <label className=" text-primary-black" htmlFor="email">
                Email address
              </label>
              <input
                type="email"
                required
                className={`max-w-[400px] px-3 py-[10px] relative border ${
                  error ? "border-red-500" : "border-gray-300"
                } rounded-[8px] focus:outline-none`}
                placeholder="e.g john@mail.com"
                {...register("email")}
              />
            </div>
            <div className="relative flex flex-col gap-y-2">
              <label className="text-primary-black" htmlFor="password">
                Password
              </label>
              <div className={`relative max-w-[400px] group`}>
                <input
                  type={type}
                  required
                  className={`w-full px-3 py-[10px] relative border ${
                    error ? "border-red-500" : "border-gray-300"
                  } rounded-[8px] focus:outline-none`}
                  placeholder="8+ characters"
                  {...register("password", { onChange: handleInputChange })}
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
              {error && <p className="text-red-500 text-sm pl-1">{error}</p>}
              <p className="text-base text-primary-black mt-4">
                Forgot password?{" "}
                <Link
                  href="/auth/resetlink"
                  className="text-primary-blue underline underline-offset-4 ml-[2px]"
                >
                  Reset here
                </Link>
              </p>
            </div>

            <div className=" flex flex-col mt-1">
              <button
                type="submit"
                disabled={loading}
                className={`rounded-[10px] px-[100px] max-w-[400px] py-[10px]  text-white bg-primary-blue text-lg flex items-center justify-center ${
                  loading ? "opacity-50" : ""
                }`}
              >
                {loading ? "Loading..." : "Sign in"}
              </button>
              {/* <div className="flex space-x-[11px] py-6 items-center">
                <hr className="w-[182px] h-[1px] bg-primary-borderGrey" />
                <span className="text-sm text-primary-greytext">Or</span>
                <hr className="w-[182px] h-[1px] bg-primary-borderGrey" />
              </div>
              <button className="w-[400px] py-[10px] rounded-[10px] border  border-gray-300 bg-white text-lg flex items-center justify-center gap-x-3">
                <GoogleIcon />
                Sign in with Google
              </button> */}
            </div>
          </form>
        </div>
      </div>
      <div className=" border-t border-t-gray-100 bg-white w-full pl-[34%]">
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

export default SignIn;
