import InnerHeader from "@/components/layout/header/inner-header";
import { Metadata } from "next";
import React, { Suspense } from "react";
import Container from "@/components/common/container";
import { NEW_ARRIVALS_METADATA } from "@/lib/metadata.pages";
import NewArrivalsContent from "./_components/new-arrivals-content";

export const metadata: Metadata = NEW_ARRIVALS_METADATA;

const NewArrivalsPage = () => {
  return (
    <div className="min-h-screen">
      <InnerHeader />
      <Container>
        <Suspense>
          <NewArrivalsContent />
        </Suspense>
      </Container>
    </div>
  );
};

export default NewArrivalsPage;
