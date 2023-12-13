"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import useModal from "@/app/hooks/useModal";
import Link from "next/link";
import ExpenseTabContentAll from "./ExpenseTabContentAll";
import ExpenseTabContentArchived from "./ExpenseTabContentArchived";
import ArchiveExpense from "../modals/expense/ArchiveExpenseModal";
import UnarchiveExpense from "../modals/expense/UnarchiveExpenseModal";
import DeleteExpense from "../modals/expense/DeleteExpenseModal";
import localStorage from "local-storage-fallback";
import { useGetExpensesByBusinessQuery } from "@/src/generated/graphql";

const ExpenseList = () => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const [isChecked, setIsChecked] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isDeleteExpenseOpen,
    openModal: openDeleteExpenseModal,
    closeModal: closeDeleteExpenseModal,
  } = useModal();

  const {
    isOpen: isUnarchiveOpen,
    openModal: openUnarchiveModal,
    closeModal: closeUnarchiveModal,
  } = useModal();

  const {
    isOpen: isEditModalOpen,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();

  const handleToggleSelectAll = (isChecked: boolean) => {
    setIsChecked(isChecked);
  };

  const handleOpenArchiveModal = (customerId: string) => {
    setSelectedId(customerId);
    openModal();
  };

  const handleOpenDeleteModal = (customerId: string) => {
    setSelectedId(customerId);
    openDeleteExpenseModal();
  };

  const handleOpenEditModal = (customerId: string) => {
    setSelectedId(customerId);
    openEditModal();
  };

  const getExpensesByBusiness = useGetExpensesByBusinessQuery({
    variables: {
      businessId: businessId,
      sets: 1,
      cursor: null,
    },
  });
  const expenses =
    getExpensesByBusiness.data?.getExpenseByBusiness?.expenseByBusiness ?? [];
  const allExpenses = expenses.length;
  const archivedExpenses = expenses.filter(
    (customer) => customer?.archived
  ).length;

  return (
    <div className=" w-full flex flex-col">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className=" mb-3 flex justify-between border-b border-b-gray-100">
          <div className=" gap-x-[30px] flex">
            <TabsTrigger
              className=" text-[17px]  data-[state=active]:text-primary-black data-[state=active]:border-b-2 data-[state=active]:border-b-gray-400  text-primary-greytext"
              value="all"
            >
              All{" "}
              <span className=" text-primary-mainGrey">({allExpenses})</span>
            </TabsTrigger>
            <TabsTrigger
              className=" text-[17px]  data-[state=active]:text-primary-black text-primary-greytext data-[state=active]:border-b-2 data-[state=active]:border-b-gray-400"
              value="archived"
            >
              Archived{" "}
              <span className=" text-primary-mainGrey">
                {" "}
                ({archivedExpenses})
              </span>
            </TabsTrigger>
          </div>
          {isChecked ? (
            <div className=" flex gap-x-4">
              <button
                onClick={openModal}
                className=" px-6 py-[10px] rounded-[10px] flex gap-x-2 items-center text-sm justify-center border border-primary-border"
              >
                Archive
              </button>
              <button
                onClick={openDeleteExpenseModal}
                className=" px-6 py-[10px] rounded-[10px] flex gap-x-2 items-center justify-center bg-primary-red text-sm text-white"
              >
                Delete
              </button>
            </div>
          ) : (
            <Link href="/dashboard/expenses/allexpenses">
              <button className=" text-primary-blue ">See all expenses</button>
            </Link>
          )}
        </TabsList>
        <TabsContent value="all">
          <ExpenseTabContentAll
            openDeleteModal={handleOpenDeleteModal}
            openArchiveModal={handleOpenArchiveModal}
            openEditModal={handleOpenEditModal}
            onToggleSelectAll={handleToggleSelectAll}
            numberOfExpensesToShow={10}
          />
        </TabsContent>
        <TabsContent value="archived">
          <ExpenseTabContentArchived
            openDeleteModal={handleOpenDeleteModal}
            openUnarchiveModal={handleOpenArchiveModal}
            openEditModal={handleOpenEditModal}
            onToggleSelectAll={handleToggleSelectAll}
          />
        </TabsContent>
      </Tabs>
      <ArchiveExpense
        open={isOpen}
        openModal={openModal}
        onClose={closeModal}
        expenseId={selectedId}
      />
      <UnarchiveExpense
        open={isUnarchiveOpen}
        openModal={openUnarchiveModal}
        onClose={closeUnarchiveModal}
      />
      <DeleteExpense
        open={isDeleteExpenseOpen}
        openModal={openDeleteExpenseModal}
        onClose={closeDeleteExpenseModal}
        expenseId={selectedId}
      />
    </div>
  );
};

export default ExpenseList;
