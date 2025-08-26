"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import FilterIcon from "../../icons/filter-icon";
import ShopFilters from "./shop-filters";
import { ScrollArea } from "../../ui/scroll-area";
import { IoClose } from "react-icons/io5";
import { FilterCategory } from "@/framework/basic-rest/types";

const ShopFiltersMenu = ({
  className,
  categories,
  isLoading,
  slug,
  totalItems,
  showStockStatus = true,
  showSortOptions = false,
  categoryHandle,
  includedQueries,
}: {
  className?: string;
  categories: FilterCategory[] | undefined;
  isLoading?: boolean;
  slug: string;
  totalItems?: number;
  showStockStatus?: boolean;
  showSortOptions?: boolean;
  categoryHandle?: string;
  includedQueries?: string[];
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="flex items-center px-4 py-2 text-sm font-semibold transition duration-200 ease-in-out border border-gray-300 rounded-md lg:hidden text-heading focus:outline-none hover:bg-gray-200">
          <FilterIcon />
          <span className="ltr:pl-2.5 rtl:pr-2.5">Filters</span>
        </button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="w-full m-0 text-xl font-bold md:text-2xl text-heading ltr:pr-6 rtl:pl-6">
            Filters
          </h2>
          <SheetClose asChild>
            <button
              className="text-2xl text-gray-500 transition-opacity hover:opacity-60"
              aria-label="close"
            >
              <IoClose className="text-black" />
            </button>
          </SheetClose>
        </div>
        <ScrollArea className="h-[calc(100dvh-10em)]">
          <ShopFilters
            categories={categories}
            isLoading={isLoading}
            slug={slug}
            showStockStatus={showStockStatus}
            categoryHandle={categoryHandle}
            showSortOptions={showSortOptions}
            includedQueries={includedQueries}
          />
        </ScrollArea>
        <SheetFooter className="flex items-center justify-center flex-shrink-0 text-sm leading-4 text-white md:text-base px-7 bg-heading">
          {totalItems || 0} Items
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ShopFiltersMenu;
