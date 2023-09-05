"use client";

import { IconType } from "react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import qs from "query-string";
import { categories } from "./navbar/Categories";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    // look through params and parse it to string
    if (params) {
      currentQuery = qs.parse(params.toString());
      // console.log(currentQuery);
    }

    // spread currentQuery and add the new category
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };
    // console.log(updatedQuery);

    // check if a field is already selected and we remove from updatedQuery cause deselected
    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    // generate string
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery, // pass the newest query
      },
      {
        skipNull: true,
      }
    );
    // console.log(url);
    // push it to router
    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? "border-b-neutral-800" : "border-transparent"}
        ${selected ? "text-neutral-8000" : "text-neutral-500"}
        `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
