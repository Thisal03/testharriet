import Container from "@/components/common/container";
import PageHeader from "@/components/common/page-header";
import Subscription from "@/components/common/subscription";
import React from "react";
import ContactInfoBlock from "./_components/contact-info-block";
import ContactForm from "./_components/contact-form";
import InnerHeader from "@/components/layout/header/inner-header";
import { CONTACT_US_METADATA } from "@/lib/metadata.pages";

export const metadata = CONTACT_US_METADATA;

const ContactUsPage = () => {
  return (
    <div>
      <InnerHeader />
      <PageHeader pageHeader="Contact Us" pageSubHeader={""} />
      <Container>
        <div className="my-14 lg:my-16 xl:my-20 px-0 pb-2 lg: xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full">
          <div className="md:w-full lg:w-2/5 2xl:w-2/6 flex flex-col h-full">
            <ContactInfoBlock />
          </div>
          <div className="md:w-full lg:w-3/5 2xl:w-4/6 flex h-full ltr:md:ml-7 rtl:md:mr-7 flex-col ltr:lg:pl-7 rtl:lg:pr-7">
            <div className="flex pb-7 md:pb-9 mt-7 md:-mt-1.5">
              <h4 className="text-2xl 2xl:text-3xl font-bold text-heading">
                Get in Touch
              </h4>
            </div>
            <ContactForm />
          </div>
        </div>
        <Subscription />
      </Container>
    </div>
  );
};

export default ContactUsPage;
