"use client";
import ProductsBlockCarousel from "@/components/product/products-block-carousel";
import { useShallowRecentProductsStore } from "@/store/use-recent-products";
import React from "react";

const RecentProducts = ({
  sectionHeading = "Recently Viewed",
  className = "mb-9 lg:mb-10 xl:mb-14",
}: {
  sectionHeading?: string;
  className?: string;
}) => {
  const items = useShallowRecentProductsStore((state) => state.items);

  if (items.length === 0) return null;

  return (
    <div className={className}>
      <ProductsBlockCarousel
        sectionHeading={sectionHeading}
        products={items}
        loading={false}
        type="grid"
      />
    </div>
  );
};

export default RecentProducts;
