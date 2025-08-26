"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import { useSearchQuery } from "@/framework/basic-rest/product/use-search";

const SearchContent = () => {
  const searchParams = useSearchParams();

  // Memoized search params parsing
  const { minPrice, maxPrice, sortOption, itemsPerPage, searchQuery } =
    useMemo(() => {
      const minPriceParam = searchParams.get("minPrice");
      const maxPriceParam = searchParams.get("maxPrice");

      return {
        minPrice: minPriceParam ? parseInt(minPriceParam) : undefined,
        maxPrice: maxPriceParam ? parseInt(maxPriceParam) : undefined,
        sortOption: searchParams.get("sort_option") || "",
        itemsPerPage: searchParams.get("perPage")
          ? parseInt(searchParams.get("perPage")!)
          : 30,
        searchQuery: searchParams.get("q") || "",
      };
    }, [searchParams]);

  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useSearchQuery({
      searchText: searchQuery,
      limit: itemsPerPage,
      minPrice,
      maxPrice,
      sortOption,
    });

  const [categories, setCategories] = useState<any[]>([]);
  const [shuffledProducts, setShuffledProducts] = useState<Product[]>([]);

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

  return (
    <div className="flex gap-10 pt-8 pb-16 lg:pb-20">
      <div className="hidden lg:block w-[300px] space-y-10">
        <ShopFilters
          categories={categories}
          isLoading={isLoading}
          slug="search"
          className="px-0 sticky top-[15vh]"
          showStockStatus={false}
          showSortOptions
          categoryHandle="/product-category"
          includedQueries={["q"]}
        />
      </div>

      <div className="flex-1">
        <Breadcrumbs />

        <div className="flex flex-col items-center justify-between w-full my-4 md:flex-row">
          <Text variant="pageHeading" className="inline-flex pb-1 capitalize">
            Search Results {searchQuery && `for "${searchQuery}"`}
          </Text>
          <div className="flex items-center justify-end">
            <div className="flex-shrink-0 text-xs leading-4 text-body md:text-sm ltr:pr-4 rtl:pl-4 ltr:md:mr-6 rtl:md:ml-6 ltr:pl-2 rtl:pr-2">
              Showing {totalItems} items
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <ShopFiltersMenu
            categories={categories}
            isLoading={isLoading}
            slug="search"
            totalItems={totalItems}
            showStockStatus={false}
            showSortOptions
            categoryHandle="/product-category"
            includedQueries={["q"]}
          />
        </div>

        <ProductsBlock
          sectionHeading=""
          loading={isLoading}
          products={shuffledProducts}
          productsLimit={totalItems || itemsPerPage}
          skeletonLimit={totalItems || itemsPerPage}
          type="gridSlim"
        />

        {!shuffledProducts.length && (
          <NotFoundItem
            title="No search results found"
            subtitle="Try searching with different keywords or filters."
          />
        )}

        {hasNextPage && (
          <div className="flex justify-center">
            <Button
              onClick={handleLoadMore}
              disabled={!hasNextPage || isFetchingNextPage}
              className="p-6 rounded-sm"
            >
              Load More{" "}
              {isFetchingNextPage && <Loader2 className="animate-spin" />}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchContent;
