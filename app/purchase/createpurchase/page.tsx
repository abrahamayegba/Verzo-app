"use client";
import PurchaseItem from "@/components/Purchase/PurchaseItem";
import CreateCategorySheet from "@/components/sheets/expense/CreateCategorySheet";
import CreateMerchantSheet from "@/components/sheets/expense/CreateMerchantSheet";
import ActivePurchaseIcon from "@/components/ui/icons/ActivePurchaseIcon";
import BankIcon from "@/components/ui/icons/BankIcon";
import LocationIcon from "@/components/ui/icons/LocationIcon";
import ProfileIcon from "@/components/ui/icons/ProfileIcon";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, Eye, MoveLeft, Phone, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import localStorage from "local-storage-fallback";
import MerchantForm from "@/components/MerchantForm";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  GetPurchaseByBusinessDocument,
  GetPurchaseByIdDocument,
  GetPurchaseForMonthDocument,
  GetPurchaseForQuarterDocument,
  GetPurchaseForWeekDocument,
  GetPurchaseForYearDocument,
  useCreatePurchaseEntryMutation,
  useGetBusinessByIdQuery,
  useGetBusinessesByUserIdQuery,
} from "@/src/generated/graphql";
import CreatePurchaseItemSheet from "@/components/sheets/purchase/CreatePurchaseItemSheet";
import { useToast } from "@/app/hooks/use-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { client } from "@/src/apollo/ApolloClient";
import UpdateBusinessSheet from "@/components/sheets/settings/businessprofile/UpdateBusinessSheet";
import { isAuthenticated } from "@/lib/auth";

interface PurchaseItemProp {
  productId: string;
  itemDescription: string;
  quantity: number;
  unitPrice: number;
  index: number;
}

type FormData = {
  description: string;
};

const CreatePurchase = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { register, reset, handleSubmit } = useForm<FormData>();
  const [purchaseItems, setPurchaseItems] = useState<PurchaseItemProp[]>([]);
  const [openMerchantSheet, setOpenMerchantSheet] = useState(false);
  const [openCreateItemSheet, setOpenCreateItemSheet] = useState(false);
  const [openUpdateBusinessSheet, setOpenUpdateBusinessSheet] = useState(false);
  const [merchantId, setMerchantId] = useState("");
  const [openCreateCategorySheet, setOpenCreateCategorySheet] = useState(false);
  const [purchaseDate, setPurchaseDate] = useState("");
  const [date, setDate] = React.useState<Date | null>(null);
  const [openIssueDate, setOpenIssueDate] = React.useState(false);
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
  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      if (!authenticated) {
        router.push("/auth/signin");
      }
    };
    checkAuth();
  }, [router]);
  const [createPurchaseEntryMutation, { loading }] =
    useCreatePurchaseEntryMutation();
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

  const businessLogo = getBusinessById.data?.getBusinessById?.logo;

  const handleCloseMerchantSheet = () => {
    setOpenMerchantSheet(false);
  };

  const handleCloseCreateCategorySheet = () => {
    setOpenCreateCategorySheet(false);
  };
  const handleOpenMerchantSheet = () => {
    setOpenMerchantSheet(true);
  };

  const handleCloseUpdateBusinessSheet = () => {
    setOpenUpdateBusinessSheet(false);
  };
  const handleOpenUpdateBusinessSheet = () => {
    setOpenUpdateBusinessSheet(true);
  };

  const handleMerchantChange = (id: string) => {
    setMerchantId(id);
  };

  React.useEffect(() => {
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd").toString();
      setPurchaseDate(formattedDate);
    }
  }, [date]);

  const deleteItem = (index: number) => {
    const updatedItems = [...purchaseItems];
    updatedItems.splice(index, 1);
    setPurchaseItems(updatedItems);
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    const updatedItems = [...purchaseItems];
    updatedItems[index].quantity = quantity;
    setPurchaseItems(updatedItems);
  };

  const handlePriceChange = (index: number, price: number) => {
    const updatedItems = [...purchaseItems];
    updatedItems[index].unitPrice = price;
    setPurchaseItems(updatedItems);
  };

  const setSideSheetCallback = (selectedItem: PurchaseItemProp) => {
    setPurchaseItems((prevItems) => [...prevItems, selectedItem]);
  };

  const handleCloseCreateItemSheet = () => {
    setOpenCreateItemSheet(false);
  };

  const subtotal = purchaseItems.reduce(
    (acc, items) => acc + items?.unitPrice * items?.quantity,
    0
  );

  const amountDue = subtotal;

  const showSuccessToast = () => {
    toast({
      title: "Successful!",
      description: "Your purchase order has been successfully created",
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

  const updatedPurchaseItems = purchaseItems.map((item) => {
    return {
      ...item,
      unitPrice: item?.unitPrice * 100,
    };
  });

  const resetFormState = () => {
    reset();
    setDate(null);
    setPurchaseDate("");
    setMerchantId("");
    setPurchaseItems([]);
    purchaseItems.length = 0;
  };

  const onSubmitCreatePurchaseHandler = async (data: FormData) => {
    if (!merchantId) {
      showOtherFailureToast(
        "Please select a merchant before saving the purchase."
      );
      return;
    }
    if (!purchaseDate) {
      showOtherFailureToast("Please pick a date before saving the purchase.");
      return;
    }
    try {
      const purchaseEntryData = {
        businessId: businessId,
        merchantId: merchantId,
        transactionDate: purchaseDate,
        purchaseItem: updatedPurchaseItems,
        ...data,
      };
      await createPurchaseEntryMutation({
        variables: purchaseEntryData,
        refetchQueries: [
          GetPurchaseByBusinessDocument,
          GetPurchaseByIdDocument,
          GetPurchaseForWeekDocument,
          GetPurchaseForMonthDocument,
          GetPurchaseForQuarterDocument,
          GetPurchaseForYearDocument,
        ],
      });
      client.refetchQueries({
        include: "active",
      });
      showSuccessToast();
      router.push("/dashboard/purchases");
      resetFormState();
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
          href="/dashboard/purchases"
        >
          <button type="button" className=" flex items-center gap-x-2">
            <MoveLeft className=" w-5 h-5 " />
            Back to Purchases
          </button>
        </Link>
        <div className=" flex flex-col gap-y-[4px] mt-12">
          <p className=" text-[30px] text-primary-black ">New order </p>
          <p className=" text-primary-greytext font-light text-lg">
            Fill out the information below to create a purchase order
          </p>
        </div>
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
      <MerchantForm
        onMerchantChange={handleMerchantChange}
        openMerchantSheet={handleOpenMerchantSheet}
      />
      <div className=" flex flex-row gap-x-6">
        <div className=" flex flex-col gap-y-[6px] w-1/2">
          <label className="" htmlFor="purchasedate">
            Purchase date
          </label>
          <Popover open={openIssueDate} onOpenChange={setOpenIssueDate}>
            <PopoverTrigger asChild>
              <button className=" text-left text-[15px] max-w-[413px] font-normal flex items-center border border-gray-200 h-[40px] px-3 rounded-[8px]">
                {date ? (
                  format(date, "PPP")
                ) : (
                  <div className=" justify-between flex items-center w-full">
                    <span className=" text-[15px]">Pick a date</span>
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
      <form onSubmit={handleSubmit(onSubmitCreatePurchaseHandler)}>
        <div className=" w-full mt-5 flex flex-col gap-y-9">
          <div className=" flex justify-between items-center w-full">
            <div className=" flex flex-col">
              <p className=" text-lg text-primary-black">Items</p>
              <p className=" text-primary-greytext">List the items purchased</p>
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
            {purchaseItems.length === 0 ? (
              <div className=" h-[150px] bg-white flex flex-col justify-center gap-y-4 items-center text-primary-greytext">
                <span className=" p-3 bg-[#F9FCFF] rounded-full">
                  <ActivePurchaseIcon />
                </span>
                No purchase added
              </div>
            ) : (
              purchaseItems.map((purchase, index) => (
                <PurchaseItem
                  key={index}
                  item={purchase}
                  index={index}
                  onDelete={deleteItem}
                  onQuantityChange={handleQuantityChange}
                  onPriceChange={handlePriceChange}
                />
              ))
            )}
            {purchaseItems.length > 0 && (
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
              id="description"
              required
              className=" mt-5"
            />
          </div>
          <div className=" flex flex-row items-center gap-x-5 mt-2">
            <button
              onClick={() => router.push("/dashboard/purchases")}
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
      </form>
      <CreateCategorySheet
        open={openCreateCategorySheet}
        onClose={handleCloseCreateCategorySheet}
      />
      <CreatePurchaseItemSheet
        open={openCreateItemSheet}
        onClose={handleCloseCreateItemSheet}
        onItemSelected={setSideSheetCallback}
      />
      <CreateMerchantSheet
        open={openMerchantSheet}
        onClose={handleCloseMerchantSheet}
      />
      <UpdateBusinessSheet
        open={openUpdateBusinessSheet}
        onClose={handleCloseUpdateBusinessSheet}
        openSheet={handleOpenUpdateBusinessSheet}
      />
    </div>
  );
};

export default CreatePurchase;
