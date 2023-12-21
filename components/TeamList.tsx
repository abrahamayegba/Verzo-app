"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import useModal from "@/app/hooks/useModal";
import TeamTabContentAll from "./TeamTabContent";

const TeamList = () => {
  const allMembers = "(1)";
  const [isChecked, setIsChecked] = useState(false);
  const {
    isOpen: isDeleteServiceOpen,
    openModal: openDeleteServiceModal,
    closeModal: closeDeleteServiceModal,
  } = useModal();

  const handleToggleSelectAll = (isChecked: boolean) => {
    setIsChecked(isChecked);
  };

  return (
    <div className=" w-full flex flex-col">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className=" mb-3 flex justify-between border-b border-b-gray-100">
          <div className=" gap-x-[30px] flex">
            <TabsTrigger
              className=" text-[17px]  data-[state=active]:text-primary-black data-[state=active]:border-b-2 data-[state=active]:border-b-gray-400  text-primary-greytext"
              value="all"
            >
              All <span className=" text-primary-mainGrey">{allMembers}</span>
            </TabsTrigger>
          </div>
          {isChecked ? (
            <button
              onClick={openDeleteServiceModal}
              className=" px-6 py-[10px] rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-red text-sm text-white"
            >
              Delete
            </button>
          ) : null}
        </TabsList>
        <TabsContent value="all">
          <TeamTabContentAll openDeleteModal={openDeleteServiceModal} />
        </TabsContent>
      </Tabs>
      {/* <DeleteService
        open={isDeleteServiceOpen}
        openModal={openDeleteServiceModal}
        onClose={closeDeleteServiceModal}
      /> */}
    </div>
  );
};

export default TeamList;
