import { useGetBusinessReceivablesQuery } from "@/src/generated/graphql";
import localStorage from "local-storage-fallback";
import React from "react";
interface MetricsProps {
  filter: string;
}

const Receivables: React.FC<MetricsProps> = ({ filter }) => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";

  const { data } = useGetBusinessReceivablesQuery({
    variables: {
      businessId: businessId,
    },
  });

  const receivables = data?.getBusinessReceivables;

  return (
    <>
      <div className=" flex justify-between text-primary-black">
        <p className=" text-[20px] tracking-[-0.3px]">Total Receivables</p>
      </div>
      <div className=" flex flex-col">
        <div className=" flex justify-between gap-y-1">
          <p className=" text-[30px] font-medium">
            {(receivables / 100)?.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
    </>
  );
};

export default Receivables;
