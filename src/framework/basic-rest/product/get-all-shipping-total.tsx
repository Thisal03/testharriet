import { ShippingTotal } from "@/framework/basic-rest/types";
import axios from "axios";

// Define the base URL for your WooCommerce site
const WOOCOMMERCE_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL!;
const WOOCOMMERCE_CONSUMER_KEY = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY!;
const WOOCOMMERCE_CONSUMER_SECRET = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET!;

// Set up Axios with authentication
const WooCommerce = axios.create({
  baseURL: WOOCOMMERCE_API_URL,
  auth: {
    username: WOOCOMMERCE_CONSUMER_KEY,
    password: WOOCOMMERCE_CONSUMER_SECRET,
  },
});

export const fetchAllShipping = async (): Promise<ShippingTotal> => {
  try {
    const response = await WooCommerce.get(
      "wp-json/wc/v3/shipping/zones/3/methods"
    );
    const shippingMethods: ShippingTotal = response.data;

    // Filter to return only enabled shipping methods
    const enabledShippingMethods = shippingMethods.filter(
      (method) => method.enabled === true
    );

    return enabledShippingMethods;
  } catch (error) {
    console.error("Error fetching shipping methods:", error);
    throw error;
  }
};
