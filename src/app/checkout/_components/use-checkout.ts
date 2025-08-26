"use client";
import { PaymentMethod } from "./checkout-data";
import { useState } from "react";
import axios from "axios";
import { CartItem } from "@/lib/utils/generate-cart-item";
import { useShallowCartStore } from "@/store/use-cart-store";
import { ShippingTotal } from "@/framework/basic-rest/types";
import { getCookie } from "cookies-next";
import { sendPaymentNotification } from "@/lib/email-notifs/send-notification";
import { sendGTMEvent } from "@next/third-parties/google";
import { generateHash } from "@/lib/utils";

export const useCheckout = ({
  items,
  total,
}: {
  items: CartItem[];
  total: number;
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { overallShippingCost, discount, setDiscount } = useShallowCartStore(
    (state) => ({
      overallShippingCost: state.shipping_total,
      discount: state.discount,
      setDiscount: state.setDiscount,
    })
  );

  const trafficSource = getCookie("traffic_type");
  const referrer = getCookie("utm_referrer");
  const campaign = getCookie("utm_campaign");
  const source = getCookie("utm_source");
  const medium = getCookie("utm_medium");
  const sessionEntry = getCookie("utm_session_entry");

  const newDate = new Date();

  interface GroupedItems {
    [key: number]: Array<any>;
  }

  interface CartItem {
    name: string;
    quantity: string;
  }

  const totalQuantity = items.reduce((sum, item) => {
    const itemQuantity = item.quantity || 0;
    return sum + itemQuantity;
  }, 0);

  const calculateFnl = (paymentMethod: PaymentMethod) => {
    if (paymentMethod?.id === "mintpay") {
      return overallShippingCost + total;
    } else {
      return overallShippingCost + total - (discount ?? 0);
    }
  };

  const generateSKU = (productName: string) => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    const initials: string = productName
      .split("")
      .map((word) => word[0].toUpperCase())
      .join("");
    return `${initials}-${randomNum}`;
  };

  const products = items.map((item) => ({
    name: item.name,
    product_id: item.id,
    product_price: item.price.toFixed(2),
    sku: item.sku || generateSKU(item.name),
    quantity: item.quantity,
    unit_price: item.price.toFixed(2),
    discount: 0,
    created_date: newDate.toISOString(),
    updated_date: newDate.toISOString(),
  }));

  const loadPayableSdk = () => {
    return new Promise<void>((resolve, reject) => {
      if (typeof window !== "undefined") {
        const script = document.createElement("script");
        script.src = process.env.NEXT_PUBLIC_PAYABLE_LIVE_TOKEN!;
        script.onload = () => resolve();
        script.onerror = () =>
          reject(new Error("PAYable SDK script failed to load."));
        document.body.appendChild(script);
      }
    });
  };

  const handlePaymentSubmit = async (paymentMethod: PaymentMethod) => {
    if (!paymentMethod) {
      setErrorMessage("Please select a payment method before proceeding.");
      return;
    }

    setLoading(true);

    const checkoutData = {
      cartItems: items,
      customerInfo: localStorage.getItem("checkoutFormData"),
      paymentMethod: paymentMethod.id,
    };

    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

    // const metaPixelData = {
    //   value: calculateFnl(paymentMethod).toFixed(2),
    //   content_ids: items.map((item) => item.id),
    //   contents: items.map((item) => ({
    //     id: item.id,
    //     quantity: item.quantity,
    //     vendor_id: item.store.id,
    //   })),
    //   num_items: totalQuantity,
    //   content_type: "product",
    // };

    const WOOCOMMERCE_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL!;
    const WOOCOMMERCE_CONSUMER_KEY = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY!;
    const WOOCOMMERCE_CONSUMER_SECRET =
      process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET!;

    const WooCommerce = axios.create({
      baseURL: WOOCOMMERCE_API_URL,
      auth: {
        username: WOOCOMMERCE_CONSUMER_KEY,
        password: WOOCOMMERCE_CONSUMER_SECRET,
      },
    });

    try {
      const billingDetails = localStorage.getItem("checkoutFormData");
      if (!billingDetails) {
        console.error("Billing details not found in local storage.");
        return;
      }
      const parsedBillingDetails = JSON.parse(billingDetails);

      const shippingMethod = localStorage.getItem("shippingMethod");
      if (!shippingMethod) {
        console.error("Shipping details not found in local storage.");
        return;
      }
      const parsedShippingDetails: ShippingTotal = JSON.parse(shippingMethod);

      const ipResponse = await fetch("https://api.ipify.org/?format=json");
      const { ip } = await ipResponse.json();

      const storedCheckoutDataItem = localStorage.getItem("checkoutData");
      const storedCheckoutData = storedCheckoutDataItem
        ? JSON.parse(storedCheckoutDataItem)
        : {};

      const groupedItems = items.reduce((groups, item) => {
        const key = item.store.id;
        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(item);
        return groups;
      }, {} as GroupedItems);

      const shipping_Lines = Object.entries(groupedItems).map(
        ([storeId, itemsForStore]) => {
          const shippingOption =
            localStorage.getItem("shippingOption") || "standard";

          const shippingDetails =
            shippingOption === "standard"
              ? parsedShippingDetails[0]
              : parsedShippingDetails[1];

          const { method_id, title, settings, instance_id } = shippingDetails;

          return {
            instance_id: instance_id.toString(),
            method_id,
            method_title: title,
            total: settings?.cost?.value || "",
            meta_data: [
              {
                key: "Items",
                value: itemsForStore
                  .map((item: CartItem) => `${item.name} x ${item.quantity}`)
                  .join(", "),
              },
              { key: "seller_id", value: storeId },
            ],
          };
        }
      );

      const predefinedData = {
        total: calculateFnl(paymentMethod).toFixed(2),
        payment_method: paymentMethod.id,
        payment_method_title: paymentMethod.title,
        status:
          paymentMethod.id === "cod"
            ? "processing"
            : paymentMethod.id === "bacs"
            ? "on-hold"
            : paymentMethod.id === "card"
            ? "pending"
            : paymentMethod.id === "webxpay"
            ? "pending"
            : paymentMethod.id === "mintpay"
            ? "pending"
            : "pending",
        customer_note: parsedBillingDetails?.note,
        billing: {
          first_name: parsedBillingDetails?.firstName || "",
          last_name: parsedBillingDetails?.lastName || "",
          company: parsedBillingDetails?.companyName || "",
          address_1: parsedBillingDetails?.address || "",
          city: parsedBillingDetails?.city || "",
          state: parsedBillingDetails?.state || "",
          postcode: parsedBillingDetails?.zipCode || "",
          country: parsedBillingDetails?.country || "",
          email: parsedBillingDetails?.email || "",
          phone: parsedBillingDetails?.phone || "",
        },
        shipping: {
          first_name:
            parsedBillingDetails?.shippingfirstName ||
            parsedBillingDetails?.firstName ||
            "",
          last_name:
            parsedBillingDetails?.shippinglastName ||
            parsedBillingDetails?.lastName ||
            "",
          phone:
            parsedBillingDetails?.shippingphone ||
            parsedBillingDetails?.phone ||
            "",
          company:
            parsedBillingDetails?.shippingcompanyName ||
            parsedBillingDetails?.companyName ||
            "",
          address_1:
            parsedBillingDetails?.shippingaddress ||
            parsedBillingDetails?.address ||
            "",
          city:
            parsedBillingDetails?.shippingcity ||
            parsedBillingDetails?.city ||
            "",
          state:
            parsedBillingDetails?.shippingstate ||
            parsedBillingDetails?.state ||
            "",
          postcode:
            parsedBillingDetails?.shippingzipCode ||
            parsedBillingDetails?.zipCode ||
            "",
          country:
            parsedBillingDetails?.shippingcountry ||
            parsedBillingDetails?.country ||
            "",
        },
        meta_data: [
          {
            key: "_wc_order_attribution_source_type",
            value: trafficSource,
          },
          {
            key: "_wc_order_attribution_referrer",
            value: referrer,
          },
          {
            key: "_wc_order_attribution_utm_campaign",
            value: encodeURIComponent(campaign as string),
          },
          {
            key: "_wc_order_attribution_utm_source",
            value: source,
          },
          {
            key: "_wc_order_attribution_utm_medium",
            value: medium,
          },
          {
            key: "_wc_order_attribution_session_entry",
            value: sessionEntry,
          },
          {
            key: "_customer_ip_address",
            value: ip || "200.200.2.5",
          },
          {
            key: "_customer_user_agent",
            value: navigator.userAgent,
          },
        ],
        line_items: items.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          variation_id:
            item.variations && item.variations.length > 0
              ? item.variations
                  .filter((Variation) => Variation.id && Variation.id !== 0)
                  .map((Variation) => Variation.id)[0]
              : null,
          name: `${item.name} - ${
            item.attributes
              ? item.attributes.map((attribute) => attribute.options).join(", ")
              : ""
          } | x ${item.quantity}`,
          meta_data: [
            {
              key: item.attributes
                ? item.attributes.map((attribute) => attribute.slug).join(", ")
                : "",
              value: item.attributes
                ? item.attributes
                    .map((attribute) => attribute.options)
                    .join(", ")
                : "",
            },
          ],
        })),
        shipping_lines: shipping_Lines,
        ...(discount &&
          paymentMethod?.id !== "mintpay" && {
            fee_lines: [
              {
                name: "Discount",
                total: `-${discount.toFixed(2)}`,
                tax_status: "none",
              },
            ],
          }),
      };

      const finalCheckoutData = {
        ...predefinedData,
        ...storedCheckoutData,
      };

      try {
        await sendPaymentNotification({
          orderData: finalCheckoutData,
        });
      } catch (error) {
        console.error("Error sending payment notification:", error);
      }

      const response = await WooCommerce.post(
        "wp-json/wc/v3/orders",
        finalCheckoutData
      );

      if (response.status === 201) {
        const orderId = response.data.id;
        const userEmail = response.data.billing.email;

        try {
          await sendPaymentNotification({
            orderData: response.data,
            status: "after 200",
          });
        } catch (error) {
          console.error("Error sending payment notification:", error);
        }

        sessionStorage.setItem("orderResponse", JSON.stringify(response.data));
        // const externalId = generateExternalId(response.data.billing);

        // // Generate unique event_id
        // const generateEventId = () =>
        //   "_" + Math.random().toString(36).substr(2, 9);
        // const eventId = generateEventId();

        // const fbp = getCookie("_fbp");
        // const fbc = getCookie("_fbc");

        // sendGTMEvent({
        //   event: "purchase",
        //   content_ids: metaPixelData.content_ids,
        //   contents: metaPixelData.contents,
        //   num_items: metaPixelData.num_items,
        //   value: metaPixelData.value,
        //   currency: "LKR",
        //   event_id: eventId,
        //   fbp: fbp,
        //   fbc: fbc,
        //   email: generateHash(response.data.billing.email || ""),
        //   phone: generateHash(response.data.billing.phone || ""),
        // });

        if (paymentMethod.id === "bacs") {
          const bankTransferUrl = `/order-summary/thankyou?order_id=${orderId}&email=${encodeURIComponent(
            userEmail
          )}&payment_method=bacs`;
          window.location.replace(bankTransferUrl);
        } else if (paymentMethod.id === "cod") {
          const thankYouUrl = `/order-summary/thankyou?order_id=${orderId}&email=${encodeURIComponent(
            userEmail
          )}&payment_method=cod`;
          window.location.replace(thankYouUrl);
        } else if (paymentMethod.id === "card") {
          if (typeof window !== "undefined") {
            const formData = localStorage.getItem("checkoutFormData");
            if (formData) {
              try {
                await loadPayableSdk();
                const parsedData = JSON.parse(formData);

                const staticPaymentData = {
                  merchantKey: process.env.NEXT_PUBLIC_MERCHANT_KEY,
                  merchantToken: process.env.NEXT_PUBLIC_MERCHANT_TOKEN!,
                  invoiceId: orderId.toString(),
                  amount: calculateFnl(paymentMethod).toFixed(2),
                  currencyCode: "LKR",
                };

                const sha512HashOfMerchantToken = generateHash(
                  staticPaymentData.merchantToken
                ).toUpperCase();

                const concatenatedString = `${staticPaymentData.merchantKey}|${staticPaymentData.invoiceId}|${staticPaymentData.amount}|${staticPaymentData.currencyCode}|${sha512HashOfMerchantToken}`;
                const hash = generateHash(concatenatedString).toUpperCase();

                const fields = {
                  notifyUrl: process.env.NEXT_PUBLIC_NOTIFY_URL,
                  returnUrl: `https://web.harrietshopping.com/order-summary/thankyou?order_id=${orderId}&email=${encodeURIComponent(
                    userEmail
                  )}&payment_method=card`,
                  logoUrl: process.env.NEXT_PUBLIC_LOGO_URL,
                  merchantKey: staticPaymentData.merchantKey,
                  currencyCode: staticPaymentData.currencyCode,
                  checkValue: hash,
                  orderDescription: "Invoice " + orderId.toString(),
                  amount: staticPaymentData.amount,
                  invoiceId: staticPaymentData.invoiceId,
                  paymentType: "1",
                  customerFirstName: parsedData.firstName,
                  customerLastName: parsedData.lastName,
                  customerMobilePhone: parsedData.phone,
                  customerEmail: parsedData.email,
                  billingAddressStreet: parsedData.address,
                  billingAddressCity: parsedData.city,
                  billingAddressPostcodeZip: parsedData.zipCode,
                  billingAddressStateProvince: parsedData.state,
                  billingAddressCountry: "LKA",
                };

                if (window.payablePayment) {
                  window.payablePayment(fields);
                } else {
                  throw new Error("payablePayment is not defined.");
                }
              } catch (error) {
                console.error("Error processing payment data:", error);
                setErrorMessage(
                  "Unable to process card payment at this time. Please try again or try another payment method."
                );
              }
            }
          }
          // } else if (paymentMethod.id === "webxpay") {
          //   if (typeof window !== "undefined") {
          //     const { JSEncrypt } = require("jsencrypt");
          //     const formData = localStorage.getItem("checkoutFormData");

          //     if (formData) {
          //       try {
          //         const parsedData = JSON.parse(formData);
          //         const paymentString = `${orderId}|${calculateFnl(
          //           paymentMethod
          //         ).toFixed(2)}`;

          //         const encrypt = new JSEncrypt();
          //         encrypt.setPublicKey(`-----BEGIN PUBLIC KEY-----
          //         ${process.env.NEXT_PUBLIC_WEBXPAY_PUBLIC_KEY!}
          //         -----END PUBLIC KEY-----`);

          //         const encrypted = encrypt.encrypt(paymentString);

          //         if (!encrypted) {
          //           throw new Error("Encryption failed");
          //         }

          //         const paymentData = {
          //           first_name: parsedData.firstName,
          //           last_name: parsedData.lastName,
          //           email: parsedData.email,
          //           contact_number: parsedData.phone,
          //           address_line_one: parsedData.address,
          //           address_line_two: "",
          //           city: parsedData.city,
          //           state: parsedData.state,
          //           postal_code: parsedData.zipCode,
          //           country: parsedData.country,
          //           process_currency: "LKR",
          //           cms: "js",
          //           enc_method: process.env.NEXT_PUBLIC_WEBXPAY_ENC_METHOD,
          //           secret_key: process.env.NEXT_PUBLIC_WEBXPAY_SECRET_KEY!,
          //           payment: encrypted,
          //         };

          //         const form = document.createElement("form");
          //         form.action = process.env.NEXT_PUBLIC_WEBXPAY_STAGING_URL!;
          //         form.method = "POST";

          //         Object.entries(paymentData).forEach(([key, value]) => {
          //           const input = document.createElement("input");
          //           input.type = "hidden";
          //           input.name = key;
          //           input.value = value as string;
          //           form.appendChild(input);
          //         });

          //         document.body.appendChild(form);
          //         form.submit();
          //       } catch (error) {
          //         console.error("Error processing WebXPay payment data:", error);
          //         setErrorMessage(
          //           "An error occurred while processing the payment. Please try again."
          //         );
          //       }
          //     }
          //   }
        } else if (paymentMethod.id === "mintpay") {
          if (typeof window !== "undefined") {
            try {
              const ipResponse = await fetch(
                "https://api.ipify.org/?format=json"
              );
              const { ip } = await ipResponse.json();

              const formData = localStorage.getItem("checkoutFormData");
              if (!formData) {
                setErrorMessage(
                  "No checkout data found. Please fill in the checkout form."
                );
                return;
              }

              const parsedData = JSON.parse(formData);

              const paymentData = {
                merchantId: process.env.NEXT_PUBLIC_MINTPAY_MERCHANT_ID,
                orderId: orderId.toString(),
                total_price: calculateFnl(paymentMethod).toFixed(2),
                discount: 0.0,
                customer_email: decodeURIComponent(parsedData.email),
                customer_id: orderId.toString(),
                customer_telephone: parsedData.phone,
                ip: ip,
                x_forwarded_for: ip,
                delivery_street: parsedData.address,
                delivery_region: parsedData.city,
                delivery_postcode: parsedData.zipCode,
                cart_created_date: newDate,
                cart_updated_date: newDate,
                success_url: decodeURIComponent(
                  `${window.location.origin}/order-summary/thankyou?&payment_method=mintpay&order_id=${orderId}`
                ),
                fail_url: decodeURIComponent(
                  `${window.location.origin}/order-summary/failed?&payment_method=mintpay&order_id=${orderId}`
                ),
                products: products,
              };

              const response = await fetch("/api/mintpay", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(paymentData),
              });

              if (!response.ok) {
                throw new Error("Failed to initiate MintPay payment");
              }

              const data = await response.json();

              if (data && data.purchase_id) {
                const mintpayGatewayUrl =
                  process.env.NEXT_PUBLIC_MINTPAY_GATEWAY_URL;
                if (!mintpayGatewayUrl) {
                  throw new Error("NEXT_PUBLIC_MINTPAY_GATEWAY_URL is not set");
                }

                const form = document.createElement("form");
                form.action = mintpayGatewayUrl;
                form.method = "POST";

                const input = document.createElement("input");
                input.type = "hidden";
                input.name = "purchase_id";
                input.value = data.purchase_id;

                form.appendChild(input);
                document.body.appendChild(form);

                form.submit();
              } else {
                throw new Error("Invalid response: purchase_id missing");
              }
            } catch (error) {
              console.error("Error during MintPay payment:", error);
              setErrorMessage(
                "Unable to process mintpay payment at this time. Please try again or try another payment method."
              );
              return;
            }
          }
        }
      } else {
        console.error(
          `Failed to create order. Status: ${response.status}`,
          response.data ? response.data.message : "No message available"
        );
      }
    } catch (error) {
      console.error("Error creating order:", error);
      setErrorMessage(
        "An error occurred while processing your order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    handlePaymentSubmit,
    loading,
    errorMessage,
    setErrorMessage,
    calculateFnl,
    overallShippingCost,
    discount,
    setDiscount,
  };
};

interface BillingInfo {
  first_name?: string | null;
  last_name?: string | null;
  company?: string | null;
  address_1?: string | null;
  city?: string | null;
  state?: string | null;
  postcode?: string | null;
  country?: string | null;
  email?: string | null;
  phone?: string | null;
}

export const generateExternalId = (billing: BillingInfo): string => {
  const {
    first_name = "",
    last_name = "",
    company = "",
    address_1 = "",
    city = "",
    state = "",
    postcode = "",
    country = "",
    email = "",
    phone = "",
  } = billing;

  // Normalize fields: trim whitespace, convert to lowercase, and handle null/undefined
  const normalizedString = [
    first_name,
    last_name,
    company,
    address_1,
    city,
    state,
    postcode,
    country,
    email,
    phone,
  ]
    .map((field) => (field || "").toString().trim().toLowerCase())
    .join("");

  // Generate SHA-256 hash using CryptoJS
  const hash = generateHash(normalizedString);
  return hash;
};
