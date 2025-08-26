import React from "react";
import InnerHeader from "@/components/layout/header/inner-header";
import Container from "@/components/common/container";
import { notFound } from "next/navigation";
import { fetchCategorySEOData } from "@/framework/basic-rest/seo/category";
import CategoryContent from "./_components/category-content";
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

    const category = await fetchCategorySEOData(slug);

    return getCategoryMetadata(category, slug);
  } catch (error) {
    // If category not found, trigger 404 monitoring
    const { slug } = await params;
    if (slug) {
      await handle404Error(
        `${process.env.NEXT_PUBLIC_SITE_URL || 'https://harrietshopping.com'}/product-category/${slug}`,
        "category",
        slug,
        `/product-category/${slug}`
      );
    }
    return;
  }
};

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  if (!slug) {
    await handle404Error(
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://harrietshopping.com'}/product-category/`,
      "category",
      undefined,
      "/product-category/"
    );
    notFound();
  }

  return (
    <div className="min-h-screen">
      <InnerHeader />
      <Container>
        <CategoryContent slug={slug} />
      </Container>
    </div>
  );
};

export default CategoryPage;
