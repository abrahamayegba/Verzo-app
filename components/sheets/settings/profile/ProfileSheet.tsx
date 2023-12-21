import React, { useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import PersonalInformationIcon from "@/components/ui/icons/PersonalInformationIcon";
import {
  GetUserByIdDocument,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "@/src/generated/graphql";
import { client } from "@/src/apollo/ApolloClient";
import { useForm } from "react-hook-form";
import { useToast } from "@/app/hooks/use-toast";

interface ProfileProps {
  open: boolean;
  onClose: () => void;
}

type FormData = {
  fullname: string;
  email: string;
};

const ProfileSheet: React.FC<ProfileProps> = ({ open, onClose }) => {
  const { toast } = useToast();
  const getUserById = useGetUserByIdQuery();
  const [updateUserMutation, { loading }] = useUpdateUserMutation();
  const user = getUserById?.data?.getUserById;
  const userName = user?.fullname!;
  const userEmail = user?.email!;
  const { handleSubmit, register, setValue } = useForm<FormData>();
  useEffect(() => {
    setValue("fullname", userName);
    setValue("email", userEmail);
  }, [setValue, userName, userEmail]);

  const showSuccessToast = () => {
    toast({
      title: "Successful!",
      description: "User information successfully updated.",
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

  const onUpdateUserHandler = async (data: FormData) => {
    try {
      await updateUserMutation({
        variables: {
          ...data,
        },
        refetchQueries: [GetUserByIdDocument],
      });
      client.refetchQueries({
        include: "active",
      });
      onClose();
      showSuccessToast();
    } catch (error) {
      console.error(error);
      showFailureToast(error);
    }
  };
  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className=" pt-[112px]">
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
              <PersonalInformationIcon />
            </span>
          </div>
          <p className=" mt-[14px] text-lg text-primary-black">
            Personal information
          </p>
          <p className=" font-light text-primary-greytext mt-2">
            Provide accurate info
          </p>
          <form
            onSubmit={handleSubmit(onUpdateUserHandler)}
            className=" w-full mt-[30px] flex flex-col gap-y-5 "
          >
            <div className=" flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="firstname">
                Full name
              </label>
              <input
                type="text"
                id="fullname"
                placeholder="Full name"
                {...register("fullname")}
                onChange={(e) => setValue("fullname", e.target.value)}
                className="w-full border p-[10px] focus:outline-none rounded-lg text-sm border-gray-200"
              />
            </div>
            <div className=" flex flex-col gap-y-2">
              <label className=" text-[15px]" htmlFor="email">
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email address"
                {...register("email")}
                onChange={(e) => setValue("email", e.target.value)}
                className=" w-full border p-[10px] focus:outline-none rounded-lg text-sm border-gray-200"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`bg-primary-blue text-white rounded-[10px] py-[10px] mt-[15px] ${
                loading ? "opacity-50" : ""
              }`}
            >
              {loading ? "Saving.." : "Update profile"}
            </button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProfileSheet;
