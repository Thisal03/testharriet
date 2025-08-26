import InnerHeader from "@/components/layout/header/inner-header";
import { TRACKING_METADATA } from "@/lib/metadata.pages";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = TRACKING_METADATA;

const TrackingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <InnerHeader />
      <Suspense>{children}</Suspense>
    </div>
  );
};

export default TrackingLayout;
