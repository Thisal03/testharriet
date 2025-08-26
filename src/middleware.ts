import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path starts with /category/
  if (pathname.startsWith("/category/")) {
    // Create a new URL with /product-category/ instead
    const newPathname = pathname.replace(/^\/category\//, "/product-category/");
    const newUrl = new URL(newPathname, request.url);

    // Perform a 301 (permanent) or 302 (temporary) redirect
    return NextResponse.redirect(newUrl, 301);
  }

  // Capture 404 errors for monitoring
  if (shouldMonitor404(pathname)) {
    // Add headers for 404 monitoring
    const response = NextResponse.next();
    
    // Add search params as header for monitoring
    if (request.nextUrl.search) {
      response.headers.set("x-search-params", request.nextUrl.search);
    }
    
    // Add referer as header for monitoring
    const referer = request.headers.get("referer");
    if (referer) {
      response.headers.set("x-referer", referer);
    }
    
    // Add user agent for monitoring
    const userAgent = request.headers.get("user-agent");
    if (userAgent) {
      response.headers.set("x-user-agent", userAgent);
    }
    
    // Add IP address for monitoring
    const ip = request.headers.get("x-forwarded-for") || 
               request.headers.get("x-real-ip") || 
               request.headers.get("cf-connecting-ip") ||
               "unknown";
    response.headers.set("x-client-ip", ip);
    
    return response;
  }

  // For all other paths, continue as normal
  return NextResponse.next();
}

function shouldMonitor404(pathname: string): boolean {
  // Skip monitoring for static files, API routes, and known paths
  const skipPaths = [
    "/api/",
    "/_next/",
    "/favicon.ico",
    "/robots.txt",
    "/sitemap.xml",
    "/manifest.json",
    "/sw.js",
    "/workbox-",
    "/assets/",
    "/public/",
    "/images/",
    "/icons/",
    "/locales/",
    "/locations/",
  ];

  return !skipPaths.some(skipPath => pathname.startsWith(skipPath));
}

export const config = {
  matcher: [
    "/category/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json|sw.js|workbox-|assets|public|images|icons|locales|locations).*)",
  ],
};
