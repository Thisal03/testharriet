"use client";
import ShopFilters from "@/components/category/filters/shop-filters";
import ShopFiltersMenu from "@/components/category/filters/shop-filters-menu";
import Breadcrumbs from "@/components/common/breadcrumbs";
import { useProductsByCategory } from "@/framework/basic-rest/product/get-products-by-category";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import Text from "@/components/ui/text";
import ProductsBlock from "@/components/product/products-block";
import PaginationComponent from "@/components/category/pagination-component";
import { NotFoundItem } from "@/components/not-found-section";
import { sendGTMEvent } from "@next/third-parties/google";
import { getCookie } from "cookies-next";
import { Skeleton } from "@/components/ui/skeleton";

const CategoryContent = ({ slug }: { slug: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Get and parse search params with proper type handling
  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");
  const stock_status = searchParams.get("stock_status");
  const pageParam = searchParams.get("page");
  const perPageParam = searchParams.get("perPage");

  // Convert params to proper types with fallbacks
  const minPrice = minPriceParam ? parseInt(minPriceParam) : undefined;
  const maxPrice = maxPriceParam ? parseInt(maxPriceParam) : undefined;
  const page = pageParam ? parseInt(pageParam) : 1;
  const itemsPerPage = perPageParam ? parseInt(perPageParam) : 30;

  const { data, isLoading, isError } = useProductsByCategory(
    {
      slug,
      stock_status: stock_status || undefined,
      minPrice,
      maxPrice,
    },
    Number(page),
    Number(itemsPerPage)
  );

  // Client-side 404 monitoring for missing categories
  useEffect(() => {
    if (!isLoading && isError) {
      // Trigger 404 monitoring
      const url = `${window.location.origin}/product-category/${slug}`;
      fetch("/api/404-monitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          referer: document.referrer || null,
          userAgent: navigator.userAgent || null,
          pathname: `/product-category/${slug}`,
          slug,
          errorType: "category",
          httpStatus: 404,
        }),
      }).catch(err => {
        console.error("Error sending 404 notification:", err);
      });
    }
  }, [isLoading, isError, slug]);

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

  // Update query params
  const updateParams = useCallback(
    (name: string, value: string) => {
      router.replace(`${pathname}?${createQueryString(name, value)}`);
    },
    [createQueryString, router, pathname]
  );

  const handlePageChange = (newPage: number) => {
    updateParams("page", newPage.toString());
  };

  useEffect(() => {
    const clickId = searchParams.get("fbclid");

    const contentIds = data?.products.slice(0, 5).map((product) => product.id);

    const fbp = getCookie("_fbp");

    sendGTMEvent({
      event: "view_category",
      content_category: slug,
      content_id: contentIds,
      content_name: slug,
      contents: data?.products.slice(0, 5).map((product) => ({
        id: product.id,
        quantity: product.stock_quantity ?? 1,
      })),
      browser_id: fbp,
      click_id: clickId,
    });
  }, [data]);

  const collectionTitle = slug.toString().split("-").join(" ");
  const totalPages = Math.ceil((data?.total || 0) / itemsPerPage);

  return (
    <div className={`flex pt-8 gap-10 pb-16 lg:pb-20`}>
      <div className="hidden lg:block w-[250px] xl:w-[270px] space-y-10">
        <ShopFilters
          categories={data?.categories}
          isLoading={isLoading}
          slug={slug}
          className="px-0"
        />
      </div>
      <div className="flex-1">
        <Breadcrumbs />
        <div className="flex flex-col items-center justify-between w-full my-4 md:flex-row">
          <Text variant="pageHeading" className="inline-flex pb-1 capitalize">
            {collectionTitle} {slug && "Collection"}
          </Text>
          <div className="flex items-center justify-end">
            <div className="flex-shrink-0 text-xs leading-4 text-body md:text-sm ltr:pr-4 rtl:pl-4 ltr:md:mr-6 rtl:md:ml-6 ltr:pl-2 rtl:pr-2">
              {isLoading || data?.total === undefined ? (
                <Skeleton className="h-4 w-[100px]" />
              ) : (
                `Showing ${data.total} items`
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <ShopFiltersMenu
            categories={data?.categories}
            isLoading={isLoading}
            slug={slug}
            totalItems={data?.total}
          />
        </div>
        <ProductsBlock
          sectionHeading={""}
          loading={isLoading}
          products={data?.products}
          productsLimit={itemsPerPage}
          skeletonLimit={itemsPerPage}
          type="gridSlim"
          gridClassName="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4"
        />
        {!data?.products && (
          <NotFoundItem
            title="No products found"
            subtitle="Try adjusting your filters or search terms."
          />
        )}
        {totalPages > 1 && (
          <PaginationComponent
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryContent;
