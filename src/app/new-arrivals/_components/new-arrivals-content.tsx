"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { shuffle } from "lodash";
import { Loader2 } from "lucide-react";
import Text from "@/components/ui/text";
import type { Product } from "@/framework/basic-rest/types";
import ShopFilters from "@/components/category/filters/shop-filters";
import Breadcrumbs from "@/components/common/breadcrumbs";
import ShopFiltersMenu from "@/components/category/filters/shop-filters-menu";
import ProductsBlock from "@/components/product/products-block";
import { NotFoundItem } from "@/components/not-found-section";
import { Button } from "@/components/ui/button";
import { useNewArrivalProductsQuery } from "@/framework/basic-rest/product/get-all-new-arrival-products";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCardSkeleton } from "@/components/product/product-card";

const NewArrivalsContent = () => {
  const searchParams = useSearchParams();

  // Memoized search params parsing
  const { minPrice, maxPrice, sortOption, itemsPerPage } = useMemo(() => {
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");

    return {
      minPrice: minPriceParam ? parseInt(minPriceParam) : undefined,
      maxPrice: maxPriceParam ? parseInt(maxPriceParam) : undefined,
      sortOption: searchParams.get("sort_option") || "",
      itemsPerPage: searchParams.get("perPage")
        ? parseInt(searchParams.get("perPage")!)
        : 30,
    };
  }, [searchParams]);

  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useNewArrivalProductsQuery({
      limit: itemsPerPage,
      minPrice,
      maxPrice,
      sortOption,
    });

  const [categories, setCategories] = useState<any[]>([]);
  const [shuffledProducts, setShuffledProducts] = useState<Product[]>([]);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Calculate total items and all products
  const { totalItems, allProducts } = useMemo(() => {
    if (!data) return { totalItems: 0, allProducts: [] };

    const allProducts = data.pages.flatMap((page) => page.products);
    return {
      totalItems: allProducts.length,
      allProducts,
    };
  }, [data]);

  // Filter and shuffle products
  useEffect(() => {
    if (!allProducts.length) return;

    const filteredProducts = allProducts.filter((product) => {
      const price = parseInt(product.variations?.[0]?.price || product.price);
      return (
        (minPrice === undefined || price >= minPrice) &&
        (maxPrice === undefined || price <= maxPrice)
      );
    });

    setShuffledProducts(
      sortOption ? filteredProducts : shuffle(filteredProducts)
    );

    // Extract unique categories
    const uniqueCategories = Array.from(
      new Set(
        allProducts.flatMap(
          (product) =>
            product.categories?.map((category) => JSON.stringify(category)) ||
            []
        )
      )
    ).map((category) => JSON.parse(category));

    setCategories(uniqueCategories);
  }, [allProducts, minPrice, maxPrice, sortOption]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore();
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );
    observer.observe(sentinel);
    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, handleLoadMore]);

  return (
    <div className="flex gap-10 pt-8 pb-16 lg:pb-20">
      <div className="hidden lg:block w-[250px] xl:w-[270px] space-y-10">
        <ShopFilters
          categories={categories}
          isLoading={isLoading}
          slug="new-arrivals"
          className="px-0"
          showStockStatus={false}
          showSortOptions
          categoryHandle="/product-category"
        />
      </div>

      <div className="flex-1">
        <Breadcrumbs />

        <div className="flex flex-col items-center justify-between w-full my-4 md:flex-row">
          <Text variant="pageHeading" className="inline-flex pb-1 capitalize">
            New Arrivals
          </Text>
          <div className="flex items-center justify-end">
            <div className="flex-shrink-0 text-xs leading-4 text-body md:text-sm ltr:pr-4 rtl:pl-4 ltr:md:mr-6 rtl:md:ml-6 ltr:pl-2 rtl:pr-2">
              {isLoading ? (
                <Skeleton className="h-4 w-[100px]" />
              ) : (
                `Showing ${totalItems} items`
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <ShopFiltersMenu
            categories={categories}
            isLoading={isLoading}
            slug="new-arrivals"
            totalItems={totalItems}
            showStockStatus={false}
            showSortOptions
            categoryHandle="/product-category"
          />
        </div>

        <ProductsBlock
          sectionHeading=""
          loading={isLoading}
          products={shuffledProducts}
          productsLimit={totalItems || itemsPerPage}
          skeletonLimit={itemsPerPage}
          type="gridSlim"
          showNewTag
          gridClassName="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4"
        />

        {!isLoading && !allProducts.length && (
          <NotFoundItem
            title="No New Arrivals"
            subtitle="Check back soon for new products!"
          />
        )}

        {/* Infinite scroll loading skeleton */}
        {isFetchingNextPage && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 3xl:grid-cols-6 gap-4">
            {Array.from({ length: 10 }).map((_, id) => (
              <ProductCardSkeleton key={`skeleton-${id}`} />
            ))}
          </div>
        )}
        {/* Infinite scroll sentinel */}
        {hasNextPage && (
          <div ref={sentinelRef} style={{ height: 40 }} />
        )}
      </div>
    </div>
  );
};

export default NewArrivalsContent;
