import React from "react";
import { useSearchParams } from "react-router-dom";

const SearchBar = ({ placeholder = "", className = "" }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchText = searchParams.get("query") || "";

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ query: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="flex justify-center mb-4">
      <input
        type="text"
        value={searchText}
        onChange={handleSearch}
        placeholder={placeholder}
        className={`border border-gray-300 rounded p-2 w-full max-w-md ${className}`}
      />
    </div>
  );
};

export default SearchBar;
