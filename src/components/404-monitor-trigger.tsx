"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function NotFoundMonitorTrigger() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${window.location.origin}${pathname}${searchParams?.toString() ? `?${searchParams}` : ""}`;
    
    // Determine error type based on pathname
    let errorType: "product" | "category" | "shop" | "tag" | "general" = "general";
    let slug: string | undefined;
    
    if (pathname.startsWith("/product/")) {
      errorType = "product";
      slug = pathname.replace("/product/", "");
    } else if (pathname.startsWith("/product-category/")) {
      errorType = "category";
      slug = pathname.replace("/product-category/", "");
    } else if (pathname.startsWith("/shops/")) {
      errorType = "shop";
      slug = pathname.replace("/shops/", "");
    } else if (pathname.startsWith("/product-tag/")) {
      errorType = "tag";
      slug = pathname.replace("/product-tag/", "");
    }

    console.log("404 monitor trigger mounted", url);
    
    fetch("/api/404-monitor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url,
        referer: document.referrer || null,
        userAgent: navigator.userAgent || null,
        pathname,
        slug,
        errorType,
        httpStatus: 404,
      }),
    }).then(res => res.json().then(data => {
      console.log("404 monitor API response", data);
    })).catch(err => {
      console.error("404 monitor API error", err);
    });
  }, [pathname, searchParams]);

  return null;
} 