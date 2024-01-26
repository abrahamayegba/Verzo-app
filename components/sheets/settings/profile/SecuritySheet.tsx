import React, { useState } from "react";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import PasswordIcon from "@/components/ui/icons/PasswordIcon";
import { useToast } from "@/app/hooks/use-toast";
import { useForm } from "react-hook-form";
import { client } from "@/src/apollo/ApolloClient";
import {
  GetUserByIdDocument,
  useGetUserByIdQuery,
  useResetPasswordMutation,
} from "@/src/generated/graphql";

interface SecurityProps {
  open: boolean;
  onClose: () => void;
}

type FormData = {
  oldPassword: string;
  newPassword: string;
};

const SecuritySheet: React.FC<SecurityProps> = ({ open, onClose }) => {
  const { toast } = useToast();
  const getUserById = useGetUserByIdQuery();
  const [resetPasswordMutation, { loading }] = useResetPasswordMutation();
  const userId = getUserById?.data?.getUserById.id!;
  const [type, setType] = useState("password");
  const [type2, setType2] = useState("password");
  const { handleSubmit, register, reset } = useForm<FormData>();
  const togglePasswordVisibility = () => {
    setType((prevType) => (prevType === "text" ? "password" : "text"));
  };
  const togglePasswordVisibility2 = () => {
    setType2((prevType) => (prevType === "text" ? "password" : "text"));
  };
  const showSuccessToast = () => {
    toast({
      title: "Successful!",
      description: "Password successfully updated.",
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
  const onUpdatePasswordHandler = async (data: FormData) => {
    try {
      await resetPasswordMutation({
        variables: {
          userId: userId,
          ...data,
        },
        refetchQueries: [GetUserByIdDocument],
      });
      client.refetchQueries({
        include: "active",
      });
      onClose();
      reset();
      setType("password");
      setType2("password");
      showSuccessToast();
    } catch (error) {
      console.error(error);
      onClose();
      showFailureToast(error);
    }
  };
  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className=" py-[100px]">
          <button
            type="button"
            onClick={onClose}
            className=" flex gap-x-2 focus:outline-none text-primary-greytext items-center text-sm"
          >
            <ChevronLeft className=" w-4 h-4" />
            Back
          </button>
          <div className=" mt-[40px] flex">
            <span className=" p-3 rounded-full bg-[#EDF6FF] flex">
              <PasswordIcon />
            </span>
          </div>
          <p className=" mt-[14px] text-lg text-primary-black">Password</p>
          <p className=" font-light text-primary-greytext mt-2">
            Update password
          </p>
          <form
            onSubmit={handleSubmit(onUpdatePasswordHandler)}
            className=" w-full mt-[30px] flex flex-col gap-y-5 "
          >
            <div className=" flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="oldpassword">
                Old password
              </label>
              <input
                type={type}
                id="oldpassword"
                required
                placeholder="Enter current password"
                {...register("oldPassword")}
                className=" w-full border p-[10px] focus:outline-none rounded-lg text-sm border-gray-200"
              />
            </div>
            <div className=" flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="password">
                New password
              </label>
              <input
                type={type2}
                id="password"
                required
                placeholder="8+ characters"
                {...register("newPassword")}
                className=" w-full border p-[10px] relative focus:outline-none rounded-lg text-sm border-gray-200"
              />
            </div>
            <span
              onClick={togglePasswordVisibility}
              className="absolute cursor-pointer mt-[44px] ml-[285px]"
            >
              {type === "password" ? (
                <EyeOff className="w-4 h-4 text-primary-greytext" />
              ) : (
                <Eye className="w-4 h-4 text-primary-greytext" />
              )}
            </span>
            <span
              onClick={togglePasswordVisibility2}
              className="absolute cursor-pointer mt-[137px] ml-[285px]"
            >
              {type2 === "password" ? (
                <EyeOff className="w-4 h-4 text-primary-greytext" />
              ) : (
                <Eye className="w-4 h-4 text-primary-greytext" />
              )}
            </span>
            <button
              type="submit"
              disabled={loading}
              className={`bg-primary-blue text-white rounded-[10px] py-[10px] mt-[15px] ${
                loading ? "opacity-50" : ""
              }`}
            >
              {loading ? "Saving.." : "Update password"}
            </button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SecuritySheet;
