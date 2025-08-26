import { Metadata } from "next";
import { createMetadata, DEFAULT_IMAGE } from "./metadata.config";
import { Shop } from "@/framework/basic-rest/types";

export const HOME_METADATA: Metadata = createMetadata({
  title:
    "Harriet | Sri Lanka's Premier Online Fashion Marketplace - Latest Trends & Styles",
  description:
    "Shop the latest trends on Harriet, a marketplace where fashion enthusiasts who love online shopping in Sri Lanka can navigate through a range of choice.",
  alternates: {
    canonical: "/",
  },
});

export const TRACKING_METADATA: Metadata = createMetadata({
  title: "Order Tracking - Real-Time Package Updates | Harriet",
  description:
    "Track your Harriet order in real-time. Get instant updates on your delivery status and estimated arrival date with our easy order tracking system.",
  alternates: {
    canonical: "/tracking",
  },
});

export const NEW_ARRIVALS_METADATA: Metadata = createMetadata({
  title: "New Arrivals - Latest Fashion Trends in Sri Lanka | Harriet",
  description:
    "Be the first to discover our new arrivals! Explore the newest fashion collections at Harriet - fresh styles delivered weekly to keep your wardrobe current.",
  alternates: {
    canonical: "/new-arrivals",
  },
});

export const BEST_SELLERS_METADATA: Metadata = createMetadata({
  title: "Best Sellers - Most Popular Fashion Items | Harriet",
  description:
    "Shop our customer favorites! Discover Harriet's best-selling clothing and accessories in Sri Lanka - curated based on what our shoppers love most.",
  alternates: {
    canonical: "/best-sellers",
  },
});

export const DEALS_METADATA: Metadata = createMetadata({
  title: "Special Offers & Fashion Deals in Sri Lanka | Harriet",
  description:
    "Save big on trendy fashion! Enjoy exclusive deals, limited-time offers, and special discounts on men's, women's and kids' clothing at Harriet.",
  alternates: {
    canonical: "/deals",
  },
});

export const CHECKOUT_METADATA: Metadata = createMetadata({
  title: "Checkout | Complete Your Purchase | Harriet",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
  },
});

export const ORDER_SUMMARY_METADATA: Metadata = createMetadata({
  title: "Order Summary - Review Your Purchase | Harriet",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
  },
});

export const ABOUT_US_METADATA: Metadata = createMetadata({
  title: "About Harriet - Sri Lanka's Fashion Marketplace Leader",
  description:
    "Discover Harriet's story - Sri Lanka's fastest-growing online fashion marketplace. Learn about our mission to make trendy fashion accessible to everyone.",
  alternates: {
    canonical: "/about-us",
  },
});

export const CONTACT_US_METADATA: Metadata = createMetadata({
  title: "Contact Harriet Customer Support | We're Here to Help",
  description:
    "Need assistance? Contact Harriet's customer service team via phone, email, or live chat. We're available to help with orders, returns, and fashion advice.",
  alternates: {
    canonical: "/contact-us",
  },
});

export const FAQ_METADATA: Metadata = createMetadata({
  title: "Frequently Asked Questions - Shopping Help | Harriet",
  description:
    "Find quick answers to common questions about ordering, shipping, returns, sizing, and more at Harriet - Sri Lanka's favorite fashion marketplace.",
  alternates: {
    canonical: "/faq",
  },
});

export const RETURNSEXCHANGES_METADATA: Metadata = createMetadata({
  title: "Returns & Exchanges Policy | Harriet",
  description:
    "Shop with confidence! Harriet offers easy 14-day returns and exchanges on all fashion items. Learn how to return or exchange your purchase.",
  alternates: {
    canonical: "/returns-exchanges",
  },
});

export const TERMSCONDITIONS_METADATA: Metadata = createMetadata({
  title: "Terms & Conditions - Harriet Online Fashion Store",
  description:
    "Review Harriet's terms and conditions for online shopping. Understand your rights and responsibilities when purchasing from Sri Lanka's fashion marketplace.",
  alternates: {
    canonical: "/terms-conditions",
  },
});

export const PRIVACYPOLICY_METADATA: Metadata = createMetadata({
  title: "Privacy Policy - Your Data Security | Harriet",
  description:
    "Learn how Harriet protects your personal information and respects your privacy. We're committed to keeping your data secure when you shop with us.",
  alternates: {
    canonical: "/privacy-policy",
  },
});

export const getCategoryMetadata = (category: any, slug: string): Metadata => {
  const title =
    category?.rank_math?.meta_title ||
    `Shop ${category?.name || "Fashion"} Online in Sri Lanka | Harriet`;
  const description =
    category?.rank_math?.meta_description ||
    category?.short_description ||
    category?.description?.slice(0, 160) ||
    `Explore our ${
      category?.name || "latest"
    } collection at Harriet. Discover trendy styles, perfect fits, and great prices with delivery across Sri Lanka.`;

  const image = category?.image || DEFAULT_IMAGE;

  return createMetadata({
    title,
    description,
    alternates: {
      canonical: `/product-category/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/product-category/${slug}`,
      images: [{ url: image, alt: title }],
    },
    keywords: category?.rank_math?.meta_keywords?.split(",") || [],
  });
};

export const getProductMetadata = (product: any, slug: string): Metadata => {
  const title =
    product?.rank_math?.meta_title ||
    `Buy ${product?.name || "Fashion Item"} Online | Harriet Sri Lanka`;
  const description =
    product?.rank_math?.meta_description ||
    product?.short_description ||
    product?.description?.slice(0, 160) ||
    `Shop ${
      product?.name || "this product"
    } at Harriet. Enjoy premium quality, perfect fit, and trending products across Sri Lanka.`;

  const image = product?.image || DEFAULT_IMAGE;

  return createMetadata({
    title,
    description,
    alternates: {
      canonical: `/product/${slug}`,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: `/product/${slug}`,
      images: [{ url: image, alt: title }],
    },
    keywords: product?.rank_math?.meta_keywords?.split(",") || [],
  });
};

export const getVendorMetadata = (store: Shop, slug: string): Metadata => {
  const title = store?.store_name
    ? `${store.store_name} - Official Store | Harriet Marketplace`
    : "Featured Vendors - Shop Independent Designers | Harriet";
  const description = store?.store_name
    ? `Shop directly from ${store.store_name}'s official store on Harriet. Discover unique collections, exclusive designs, and support local Sri Lankan fashion.`
    : `Discover independent designers and boutique vendors on Harriet Marketplace. Shop unique fashion directly from Sri Lanka's most creative designers.`;

  const image = store.banner || DEFAULT_IMAGE;

  return createMetadata({
    title,
    description,
    alternates: {
      canonical: `/shops/${slug}`,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: `/shops/${slug}`,
      images: [{ url: image, alt: title }],
    },
    keywords: [
      store.store_name,
      store.store_name?.toLowerCase(),
      "Harriet",
      "Sri Lanka fashion",
      "independent designers",
      "boutique clothing",
    ],
  });
};
