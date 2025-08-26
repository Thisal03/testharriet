"use client";
import Breadcrumbs from "@/components/common/breadcrumbs";
import React, { useMemo, useEffect } from "react";
import Text from "@/components/ui/text";
import ProductsBlock from "@/components/product/products-block";
import { NotFoundItem } from "@/components/not-found-section";
import { useStoreDetails } from "@/framework/basic-rest/product/fetching-store-details";
import { useProductsByVendor } from "@/framework/basic-rest/product/fetch-vendor-products";
import { Skeleton } from "@/components/ui/skeleton";
import { Store } from "lucide-react";
import PaginationComponent from "@/components/category/pagination-component";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const ShopContent = ({ slug }: { slug: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { page, perPage } = useMemo(() => {
    return {
      page: searchParams.get("page")
        ? parseInt(searchParams.get("page")!)
        : 1,
      perPage: searchParams.get("perPage")
        ? parseInt(searchParams.get("perPage")!)
        : 35,
    };
  }, [searchParams]);

  const {
    data: storeDetails,
    isLoading: storeLoading,
    isError: storeError,
  } = useStoreDetails(slug);

  const {
    data: productsData,
    isLoading: productsLoading,
    isError: productsError,
  } = useProductsByVendor({
    slug,
    page,
    perPage,
  });

  // Handle 404 errors
  useEffect(() => {
    if (!storeLoading && storeError) {
      // Trigger 404 monitoring
      const url = `${window.location.origin}/shops/${slug}`;
      fetch("/api/404-monitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          referer: document.referrer || null,
          userAgent: navigator.userAgent || null,
          pathname: `/shops/${slug}`,
          slug,
          errorType: "shop",
          httpStatus: 404,
        }),
      }).catch(err => {
        console.error("Error sending 404 notification:", err);
      });
    }
  }, [storeLoading, storeError, slug]);

  const products = productsData?.products || [];
  const totalCount = productsData?.totalCount || 0;
  const totalPages = productsData?.totalPages || 0;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    if (newPage === 1) {
      params.delete("page");
    } else {
      params.set("page", newPage.toString());
    }

    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl);
  };

  return (
    <div className={`flex pt-8 gap-10 pb-16 lg:pb-20`}>
      <div className="flex-1">
        <Breadcrumbs />
        {storeLoading ? (
          <Skeleton className="w-full h-10 my-4" />
        ) : (
          <div className="flex flex-col items-center justify-between w-full my-4 md:flex-row">
            <div className="flex items-center gap-4 pb-1">
              <Store />
              <Text variant="pageHeading" className="inline-flex capitalize">
                {storeDetails?.store_name}
              </Text>
            </div>
            <div className="flex items-center justify-end">
              <div className="flex-shrink-0 text-xs leading-4 text-body md:text-sm ltr:pr-4 rtl:pl-4 ltr:md:mr-6 rtl:md:ml-6 ltr:pl-2 rtl:pr-2">
                {productsLoading ? (
                  <Skeleton className="h-4 w-[100px]" />
                ) : (
                  `Showing ${products.length} of ${totalCount} items`
                )}
              </div>
            </div>
          </div>
        )}
        <ProductsBlock
          sectionHeading={""}
          loading={productsLoading}
          products={products}
          productsLimit={Infinity}
          skeletonLimit={perPage}
          type="gridSlim"
          showStockStatus={true}
        />
        {!productsLoading && !products?.length && (
          <NotFoundItem
            title="No products found"
            subtitle="The vendor has not added any products yet."
          />
        )}
        {!productsLoading && totalPages > 1 && (
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

export default ShopContent;
