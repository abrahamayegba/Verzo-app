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
          <div className=" flex justify-between items-center py-[14px]  max-h-[50px] px-6 rounded-t-[10px] ">
            <p className=" text-primary-greytext text-sm">Recent Products</p>
            <Link href="/dashboard/products">
              <button className=" text-primary-blue text-sm tracking-[-0.2px]">
                View all
              </button>
            </Link>
          </div>
          <div className=" flex flex-col bg-white h-full rounded-b-[16px]">
            {products.slice(0, 3).map((product, index) => (
              <div
                key={product?.id}
                className={`min-h-[63px] flex justify-between text-sm items-center px-6 ${
                  index === 2 ? "" : "border-b border-b-gray-100"
                }`}
              >
                <p>{product?.productName}</p>
                <p className=" text-primary-greytext">
                  {(product?.price / 100)?.toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  })}
                </p>
                <p className=" text-primary-greytext">
                  {product?.productUnit?.unitName}
                </p>
                {/* <MoreHorizontal className=" text-[#c4c4c4]" /> */}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RecentProducts;
