import React from "react";
import InnerHeader from "@/components/layout/header/inner-header";
import Container from "@/components/common/container";
import Subscription from "@/components/common/subscription";
import RelatedProducts from "./_components/related-products";
import ProductInfo from "./_components/product-info";
import { notFound } from "next/navigation";
import { fetchProductSEOData } from "@/framework/basic-rest/seo/product";
import { getProductMetadata } from "@/lib/metadata.pages";
import RecentProducts from "./_components/recent-products";
import { handle404Error } from "@/lib/404-monitor";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  try {
    const { slug } = await params;

    if (!slug) return;

    const product = await fetchProductSEOData(slug);

    return getProductMetadata(product, slug);
  } catch (error) {
    // If product not found, trigger 404 monitoring
    const { slug } = await params;
    if (slug) {
      await handle404Error(
        `${process.env.NEXT_PUBLIC_SITE_URL || 'https://harrietshopping.com'}/product/${slug}`,
        "product",
        slug,
        `/product/${slug}`
      );
    }
    return;
  }
};

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  if (!slug) {
    await handle404Error(
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://harrietshopping.com'}/product/`,
      "product",
      undefined,
      "/product/"
    );
    notFound();
  }

  return (
    <div className="min-h-screen">
      <InnerHeader />
      <Container>
        <ProductInfo slug={slug} />
        <RelatedProducts slug={slug} />
        <RecentProducts />
        <Subscription />
      </Container>
    </div>
  );
};

export default SingleProductPage;
