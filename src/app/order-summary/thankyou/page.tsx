import React, { Suspense } from "react";
import ThankyouContent from "../_components/thankyou-content";

const ThankyouPage = () => {
  return (
    <Suspense>
      <ThankyouContent />
    </Suspense>
  );
};

export default ThankyouPage;
