"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import ArchiveInvoice from "./modals/invoice/ArchiveInvoice";
import useModal from "@/app/hooks/useModal";
import ExpenseTabContentAll from "./ExpenseTabContentAll";
import ExpenseTabContentArchived from "./ExpenseTabContentArchived";
import UnarchiveExpense from "./modals/expense/UnarchiveExpenseModal";
import CustomPagination from "./InvoiceListPagination";
import DeleteExpense from "./modals/expense/DeleteExpenseModal";

const AllExpenseList = () => {
  const allExpenses = "(12)";
  const archivedExpenses = "(3)";
  const [isChecked, setIsChecked] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isDeleteExpenseOpen,
    openModal: openDeleteExpenseModal,
    closeModal: closeDeleteExpenseModal,
  } = useModal();

  const {
    isOpen: isUnarchiveExpenseOpen,
    openModal: openUnarchiveExpenseModal,
    closeModal: closeUnarchiveExpenseModal,
  } = useModal();

  const handleToggleSelectAll = (isChecked: boolean) => {
    setIsChecked(isChecked);
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages: number = 5;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
              All <span className=" text-primary-mainGrey">{allExpenses}</span>
            </TabsTrigger>
            <TabsTrigger
              className=" text-[17px]  data-[state=active]:text-primary-black text-primary-greytext data-[state=active]:border-b-2 data-[state=active]:border-b-gray-400"
              value="archived"
            >
              Archived{" "}
              <span className=" text-primary-mainGrey">
                {" "}
                {archivedExpenses}
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
          ) : null}
        </TabsList>
        <TabsContent value="all">
          <ExpenseTabContentAll
            openDeleteModal={openDeleteExpenseModal}
            openArchiveModal={openModal}
            onToggleSelectAll={handleToggleSelectAll}
          />
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </TabsContent>
        <TabsContent value="archived">
          <ExpenseTabContentArchived
            openDeleteModal={openDeleteExpenseModal}
            openUnarchiveModal={openUnarchiveExpenseModal}
            onToggleSelectAll={handleToggleSelectAll}
          />
        </TabsContent>
      </Tabs>
      <ArchiveInvoice
        open={isOpen}
        openModal={openModal}
        onClose={closeModal}
      />
      <UnarchiveExpense
        open={isUnarchiveExpenseOpen}
        openModal={openUnarchiveExpenseModal}
        onClose={closeUnarchiveExpenseModal}
      />
      <DeleteExpense
        open={isDeleteExpenseOpen}
        openModal={openDeleteExpenseModal}
        onClose={closeDeleteExpenseModal}
      />
    </div>
  );
};

export default AllExpenseList;