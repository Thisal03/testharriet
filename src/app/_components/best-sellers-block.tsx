"use client";
import ProductsBlockCarousel from "@/components/product/products-block-carousel";
import { useBestSellerProductsQuery } from "@/framework/basic-rest/product/get-all-best-seller-products";
import React from "react";

const BestSellersBlock = () => {
  const { data, isLoading, error } = useBestSellerProductsQuery({
    limit: 10,
  });

  return (
    <div>
      <ProductsBlockCarousel
        sectionHeading="Explore Best Sellers"
        products={data?.pages.flatMap((page) => page.products)}
        loading={isLoading}
        error={error?.message}
        type="grid"
      />
    </div>
  );
};

export default BestSellersBlock;
