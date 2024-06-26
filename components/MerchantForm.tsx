"use client";
import { Plus } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  useGetBusinessesByUserIdQuery,
  useGetMerchantsByBusinessQuery,
} from "@/src/generated/graphql";
import localStorage from "local-storage-fallback";
import MainLoader from "./loading/MainLoader";

interface MerchantFormProps {
  openMerchantSheet: () => void;
  onMerchantChange: (id: string) => void;
}

const MerchantForm: React.FC<MerchantFormProps> = ({
  openMerchantSheet,
  onMerchantChange,
}) => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const getBusinessesByUserId = useGetBusinessesByUserIdQuery();

  const getMerchants = useGetMerchantsByBusinessQuery({
    variables: { businessId: businessId },
  });
  const merchants = useMemo(
    () => getMerchants.data?.getMerchantsByBusiness ?? [],
    [getMerchants.data?.getMerchantsByBusiness]
  );
  const [merchantId, setMerchantId] = useState("");
  const [merchantEmail, setMerchantEmail] = useState("");
  useEffect(() => {
    if (merchantId) {
      const foundMerchant = merchants.find(
        (merchant) => merchant?.id === merchantId
      );
      if (foundMerchant) {
        setMerchantEmail(foundMerchant?.email!);
      }
    }
  }, [merchantId, merchants]);

  useEffect(() => {
    onMerchantChange(merchantId);
  }, [merchantId, onMerchantChange]);

  if (getBusinessesByUserId.loading || getMerchants.loading) {
    return <MainLoader />;
  }

  return (
    <div className=" flex w-full justify-between flex-col gap-y-5">
      <div className=" flex flex-row w-full justify-between">
        <p className=" text-primary-black text-lg">Merchant details</p>
        <button
          type="button"
          onClick={openMerchantSheet}
          className=" text-primary-blue flex items-center gap-x-2"
        >
          Add merchant <Plus className=" w-5 h-5" />
        </button>
      </div>
      <div className=" flex flex-col gap-y-[50px]">
        <div className=" flex flex-row gap-x-6">
          <div className=" flex flex-col gap-y-[6px] w-1/2">
            <label className="" htmlFor="merchant">
              Merchant
            </label>
            <Select value={merchantId} onValueChange={setMerchantId}>
              <SelectTrigger className=" w-full text-[15px] rounded-lg border border-gray-200">
                <SelectValue
                  className=" text-primary-greytext"
                  placeholder="Select a merchant"
                />
              </SelectTrigger>
              <SelectContent className=" bg-white w-full">
                <SelectGroup>
                  {merchants.map((merchant) => (
                    <SelectItem
                      key={merchant?.id}
                      className=" hover:bg-gray-100 cursor-pointer py-2 text-[15px]"
                      value={merchant?.id!}
                    >
                      {merchant?.name}
                    </SelectItem>
                  ))}

                  <button
                    onClick={openMerchantSheet}
                    className="hover:bg-gray-100 cursor-pointer py-2 px-2 text-[15px] w-full flex items-start"
                  >
                    Create merchant
                  </button>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className=" flex flex-col gap-y-[6px] w-1/2">
            <label className="" htmlFor="customer">
              Merchant email
            </label>
            <p className="border border-gray-200 rounded-lg h-10 text-[15px] focus:outline-none px-3 py-2">
              {merchantEmail}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantForm;
