import InnerHeader from "@/components/layout/header/inner-header";
import React, { Suspense } from "react";
import Container from "@/components/common/container";
import SearchContent from "./_components/search-content";

const SearchPage = () => {
  return (
    <div className="min-h-screen">
      <InnerHeader />
      <Container>
        <Suspense>
          <SearchContent />
        </Suspense>
      </Container>
    </div>
  );
};

export default SearchPage;
