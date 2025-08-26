import React from "react";
import InnerHeader from "@/components/layout/header/inner-header";
import Container from "@/components/common/container";
import { notFound } from "next/navigation";
import { fetchCategorySEOData } from "@/framework/basic-rest/seo/category";
import ProductTagContent from "./_components/product-tag-content";
import { getCategoryMetadata } from "@/lib/metadata.pages";
import { handle404Error } from "@/lib/404-monitor";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  try {
    const { slug } = await params;

    if (!slug) return;

    const tag = await fetchCategorySEOData(slug);

    return getCategoryMetadata(tag, slug);
  } catch (error) {
    // If tag not found, trigger 404 monitoring
    const { slug } = await params;
    if (slug) {
      await handle404Error(
        `${process.env.NEXT_PUBLIC_SITE_URL || 'https://harrietshopping.com'}/product-tag/${slug}`,
        "tag",
        slug,
        `/product-tag/${slug}`
      );
    }
    return;
  }
};

const ProductTagPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  if (!slug) {
    await handle404Error(
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://harrietshopping.com'}/product-tag/`,
      "tag",
      undefined,
      "/product-tag/"
    );
    notFound();
  }

  return (
    <div className="min-h-screen">
      <InnerHeader />
      <Container>
        <ProductTagContent slug={slug} />
      </Container>
    </div>
  );
};

export default ProductTagPage;
