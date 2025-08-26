// getAllPaymentMethod.tsx
import { PaymentMethod } from "@/framework/basic-rest/types";
import axios from "axios";

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

export const fetchAllPaymentMethod = async (): Promise<any[]> => {
  try {
    const response = await WooCommerce.get("wp-json/wc/v3/payment_gateways");
    const PaymentMethods = response.data;

    // Assuming PaymentMethod is an interface or type that describes the shape of a payment method object
    const enabledPaymentMethods = PaymentMethods.filter(
      (method: PaymentMethod & { enabled: boolean }) => method.enabled
    );
    return enabledPaymentMethods;

    // const enabledPaymentMethods = PaymentMethods;
    // return  enabledPaymentMethods;

    // return PaymentMethods;
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    throw error;
  }
};
