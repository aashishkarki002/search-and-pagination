"use client";
import React from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface InputProps {
  defaultValue?: string;
}

export default function Input({ defaultValue }: InputProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        className="peer block w-72 rounded-md border 
          border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={defaultValue || searchParams.get("query")?.toString()}
      />
    </div>
  );
}
