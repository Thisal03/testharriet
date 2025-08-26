"use client";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { notFound, useSearchParams } from "next/navigation";
import Container from "@/components/common/container";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import { sendPaymentNotification } from "@/lib/email-notifs/send-notification";
import { OrderResponse } from "@/lib/order-response";

const FailedContent = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  if (!orderId) notFound();

  useEffect(() => {
    const updateOrderStatus = async () => {
      if (!orderId) return;

      try {
        const orderData = sessionStorage.getItem("orderResponse");
        if (orderData) {
          const parsedData: OrderResponse = JSON.parse(orderData);
          try {
            await sendPaymentNotification({
              orderData: parsedData,
              status: "failed",
            });
          } catch (error) {
            console.error("Error sending payment notification:", error);
          }
        }

        const consumerKey = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY;
        const consumerSecret = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET;

        if (!consumerKey || !consumerSecret) {
          throw new Error(
            "WooCommerce consumer key and secret are not configured."
          );
        }

        const url = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wc/v3/orders/${orderId}`;
        const params = { status: "failed" };
        const auth = { username: consumerKey, password: consumerSecret };

        await axios.put(url, params, { auth });
      } catch (err) {
        console.error("Error updating order status:", err);
      }
    };

    updateOrderStatus();
  }, [orderId]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Container className="max-w-4xl mx-auto text-center">
        {/* Payment Failed Image */}
        <div className="flex justify-center items-center py-8 md:py-12">
          <Image
            src="https://images.harrietshopping.com/front-web/icons/payment-failed.webp"
            width={400}
            height={300}
            priority
            className="w-full max-w-[400px] h-auto object-contain"
            alt="Payment Failed"
          />
        </div>

        <div className="py-10 lg:py-20">
          <div className="max-w-4xl mx-auto">
            <div className="my-3 text-5xl font-bold tracking-wide text-center md:text-7xl text-heading">
              <h3>PAYMENT FAILED!</h3>
            </div>
            <div
              className={cn(
                "text-center max-w-xl mx-auto text-lg md:text-xl font-semibold tracking-wide text-red-500"
              )}
            >
              <p>
                {
                  "We could not process your payment for order. Please try again or contact support."
                }
              </p>
            </div>
            <Separator className="mx-auto my-3 max-w-3/4 md:max-w-3/5" />
            <div className="text-center text-gray-400">
              <p>
                We apologize for the inconvenience. If you have any questions,
                please contact our support team.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center mt-10 space-x-4">
            <Link href={"/checkout"}>
              <Button className="p-6 rounded-sm md:w-auto">
                Back To Checkout
              </Button>
            </Link>
            <Link href={`/contact-us`}>
              <Button className="p-6 rounded-sm md:w-auto">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FailedContent;
