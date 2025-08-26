"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const WOOCOMMERCE_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL!;
const WOOCOMMERCE_CONSUMER_KEY = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY!;
const WOOCOMMERCE_CONSUMER_SECRET = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET!;

const WooCommerce = axios.create({
  baseURL: WOOCOMMERCE_API_URL,
  auth: {
    username: WOOCOMMERCE_CONSUMER_KEY,
    password: WOOCOMMERCE_CONSUMER_SECRET,
  },
});

const formSchema = z.object({
  trackingNumber: z
    .string()
    .min(1, "Please enter a tracking number")
    .regex(/^\d{5}$/, "Tracking number must be exactly 5 digits"),
});

type FormValues = z.infer<typeof formSchema>;

export default function TrackingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const orderId = searchParams.get("order_id");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trackingNumber: orderId || "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await WooCommerce.get(
        `/wp-json/wc/v3/orders/${values.trackingNumber}`
      );

      if (response.status === 200) {
        const orderData = response.data;

        const filteredData = {
          id: orderData.id,
          status: orderData.status,
          date_created: orderData.date_created,
          date_modified: orderData.date_modified,
          citypak_tracking_code: orderData.meta_data.find(
            (meta: any) => meta.key === "citypak_tracking_code"
          )?.value?.[0],
          billing: {
            first_name: orderData.billing.first_name,
            last_name: orderData.billing.last_name,
            address_1: orderData.billing.address_1,
            city: orderData.billing.city,
            postcode: orderData.billing.postcode,
          },
          shipping: {
            first_name: orderData.shipping.first_name,
            last_name: orderData.shipping.last_name,
            address_1: orderData.shipping.address_1,
            city: orderData.shipping.city,
            postcode: orderData.shipping.postcode,
          },
          line_items: orderData.line_items.map((item: any) => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            subtotal: item.subtotal,
          })),
          total: orderData.total,
          order_key: orderData.order_key,
          shipping_total: orderData.shipping_total,
        };

        const encodedData = btoa(JSON.stringify(filteredData));
        router.push(`/tracking/summary?orderData=${encodedData}`);
      } else if (response.status === 404) {
        form.setError("trackingNumber", {
          type: "manual",
          message:
            "Order not found. Please check the tracking number and try again.",
        });
      } else {
        form.setError("trackingNumber", {
          type: "manual",
          message:
            "Invalid tracking number. Please check your tracking number or contact customer support.",
        });
      }
    } catch (error) {
      console.error(error);
      form.setError("trackingNumber", {
        type: "manual",
        message: "An unexpected error occurred. Please try again later.",
      });
    }
  };

  useEffect(() => {
    if (orderId) {
      form.handleSubmit(onSubmit)();
    }
  }, [orderId]);

  return (
    <div className="flex flex-col pt-20 px-4 sm:px-10 lg:py-20 2xl:pt-32 items-center min-h-[90dvh]">
      <Link href="/">
        <Image
          src="https://images.harrietshopping.com/front-web/images/logos/logo-3.png"
          alt="CityPak Logo"
          width={90}
          height={90}
          className="mb-8 cursor-pointer"
          priority
        />
      </Link>
      <div className="mt-3 mb-6 text-2xl font-bold text-center text-black">
        Tracking
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-sm space-y-6"
        >
          <FormField
            control={form.control}
            name="trackingNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Tracking Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your order id #59999"
                    className="w-full px-3 py-3 bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Gathering details..." : "TRACK"}
          </Button>
        </form>
      </Form>

      <div className="mt-4 text-xs text-center text-gray-400">
        Harriet Delivery System <br />
      </div>
    </div>
  );
}
