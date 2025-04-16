"use client";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { formUrlQuery, removeUrlQuery } from "@/lib/url";

const filters = [
  { name: "React", value: "react" },
  { name: "Javascript", value: "javascript" },
  /* { name: "Newest", value: "newest" },
  { name: "Popular", value: "popular" },
  { name: "Unanswered", value: "unanswered" },
  { name: "Recomended", value: "recomended" }, */
];
const HomeFilter = () => {
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("filter") || "";
  const router = useRouter();
  const [active, setActive] = useState(filterParams);
  const handleFilterClick = (filter: string) => {
    let newUrl = "";
    if (filter === active) {
      setActive("");
      newUrl = removeUrlQuery(searchParams.toString(), ["filter"]);
    } else {
      setActive(filter);
      newUrl = formUrlQuery(searchParams.toString(), "filter", filter);
    }
    router.push(newUrl)
  };
  return (
    <div className="mt-10 flex-wrap sm:flex gap-3 hidden">
      {filters.map((filter) => (
        <Button
          key={filters.indexOf(filter)}
          onClick={() => handleFilterClick(filter.value)}
          className={cn(
            "body-medium py-3 px-6 rounded-2 shadow-none capitalize",
            active === filter.value
              ? "bg-primary-100 dardk:bg-dark-400 primary-text-gradient"
              : "background-light800_dark300 text-light-500",
          )}
        >
          {filter.value}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilter;
