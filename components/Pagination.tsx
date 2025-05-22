"use client";

import React from "react";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function Pagination({ currentPage, query }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    if (query) params.set("query", query);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex justify-center gap-2 mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      >
        Previous
      </button>
      <span className="px-3 py-1">Page {currentPage}</span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-3 py-1 rounded bg-gray-200"
      >
        Next
      </button>
    </div>
  );
}
