"use client";
import React, { useState } from "react";
import AuthSidebar from "@/components/AuthSidebar";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useSignInMutation } from "@/src/generated/graphql";
import { saveRefreshToken, saveToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Verzologoblue2 from "@/components/ui/icons/Verzologoblue2";
import { gql } from "@apollo/client";
import { client } from "@/src/apollo/ApolloClient";
type FormData = {
  email: string;
  password: string;
};

const GET_BUSINESSES_BY_USER_ID_QUERY = gql`
  query GetBusinessesByUserId {
    getBusinessesByUserId {
      businesses {
        id
        businessName
        sudoAccount {
          id
        }
        businessEmail
        businessMobile
      }
    }
  }
`;

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
  // const SignInHandler = async (form: FormData) => {
  //   try {
  //     const response = await signInMutation({
  //       variables: form,
  //     });
  //     if (response.data?.signIn.token.access_token) {
  //       saveToken(response.data.signIn.token.access_token);
  //       saveRefreshToken(response?.data?.signIn?.token?.refresh_token);
  //       if (response.data.signIn.verified) {
  //         router.push("/dashboard");
  //       } else {
  //         router.push("/auth/verifyemail");
  //       }
  //     }
  //   } catch (error) {
  //     setError("Incorrect email or password");
  //   }
  // };
  const SignInHandler = async (form: FormData) => {
    try {
      const response = await signInMutation({
        variables: form,
      });
      if (response.data?.signIn.token.access_token) {
        saveToken(response.data.signIn.token.access_token);
        saveRefreshToken(response?.data?.signIn?.token?.refresh_token);
        if (!response.data.signIn.verified) {
          router.push("/auth/verifyemail");
        } else {
          const {
            data: {
              getBusinessesByUserId: { businesses },
            },
          } = await client.query({
            query: GET_BUSINESSES_BY_USER_ID_QUERY,
          });
          if (businesses && businesses.length > 0) {
            router.push("/dashboard");
          } else {
            router.push("auth/businesssetup");
          }
        }
      }
    } catch (error) {
      setError("Incorrect email or password");
    }
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <AuthSidebar />
      <div className=" flex-1 md:ml-[34%] h-full flex items-center md:block md:pt-[50px] overflow-y-auto">
        <div className=" w-full lg:flex justify-end hidden items-center gap-x-6 pl-[140px] pr-[60px]">
          <p className=" text-primary-greytext text-lg">
            Don’t have an account?
          </p>
          <Link href="https://verzo.app/waitlist">
            <button className="rounded-[10px] text-primary-black flex text-lg justify-center px-8 py-[9px] items-center border border-primary-border">
              Join waitlist
            </button>
          </Link>
        </div>
        <div className="flex flex-col w-full px-[28px] md:pl-[140px] md:pr-[60px] mt-[-70px] md:mt-[70px]">
          <span className=" flex items-center md:hidden mb-[15px]">
            <Verzologoblue2 />
          </span>
          <div className=" flex flex-col gap-y-2">
            <p className=" text-primary-black md:text-[32px] text-[28px]">
              Sign in to Verzo
            </p>
            <p className=" text-primary-greytext md:text-lg text-base">
              Welcome back
            </p>
          </div>
          <form
            onSubmit={handleSubmit(SignInHandler)}
            className=" flex flex-col md:mt-[30px] mt-[20px] md:gap-y-6 gap-y-4"
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
                {...register("email", { onChange: handleInputChange })}
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
                className={`rounded-[10px] md:px-[100px] px-[90px] max-w-full md:max-w-[400px] py-[10px]  text-white bg-primary-blue text-lg flex items-center justify-center ${
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
      <div className=" border-t border-t-gray-100 bg-white w-full flex z-[15] absolute bottom-0 px-[28px] md:px-0 md:pl-[34%]">
        <p className=" md:py-6 py-4 md:text-[15px] text-sm md:pl-[140px] leading-6 text-primary-greytext">
          By using the platform you agree to{" "}
          <Link href="https://verzo.app/privacy">
            <span className=" text-primary-blue text-opacity-70 cursor-pointer text-sm md:text-[15px] underline underline-offset-4">
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

export default SignIn;
