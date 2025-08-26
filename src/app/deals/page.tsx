import InnerHeader from "@/components/layout/header/inner-header";
import { Metadata } from "next";
import React, { Suspense } from "react";
import DealsContent from "./_components/deals-content";
import Container from "@/components/common/container";
import { DEALS_METADATA } from "@/lib/metadata.pages";

export const metadata: Metadata = DEALS_METADATA;

const DealsPage = () => {
  return (
    <div className="min-h-screen">
      <InnerHeader />
      <Container>
        <Suspense>
          <DealsContent />
        </Suspense>
      </Container>
    </div>
  );
};

export default DealsPage;
