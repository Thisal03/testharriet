"use client";
import ProductsBlockCarousel from "@/components/product/products-block-carousel";
import { useRecentProductsQuery } from "@/framework/basic-rest/product/get-recent-products";
import { shuffle } from "lodash";
import React from "react";

const RecentProductFeed = () => {
  const { data, isLoading, error } = useRecentProductsQuery({
    limit: 10,
  });
  return (
    <ProductsBlockCarousel
      sectionHeading="Just For You"
      products={shuffle(data?.products)}
      loading={isLoading}
      error={error?.message}
      uniqueKey="new-arrivals"
      type="grid"
      className="mb-12 md:mb-14 xl:mb-16"
    />
  );
};

export default RecentProductFeed;
