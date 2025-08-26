import React from "react";
import CheckoutCard from "./_components/checkout-card";
import CheckoutForm from "./_components/checkout-form";
import Container from "@/components/common/container";
import { CHECKOUT_METADATA } from "@/lib/metadata.pages";
import { Metadata } from "next";

export const metadata: Metadata = CHECKOUT_METADATA;

const CheckoutPage = () => {
  return (
    <Container>
      <div className="flex flex-col w-full min-h-screen px-0 py-6 mx-auto xl:py-14 2xl:max-w-screen-2xl xl:max-w-screen-xl md:flex-row">
        <div className="flex flex-col h-full md:w-full lg:w-3/5 ">
          <CheckoutForm />
        </div>
        <div className="flex flex-col h-full md:w-full lg:w-2/5 ltr:md:ml-7 rtl:md:mr-7 ltr:lg:ml-10 rtl:lg:mr-10 ltr:xl:ml-14 rtl:xl:mr-14">
          <CheckoutCard />
        </div>
      </div>
    </Container>
  );
};

export default CheckoutPage;
