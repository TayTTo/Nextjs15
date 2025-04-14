"use client";
import Image from "next/image";
import React from "react";
import { Input } from "../ui/input";
import { useParams, useSearchParams } from "next/navigation";

interface searchProps {
  route: string;
  placeholder: string;
  otherClasses: string;
}

const LocalSearch = ({ route, placeholder, otherClasses }: searchProps) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  return (
    <div className="flex items-center gap-2.5 background-light800_darkgradient rounded-[10px] border-1 p-4 h-[56px] w-full light-border-2">
      <Image src={"/icons/search.svg"} alt="Search" width={20} height={20} />
      <Input
        placeholder={placeholder}
        className="border-none shadow-none no-focus outline-none ${otherClasses}"
      />
    </div>
  );
};

export default LocalSearch;
