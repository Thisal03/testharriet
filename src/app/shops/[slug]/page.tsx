import React from "react";
import InnerHeader from "@/components/layout/header/inner-header";
import Container from "@/components/common/container";
import { notFound } from "next/navigation";
//import { getVendorMetadata } from "@/lib/metadata.pages";
import ShopContent from "./_components/shop-content";
//import { fetchStoreDetails } from "@/framework/basic-rest/product/fetching-store-details";
import { handle404Error } from "@/lib/404-monitor";

// export const generateMetadata = async ({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) => {
//   try {
//     const { slug } = await params;

//     if (!slug) return;

//     const store = await fetchStoreDetails(slug);

//     return getVendorMetadata(store, slug);
//   } catch (error) {
//     console.error("Error generating metadata for shop page:", error);
//     return;
//   }
// };

const ShopPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  if (!slug) {
    await handle404Error(
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://harrietshopping.com'}/shops/`,
      "shop",
      undefined,
      "/shops/"
    );
    notFound();
  }

  return (
    <div className="min-h-screen">
      <InnerHeader />
      <Container>
        <ShopContent slug={slug} />
      </Container>
    </div>
  );
};

export default ShopPage;
