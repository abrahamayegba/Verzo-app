"use client";
import React, { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { searchAllCollections } from "@/src/helper/typesense";
import localStorage from "local-storage-fallback";
import { useGetBusinessesByUserIdQuery } from "@/src/generated/graphql";
import Link from "next/link";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<any>(null);
  const { data } = useGetBusinessesByUserIdQuery();
  const componentRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
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

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
        setSearchInput("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowDropdown, setSearchInput]);

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
          className="block h-full w-[500px] disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-transparent rounded focus:outline-none py-3 pl-9 pr-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-[15px]"
          placeholder="Search..."
          type="search"
          autoComplete="none"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            handleSearch(e.target.value);
            setShowDropdown(true);
          }}
        />
        {showDropdown &&
        searchInput.trim() !== "" && // Check if trimmed searchInput is not empty
        ((productFields?.length > 0 && productFields[0]?.length > 0) ||
          (serviceFields?.length > 0 && serviceFields[0]?.length > 0) ||
          (saleFields?.length > 0 && saleFields[0]?.length > 0) ||
          (purchaseFields?.length > 0 && purchaseFields[0]?.length > 0) ||
          (expenseFields?.length > 0 && expenseFields[0]?.length > 0) ||
          (merchantFields?.length > 0 && merchantFields[0]?.length > 0) ||
          (customerFields?.length > 0 && customerFields[0]?.length > 0)) ? (
          <div
            ref={componentRef}
            className=" absolute left-0 z-[150] mt-1 rounded-[5px] h-auto max-h-[400px] w-[600px] overflow-scroll bg-white text-sm shadow"
          >
            {productFields?.map((collectionResult: any[], index: number) => (
              <div className=" border-t border-t-gray-100" key={index}>
                {collectionResult.map((hit) => (
                  <Link
                    href={`/dashboard/products?searchResult=${hit.document.id}`}
                    className="flex cursor-pointer justify-between items-center flex-row border-b border-b-gray-100 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                    key={hit.document.productName}
                    onClick={() => setShowDropdown(false)}
                  >
                    <p className=" text-base">{hit.document.productName}</p>
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      In products
                    </span>
                  </Link>
                ))}
              </div>
            ))}
            {serviceFields?.map((collectionResult: any[], index: number) => (
              <div key={index}>
                {collectionResult.map((hit) => (
                  <Link
                    href={`/dashboard/services?searchResult=${hit.document.id}`}
                    key={hit.document.id}
                    className="flex cursor-pointer flex-row justify-between items-center border-b border-b-gray-100 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                    onClick={() => setShowDropdown(false)}
                  >
                    <p className=" text-base">{hit.document.name}</p>
                    <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">
                      In services
                    </span>
                  </Link>
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
                        <button className="flex cursor-pointer w-full justify-between items-center flex-row border-b border-b-gray-100 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-800">
                          <p className=" text-base capitalize">
                            {hit.document.description}
                          </p>
                          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                            In invoices
                          </span>
                        </button>
                      </Link>
                    )}
                    {hit.document.reference && (
                      <Link
                        href={`/invoice/viewinvoice?invoiceId=${hit.document.id}`}
                      >
                        <button className="flex cursor-pointer w-full justify-between items-center flex-row border-b border-b-gray-100 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-800">
                          <p className=" text-base capitalize">
                            {hit.document.reference}
                          </p>
                          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                            In invoices
                          </span>
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
                        <button className="flex cursor-pointer w-full justify-between items-center flex-row border-b border-b-gray-100 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-800">
                          <p className=" capitalize text-base">
                            {hit.document.description}
                          </p>
                          <span className="inline-flex items-center rounded-md bg-stone-50 px-2 py-1 text-xs font-medium text-stone-700 ring-1 ring-inset ring-stone-600/20">
                            In purchases
                          </span>
                        </button>
                      </Link>
                    )}
                    {hit.document.reference && (
                      <Link
                        href={`/purchase/viewpurchase?purchaseId=${hit.document.id}`}
                      >
                        <button className="flex cursor-pointer w-full justify-between items-center flex-row border-b border-b-gray-100 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-800">
                          <p className=" capitalize text-base">
                            {hit.document.reference}
                          </p>
                          <span className="inline-flex items-center rounded-md bg-stone-50 px-2 py-1 text-xs font-medium text-stone-700 ring-1 ring-inset ring-stone-600/20">
                            In purchases
                          </span>
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
                        <button className="flex cursor-pointer w-full justify-between items-center flex-row border-b border-b-gray-100 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-800">
                          <p className=" capitalize text-base">
                            {hit.document.description}
                          </p>
                          <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-600/20">
                            In expenses
                          </span>
                        </button>
                      </Link>
                    )}
                    {hit.document.reference && (
                      <Link
                        href={`/expense/viewexpense?expenseId=${hit.document.id}`}
                      >
                        <button className="flex cursor-pointer w-full justify-between items-center flex-row border-b border-b-gray-100 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-800">
                          <p className=" capitalize text-base">
                            {hit.document.reference}
                          </p>
                          <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-600/20">
                            In expenses
                          </span>
                        </button>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            ))}
            {customerFields?.map((collectionResult: any[], index: number) => (
              <div key={index}>
                {collectionResult.map((hit) => (
                  <Link
                    href={`/dashboard/customers?searchResult=${hit.document.id}`}
                    key={hit.document.id}
                    className="flex cursor-pointer justify-between items-center flex-row border-b border-b-gray-100 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                    onClick={() => setShowDropdown(false)}
                  >
                    <p className=" text-base">{hit.document.name}</p>
                    <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                      In customers
                    </span>
                  </Link>
                ))}
              </div>
            ))}
            {merchantFields?.map((collectionResult: any[], index: number) => (
              <div key={index}>
                {collectionResult.map((hit) => (
                  <div
                    key={hit.document.id}
                    className="flex cursor-pointer justify-between items-center flex-row border-b border-b-gray-100 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                  >
                    <p className=" text-base">{hit.document.name}</p>
                    <span className="inline-flex items-center rounded-md bg-cyan-50 px-2 py-1 text-xs font-medium text-cyan-700 ring-1 ring-inset ring-cyan-600/20">
                      In merchants
                    </span>
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
