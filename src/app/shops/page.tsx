import Container from "@/components/common/container";
import Subscription from "@/components/common/subscription";
import InnerHeader from "@/components/layout/header/inner-header";
import React, { Suspense } from "react";
import ShopsContent from "./_components/shops-content";
import Breadcrumbs from "@/components/common/breadcrumbs";

const ShopsPage = () => {
  return (
    <div className="min-h-screen">
      <InnerHeader />
      <Container className="py-6 sm:py-10 lg:py-16">
        <Breadcrumbs />
        <Suspense>
          <ShopsContent />
        </Suspense>
        <Subscription />
      </Container>
    </div>
  );
};

export default ShopsPage;
