"use client";
import ProductsBlockCarousel from "@/components/product/products-block-carousel";
import { useRelatedProductsQuery } from "@/framework/basic-rest/product/get-related-product";
import React, { useEffect } from "react";

const RelatedProducts = ({
  sectionHeading = "You May Also Like",
  className = "mb-9 lg:mb-10 xl:mb-14",
  slug,
}: {
  sectionHeading?: string;
  className?: string;
  slug: string;
}) => {
  const { data, isLoading, error } = useRelatedProductsQuery(slug, {
    limit: 6,
  });

  // 404 monitoring for missing related products
  useEffect(() => {
    if (!isLoading && !data?.products && !error && slug) {
      // No related products found - trigger 404 monitoring
      fetch("/api/404-monitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: `${window.location.origin}/product/${slug}`,
          referer: document.referrer || null,
          userAgent: navigator.userAgent || null,
          pathname: `/product/${slug}`,
          slug,
          errorType: "related_products",
          httpStatus: 404,
        }),
      }).catch(err => {
        console.error("Error sending 404 notification:", err);
      });
    }
  }, [isLoading, data, error, slug]);

  // Don't render if there's an error, no products, or no slug
  if (error || !data?.products || data.products.length === 0 || !slug) return null;

  return (
    <div className={className}>
      <ProductsBlockCarousel
        sectionHeading={sectionHeading}
        products={data.products}
        loading={isLoading}
        error={error ? String(error) : undefined}
        type="grid"
      />
    </div>
  );
};

export default RelatedProducts;
