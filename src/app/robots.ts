import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/admin/", "/api/", "/cgi-bin/"],
    },
    sitemap: `${
      process.env.NEXT_PUBLIC_BASE_URL || "https://web.harrietshopping.com"
    }/sitemap.xml`,
  };
}
