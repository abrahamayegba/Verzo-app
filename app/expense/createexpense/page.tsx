"use client";
import ExpenseItem from "@/components/Expense/ExpenseItem";
import MerchantForm from "@/components/MerchantForm";
import CreateCategorySheet from "@/components/sheets/expense/CreateCategorySheet";
import CreateMerchantSheet from "@/components/sheets/expense/CreateMerchantSheet";
import ViewExpenseSheet from "@/components/sheets/expense/ViewExpenseSheet";
import { Calendar } from "@/components/ui/calendar";
import ActiveExpenseIcon from "@/components/ui/icons/ActiveExpenseIcon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import localStorage from "local-storage-fallback";
import { format } from "date-fns";
import { ChevronDown, Eye, MoveLeft, Plus } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useToast } from "@/app/hooks/use-toast";
import { useForm } from "react-hook-form";
import {
  GetExpenseByIdDocument,
  GetExpensesByBusinessDocument,
  useCreateExpenseMutation,
  useGetExpenseCategoryWithSetsQuery,
} from "@/src/generated/graphql";
import { useRouter } from "next/navigation";

interface ExpenseItemProp {
  description: string;
  quantity: number;
  unitPrice: number;
  index: number;
  creditAccountId: string;
}

type FormData = {
  description: string;
};

const CreateExpense = () => {
  const { toast } = useToast();
  const { register, reset, handleSubmit } = useForm<FormData>();
  const router = useRouter();
  const [expenseItems, setExpenseItems] = useState<ExpenseItemProp[]>([]);
  const [expenseCategoryId, setExpenseCategoryId] = useState("");
  const [merchantId, setMerchantId] = useState("");
  const [openMerchantSheet, setOpenMerchantSheet] = useState(false);
  const [openViewExpenseSheet, setOpenViewExpenseSheet] = useState(false);
  const [openCreateCategorySheet, setOpenCreateCategorySheet] = useState(false);
  const [date, setDate] = React.useState<Date | null>(null);
  const [expenseDate, setExpenseDate] = useState("");
  const [openIssueDate, setOpenIssueDate] = React.useState(false);
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";

  const [createExpenseMutation, { loading }] = useCreateExpenseMutation();
  const getExpenseCategories = useGetExpenseCategoryWithSetsQuery();
  const expenseCategories =
    getExpenseCategories?.data?.getExpenseCategoryWithSets?.expenseCategories ??
    [];

  const handleMerchantChange = (id: string) => {
    setMerchantId(id);
  };

  const handleCloseMerchantSheet = () => {
    setOpenMerchantSheet(false);
  };

  const handleCloseCreateCategorySheet = () => {
    setOpenCreateCategorySheet(false);
  };

  const handleCloseViewExpenseSheet = () => {
    setOpenViewExpenseSheet(false);
  };

  const handleOpenMerchantSheet = () => {
    setOpenMerchantSheet(true);
  };

  const deleteItem = (index: number) => {
    const updatedItems = [...expenseItems];
    updatedItems.splice(index, 1);
    setExpenseItems(updatedItems);
  };

  const handleAddExpense = () => {
    const lastExpenseItem = expenseItems[expenseItems.length - 1];
    const newExpenseItemIndex = lastExpenseItem ? lastExpenseItem.index + 1 : 1;
    setExpenseItems([
      ...expenseItems,
      {
        description: "",
        quantity: 0,
        unitPrice: 0,
        creditAccountId: "",
        index: newExpenseItemIndex,
      },
    ]);
  };

  React.useEffect(() => {
    if (date) {
      const formattedDueDate = format(date, "yyyy-MM-dd").toString();
      setExpenseDate(formattedDueDate);
    }
  }, [date]);

  const handleExpenseChange = (
    index: number,
    field: keyof ExpenseItemProp,
    value: string | number
  ) => {
    const updatedExpenses = [...expenseItems];
    const parsedValue = ["quantity", "unitPrice"].includes(field)
      ? !isNaN(Number(value))
        ? parseFloat(value as string)
        : 0
      : value;
    updatedExpenses[index] = {
      ...updatedExpenses[index],
      [field]: parsedValue,
    };
    setExpenseItems(updatedExpenses);
  };

  const showSuccessToast = () => {
    toast({
      title: "Successful!",
      description: "Your expense has been successfully created",
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

  const resetFormState = () => {
    reset();
    setDate(null);
    setMerchantId("");
    setExpenseCategoryId("");
    setExpenseDate("");
    setExpenseItems([]);
    expenseItems.length = 0;
  };

  const subtotal = expenseItems.reduce(
    (acc, items) => acc + items?.unitPrice * items?.quantity,
    0
  );

  const amountDue = subtotal;

  const onCreateExpenseHandler = async (data: FormData) => {
    try {
      await createExpenseMutation({
        variables: {
          businessId: businessId,
          expenseCategoryId: expenseCategoryId,
          expenseDate: expenseDate,
          merchantId: merchantId,
          expenseItem: expenseItems,
          ...data,
        },
        refetchQueries: [GetExpenseByIdDocument, GetExpensesByBusinessDocument],
      });
      showSuccessToast();
      router.push("/dashboard/expenses");
      resetFormState();
    } catch (error) {
      console.error(error);
      showFailureToast(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onCreateExpenseHandler)}
      className=" pt-[40px] flex flex-col max-w-[850px] gap-y-[36px]"
    >
      <div className=" flex justify-between w-full items-center relative">
        <Link
          className=" absolute top-0 text-primary-greytext "
          href="/dashboard/expenses"
        >
          <button type="button" className=" flex items-center gap-x-2">
            <MoveLeft className=" w-5 h-5 " />
            Back to Expenses
          </button>
        </Link>
        <div className=" flex flex-col gap-y-[4px] mt-12">
          <p className=" text-[30px] text-primary-black ">Record expense </p>
          <p className=" text-primary-greytext font-light text-lg">
            Fill out the information below to record an expense
          </p>
        </div>
        <button
          type="button"
          disabled
          onClick={() => setOpenViewExpenseSheet(true)}
          className=" px-6 py-3 cursor-not-allowed rounded-[10px] flex gap-x-2 items-center justify-center border border-primary-border"
        >
          Preview
          <Eye className=" w-5 h-5 text-gray-500" />
        </button>
      </div>
      <div className=" flex flex-col gap-y-5">
        <div className=" text-primary-black text-lg flex flex-row justify-between">
          <p>Expense details</p>
        </div>
        <div className=" flex flex-row gap-x-9 w-full">
          <div className=" flex flex-col gap-y-6 text-primary-greytext w-1/2">
            <div className=" flex flex-col gap-y-[6px]">
              <label className=" text-primary-black" htmlFor="customer">
                Category
              </label>
              <Select
                value={expenseCategoryId}
                onValueChange={setExpenseCategoryId}
              >
                <SelectTrigger className=" w-full rounded-lg border text-primary-black border-gray-200">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className=" bg-white w-full">
                  <SelectGroup>
                    {expenseCategories?.map((category) => (
                      <SelectItem
                        className="hover:bg-gray-100 cursor-pointer py-2 text-[15px]"
                        key={category?.id}
                        value={category?.id!}
                      >
                        {category?.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className=" flex flex-col gap-y-6 text-primary-greytext w-1/2">
            <div className=" flex flex-col gap-y-[6px] ">
              <label className=" text-primary-black" htmlFor="issuedate">
                Date
              </label>
              <Popover open={openIssueDate} onOpenChange={setOpenIssueDate}>
                <PopoverTrigger asChild>
                  <button className=" text-left text-sm font-normal text-primary-black flex items-center border border-gray-200 h-[40px] px-3 rounded-[8px]">
                    {date ? (
                      format(date, "PPP")
                    ) : (
                      <div className=" justify-between flex items-center w-full">
                        <span className=" text-sm">Pick a date</span>
                        <ChevronDown className=" w-4 h-4 text-primary-greytext" />
                      </div>
                    )}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 bg-white">
                  <Calendar
                    mode="single"
                    selected={date!}
                    onSelect={(date) => {
                      setDate(date!);
                      setOpenIssueDate(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
      <MerchantForm
        onMerchantChange={handleMerchantChange}
        openMerchantSheet={handleOpenMerchantSheet}
      />
      <div className=" w-full mt-5 flex flex-col gap-y-9">
        <div className=" flex justify-between items-center w-full">
          <div className=" flex flex-col">
            <p className=" text-lg text-primary-black">Items</p>
            <p className=" text-primary-greytext">List the items purchased</p>
          </div>
          <button
            type="button"
            onClick={handleAddExpense}
            className=" text-primary-blue flex items-center gap-x-2"
          >
            Add expense <Plus className=" w-[18px] h-[18px]" />
          </button>
        </div>
        <div className=" flex flex-col">
          <div className="grid grid-cols-10 gap-x-3 text-primary-greytext border-t border-t-[#f4f4f4] pt-[14px] pb-[8px]">
            <p className="col-span-4">Title</p>
            <p className="col-span-2 pl-2">Amount</p>
            <p className="col-span-1 ml-[-20px]">Qty</p>
            <p className="col-span-2 text-center ml-[-30px]">Account</p>
          </div>
          {expenseItems.length === 0 ? (
            <div className=" h-[150px] bg-white flex flex-col justify-center gap-y-4 items-center text-primary-greytext">
              <span className=" p-3 bg-[#F9FCFF] rounded-full">
                <ActiveExpenseIcon />
              </span>
              No expenses added
            </div>
          ) : (
            expenseItems.map((expense, index) => (
              <ExpenseItem
                key={index}
                expense={expense}
                index={index}
                onDeleteExpense={deleteItem}
                onExpenseChange={handleExpenseChange}
              />
            ))
          )}
          {expenseItems.length > 0 && (
            <div className=" w-full flex flex-col items-end text-primary-black text-lg mt-[30px]">
              <div className=" flex gap-x-[180px] p-4">
                <p className=" text-primary-greytext">Subtotal</p>
                <p>₦{subtotal.toLocaleString("en-NG")}</p>
              </div>
              <div className=" flex gap-x-[180px] p-4 border-t border-t-gray-100">
                <p className=" text-primary-greytext">Amount due</p>
                <p>₦{amountDue.toLocaleString("en-NG")}</p>
              </div>
            </div>
          )}
        </div>
        <div className=" flex flex-col mt-2">
          <p className=" text-lg text-primary-black">Description</p>
          <p className=" text-primary-greytext mt-[2px]">
            Say more to your customer
          </p>
          <Textarea
            {...register("description")}
            required
            id="description"
            className=" mt-5"
          />
        </div>
        <div className=" flex flex-row items-center gap-x-5 mt-2">
          <button
            type="button"
            className=" px-9 py-3 rounded-[10px] flex gap-x-2 items-center justify-center border border-primary-border"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`bg-primary-blue text-white rounded-[10px] px-10 py-3 ${
              loading ? "opacity-50" : ""
            }`}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
      <CreateCategorySheet
        open={openCreateCategorySheet}
        onClose={handleCloseCreateCategorySheet}
      />
      {/* <ViewExpenseSheet
        open={openViewExpenseSheet}
        onClose={handleCloseViewExpenseSheet}
      /> */}
      <CreateMerchantSheet
        open={openMerchantSheet}
        onClose={handleCloseMerchantSheet}
      />
    </form>
  );
};

export default CreateExpense;
