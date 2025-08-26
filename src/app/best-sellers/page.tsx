import InnerHeader from "@/components/layout/header/inner-header";
import { Metadata } from "next";
import React, { Suspense } from "react";
import Container from "@/components/common/container";
import { BEST_SELLERS_METADATA } from "@/lib/metadata.pages";
import BestSellersContent from "./_components/best-sellers-content";

export const metadata: Metadata = BEST_SELLERS_METADATA;

const BestSellersPage = () => {
  return (
    <div className="min-h-screen">
      <InnerHeader />
      <Container>
        <Suspense>
          <BestSellersContent />
        </Suspense>
      </Container>
    </div>
  );
};

export default BestSellersPage;
