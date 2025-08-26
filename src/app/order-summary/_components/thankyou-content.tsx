"use client";
import { Button } from "@/components/ui/button";
import { useShallowCartStore } from "@/store/use-cart-store";
import { useEffect, useState } from "react";
import { notFound, useSearchParams } from "next/navigation";
import Container from "@/components/common/container";
import axios from "axios";
import { cn, generateHash, safeParse } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import UpsellSection from "./upsell-section";
import Link from "next/link";
import { sendPaymentNotification } from "@/lib/email-notifs/send-notification";
import { OrderResponse } from "@/lib/order-response";
import { sendGTMEvent } from "@next/third-parties/google";
import { getCookie } from "cookies-next";
import { CartItem } from "@/lib/utils/generate-cart-item";

const ThankyouContent = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const email = searchParams.get("email");
  const paymentMethod = searchParams.get("payment_method");
  const queryDate = searchParams.get("date");
  const [orderDate, setOrderDate] = useState<string>("");
  const [deliveryDate, setDeliveryDate] = useState<string>("");
  const resetCart = useShallowCartStore((state) => state.resetCart);
  const isBankTransfer = paymentMethod === "bacs";

  if (!orderId || !paymentMethod) notFound();

  useEffect(() => {
    const generateEventId = () =>
      "_" + Math.random().toString(36).substring(2, 11);

    const processPaymentData = () => {
      const orderData = sessionStorage.getItem("orderResponse");
      const checkoutData = localStorage.getItem("checkoutData");

      if (!orderData || !checkoutData) return;

      const parsedData = safeParse<OrderResponse>(orderData);
      const parsedCheckoutData = safeParse<{
        cartItems: CartItem[];
        customerInfo: string | null;
        paymentMethod: string;
      }>(checkoutData);

      if (!parsedData || !parsedCheckoutData) return;

      // Send payment notification
      try {
        sendPaymentNotification({
          orderData: parsedData,
          status: "success",
        });
      } catch (error) {
        console.error("Error sending payment notification:", error);
      }

      // Calculate final amount
      const calculateFinalAmount = (paymentMethod: string) => {
        const shipping = Number(parsedData.shipping_total) || 0;
        const total = Number(parsedData.total) || 0;
        const discount =
          paymentMethod === "mintpay"
            ? 0
            : Number(parsedData.discount_total) || 0;

        return shipping + total - discount;
      };

      // Prepare meta pixel data
      const metaPixelData = {
        value: calculateFinalAmount(parsedData.payment_method).toFixed(2),
        content_ids: parsedCheckoutData.cartItems.map((item) => item.id),
        contents: parsedCheckoutData.cartItems.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          vendor_id: item.store.id,
        })),
        num_items: parsedCheckoutData.cartItems.length,
        content_type: "product",
      };

      // Prepare GTM event data
      const gtmEventData = {
        event: "purchase",
        content_ids: metaPixelData.content_ids,
        contents: metaPixelData.contents,
        num_items: metaPixelData.num_items,
        value: metaPixelData.value,
        currency: "LKR",
        event_id: generateEventId(),
        fbp: getCookie("_fbp"),
        fbc: getCookie("_fbc"),
        email: generateHash(parsedData.billing.email || ""),
        phone: generateHash(parsedData.billing.phone || ""),
      };

      // console.log("META PIXEL DATA", metaPixelData);
      // console.log("GTM PURCHASE EVENT", gtmEventData);

      try {
        sendGTMEvent(gtmEventData);
      } catch (error) {
        console.error("Error sending GTM event:", error);
      }
    };

    processPaymentData();
    resetCart();

    localStorage.removeItem("checkoutData");
    localStorage.removeItem("checkoutFormData");
    localStorage.removeItem("shippingMethod");
    localStorage.removeItem("shippingOption");
    const date = queryDate ? new Date(queryDate as string) : new Date();
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
    setOrderDate(formattedDate);

    // Calculate delivery date (4 days from now)
    const today = new Date();
    const deliveryDate = new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000);
    const formattedDeliveryDate = `${deliveryDate.getDate()} ${deliveryDate.toLocaleString(
      "default",
      { month: "short" }
    )}, ${deliveryDate.getFullYear()}`;
    setDeliveryDate(formattedDeliveryDate);
  }, []);

  useEffect(() => {
    const updateOrderStatus = async () => {
      if (!orderId || isBankTransfer) return;

      try {
        const consumerKey = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY;
        const consumerSecret = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET;

        if (!consumerKey || !consumerSecret) {
          throw new Error(
            "WooCommerce consumer key and secret are not configured."
          );
        }

        const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wc/v3/orders/${orderId}`;
        const params = { status: "processing" };
        const auth = { username: consumerKey, password: consumerSecret };

        await axios.put(url, params, { auth });
      } catch (err) {
        console.error("Error updating order status:", err);
      }
    };

    updateOrderStatus();
  }, [orderId, isBankTransfer]);

  const whatsAppSupportLink = `https://wa.me/94767816262?text=hi%2C%20this%20is%20my%20order%20id%20${orderId}%2C%20can%20I%20know%20the%20status`;

  const renderBankDetails = () => (
    <Card className="">
      <CardTitle className="text-xl font-bold text-center text-heading">
        <h3>Harriet Bank Account Details</h3>
      </CardTitle>
      <CardContent className="space-y-3">
        {[
          { label: "Account Name:", value: "Harriet Shopping" },
          { label: "Account Number:", value: "003910008829" },
          { label: "Bank Name:", value: "Sampath Bank" },
          { label: "Bank Branch", value: "Malabe" },
          { label: "Reference Number:", value: orderId },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center border justify-between rounded-lg bg-[#F5F5F5]"
          >
            <div className="mx-2 md:mx-4 my-3 text-[#A7A2A2] font-medium">
              <p>{item.label}</p>
            </div>
            <div className="mx-4 my-3 font-bold tracking-wide text-heading">
              <p>{item.value}</p>
            </div>
          </div>
        ))}
        <CardFooter>
          <p className="text-center capitalize">
            *Make The Transfer And Send Us The Payment Reference Number To
            <br />
            <a href={whatsAppSupportLink} className="text-green-400">
              WhatsApp (077 606 6026)
            </a>
          </p>
        </CardFooter>
      </CardContent>
    </Card>
  );

  const renderOrderSummary = () => (
    <Card className="">
      <CardTitle className="text-xl font-bold text-center text-heading">
        <h3>Your Order Summary</h3>
      </CardTitle>
      <CardContent className="space-y-3">
        {[
          { label: "Order ID:", value: orderId },
          { label: "Order Date:", value: orderDate },
          ...(isBankTransfer
            ? []
            : [{ label: "Expected Delivery:", value: deliveryDate }]),
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center border justify-between rounded-lg bg-[#F5F5F5]"
          >
            <div className="mx-4 my-3 text-[#A7A2A2] font-medium">
              <p>{item.label}</p>
            </div>
            <div className="mx-4 my-3 font-bold tracking-wide text-heading">
              <p>{item.value}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <Container>
      <div className="py-10">
        {/* Thank You Section */}
        <div>
          <div className="my-3 text-5xl font-bold tracking-wide text-center md:text-7xl text-heading">
            <h1>THANK YOU!</h1>
          </div>
          <div
            className={cn(
              "text-center text-lg md:text-xl font-semibold tracking-wide",
              isBankTransfer ? "text-[#FCD200]" : "text-green-500"
            )}
          >
            <p>
              {isBankTransfer
                ? "Your Order Is On Hold"
                : "Your Order Is Confirmed"}
            </p>
          </div>
          <Separator className="mx-auto my-3 max-w-3/4 md:max-w-3/5" />
          <div className="text-center text-gray-400">
            <p>
              We will send you an email confirmation to{" "}
              <a
                href={`mailto:${email}`}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                {email}
              </a>{" "}
              shortly
            </p>
          </div>
        </div>

        {/* Main Content - Responsive Layout */}
        <div
          className={cn(
            "grid grid-cols-1 mt-10 gap-10 2xl:gap-20",
            isBankTransfer ? "md:grid-cols-2" : "max-w-2xl mx-auto"
          )}
        >
          {isBankTransfer && renderBankDetails()}
          <div>
            {renderOrderSummary()}
            <div className="px-4 text-center mt-7">
              <p>
                {isBankTransfer ? (
                  "Make your payment directly into our bank account. Please use your Order Id as the payment reference. Your order will not be shipped until the funds have cleared in our account."
                ) : (
                  <>
                    Your order <span className="font-semibold">#{orderId}</span>{" "}
                    is currently in progress and expected to be delivered by{" "}
                    <span className="font-semibold">{deliveryDate}</span>.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center mt-10 space-x-4">
          <Link href={"/"}>
            <Button className="p-6 rounded-sm md:w-auto">
              Back To Shopping
            </Button>
          </Link>
          {!isBankTransfer && (
            <Link href={`/tracking?order_id=${orderId}`}>
              <Button className="p-6 rounded-sm md:w-auto">
                Track Your Order
              </Button>
            </Link>
          )}
        </div>
        <UpsellSection isBankTransfer />
      </div>
    </Container>
  );
};

export default ThankyouContent;
