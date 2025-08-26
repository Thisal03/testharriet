"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { FilterCategory } from "@/framework/basic-rest/types";
import { cn, extractStringFromName } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "react-use";
import { X } from "lucide-react";

const ShopFilters = ({
  className,
  categories,
  isLoading,
  slug,
  showStockStatus = true,
  showSortOptions = false,
  categoryHandle,
  includedQueries,
}: {
  className?: string;
  categories: FilterCategory[] | undefined;
  isLoading?: boolean;
  slug: string;
  showStockStatus?: boolean;
  showSortOptions?: boolean;
  categoryHandle?: string;
  includedQueries?: string[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Get current filter values
  const sort_option = searchParams.get("sort_option") || undefined;
  const stock_status = searchParams.get("stock_status") || undefined;
  const initialMinPrice = searchParams.get("minPrice");
  const initialMaxPrice = searchParams.get("maxPrice");

  // State for price inputs with initial values
  const [minPrice, setMinPrice] = useState(initialMinPrice || "");
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice || "");

  // Debounced price values
  const [debouncedMinPrice, setDebouncedMinPrice] = useState(minPrice);
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState(maxPrice);

  useDebounce(
    () => {
      setDebouncedMinPrice(minPrice);
    },
    1000,
    [minPrice]
  );

  useDebounce(
    () => {
      setDebouncedMaxPrice(maxPrice);
    },
    1000,
    [maxPrice]
  );

  // Create query string helper
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  // Update pathname when category changes
  const updatePathname = useCallback(
    (newSlug: string) => {
      const basePath = pathname.replace(/\/[^/]+$/, "");
      const newPathname = `${basePath}${
        categoryHandle ? categoryHandle : ""
      }/${newSlug}`;
      router.replace(`${newPathname}?${searchParams.toString()}`);
    },
    [router, pathname, searchParams]
  );

  // Update query params
  const updateParams = useCallback(
    (name: string, value: string) => {
      router.replace(`${pathname}?${createQueryString(name, value)}`);
    },
    [createQueryString, router, pathname]
  );

  // Handle price changes
  useEffect(() => {
    if (debouncedMinPrice !== initialMinPrice) {
      updateParams("minPrice", debouncedMinPrice);
    }
  }, [debouncedMinPrice, updateParams]);

  useEffect(() => {
    if (debouncedMaxPrice !== initialMaxPrice) {
      updateParams("maxPrice", debouncedMaxPrice);
    }
  }, [debouncedMaxPrice, updateParams]);

  // Clear all filters
  const handleClearAll = () => {
    setMinPrice("");
    setMaxPrice("");

    // Create new URLSearchParams with ONLY the excluded queries
    const newParams = new URLSearchParams();

    // Preserve only the queries we want to keep
    includedQueries?.forEach((query) => {
      const value = searchParams.get(query);
      if (value) {
        newParams.set(query, value);
      }
    });

    // Update the URL
    router.replace(
      newParams.toString() ? `${pathname}?${newParams.toString()}` : pathname
    );
  };

  // Memoized stock status options
  const stockStatusOptions = useMemo(
    () => [
      { slug: "instock", name: "In Stock" },
      { slug: "outofstock", name: "Out of Stock" },
    ],
    []
  );

  // Memoized sort options
  const sortOptions = useMemo(
    () => [
      { name: "Newest", slug: "newest" },
      { name: "Price: Low to High", slug: "low-high" },
      { name: "Price: High to Low", slug: "high-low" },
    ],
    []
  );

  return (
    <div className={cn("px-5 lg:px-0 space-y-6", className)}>
      <div className="flex items-center justify-between mb-2.5">
        <h2 className="text-xl font-semibold text-heading md:text-xl">
          Filters
        </h2>
        <button
          className="flex-shrink text-xs mt-0.5 transition duration-150 ease-in focus:outline-none hover:text-heading"
          aria-label="Clear All"
          onClick={handleClearAll}
        >
          Clear All
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4 capitalize">
        <div className="p-3 text-xs rounded-sm flex items-center border">
          {slug.replace(/-/g, " ")}
        </div>

        {[
          {
            condition: minPrice,
            label: `Min: ${minPrice}`,
            param: "minPrice",
          },
          { condition: maxPrice, label: `Max: ${maxPrice}`, param: "maxPrice" },
          {
            condition: showSortOptions && sort_option,
            label: `Sort: ${
              sortOptions.find((opt) => opt.slug === sort_option)?.name
            }`,
            param: "sort_option",
          },
          {
            condition: showStockStatus && stock_status,
            label: `${
              stockStatusOptions.find((opt) => opt.slug === stock_status)?.name
            }`,
            param: "stock_status",
          },
        ].map(
          ({ condition, label, param }) =>
            condition && (
              <div
                key={param}
                className="p-3 text-xs rounded-sm flex items-center border"
              >
                <span>{label}</span>
                <X
                  className="ml-1 cursor-pointer z-1 size-3"
                  onClick={() => {
                    updateParams(param, "");
                    if (param === "minPrice") setMinPrice("");
                    if (param === "maxPrice") setMaxPrice("");
                  }}
                />
              </div>
            )
        )}
      </div>
      <Separator />

      {/* Stock Status Filter */}
      {showSortOptions && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-heading ">Sort By</h3>
          <RadioGroup
            value={sort_option}
            className="flex flex-col gap-4"
            onValueChange={(value) => updateParams("sort_option", value)}
          >
            {sortOptions.map((option) => (
              <div className="flex items-center space-x-2" key={option.slug}>
                <RadioGroupItem value={option.slug} id={option.slug} />
                <Label htmlFor={option.slug}>{option.name}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      {/* Stock Status Filter */}
      {showStockStatus && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-heading ">Stock Status</h3>
          <RadioGroup
            value={stock_status}
            className="flex gap-4"
            onValueChange={(value) => updateParams("stock_status", value)}
          >
            {stockStatusOptions.map((category) => (
              <div className="flex items-center space-x-2" key={category.slug}>
                <RadioGroupItem value={category.slug} id={category.slug} />
                <Label htmlFor={category.slug}>{category.name}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      {/* Category Filter */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-heading ">Category</h3>
        {isLoading ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <div className="flex items-center mb-2 space-x-3" key={idx}>
              <Skeleton className="w-4 h-4 rounded-full" />
              <Skeleton className="w-40 h-4" />
            </div>
          ))
        ) : categories && categories?.length > 0 ? (
          <RadioGroup value={slug} onValueChange={updatePathname}>
            {categories.map((category) => (
              <div
                className="flex items-center mb-2 space-x-2"
                key={category.slug}
              >
                <RadioGroupItem value={category.slug} id={category.slug} />
                <Label htmlFor={category.slug}>
                  {extractStringFromName(category.name)}
                </Label>
              </div>
            ))}
          </RadioGroup>
        ) : (
          <p className="text-sm text-gray-700">No categories available</p>
        )}
      </div>

      <Separator />

      {/* Price Range Filter */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-heading ">Price Range</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="minPrice">Min</Label>
            <Input
              id="minPrice"
              type="number"
              placeholder="Min price"
              className="rounded-none"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              min={0}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="maxPrice">Max</Label>
            <Input
              id="maxPrice"
              type="number"
              placeholder="Max price"
              className="rounded-none"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              min={minPrice || 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopFilters;
