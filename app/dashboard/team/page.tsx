"use client";
import React, { useEffect, useState } from "react";
import { PlusCircle, X } from "lucide-react";
import TeamList from "@/components/TeamList";
import {
  useCreateUserInviteMutation,
  useGetBusinessesByUserIdQuery,
  useGetRolesQuery,
} from "@/src/generated/graphql";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import MainLoader from "@/components/loading/MainLoader";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { useToast } from "@/app/hooks/use-toast";
import { useForm } from "react-hook-form";
import localStorage from "local-storage-fallback";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormData = {
  email: string;
  fullname: string;
};

const Team = () => {
  const { toast } = useToast();
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const [roleId, setRoleId] = useState("");
  const { register, handleSubmit, reset, getValues } = useForm<FormData>();
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const [openRolesModal, setOpenRolesModal] = useState(false);
  const getBusinessesByUserId = useGetBusinessesByUserIdQuery();
  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      if (!authenticated) {
        router.push("/auth/signin");
      }
    };
    checkAuth();
  }, [router]);

  const [createUserInviteMutation, { loading }] = useCreateUserInviteMutation();

  const { data } = useGetRolesQuery();

  const roles = data?.roles?.filter(
    (role) =>
      role?.roleName !== "Super Admin" &&
      role?.roleName !== "Verzo Admin" &&
      role?.roleName !== "Owner"
  );

  const showFailureToast = (error: any) => {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: error?.message,
      duration: 3000,
    });
  };

  const showSuccessToast = () => {
    toast({
      title: "Successful!",
      description: "Your invite has been successfully sent",
      duration: 3500,
    });
  };

  const createUserInviteHandler = async (data: FormData) => {
    try {
      await createUserInviteMutation({
        variables: {
          businessId: businessId,
          roleId: roleId,
          ...data,
        },
      });
      setOpenInviteModal(false);
      reset();
      showSuccessToast();
    } catch (error) {
      console.error(error);
      setOpenInviteModal(false);
      showFailureToast(error);
    }
  };

  if (getBusinessesByUserId.loading) {
    return <MainLoader />;
  }

  return (
    <div className=" px-[52px] bg-primary-whiteTint pt-[47px] pb-[20px] gap-y-[36px] flex flex-col">
      <div className=" flex flex-row justify-between items-center">
        <div className=" flex flex-col  gap-y-2">
          <p className=" text-primary-black font-medium text-3xl">Teams</p>
          <p className=" text-primary-greytext">
            Invite members of your team to Verzo
          </p>
        </div>
        <div className=" flex gap-x-[14px] max-h-[48px]">
          <AlertDialog open={openRolesModal} onOpenChange={setOpenRolesModal}>
            <button
              onClick={() => setOpenRolesModal(true)}
              className=" px-6 py-3 rounded-[10px] flex gap-x-2 items-center justify-center border border-primary-border"
            >
              Roles
            </button>
            <AlertDialogContent className="w-[482px] gap-y-0 shadow transition-all pt-6 pb-8 px-0">
              <>
                <div className="border-b border-b-gray-200 w-full pb-3">
                  <div className="flex flex-col gap-y-5 w-full px-6">
                    <div className="flex w-full justify-between">
                      <p className="font-medium text-xl text-gray-700">Roles</p>
                      <button
                        type="button"
                        onClick={() => setOpenRolesModal(false)}
                        className="p-1.5 bg-blue-100 rounded-full"
                      >
                        <X className="w-[17px] h-[17px] text-gray-700 stroke-[2.5px]" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-y-3 px-6 mt-4">
                  <div className=" flex flex-col gap-1 ">
                    <p className="text-gray-600 font-medium">
                      1.{" "}
                      <span className=" underline underline-offset-2 ">
                        Owner
                      </span>
                    </p>
                    <p className="text-[15px] text-gray-600">
                      The owner has full control over the organization’s
                      account, including managing billing, settings, and user
                      roles.
                    </p>
                  </div>
                  <div className=" flex flex-col  gap-1 ">
                    <p className="text-gray-600 font-medium">
                      2.{" "}
                      <span className=" underline underline-offset-2 ">
                        Admin
                      </span>
                    </p>
                    <p className="text-[15px] text-gray-600">
                      The admin has similar access to the owner but cannot
                      modify the organization’s billing information.
                    </p>
                  </div>
                  <div className=" flex flex-col gap-1">
                    <p className="text-gray-600 font-medium">
                      3.{" "}
                      <span className=" underline underline-offset-2 ">
                        Manager
                      </span>
                    </p>
                    <p className="text-[15px] text-gray-600">
                      Managers can create and manage invoices, projects, and
                      clients.
                    </p>
                  </div>
                  <div className=" flex flex-col gap-1">
                    <p className="text-gray-600 font-medium">
                      4.{" "}
                      <span className=" underline underline-offset-2 ">
                        Staff
                      </span>
                    </p>
                    <p className="text-[15px] text-gray-600">
                      Staff members have restricted access and can only view
                      projects and tasks assigned to them.
                    </p>
                  </div>
                </div>
              </>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog
            open={openInviteModal}
            onOpenChange={() => setOpenInviteModal(true)}
          >
            <button
              onClick={() => setOpenInviteModal(true)}
              className=" px-6 py-3 rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white"
            >
              Invite member
              <PlusCircle className=" w-5 h-5" />
            </button>
            <AlertDialogContent className="w-[482px] shadow transition-all pt-6 pb-7 px-0">
              <form
                onSubmit={handleSubmit(createUserInviteHandler)}
                className="flex w-[480px] flex-col items-center justify-center"
              >
                <div className="border-b border-b-gray-200 w-full pb-3">
                  <div className="flex flex-col gap-y-5 w-full px-6">
                    <div className="flex w-full justify-between">
                      <p className="font-medium text-xl text-gray-700">
                        Invite a team member
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setOpenInviteModal(false);
                          reset();
                        }}
                        className="p-1.5 bg-blue-100 rounded-full"
                      >
                        <X className="w-[17px] h-[17px] text-gray-700 stroke-[2.5px]" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-y-3 px-6 mt-4">
                  <div className=" flex flex-col gap-1 ">
                    <label htmlFor="name" className="text-gray-600">
                      Name
                    </label>
                    <div className="relative">
                      <input
                        id="name"
                        type="text"
                        required
                        className="w-full px-3 h-[42px] py-[10px] relative border rounded-md"
                        {...register("fullname")}
                      />
                    </div>
                  </div>
                  <div className=" flex flex-col  gap-1 ">
                    <label htmlFor="email" className="text-left text-gray-600">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      className=" w-full px-3 py-[10px] h-[42px] relative border rounded-md "
                      {...register("email")}
                    />
                  </div>
                  <div className=" flex flex-col gap-1">
                    <label
                      htmlFor="name"
                      className={` text-gray-600
                            }`}
                    >
                      Role
                    </label>
                    <Select value={roleId} onValueChange={setRoleId}>
                      <SelectTrigger className="border border-gray-200 bg-transparent rounded-md h-[42px] text-[15px] focus:outline-none px-3 py-[10px]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-white w-full z-[200] shadow-sm text-gray-800">
                        <SelectGroup>
                          {roles?.map((role) => (
                            <SelectItem
                              className="hover:bg-gray-100 cursor-pointer py-2 text-[15px]"
                              key={role?.id}
                              value={role?.id!}
                            >
                              {role?.roleName}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex mt-4">
                    <button
                      type="submit"
                      disabled={loading || !roleId}
                      className={`px-7 py-[10px] w-full disabled:cursor-not-allowed disabled:opacity-50 rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-blue text-white ${
                        loading ? "opacity-50" : ""
                      }`}
                    >
                      {loading ? "Loading" : "Invite"}
                    </button>
                  </div>
                </div>
              </form>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <TeamList />
    </div>
  );
};

export default Team;
