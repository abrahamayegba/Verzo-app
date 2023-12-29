"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { searchAllCollections } from "@/src/helper/typesense";
import localStorage from "local-storage-fallback";
import { useGetBusinessesByUserIdQuery } from "@/src/generated/graphql";
import { MultiSearchResponse } from "typesense/lib/Typesense/MultiSearch";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [noResults, setNoResults] = useState(false);
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
      }
    } else {
      setSearchResults(null);
    }
  };

  return (
    <form className="relative flex flex-1 mt-1" action="#" method="GET">
      <label htmlFor="search-field" className="sr-only">
        Search
      </label>
      <Search
        className="pointer-events-none absolute ml-2 inset-y-0 left-0 h-full w-5 text-gray-400"
        aria-hidden="true"
      />
      <input
        disabled
        id="search-field"
        className="block h-full w-[600px] disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-transparent rounded border-0 focus:outline-none py-3 pl-9 pr-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-[15px]"
        placeholder="Search..."
        type="search"
        name="search"
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
          handleSearch(e.target.value);
        }}
      />
    </form>
  );
};

export default SearchBar;
