"use client";
import React, { useState } from "react";
import UpdateBusinessSheet from "../sheets/settings/businessprofile/UpdateBusinessSheet";
import UpdateBusinessSheet2 from "../sheets/settings/businessprofile/UpdateBusinessSheet2";
import UpdateExpenseCategorySheet from "../sheets/settings/businessprofile/UpdateExpenseCategorySheet";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  useCreateUserInviteMutation,
  useGetRolesQuery,
} from "@/src/generated/graphql";
import localStorage from "local-storage-fallback";
import { useForm } from "react-hook-form";
import { useToast } from "@/app/hooks/use-toast";
import ViewVerzoAccount from "../sheets/settings/businessprofile/ViewVerzoAccountSheet";

type FormData = {
  email: string;
  fullname: string;
};

const BusinessProfileContent = () => {
  const { register, handleSubmit, reset, getValues } = useForm<FormData>();
  const { toast } = useToast();
  const [openUpdateBusinessSheet, setOpenUpdateBusinessSheet] = useState(false);
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const [roleId, setRoleId] = useState("");
  const [openUpdateBusinessSheet2, setOpenUpdateBusinessSheet2] =
    useState(false);
  const [openUpdateExpenseCategorySheet, setOpenUpdateExpenseCategorySheet] =
    useState(false);
  const [openViewBusinessAccountSheet, setOpenViewBusinessAccountSheet] =
    useState(false);
  const handleCloseViewBusinessSheet = () => {
    setOpenViewBusinessAccountSheet(false);
  };
  const handleOpenViewBusinessSheet = () => {
    setOpenViewBusinessAccountSheet(true);
  };
  const handleCloseUpdateBusinessSheet = () => {
    setOpenUpdateBusinessSheet(false);
  };
  const handleOpenUpdateBusinessSheet = () => {
    setOpenUpdateBusinessSheet(true);
  };
  const handleCloseUpdateBusinessSheet2 = () => {
    setOpenUpdateBusinessSheet2(false);
  };
  const handleOpenUpdateBusinessSheet2 = () => {
    setOpenUpdateBusinessSheet2(true);
  };
  const handleCloseUpdateExpenseCategorySheet = () => {
    setOpenUpdateExpenseCategorySheet(false);
  };
  const handleOpenUpdateExpenseCategorySheet = () => {
    setOpenUpdateExpenseCategorySheet(true);
  };

  const { data } = useGetRolesQuery();

  const roles = data?.roles?.filter(
    (role) =>
      role?.roleName !== "Super Admin" && role?.roleName !== "Verzo Admin"
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

  const [createUserInviteMutation, { loading }] = useCreateUserInviteMutation();

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
  return (
    <>
      <div className=" flex flex-col w-full pt-[20px] gap-y-3">
        <p className=" text-sm text-primary-greytext px-6">Manage business</p>
        <div className=" bg-white min-h-[276px] flex flex-col rounded-b-[16px] w-full">
          <div className=" flex flex-row justify-between p-6 items-center border-b border-b-gray-100">
            <div className=" flex flex-col gap-y-[6px]">
              <p className=" text-primary-black">Business information</p>
              <p className=" text-sm text-primary-greytext">
                Logo, Business name, Business email
              </p>
            </div>
            <button
              onClick={() => setOpenUpdateBusinessSheet(true)}
              className=" px-6 py-3 rounded-[10px] flex text-sm text-primary-black gap-x-2 items-center justify-center border border-primary-border"
            >
              Update
            </button>
          </div>
          <div className=" flex flex-row justify-between p-6 items-center border-b border-b-gray-100">
            <div className=" flex flex-col gap-y-[6px]">
              <p className=" text-primary-black">More Business information</p>
              <p className=" text-sm text-primary-greytext">
                Business category
              </p>
            </div>
            <button
              onClick={handleOpenUpdateBusinessSheet2}
              className=" px-6 py-3 rounded-[10px] flex text-sm text-primary-black gap-x-2 items-center justify-center border border-primary-border"
            >
              Update
            </button>
          </div>
          <div className=" flex flex-row justify-between p-6 items-center border-b border-b-gray-100">
            <div className=" flex flex-col gap-y-[6px]">
              <p className=" text-primary-black">Verzo account</p>
              <p className=" text-sm text-primary-greytext">
                BVN, Account name, Account number, etc
              </p>
            </div>
            <button
              onClick={handleOpenViewBusinessSheet}
              className=" px-6 py-3 rounded-[10px] flex text-sm text-primary-black gap-x-2 items-center justify-center border border-primary-border"
            >
              View
            </button>
          </div>
          <div className=" flex flex-row justify-between p-6 items-center border-b border-b-gray-100">
            <div className=" flex flex-col gap-y-[6px]">
              <p className=" text-primary-black">Team members</p>
              <p className=" text-sm text-primary-greytext">
                Invite a team member to your business
              </p>
            </div>
            <AlertDialog
              open={openInviteModal}
              onOpenChange={() => setOpenInviteModal(true)}
            >
              <button
                type="button"
                onClick={() => setOpenInviteModal(true)}
                className=" px-6 py-3 rounded-[10px] text-sm text-primary-black flex gap-x-2 items-center justify-center border border-primary-border"
              >
                Invite
              </button>
              <AlertDialogContent className="sm:max-w-[470px] shadow-md">
                <form onSubmit={handleSubmit(createUserInviteHandler)}>
                  <AlertDialogHeader>
                    <AlertDialogTitle className=" font-medium">
                      Invite a team member
                    </AlertDialogTitle>
                    <p className=" text-[15px]">
                      Invite a team member to collaborate on your business
                    </p>
                  </AlertDialogHeader>
                  <div className=" flex flex-col gap-5 pb-4 pt-2 mt-3 max-w-[400px]">
                    <div className=" flex items-center gap-1">
                      <label htmlFor="name" className="text-left w-[50px]">
                        Name:
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        className="w-full px-3 h-[42px] py-[10px] relative border rounded-md ml-2"
                        {...register("fullname")}
                      />
                    </div>
                    <div className=" flex items-center gap-1 ">
                      <label htmlFor="email" className="text-left w-[50px]">
                        Email:
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        className=" w-full px-3 py-[10px] h-[42px] relative border rounded-md ml-2"
                        {...register("email")}
                      />
                    </div>
                    <div className=" flex items-center gap-1 ">
                      <label htmlFor="username" className="text-right w-[50px]">
                        Role:
                      </label>
                      <Select value={roleId} onValueChange={setRoleId}>
                        <SelectTrigger className="border border-gray-200 ml-2 bg-transparent rounded-md h-[42px] text-[15px] focus:outline-none px-3 py-[10px]">
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
                  </div>
                  <AlertDialogFooter className=" gap-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setOpenInviteModal(false);
                        reset();
                      }}
                      className=" border border-gray-200 px-5 hover:bg-gray-50 cursor-pointer py-2 text-[15px] rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      className={` px-6 bg-primary-blue hover:bg-primary-verzobluehover text-white py-2 cursor-pointer text-[15px] rounded-md ${
                        loading ? " opacity-50" : ""
                      }`}
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Loading" : "Invite"}
                    </button>
                  </AlertDialogFooter>
                </form>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className=" flex flex-row justify-between p-6 items-center border-b border-b-gray-100">
            <div className=" flex flex-col gap-y-[6px]">
              <p className=" text-primary-black">Expense categories</p>
              <p className=" text-sm text-primary-greytext">View categories</p>
            </div>
            <button
              onClick={handleOpenUpdateExpenseCategorySheet}
              className=" px-6 py-3 rounded-[10px] text-sm text-primary-black flex gap-x-2 items-center justify-center border border-primary-border"
            >
              View
            </button>
          </div>
          <div className=" flex flex-row justify-between p-6 items-center border-b border-b-gray-100">
            <div className=" flex flex-col gap-y-[6px]">
              <p className=" text-primary-black">Report</p>
              <p className=" text-sm text-primary-greytext">
                Download your business activity
              </p>
            </div>
            <button
              disabled
              className=" px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed text-sm text-primary-black rounded-[10px] flex gap-x-2 items-center justify-center border border-primary-border"
            >
              Download
            </button>
          </div>
        </div>
      </div>
      <UpdateBusinessSheet
        open={openUpdateBusinessSheet}
        onClose={handleCloseUpdateBusinessSheet}
        openSheet={handleOpenUpdateBusinessSheet}
      />
      <UpdateBusinessSheet2
        open={openUpdateBusinessSheet2}
        onClose={handleCloseUpdateBusinessSheet2}
        openSheet={handleOpenUpdateBusinessSheet2}
      />
      <ViewVerzoAccount
        open={openViewBusinessAccountSheet}
        onClose={handleCloseViewBusinessSheet}
        openSheet={handleOpenViewBusinessSheet}
      />
      <UpdateExpenseCategorySheet
        open={openUpdateExpenseCategorySheet}
        onClose={handleCloseUpdateExpenseCategorySheet}
        openSheet={handleOpenUpdateExpenseCategorySheet}
      />
    </>
  );
};

export default BusinessProfileContent;
