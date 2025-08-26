"use client";
import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import OrderStatus from "../_components/order-status";
import Timeline from "../_components/timeline";
import { Undo2 } from "lucide-react";

interface TrackingHistoryItem {
  status_type: string;
  date: string;
  status_code: string;
  description: string;
  location: string;
}

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  subtotal: string;
}

interface TrackingDetail {
  tracking_history: Array<TrackingHistoryItem>;
}

interface OrderData {
  id: number;
  status: string;
  date_created: string;
  date_modified: string;
  citypak_tracking_code?: string;
  billing: {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    postcode: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    postcode: string;
  };
  line_items: OrderItem[];
  total: string;
  order_key: string;
  shipping_total: string;
}

export default function TrackingSummary() {
  return (
    <Suspense>
      <TrackingSummaryContent />
    </Suspense>
  );
}

function TrackingSummaryContent() {
  const searchParams = useSearchParams();
  const orderDataParam = searchParams.get("orderData");
  const [trackingDetails, setTrackingDetails] = useState<TrackingDetail | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Memoized order data parsing
  const order = useMemo<OrderData | null>(() => {
    if (!orderDataParam) return null;

    try {
      const decodedString = atob(orderDataParam);
      return JSON.parse(decodedString);
    } catch (err) {
      console.error("Error decoding order data:", err);
      setError("Invalid order data. Please check your tracking link.");
      return null;
    }
  }, [orderDataParam]);

  // Memoized date calculations
  const { deliveryDate, formattedDateCreated } = useMemo(() => {
    if (!order?.date_created)
      return { deliveryDate: null, formattedDateCreated: null };

    const createdDate = new Date(order.date_created);
    const deliveryDate = new Date(
      createdDate.getTime() + 5 * 24 * 60 * 60 * 1000
    );

    return {
      deliveryDate: `${deliveryDate.getDate()} ${deliveryDate.toLocaleString(
        "default",
        { month: "short" }
      )}, ${deliveryDate.getFullYear()}`,
      formattedDateCreated: `${createdDate.getDate()} ${createdDate.toLocaleString(
        "default",
        { month: "long" }
      )} ${createdDate.getFullYear()}`,
    };
  }, [order]);

  // Fetch tracking details
  useEffect(() => {
    if (!order?.citypak_tracking_code) return;

    const fetchTrackingDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://falcon.citypak.lk/customer_api/v1/track?tracking_number=${order.citypak_tracking_code}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEAR_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch tracking details");

        const data = await response.json();
        setTrackingDetails({ tracking_history: data.data.tracking_history });
      } catch (err) {
        console.error("Error fetching tracking details:", err);
        setError("Failed to load tracking details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrackingDetails();
  }, [order]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="max-w-md p-6 text-center bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-red-500">Error</h2>
          <p className="mb-4">{error}</p>
          <Link href="/tracking">
            <Button variant="default">Back to Tracking</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="max-w-md p-6 text-center bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold">No Order Data Found</h2>
          <p className="mb-4">Please check your tracking link or try again.</p>
          <Link href="/tracking">
            <Button variant="default">Back to Tracking</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-center">
      <div className="relative pt-4 md:pt-10 pb-9">
        <div className="hidden md:block">
          <Image
            src="https://images.harrietshopping.com/front-web/images/cover/track-background.png"
            alt="Background"
            fill
            className="hidden object-cover opacity-50 md:block"
            priority
          />
        </div>

        <div className="relative z-10">
          <div className="z-50 px-3 bg-white md:px-9">
            <div className="items-center mb-4 rounded-lg md:border border-border md:p-2 md:flex md:justify-between">
              <div className="flex items-center">
                <Link href="/tracking">
                  <Button size="icon" variant="ghost">
                    <Undo2 className="md:size-6" />
                  </Button>
                </Link>
                <h1 className="block pl-6 text-lg font-semibold md:hidden">
                  Track Your Order
                </h1>
              </div>

              {/* Mobile Accordion */}
              <div className="block mt-4 md:hidden">
                <Accordion type="single" collapsible>
                  <AccordionItem value="order-info">
                    <AccordionTrigger className="flex items-center w-full px-4 font-semibold bg-muted">
                      <div className="border-b border-heading">
                        <Image
                          src="https://images.harrietshopping.com/front-web/icons/tracking-truck.svg"
                          width={20}
                          height={20}
                          alt="Tracking"
                        />
                      </div>
                      <span className="">
                        Order ID: <br /> #{order.id}
                      </span>
                      <div
                        className={`border-2 p-2 rounded-3xl capitalize  ${
                          order.status === "processing"
                            ? "border-yellow-500 bg-yellow-100 text-yellow-400"
                            : order.status === "shipped"
                            ? "border-blue-500 bg-blue-100 text-blue-400"
                            : order.status === "completed"
                            ? "border-green-500 bg-green-100 text-green-500"
                            : "border-gray-500 bg-gray-100 text-gray-400"
                        }`}
                      >
                        <span className="px-2 capitalize">{order.status}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 border border-gray-300">
                      <p>
                        Placed on{" "}
                        <b>
                          {new Date(order.date_created).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </b>
                      </p>
                      <p>
                        City Pak Tracking: <b>{order.citypak_tracking_code}</b>
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Desktop View */}
              <div className="hidden pl-5 md:block">
                <p className="font-semibold text-md">Order #{order.id}</p>
                <p className="text-sm">
                  Placed on{" "}
                  {new Date(order.date_created).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="hidden pr-4  md:block">
                <p>City Pak Tracking</p>
                <p className="font-bold">
                  <a
                    href={`https://track.citypak.lk/track?tracking_number=${order.citypak_tracking_code}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {order.citypak_tracking_code}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-3 mt-10 md:px-9">
            {/* Desktop Order Status */}
            <div className="hidden p-5 bg-white border border-border rounded-xl md:block">
              <OrderStatus orderStatus={order.status} />

              <div>
                <p className="text-2xl font-semibold text-center">
                  Order Status
                </p>
              </div>

              <div className="px-40 mt-8">
                <div className="flex p-2 px-8 border-2 rounded-lg border-border">
                  <div className="flex-none w-32">{formattedDateCreated}</div>
                  <div className="pl-4 uppercase grow">
                    Your order was placed
                  </div>
                </div>
              </div>

              <div className="px-40 mt-4">
                {trackingDetails?.tracking_history?.map(
                  (historyItem, index) => (
                    <div
                      key={index}
                      className="p-2 px-8 my-4 border-2 rounded-lg border-border"
                    >
                      <div className="flex">
                        <div className="self-center flex-none w-32">
                          <p className="tracking-wide text-muted-foreground">
                            {new Date(historyItem.date).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>

                        <div className="grow">
                          <p className="pl-4 normal-case">
                            {historyItem.status_type}
                            {historyItem.description
                              ? ` at ${historyItem.description}`
                              : ""}{" "}
                            <br />
                            {historyItem.location
                              ? `Location: ${historyItem.location}`
                              : ""}
                          </p>
                        </div>
                        <div className="self-center flex-none w-8 justify-self-end">
                          <p>{historyItem.status_code}</p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Mobile Timeline */}
            <div className="block md:hidden">
              <div className="space-y-2 text-center text-md">
                <h1>
                  Estimated Delivery Date: <b>{deliveryDate}</b>
                </h1>
                <div className="border border-gray-400"></div>
              </div>

              {trackingDetails && (
                <Timeline
                  items={trackingDetails.tracking_history}
                  date_created={order.date_created}
                />
              )}
            </div>

            {/* Address and Order Summary */}
            <div className="relative grid grid-cols-1 gap-4 mt-6 md:grid-cols-2">
              {/* Mobile Accordions */}
              <div className="block space-y-4 md:hidden">
                <Accordion type="single" collapsible>
                  <AccordionItem value="billing">
                    <AccordionTrigger className="w-full px-4 font-semibold bg-muted">
                      Billing Address
                    </AccordionTrigger>
                    <AccordionContent className="p-4 border-gray-300 rounded-bl-lg rounded-br-lg">
                      <p>
                        {order.billing.first_name} {order.billing.last_name}
                        <br />
                        {order.billing.address_1}
                        <br />
                        {order.billing.city} {order.billing.postcode}
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="shipping">
                    <AccordionTrigger className="w-full px-4 font-semibold bg-muted">
                      Shipping Address
                    </AccordionTrigger>
                    <AccordionContent className="p-4 border-gray-300 rounded-bl-lg rounded-br-lg">
                      <p>
                        {order.shipping.first_name} {order.shipping.last_name}
                        <br />
                        {order.shipping.address_1}
                        <br />
                        {order.shipping.city} {order.shipping.postcode}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Desktop Address Sections */}
              <div className="hidden space-y-4 md:block">
                <div className="p-4 py-8 bg-white border border-border px-9 rounded-xl">
                  <h1 className="text-2xl font-semibold">Billing Address</h1>
                  <div className="my-2 border border-border"></div>
                  <p>
                    {order.billing.first_name} {order.billing.last_name}
                    <br />
                    {order.billing.address_1}
                    <br />
                    {order.billing.city} {order.billing.postcode}
                  </p>
                </div>

                <div className="p-4 py-8 bg-white border border-border px-9 rounded-xl">
                  <h1 className="text-2xl font-semibold">Shipping Address</h1>
                  <div className="my-2 border border-border"></div>
                  <p>
                    {order.shipping.first_name} {order.shipping.last_name}
                    <br />
                    {order.shipping.address_1}
                    <br />
                    {order.shipping.city} {order.shipping.postcode}
                  </p>
                </div>
              </div>

              {/* Order Summary (both mobile and desktop) */}
              <div className="grid content-between h-full p-6 py-6 bg-white border-2 border-border rounded-xl">
                <div>
                  <h1 className="text-2xl font-semibold">Order Summary</h1>
                  <div className="mt-3 border border-border"></div>

                  <ul className="mt-4 space-y-2">
                    {order.line_items.map((item) => (
                      <li key={item.id} className="flex justify-between">
                        <span>{item.name}</span>
                        <span>
                          {item.quantity} x {item.subtotal}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex justify-between pt-2 mt-4">
                    <span className="font-semibold">Shipping Cost :</span>
                    <span>LKR {order.shipping_total}</span>
                  </div>
                  <div className="flex justify-between pt-2 mt-4 border-t">
                    <span className="font-semibold">Total Amount :</span>
                    <span>LKR {order.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-10 pt-4 text-center md:px-0">
          For further questions, email <b>orders@harrietshopping.com</b> or
          contact us at <b>+94 (76) 781 6262</b>
        </div>
      </div>
    </div>
  );
}
