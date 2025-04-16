"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeUrlQuery } from "@/lib/url";

interface searchProps {
  route: string;
  placeholder: string;
  otherClasses: string;
}

const LocalSearch = ({ route, placeholder, otherClasses }: searchProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(queryParam);
  useEffect(() => {
    const debounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery(
          searchParams.toString(),
          "query",
          searchQuery,
        );
        console.log(newUrl);
        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeUrlQuery(searchParams.toString(), ["query"]);
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(debounceFn);
  }, [searchParams, searchQuery, router, route, pathname]);
  return (
    <div className="flex items-center gap-2.5 background-light800_darkgradient rounded-[10px] border-1 p-4 h-[56px] w-full light-border-2">
      <Image src={"/icons/search.svg"} alt="Search" width={20} height={20} />
      <Input
        value={searchQuery}
        placeholder={placeholder}
        className={`border-none shadow-none no-focus outline-none ${otherClasses}`}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
    </div>
  );
};

export default LocalSearch;
