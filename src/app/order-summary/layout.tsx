import InnerHeader from "@/components/layout/header/inner-header";
import { ORDER_SUMMARY_METADATA } from "@/lib/metadata.pages";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = ORDER_SUMMARY_METADATA;

const OrderSummaryLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <InnerHeader />
      {children}
    </div>
  );
};

export default OrderSummaryLayout;
