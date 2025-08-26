"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Suspense, useEffect, useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { FormValues, formSchema, TABS, PaymentMethod } from "./checkout-data";
import { CheckoutHeader } from "./checkout-header";
import { CheckoutTabs } from "./checkout-tabs";
import { InformationTab } from "./information-tab";
import { PaymentTab } from "./payment-tab";
import { SHOW_MINTPAY_VENDORS } from "@/framework/basic-rest/static/no-shipping-products";
import { useCheckout } from "./use-checkout";
import ProcessingDisplayModal from "./processing-display-modal";
import { useShallowCartStore } from "@/store/use-cart-store";

export default function CheckoutForm() {
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState("information");
  const { items, total } = useShallowCartStore((state) => ({
    items: state.items,
    total: state.total,
  }));
  const {
    handlePaymentSubmit,
    loading: paymentLoading,
    errorMessage,
  } = useCheckout({
    items,
    total,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shippingDifferent: false,
      country: "Sri Lanka",
      phone: "",
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      zipCode: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      localStorage.setItem("checkoutFormData", JSON.stringify(data));
      setCurrentTab("payment");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async (paymentMethod: PaymentMethod) => {
    setLoading(true);
    try {
      await handlePaymentSubmit(paymentMethod);
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setLoading(false);
    }
  };

  // Check if vendor should use Mintpay
  const shouldUseMintpayVendor = () => {
    if (!items || items.length === 0) return false;
    const vendors = items.map((item) => item.store.store_name);
    return vendors.every((vendor) => SHOW_MINTPAY_VENDORS.includes(vendor));
  };

  // Load saved form data
  useEffect(() => {
    const savedData = localStorage.getItem("checkoutFormData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      form.reset(parsedData);
    }
  }, [form]);

  useEffect(() => {
    try {
      const pixelEventData = sessionStorage.getItem("pixelEventData");
      if (pixelEventData) {
        const data = JSON.parse(pixelEventData);
        import("react-facebook-pixel")
          .then((module) => module.default)
          .then((ReactPixel) => {
            ReactPixel.track("InitiateCheckout", data);
          });
        sessionStorage.removeItem("pixelEventData");
      }
    } catch (error) {
      console.error("Error sending pixel event:", error);
    }
  }, []);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <CheckoutHeader
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />

          <Tabs className="w-full" value={currentTab}>
            <CheckoutTabs currentTab={currentTab} />
            {TABS.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                {tab.value === "information" && (
                  <Suspense>
                    <InformationTab
                      onSubmit={form.handleSubmit(onSubmit)}
                      loading={loading}
                    />
                  </Suspense>
                )}

                {tab.value === "payment" && (
                  <PaymentTab
                    onPlaceOrder={handlePlaceOrder}
                    loading={loading}
                    shouldUseMintpayVendor={shouldUseMintpayVendor}
                    errorMessage={errorMessage}
                  />
                )}

                {tab.value === "confirmation" && (
                  <div>Confirmation content goes here</div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </form>
      </Form>
      <ProcessingDisplayModal open={paymentLoading} />
    </>
  );
}
