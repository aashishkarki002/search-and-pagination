"use client";
import React from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function Select({ itemsperpage = 10 }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (e) => {
    const params = new URLSearchParams(searchParams);
    params.set("size", e.target.value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <select
        name="size"
        id=""
        defaultValue={itemsperpage}
        onChange={handleChange}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </div>
  );
}
