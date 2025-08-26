import CheckoutHeader from "@/components/layout/header/checkout-header";
import { CHECKOUT_METADATA } from "@/lib/metadata.pages";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = CHECKOUT_METADATA;

const TrackingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-200">
      <CheckoutHeader />
      {children}
    </div>
  );
};

export default TrackingLayout;
