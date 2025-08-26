import React, { Suspense } from "react";
import FailedContent from "../_components/failed-content";

const FailedPage = () => {
  return (
    <Suspense>
      <FailedContent />
    </Suspense>
  );
};

export default FailedPage;
