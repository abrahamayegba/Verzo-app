"use client";
import InvoiceItem from "@/components/Invoice/InvoiceItem";
import SaleExpenseItem from "@/components/SaleExpenseItem";
import ServiceExpenseItem from "@/components/ServiceExpenseItem";
import CreateCustomerSheet from "@/components/sheets/customer/CreateCustomerSheet";
import CreateItemSheet from "@/components/sheets/invoice/CreateItemSheet";
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
  GetArchivedSalesByBusinessDocument,
  GetInvoicesByBusinessDocument,
  GetSaleByBusinessDocument,
  GetSaleByIdDocument,
  useGetBusinessesByUserIdQuery,
  useGetSaleByIdQuery,
  useUpdateSaleMutation,
} from "@/src/generated/graphql";
import { ChevronDown, Eye, Info, MoveLeft, Phone, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/app/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import EditInvoiceCustomerForm from "@/components/EditInvoiceCustomerForm";
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

const EditInvoice = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { register, handleSubmit, getValues } = useForm<FormData>();
  const [openCustomerSheet, setOpenCustomerSheet] = useState(false);
  const [openViewInvoiceSheet, setOpenViewInvoiceSheet] = useState(false);
  const [date, setDate] = React.useState<Date | null>(null);
  const [dueDate, setDueDate] = React.useState<Date | null>(null);
  const [openDueDate, setOpenDueDate] = React.useState(false);
  const [openUpdateBusinessSheet, setOpenUpdateBusinessSheet] = useState(false);
  const [invoiceDate, setInvoiceDate] = useState("");
  const [invoiceDueDate, setInvoiceDueDate] = useState("");
  const [openIssueDate, setOpenIssueDate] = React.useState(false);
  const [customerId, setCustomerId] = useState("");
  const [openCreateItemSheet, setOpenCreateItemSheet] = useState(false);
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const getBusinessesByUserId = useGetBusinessesByUserIdQuery();

  const businessName =
    getBusinessesByUserId.data?.getBusinessesByUserId?.businesses?.map(
      (business) => business?.businessName
    ) || [];
  const businessEmail =
    getBusinessesByUserId.data?.getBusinessesByUserId?.businesses?.map(
      (business) => business?.businessEmail
    ) || [];
  const businessMobile =
    getBusinessesByUserId.data?.getBusinessesByUserId?.businesses?.map(
      (business) => business?.businessMobile
    ) || [];
  const [updateSaleMutation, { loading }] = useUpdateSaleMutation();

  const invoiceIdParams = useSearchParams();
  const invoiceId = invoiceIdParams.get("invoiceId")?.toString();
  const getSaleById = useGetSaleByIdQuery({
    variables: {
      saleId: invoiceId!,
    },
  });
  const businessLogo = getSaleById?.data?.getSaleById?.business?.logo;
  const sale = getSaleById?.data?.getSaleById;
  const initialInvoiceItems = sale?.invoice?.invoiceDetails;
  const initialSaleExpenses = sale?.saleExpenses!;
  const initialSaleServiceExpenses = sale?.saleServiceExpenses;
  const initialCustomerId = sale?.invoice?.customer?.id;
  const mappedInvoiceItems = useMemo(() => {
    return initialInvoiceItems
      ? initialInvoiceItems.map((item) => ({
          id:
            item?.type === "P"
              ? item?.productInvoiceDetail?.product?.id!
              : item?.serviceInvoiceDetail?.service?.id!,
          name:
            item?.type === "P"
              ? item?.productInvoiceDetail?.product?.productName!
              : item?.serviceInvoiceDetail?.service?.name!,
          price:
            item?.type === "P"
              ? item?.productInvoiceDetail?.unitPrice!
              : item?.serviceInvoiceDetail?.unitPrice!,
          type: item?.type!,
          quantity:
            item?.type === "P"
              ? item?.productInvoiceDetail?.quantity!
              : item?.serviceInvoiceDetail?.quantity!,
          index: item?.index!,
        }))
      : [];
  }, [initialInvoiceItems]);

  const mappedSaleExpenses = useMemo(() => {
    return initialSaleExpenses
      ? initialSaleExpenses.map((expense) => ({
          description: expense?.description!,
          amount: expense?.amount!,
          index: expense?.index!,
        }))
      : [];
  }, [initialSaleExpenses]);

  const mappedSaleServiceExpenses = useMemo(() => {
    return initialSaleServiceExpenses
      ? initialSaleServiceExpenses.map((expense) => ({
          description: expense?.description!,
          amount: expense?.amount!,
          index: expense?.index!,
          serviceId: expense?.service?.id!,
        }))
      : [];
  }, [initialSaleServiceExpenses]);

  const [invoiceItems, setInvoiceItems] =
    useState<InvoiceItem[]>(mappedInvoiceItems);
  const [expenses, setExpenses] = useState<Expense[]>(mappedSaleExpenses);
  const [serviceExpenses, setServiceExpenses] = useState<ServiceExpense[]>(
    mappedSaleServiceExpenses
  );

  useEffect(() => {
    setInvoiceItems(mappedInvoiceItems);
  }, [mappedInvoiceItems]);

  useEffect(() => {
    setExpenses(mappedSaleExpenses);
  }, [mappedSaleExpenses]);

  useEffect(() => {
    setServiceExpenses(mappedSaleServiceExpenses);
  }, [mappedSaleServiceExpenses]);

  const initialIssueDate = sale?.transactionDate;
  const initialDueDate = sale?.dueDate;
  const handleOpenCustomerSheet = () => {
    setOpenCustomerSheet(true);
  };
  const handleCloseCustomerSheet = () => {
    setOpenCustomerSheet(false);
  };

  const handleCloseCreateItemSheet = () => {
    setOpenCreateItemSheet(false);
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

  const handleCloseUpdateBusinessSheet = () => {
    setOpenUpdateBusinessSheet(false);
  };
  const handleOpenUpdateBusinessSheet = () => {
    setOpenUpdateBusinessSheet(true);
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
      description: "Your invoice has been successfully updated",
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
    customerId: customerId ? customerId : initialCustomerId,
    dateOfIssue: invoiceDate ? invoiceDate : initialIssueDate,
    dueDate: invoiceDueDate ? invoiceDueDate : initialDueDate,
    VAT: 7.5,
    item: saleItemDetails,
  };

  const onSubmitEditSaleHandler = async () => {
    if (!customerId && !initialCustomerId) {
      showOtherFailureToast(
        "Please select a customer before saving the invoice."
      );
      return;
    }
    if (!invoiceDate && !initialIssueDate) {
      showOtherFailureToast("Please pick a date before saving the invoice.");
      return;
    }
    if (!invoiceDueDate && !initialDueDate) {
      showOtherFailureToast("Please pick a date before saving the invoice.");
      return;
    }
    try {
      await updateSaleMutation({
        variables: {
          saleId: invoiceId!,
          description: getValues("description")
            ? getValues("description")
            : sale?.description,
          saleExpense: expenses.length > 0 ? expenses : null,
          saleServiceExpense:
            serviceExpenses.length > 0 ? serviceExpenses : null,
          updateInvoiceInput: invoiceInput,
        },
        refetchQueries: [
          GetSaleByBusinessDocument,
          GetInvoicesByBusinessDocument,
          GetArchivedSalesByBusinessDocument,
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
        <div className=" flex flex-col gap-y-[4px] mt-12">
          <p className=" text-[30px] text-primary-black ">Edit Invoice </p>
          <p className=" text-primary-greytext font-light text-lg">
            Fill out the information below to edit your invoice
          </p>
        </div>
        <button
          type="button"
          disabled
          onClick={() => setOpenViewInvoiceSheet(true)}
          className=" px-6 py-3 disabled:opacity-50 cursor-not-allowed rounded-[10px] flex gap-x-2 items-center justify-center border border-primary-border"
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
      <EditInvoiceCustomerForm
        onCustomerChange={handleCustomerChange}
        openCustomerSheet={handleOpenCustomerSheet}
        invoiceId={invoiceId!}
      />
      <div className=" flex flex-row gap-x-6">
        <div className=" flex flex-col gap-y-[6px] w-1/2">
          <label className="" htmlFor="issuedate">
            Issue date
          </label>
          <Popover open={openIssueDate} onOpenChange={setOpenIssueDate}>
            <PopoverTrigger asChild>
              <button className=" text-left text-sm font-normal flex items-center border border-gray-200 h-[40px] px-3 rounded-[8px]">
                {invoiceDate ? invoiceDate : initialIssueDate}
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
                {invoiceDueDate ? invoiceDueDate : initialDueDate}
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
        onSubmit={handleSubmit(onSubmitEditSaleHandler)}
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
                      General expenses incurred when carrying out a sale.
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
                      Expenses to be incurred when carrying out a specific
                      service.
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
            defaultValue={sale?.description!}
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

export default EditInvoice;
