"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React from "react";

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    replace(`${pathname}?${params.toString()}`);
  };
  const isFirstDisabled = currentPage == 1;
  const isPreviousDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  return (
    <div className="mt-4">
      <div className="flex gap-4 ml-100">
        <button
          onClick={() => {
            handlePageChange(1);
          }}
          disabled={isFirstDisabled}
          className={`px-4 py-2 rounded-sm ${
            isFirstDisabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          get to first
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={isPreviousDisabled}
          className={`px-4 py-2 rounded-sm ${
            isPreviousDisabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          previous page
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={isNextDisabled}
          className={`px-4 py-2 rounded-sm ${
            isNextDisabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          next page
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={isNextDisabled}
          className={`px-4 py-2 rounded-sm ${
            isNextDisabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          skip to last
        </button>
      </div>
    </div>
  );
};

export default Pagination;
