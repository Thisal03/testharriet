import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import BottomNavigation from "@/components/layout/bottom-navigation";
import Footer from "@/components/layout/footer/footer-two";
import ReactQueryClientProvider from "@/components/query-client-provider";
import { Toaster } from "@/components/ui/sonner";
import FBPixelTracker from "@/components/fb-pixel-tracker";
import { HOME_METADATA } from "@/lib/metadata.pages";
import { GoogleTagManager } from "@next/third-parties/google";
import { Suspense } from "react";
import { Check, X } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = HOME_METADATA;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scrollbar-thin">
      <head>
        {/* Viewport meta tag for safe area support */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?                         
              n.callMethod.apply(n,arguments):n.queue.push   
              (arguments)}; if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!
              0;n.version='2.0';n.queue=[];t=b.createElement(e);
              t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,
              'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${
              process.env.NEXT_PUBLIC_PIXEL_ID as string
            }&ev=PageView&noscript=1`}
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body className={`${inter.className} antialiased`}>
        <ReactQueryClientProvider>
          <ThemeProvider
            attribute="class"
            forcedTheme="light"
            disableTransitionOnChange
          >
            {children}
            <Footer />
            <BottomNavigation />
            <Toaster
              position="top-right"
              closeButton
              icons={{
                success: (
                  <div className="bg-green-500 rounded-full text-white p-1">
                    <Check className="size-2.5" />
                  </div>
                ),
                error: (
                  <div className="bg-red-500 rounded-full text-white p-1">
                    <X className="size-2.5" />
                  </div>
                ),
              }}
            />
          </ThemeProvider>
          <Suspense>
            <FBPixelTracker />
          </Suspense>
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID as string} />
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
