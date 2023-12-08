import { MoreHorizontal } from "lucide-react";
import React from "react";
import localStorage from "local-storage-fallback";
import RecentMetricEmptyState from "./emptystates/RecentMetricEmptyState";
import { useGetProductsByBusinessQuery } from "@/src/generated/graphql";
import RecentProductEmptyIcon from "./ui/icons/RecentProductEmptyIcon";
import Link from "next/link";

const RecentProducts = () => {
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const getProductsByBusiness = useGetProductsByBusinessQuery({
    variables: {
      businessId: businessId,
    },
  });
  const products =
    getProductsByBusiness.data?.getProductsByBusiness?.productByBusiness ?? [];
  return (
    <>
      {products?.length === 0 ? (
        <RecentMetricEmptyState
          name="Products"
          icon={<RecentProductEmptyIcon />}
          emptytext="No products added"
        />
      ) : (
        <div className=" min-h-[241px] rounded-[16px] flex flex-col border border-gray-100">
          <div className=" flex justify-between items-center py-[14px] px-6 rounded-t-[10px] ">
            <p className=" text-primary-greytext text-sm">Recent Products</p>
            <Link href="/dashboard/products">
              <button className=" text-primary-blue text-sm tracking-[-0.2px]">
                View all
              </button>
            </Link>
          </div>
          <div className=" flex flex-col bg-white h-full rounded-b-[16px]">
            {products.map((product, index) => (
              <div
                key={product?.id}
                className=" border-t border-t-gray-100 min-h-[63px] flex justify-between text-sm items-center px-6"
              >
                <p>#{String(index + 1).padStart(3, "0")}</p>
                <p className=" text-primary-greytext">₦{product?.price}</p>
                <p className=" text-primary-greytext">
                  {product?.productUnit?.unitName}
                </p>
                <MoreHorizontal className=" text-[#c4c4c4]" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RecentProducts;
