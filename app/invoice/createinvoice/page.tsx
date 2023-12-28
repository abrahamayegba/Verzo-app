"use client";
import CustomerForm from "@/components/CustomerForm";
import InvoiceItem from "@/components/Invoice/InvoiceItem";
import SaleExpenseItem from "@/components/SaleExpenseItem";
import ServiceExpenseItem from "@/components/ServiceExpenseItem";
import CreateCustomerSheet from "@/components/sheets/customer/CreateCustomerSheet";
import CreateItemSheet from "@/components/sheets/invoice/CreateItemSheet";
import ViewInvoiceSheet from "@/components/sheets/invoice/ViewInvoiceSheet";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import ActiveProductIcon from "@/components/ui/icons/ActiveProductIcon";
import BankIcon from "@/components/ui/icons/BankIcon";
import InfoIcon from "@/components/ui/icons/InfoIcon";
import LocationIcon from "@/components/ui/icons/LocationIcon";
import ProfileIcon from "@/components/ui/icons/ProfileIcon";
import { Textarea } from "@/components/ui/textarea";
import localStorage from "local-storage-fallback";
import {
  GetInvoicesByBusinessDocument,
  GetSaleByBusinessDocument,
  GetSaleByIdDocument,
  useCreateSaleEntryMutation,
  useGetBusinessByIdQuery,
  useGetBusinessesByUserIdQuery,
} from "@/src/generated/graphql";
import { ChevronDown, Eye, Info, MoveLeft, Phone, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/app/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import UpdateBusinessSheet from "@/components/sheets/settings/businessprofile/UpdateBusinessSheet";

interface InvoiceItem {
  id: string;
  name: string;
  price: number;
  type: string;
  quantity: number;
  index: number;
}
type FormData = {
  description: string;
};

interface Expense {
  description: string;
  amount: number;
  index: number;
}

interface ServiceExpense {
  description: string;
  serviceId: string;
  index: number;
  amount: number;
}

const CreateInvoice = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormData>();
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [serviceExpenses, setServiceExpenses] = useState<ServiceExpense[]>([]);
  const [openCustomerSheet, setOpenCustomerSheet] = useState(false);
  const [openViewInvoiceSheet, setOpenViewInvoiceSheet] = useState(false);
  const [date, setDate] = React.useState<Date | null>(null);
  const [dueDate, setDueDate] = React.useState<Date | null>(null);
  const [openDueDate, setOpenDueDate] = React.useState(false);
  const [invoiceDate, setInvoiceDate] = useState("");
  const [openUpdateBusinessSheet, setOpenUpdateBusinessSheet] = useState(false);
  const [invoiceDueDate, setInvoiceDueDate] = useState("");
  const [openIssueDate, setOpenIssueDate] = React.useState(false);
  const [customerId, setCustomerId] = useState("");
  const [openCreateItemSheet, setOpenCreateItemSheet] = useState(false);
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const getBusinessesByUserId = useGetBusinessesByUserIdQuery();
  const getBusinessById = useGetBusinessByIdQuery({
    variables: {
      businessId: businessId,
    },
  });
  const businessName =
    getBusinessesByUserId.data?.getBusinessesByUserId?.businesses?.map(
      (business) => business?.businessName
    ) || [];
  const businessLogo = getBusinessById.data?.getBusinessById?.logo;
  const businessEmail =
    getBusinessesByUserId.data?.getBusinessesByUserId?.businesses?.map(
      (business) => business?.businessEmail
    ) || [];
  const businessMobile =
    getBusinessesByUserId.data?.getBusinessesByUserId?.businesses?.map(
      (business) => business?.businessMobile
    ) || [];

  const [createSaleEntryMutation, { loading }] = useCreateSaleEntryMutation();

  const handleOpenCustomerSheet = () => {
    setOpenCustomerSheet(true);
  };
  const handleCloseCustomerSheet = () => {
    setOpenCustomerSheet(false);
  };

  const handleCloseCreateItemSheet = () => {
    setOpenCreateItemSheet(false);
  };

  const handleCloseViewInvoiceSheet = () => {
    setOpenViewInvoiceSheet(false);
  };

  const deleteItem = (index: number) => {
    const updatedItems = [...invoiceItems];
    updatedItems.splice(index, 1);
    setInvoiceItems(updatedItems);
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    const updatedItems = [...invoiceItems];
    updatedItems[index].quantity = quantity;
    setInvoiceItems(updatedItems);
  };

  const handlePriceChange = (index: number, price: number) => {
    const updatedItems = [...invoiceItems];
    updatedItems[index].price = price;
    setInvoiceItems(updatedItems);
  };

  const handleCloseUpdateBusinessSheet = () => {
    setOpenUpdateBusinessSheet(false);
  };
  const handleOpenUpdateBusinessSheet = () => {
    setOpenUpdateBusinessSheet(true);
  };

  const setSideSheetCallback = (selectedItem: InvoiceItem) => {
    setInvoiceItems((prevItems) => [...prevItems, selectedItem]);
  };

  const handleAddExpense = () => {
    const lastExpenseItem = expenses[expenses.length - 1];
    const newExpenseItemIndex = lastExpenseItem ? lastExpenseItem.index + 1 : 1;
    setExpenses([
      ...expenses,
      { description: "", amount: 0, index: newExpenseItemIndex },
    ]);
  };

  const handleAddServiceExpense = () => {
    const lastExpenseItem = serviceExpenses[serviceExpenses.length - 1];
    const newExpenseItemIndex = lastExpenseItem ? lastExpenseItem.index + 1 : 1;
    setServiceExpenses([
      ...serviceExpenses,
      { description: "", amount: 0, serviceId: "", index: newExpenseItemIndex },
    ]);
  };

  const handleExpenseChange = (
    index: number,
    field: keyof Expense,
    value: string | number
  ) => {
    const updatedExpenses = [...expenses];

    // Ensure that the "amount" field is treated as a number
    const parsedValue =
      field === "amount"
        ? typeof value === "string" && !isNaN(Number(value))
          ? parseFloat(value)
          : 0
        : value;

    updatedExpenses[index] = {
      ...updatedExpenses[index],
      [field]: parsedValue,
    };

    setExpenses(updatedExpenses);
  };

  const handleServiceExpenseChange = (
    index: number,
    field: keyof ServiceExpense,
    value: string
  ) => {
    const updatedServiceExpenses = [...serviceExpenses];
    const parsedValue = field === "amount" ? parseFloat(value) || 0 : value;
    updatedServiceExpenses[index] = {
      ...updatedServiceExpenses[index],
      [field]: parsedValue,
    };
    setServiceExpenses(updatedServiceExpenses);
  };

  const handleDeleteExpense = (index: number) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };

  const handleDeleteServiceExpense = (index: number) => {
    const updatedServiceExpenses = [...serviceExpenses];
    updatedServiceExpenses.splice(index, 1);
    setServiceExpenses(updatedServiceExpenses);
  };

  const handleCustomerChange = (id: string) => {
    setCustomerId(id);
  };

  const subtotalFromItems = invoiceItems.reduce(
    (acc, item) => acc + (item?.price || 0) * (item?.quantity || 0),
    0
  );

  const saleExpenses = expenses.reduce(
    (acc, expense) => acc + Number(expense.amount || 0),
    0
  );

  const vatAmount = 0.075 * subtotalFromItems;
  const amountDue = subtotalFromItems + saleExpenses;
  const totalAmountDue = amountDue + vatAmount;

  React.useEffect(() => {
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd").toString();
      setInvoiceDate(formattedDate);
    }
  }, [date]);

  React.useEffect(() => {
    if (dueDate) {
      const formattedDueDate = format(dueDate, "yyyy-MM-dd").toString();
      setInvoiceDueDate(formattedDueDate);
    }
  }, [dueDate]);

  const showSuccessToast = () => {
    toast({
      title: "Successful!",
      description: "Your invoice has been successfully created",
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

  const showOtherFailureToast = (error: any) => {
    toast({
      variant: "destructive",
      description: error,
      duration: 3000,
    });
  };

  const saleItemDetails = invoiceItems.map((item) => {
    return {
      id: item.id,
      type: item.type,
      index: item.index,
      price: item.price,
      quantity: item.quantity,
    };
  });

  const invoiceInput = {
    businessId: businessId,
    customerId: customerId,
    dateOfIssue: invoiceDate,
    dueDate: invoiceDueDate,
    VAT: 7.5,
    item: saleItemDetails,
  };

  const onSubmitCreateSaleHandler = async (data: FormData) => {
    if (!customerId) {
      showOtherFailureToast(
        "Please select a customer before saving the invoice."
      );
      return;
    }
    if (!invoiceDate || !invoiceDueDate) {
      showOtherFailureToast("Please pick a date before saving the invoice.");
      return;
    }
    try {
      await createSaleEntryMutation({
        variables: {
          saleExpense: expenses.length > 0 ? expenses : null,
          saleServiceExpense:
            serviceExpenses.length > 0 ? serviceExpenses : null,
          invoiceInput: invoiceInput,
          ...data,
        },
        refetchQueries: [
          GetSaleByBusinessDocument,
          GetInvoicesByBusinessDocument,
          GetSaleByIdDocument,
        ],
      });
      showSuccessToast();
      router.push("/dashboard/invoices");
    } catch (error) {
      console.error(error);
      showFailureToast(error);
    }
  };

  return (
    <div className=" pt-[40px] flex flex-col max-w-[850px] gap-y-[36px]">
      <div className=" flex justify-between w-full items-center relative">
        <Link
          className=" absolute top-0 text-primary-greytext "
          href="/dashboard/invoices"
        >
          <button type="button" className=" flex items-center gap-x-2">
            <MoveLeft className=" w-5 h-5 " />
            Back to Invoices
          </button>
        </Link>
        <div className=" flex flex-col gap-y-[4px] mt-9">
          <p className=" text-[30px] text-primary-black ">New Invoice </p>
          <p className=" text-primary-greytext font-light text-lg">
            Fill out the information below to create an invoice
          </p>
        </div>
        <button
          type="button"
          disabled
          onClick={() => setOpenViewInvoiceSheet(true)}
          className=" px-6 py-3 disabled:cursor-not-allowed disabled:opacity-50 rounded-[10px] flex gap-x-2 items-center justify-center border border-primary-border"
        >
          Preview
          <Eye className=" w-5 h-5 text-gray-500" />
        </button>
      </div>
      <div className=" flex flex-col gap-y-5">
        <p className=" text-primary-black text-lg">Business details</p>
        <div className=" flex flex-row gap-x-9 items-center">
          {businessLogo ? (
            <Image
              alt="Logo"
              className="rounded-full border border-gray-300 border-dashed"
              src={businessLogo}
              width={134}
              height={132}
            />
          ) : (
            <div className=" flex items-center justify-center flex-col gap-y-2 w-[134px] h-[132px] rounded-full border border-gray-300 border-dashed">
              <button
                onClick={handleOpenUpdateBusinessSheet}
                className=" text-primary-greytext"
              >
                ADD LOGO
              </button>
            </div>
          )}
          <div className=" flex flex-col gap-y-6 text-primary-greytext text-lg">
            <p className=" flex gap-x-3 items-center">
              <BankIcon />
              {businessName}
            </p>
            <p className=" flex gap-x-3 items-center">
              <LocationIcon />
              Lagos, Nigeria
            </p>
          </div>
          <div className=" flex flex-col gap-y-6 text-primary-greytext text-lg">
            <p className=" flex gap-x-3 items-center ">
              <ProfileIcon />
              {businessEmail}
            </p>
            <p className=" flex gap-x-3 items-center ">
              <Phone className=" w-5 h-5 text-[#C4C4C4]" />
              {businessMobile}
            </p>
          </div>
        </div>
      </div>
      <CustomerForm
        onCustomerChange={handleCustomerChange}
        openCustomerSheet={handleOpenCustomerSheet}
      />
      <div className=" flex flex-row gap-x-6">
        <div className=" flex flex-col gap-y-[6px] w-1/2">
          <label className="" htmlFor="issuedate">
            Issue date
          </label>
          <Popover open={openIssueDate} onOpenChange={setOpenIssueDate}>
            <PopoverTrigger asChild>
              <button className=" text-left text-sm font-normal flex items-center border border-gray-200 h-[40px] px-3 rounded-[8px]">
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
        <div className=" flex flex-col gap-y-[6px] w-1/2">
          <label className="" htmlFor="duedate">
            Due date
          </label>
          <Popover open={openDueDate} onOpenChange={setOpenDueDate}>
            <PopoverTrigger asChild>
              <button className=" text-left text-sm font-normal flex items-center border border-gray-200 h-[40px] px-3 rounded-[8px]">
                {dueDate ? (
                  format(dueDate, "PPP")
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
                selected={dueDate!}
                onSelect={(dueDate) => {
                  setDueDate(dueDate!);
                  setOpenDueDate(false);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmitCreateSaleHandler)}
        className=" w-full mt-5 flex flex-col gap-y-9"
      >
        <div className=" flex justify-between items-center w-full">
          <div className=" flex flex-col">
            <p className=" text-lg text-primary-black">Items</p>
            <p className=" text-primary-greytext">Describe the items sold</p>
          </div>
          <button
            type="button"
            onClick={() => setOpenCreateItemSheet(true)}
            className=" text-primary-blue flex items-center gap-x-2"
          >
            Add item <Plus className=" w-[18px] h-[18px]" />
          </button>
        </div>
        <div className=" flex flex-col">
          <div className="grid grid-cols-5 gap-x-5 text-primary-greytext border-t border-t-[#f4f4f4] py-[14px]">
            <p className="col-span-3">Item</p>
            <p className="col-span-1 px-3">Qty</p>
            <p className="col-span-1 text-end pr-3">Price</p>
          </div>
          {invoiceItems.length === 0 ? (
            <div className=" h-[150px] bg-white flex flex-col justify-center gap-y-4 items-center text-primary-greytext">
              <span className=" p-3 bg-[#F9FCFF] rounded-full">
                <ActiveProductIcon />
              </span>
              No items added
            </div>
          ) : (
            invoiceItems.map((item, index) => (
              <InvoiceItem
                key={index}
                item={item}
                index={index}
                onDelete={deleteItem}
                onQuantityChange={handleQuantityChange}
                onPriceChange={handlePriceChange}
              />
            ))
          )}
          {invoiceItems.length > 0 && (
            <div className=" w-full flex flex-col items-end text-primary-black text-lg mt-[30px]">
              <div className=" flex gap-x-[180px] p-3">
                <p className=" text-primary-greytext">Subtotal</p>
                <p>₦{subtotalFromItems.toLocaleString("en-NG")}</p>
              </div>
              <div className=" flex gap-x-[200px] p-3">
                <p className=" text-primary-greytext">VAT</p>
                <p className=" text-green-600">+7.5%</p>
              </div>
              {saleExpenses > 1 && (
                <div className=" flex gap-x-[180px] p-3">
                  <p className=" text-primary-greytext">Sale expenses</p>
                  <p>₦{saleExpenses.toLocaleString("en-NG")}</p>
                </div>
              )}
              <div className=" flex gap-x-[180px] p-3 border-t border-t-gray-100">
                <p className=" text-primary-greytext">Amount due</p>
                <p>₦{totalAmountDue.toLocaleString("en-NG")}</p>
              </div>
            </div>
          )}
        </div>
        <div className=" flex justify-between items-center w-full">
          <div className=" flex flex-col">
            <div className=" text-lg text-primary-black items-center flex flex-row gap-x-2">
              Sale expense
              <HoverCard>
                <HoverCardTrigger>
                  <Info className=" w-5 h-5 text-gray-400 mt-[2px] cursor-pointer" />
                </HoverCardTrigger>
                <HoverCardContent className=" bg-white shadow-none rounded-[10px] w-[350px] p-5">
                  <div className=" flex flex-col gap-y-3">
                    <div className=" flex">
                      <span className=" rounded-full bg-[#EDF6FF] p-2 flex">
                        <InfoIcon />
                      </span>
                    </div>
                    <p className=" text-lg text-primary-black">Sale expense</p>
                    <p className=" text-primary-greytext text-sm mt-[-4px]">
                      A short text explaining this component of invoice creation
                      to the user. It should be concise
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
            <p className=" text-primary-greytext">Include extra expenses</p>
          </div>
          <button
            type="button"
            onClick={handleAddExpense}
            className=" text-primary-blue flex items-center gap-x-2"
          >
            Add expense <Plus className=" w-[18px] h-[18px]" />
          </button>
        </div>
        {expenses.map((expense, index) => (
          <SaleExpenseItem
            key={index}
            expense={expense}
            index={index}
            onExpenseChange={handleExpenseChange}
            onDeleteExpense={handleDeleteExpense}
          />
        ))}
        <div className=" flex justify-between items-center w-full mt-3">
          <div className=" flex flex-col">
            <p className=" text-lg text-primary-black items-center flex flex-row gap-x-2">
              Service expense
              <HoverCard>
                <HoverCardTrigger>
                  <Info className=" w-5 h-5 text-gray-400 mt-[2px] cursor-pointer" />
                </HoverCardTrigger>
                <HoverCardContent className=" bg-white shadow-none rounded-[10px] w-[350px] p-5">
                  <div className=" flex flex-col gap-y-3">
                    <div className=" flex">
                      <span className=" rounded-full bg-[#EDF6FF] p-2 flex">
                        <InfoIcon />
                      </span>
                    </div>
                    <p className=" text-lg text-primary-black">
                      Service expense
                    </p>
                    <p className=" text-primary-greytext text-sm mt-[-4px]">
                      A short text explaining this component of invoice creation
                      to the user. It should be concise
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </p>
            <p className=" text-primary-greytext">
              Include extra service expenses
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddServiceExpense}
            className=" text-primary-blue flex items-center gap-x-2"
          >
            Add expense <Plus className=" w-[18px] h-[18px]" />
          </button>
        </div>
        {serviceExpenses.map((serviceExpense, index) => (
          <ServiceExpenseItem
            key={index}
            expense={serviceExpense}
            index={index}
            onServiceExpenseChange={handleServiceExpenseChange}
            onDeleteServiceExpense={handleDeleteServiceExpense}
          />
        ))}
        <div className=" flex flex-col mt-2">
          <p className=" text-lg text-primary-black">Description</p>
          <p className=" text-primary-greytext mt-[2px]">
            Say more to your customer
          </p>
          <Textarea
            {...register("description")}
            id="description"
            required
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
      </form>
      <CreateItemSheet
        open={openCreateItemSheet}
        onClose={handleCloseCreateItemSheet}
        onItemSelected={setSideSheetCallback}
      />
      <CreateCustomerSheet
        open={openCustomerSheet}
        onClose={handleCloseCustomerSheet}
      />
      <UpdateBusinessSheet
        open={openUpdateBusinessSheet}
        onClose={handleCloseUpdateBusinessSheet}
        openSheet={handleOpenUpdateBusinessSheet}
      />
    </div>
  );
};

export default CreateInvoice;
