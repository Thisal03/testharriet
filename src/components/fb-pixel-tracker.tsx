"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useTrafficCapture } from "@/lib/utils/get-traffic-data";
import { sendGTMEvent } from "@next/third-parties/google";

const FBPixelTracker = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { captureTrafficData } = useTrafficCapture();
  const lastTrafficSource = useRef<string | null>(null);

  // Send page_view to dataLayer
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "page_view",
      page_path: pathname,
      page_url: `${window.location.origin}${pathname}?${searchParams}`,
    });
  }, [pathname, searchParams]);

  // Capture traffic source
  useEffect(() => {
    const trafficData = captureTrafficData(searchParams);
    if (
      trafficData?.source &&
      trafficData.source !== lastTrafficSource.current
    ) {
      lastTrafficSource.current = trafficData.source;

      sendGTMEvent({
        event: "traffic_source",
        traffic_type: trafficData.trafficType,
        source: trafficData.source,
        medium: trafficData.medium,
      });
    }
  }, [searchParams, captureTrafficData]);

  return null;
};

export default FBPixelTracker;
