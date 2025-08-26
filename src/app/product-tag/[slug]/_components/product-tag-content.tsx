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
import { useTagProductsQuery } from "@/framework/basic-rest/tag/fetch-tag";

const ProductTagContent = ({ slug }: { slug: string }) => {
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

  const { data, isLoading, isError } = useTagProductsQuery(
    {
      slug,
      stock_status: stock_status || undefined,
      minPrice,
      maxPrice,
    },
    Number(page),
    Number(itemsPerPage)
  );

  // Client-side 404 monitoring for missing tags
  useEffect(() => {
    if (!isLoading && isError) {
      // Trigger 404 monitoring
      const url = `${window.location.origin}/product-tag/${slug}`;
      fetch("/api/404-monitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          referer: document.referrer || null,
          userAgent: navigator.userAgent || null,
          pathname: `/product-tag/${slug}`,
          slug,
          errorType: "tag",
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

  const collectionTitle = slug.toString().split("-").join(" ");
  const totalPages = Math.ceil((data?.total || 0) / itemsPerPage);

  return (
    <div className={`flex pt-8 gap-10 pb-16 lg:pb-20`}>
      <div className="hidden lg:block w-[250px] xl:w-[270px] space-y-10">
        <ShopFilters
          categories={data?.categories}
          isLoading={isLoading}
          slug={slug}
          className="px-0 sticky top-[15vh]"
        />
      </div>
      <div className="flex-1">
        {/* <Breadcrumbs /> */}
        <div className="flex flex-col items-center justify-between w-full my-4 md:flex-row">
          <Text variant="pageHeading" className="inline-flex pb-1 capitalize">
            Explore Collection
          </Text>
          <div className="flex items-center justify-end">
            <div className="flex-shrink-0 text-xs leading-4 text-body md:text-sm ltr:pr-4 rtl:pl-4 ltr:md:mr-6 rtl:md:ml-6 ltr:pl-2 rtl:pr-2">
              Showing {data?.total || 0} items
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

export default ProductTagContent;
