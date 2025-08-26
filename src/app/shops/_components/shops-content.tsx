"use client";
import { useShopsQuery } from "@/framework/basic-rest/shop/get-shops";
import React, { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import VendorsBlock from "./vendors-block";
import PaginationComponent from "@/components/category/pagination-component";
import { NotFoundItem } from "@/components/not-found-section";

const ShopsContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const pageParam = searchParams.get("page");
  const perPageParam = searchParams.get("perPage");

  const page = pageParam ? parseInt(pageParam) : 1;
  const itemsPerPage = perPageParam ? parseInt(perPageParam) : 30;

  const { data, isLoading, error } = useShopsQuery(
    {},
    Number(page),
    Number(itemsPerPage)
  );

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

  const updateParams = useCallback(
    (name: string, value: string) => {
      router.replace(`${pathname}?${createQueryString(name, value)}`);
    },
    [createQueryString, router, pathname]
  );

  const handlePageChange = (newPage: number) => {
    updateParams("page", newPage.toString());
  };

  const totalPages = Math.ceil(data?.total ? data.total / itemsPerPage : 1);
  const visibleShops = data?.shops?.filter(
    (shop) => shop.enabled && shop.store_name && shop.featured
  );

  return (
    <div className="pt-4 pb-10">
      <VendorsBlock
        shops={visibleShops}
        productsLimit={itemsPerPage}
        skeletonLimit={itemsPerPage}
        sectionHeading={"Discover Vendors"}
        loading={isLoading}
      />
      {!visibleShops?.length && (
        <NotFoundItem
          title="No shops found"
          subtitle="It seems we couldn't find any shops."
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
  );
};

export default ShopsContent;
