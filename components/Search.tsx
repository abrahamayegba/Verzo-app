"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { searchAllCollections } from "@/src/helper/typesense";
import localStorage from "local-storage-fallback";
import { useGetBusinessesByUserIdQuery } from "@/src/generated/graphql";
import Link from "next/link";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<any>(null);
  const { data } = useGetBusinessesByUserIdQuery();
  const userId = data?.getBusinessesByUserId?.user?.id;
  const storedBusinessId = JSON.parse(
    localStorage.getItem("businessId") || "[]"
  );
  const businessId = storedBusinessId[0] || "";
  const handleSearch = async (inputValue: any) => {
    const searchQuery = inputValue.trim();
    if (searchQuery.length > 0) {
      try {
        const results = await searchAllCollections(
          searchQuery,
          businessId,
          userId!
        );
        setSearchResults(results);
      } catch (error) {
        console.error(error);
        console.log("error during search");
      }
    } else {
      setSearchResults(null);
    }
  };

  const productFields = searchResults?.results
    ?.filter(
      (collectionResult: any) =>
        collectionResult?.request_params?.collection_name === "product"
    )
    .map((collectionResult: any) => collectionResult.hits);

  const serviceFields = searchResults?.results
    ?.filter(
      (collectionResult: any) =>
        collectionResult?.request_params?.collection_name === "service"
    )
    .map((collectionResult: any) => collectionResult.hits);

  const merchantFields = searchResults?.results
    ?.filter(
      (collectionResult: any) =>
        collectionResult?.request_params?.collection_name === "merchant"
    )
    .map((collectionResult: any) => collectionResult.hits);

  const purchaseFields = searchResults?.results
    ?.filter(
      (collectionResult: any) =>
        collectionResult?.request_params?.collection_name === "purchase"
    )
    .map((collectionResult: any) => collectionResult.hits);

  const expenseFields = searchResults?.results
    ?.filter(
      (collectionResult: any) =>
        collectionResult?.request_params?.collection_name === "expense"
    )
    .map((collectionResult: any) => collectionResult.hits);

  const saleFields = searchResults?.results
    ?.filter(
      (collectionResult: any) =>
        collectionResult?.request_params?.collection_name === "sale"
    )
    .map((collectionResult: any) => collectionResult.hits);

  const customerFields = searchResults?.results
    ?.filter(
      (collectionResult: any) =>
        collectionResult?.request_params?.collection_name === "customer"
    )
    .map((collectionResult: any) => collectionResult.hits);

  return (
    <form className="relative flex flex-1 mt-1" action="#" method="GET">
      <label htmlFor="search-field" className="sr-only">
        Search
      </label>
      <div className="relative">
        <Search
          className="pointer-events-none absolute ml-2 inset-y-0 left-0 h-full w-5 text-gray-400"
          aria-hidden="true"
        />
        <input
          id="search-field"
          className="block h-full w-[600px] disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-transparent rounded focus:outline-none py-3 pl-9 pr-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-[15px]"
          placeholder="Search..."
          type="search"
          autoComplete="none" // or autoComplete="off"
          // name="search"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            handleSearch(e.target.value);
          }}
        />
        {searchInput.trim() !== "" && // Check if trimmed searchInput is not empty
        ((productFields?.length > 0 && productFields[0]?.length > 0) ||
          (serviceFields?.length > 0 && serviceFields[0]?.length > 0) ||
          (saleFields?.length > 0 && saleFields[0]?.length > 0) ||
          (purchaseFields?.length > 0 && purchaseFields[0]?.length > 0) ||
          (expenseFields?.length > 0 && expenseFields[0]?.length > 0) ||
          (merchantFields?.length > 0 && merchantFields[0]?.length > 0) ||
          (customerFields?.length > 0 && customerFields[0]?.length > 0)) ? (
          <div className=" absolute left-0 z-[150] mt-1 rounded-[6px] h-auto max-h-[400px] w-[600px] overflow-scroll bg-white text-sm shadow">
            {productFields?.map((collectionResult: any[], index: number) => (
              <div className=" border-t border-t-gray-100" key={index}>
                {collectionResult.map((hit) => (
                  <div
                    className="flex cursor-pointer flex-col gap-y-2 border-b border-b-gray-100 px-4 py-4 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                    key={hit.document.productName}
                  >
                    <p className="text-sm font-light">Products</p>
                    <p className=" text-base">{hit.document.productName}</p>
                  </div>
                ))}
              </div>
            ))}
            {serviceFields?.map((collectionResult: any[], index: number) => (
              <div className="" key={index}>
                {collectionResult.map((hit) => (
                  <div
                    key={hit.document.id}
                    className="flex cursor-pointer flex-col gap-y-2 border-b border-b-gray-100 px-4 py-4 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                  >
                    <p className=" text-sm font-light">Services</p>
                    <p className=" text-base">{hit.document.name}</p>
                  </div>
                ))}
              </div>
            ))}
            {saleFields?.map((collectionResult: any[], index: number) => (
              <div className="" key={index}>
                {collectionResult.map((hit) => (
                  <div key={hit.document.id} className="flex w-full flex-col ">
                    {hit.document.description && (
                      <Link
                        href={`/invoice/viewinvoice?invoiceId=${hit.document.id}`}
                      >
                        <button className="flex w-full cursor-pointer flex-col gap-y-2 border-b border-b-gray-100 px-4 py-4 text-gray-600 hover:bg-gray-100 hover:text-gray-800">
                          <p className=" text-sm font-light">Invoices</p>
                          <p className=" text-base capitalize">
                            {hit.document.description}
                          </p>
                        </button>
                      </Link>
                    )}
                    {hit.document.reference && (
                      <Link
                        href={`/invoice/viewinvoice?invoiceId=${hit.document.id}`}
                      >
                        <button className="flex w-full cursor-pointer flex-col gap-y-2 border-b border-b-gray-100 px-4 py-4 text-gray-600 hover:bg-gray-100 hover:text-gray-800">
                          <p className=" text-sm font-light">Invoices</p>
                          <p className=" text-base capitalize">
                            {hit.document.reference}
                          </p>
                        </button>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            ))}
            {purchaseFields?.map((collectionResult: any[], index: number) => (
              <div className="" key={index}>
                {collectionResult.map((hit) => (
                  <div key={hit.document.id} className="flex w-full flex-col ">
                    {hit.document.description && (
                      <Link
                        href={`/purchase/viewpurchase?purchaseId=${hit.document.id}`}
                      >
                        <button className="flex w-full cursor-pointer flex-col gap-y-2 border-b border-b-gray-100 px-4 py-4 text-gray-600 hover:bg-gray-100 hover:text-gray-800">
                          <p className=" text-sm font-light">Purchases</p>
                          <p className=" capitalize text-base">
                            {hit.document.description}
                          </p>
                        </button>
                      </Link>
                    )}
                    {hit.document.reference && (
                      <Link
                        href={`/purchase/viewpurchase?purchaseId=${hit.document.id}`}
                      >
                        <button className="flex w-full cursor-pointer flex-col gap-y-2 border-b border-b-gray-100 px-4 py-4 text-gray-600 hover:bg-gray-100 hover:text-gray-800">
                          <p className=" text-sm font-light">Purchases</p>
                          <p className=" capitalize text-base">
                            {hit.document.reference}
                          </p>
                        </button>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            ))}
            {expenseFields?.map((collectionResult: any[], index: number) => (
              <div className="" key={index}>
                {collectionResult.map((hit) => (
                  <div key={hit.document.id} className="flex w-full flex-col ">
                    {hit.document.description && (
                      <Link
                        href={`/expense/viewexpense?expenseId=${hit.document.id}`}
                      >
                        <button className="flex w-full cursor-pointer flex-col gap-y-2 border-b border-b-gray-100 px-4 py-4 text-gray-600 hover:bg-gray-100 hover:text-gray-800">
                          <p className=" text-sm font-light">Expenses</p>
                          <p className=" capitalize text-base">
                            {hit.document.description}
                          </p>
                        </button>
                      </Link>
                    )}
                    {hit.document.reference && (
                      <Link
                        href={`/expense/viewexpense?expenseId=${hit.document.id}`}
                      >
                        <button className="flex w-full cursor-pointer flex-col gap-y-2 border-b border-b-gray-100 px-4 py-4 text-gray-600 hover:bg-gray-100 hover:text-gray-800">
                          <p className=" text-sm font-light">Expenses</p>
                          <p className=" capitalize text-base">
                            {hit.document.reference}
                          </p>
                        </button>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            ))}
            {customerFields?.map((collectionResult: any[], index: number) => (
              <div className="" key={index}>
                {collectionResult.map((hit) => (
                  <div
                    key={hit.document.id}
                    className="flex cursor-pointer flex-col gap-y-2 border-b border-b-gray-100 px-4 py-4 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                  >
                    <p className=" text-xs font-light">Customers</p>
                    <p className=" text-base">{hit.document.name}</p>
                  </div>
                ))}
              </div>
            ))}
            {merchantFields?.map((collectionResult: any[], index: number) => (
              <div key={index}>
                {collectionResult.map((hit) => (
                  <div
                    key={hit.document.id}
                    className="flex cursor-pointer flex-col gap-y-2 border-b border-b-gray-100 px-4 py-4 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                  >
                    <p className=" text-sm font-light">Merchants</p>
                    <p className=" text-base">{hit.document.name}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </form>
  );
};

export default SearchBar;
