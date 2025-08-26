import Container from "@/components/common/container";
import PageHeader from "@/components/common/page-header";
import InnerHeader from "@/components/layout/header/inner-header";
import React from "react";
import { faq } from "@/settings/faq-settings";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { FAQ_METADATA } from "@/lib/metadata.pages";

export const metadata = FAQ_METADATA;

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <InnerHeader />
      <PageHeader
        pageHeader="Frequently Asked Questions"
        pageSubHeader="Find answers to common questions about our products and services"
      />

      <Container className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Accordion
            type="multiple"
            className="my-4 w-full space-y-2"
            defaultValue={[`item-0`]} // Open first item by default
          >
            {faq.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border rounded-md px-4 bg-white "
              >
                <AccordionTrigger className="px-6 py-4 transition-colors">
                  <h3 className="text-lg font-semibold text-left">
                    {item.title}
                  </h3>
                </AccordionTrigger>

                <AccordionContent className="px-6 pb-4 pt-0 ">
                  <div className="space-y-4">
                    {item.content.map((itm, idx) => (
                      <div key={idx} className="pt-4 first:pt-0">
                        <p className="font-medium text-gray-900">
                          {itm.question}
                        </p>
                        <p className="mt-2 text-gray-600">{itm.answer}</p>

                        {itm.children && (
                          <ul className="list-disc pl-5 mt-3 space-y-1.5">
                            {itm.children.map((child, childIdx) => (
                              <li key={childIdx} className="text-gray-600">
                                {child}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Still have questions?{" "}
            <Link
              href="/contact-us"
              className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
            >
              Contact our support team
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default FAQPage;
