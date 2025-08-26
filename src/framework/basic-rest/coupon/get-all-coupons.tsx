import axios from "axios";
import { Coupon } from "@/framework/basic-rest/types";

const WOOCOMMERCE_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL!;
const WOOCOMMERCE_CONSUMER_KEY = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY!;
const WOOCOMMERCE_CONSUMER_SECRET = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET!;

const WooCommerce = axios.create({
  baseURL: WOOCOMMERCE_API_URL,
  auth: {
    username: WOOCOMMERCE_CONSUMER_KEY,
    password: WOOCOMMERCE_CONSUMER_SECRET,
  },
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchAllCoupons = async (): Promise<Coupon> => {
  try {
    const response = await WooCommerce.get("wp-json/wc/v3/coupons");
    const coupons: Coupon = response.data;

    const filterCoupon = coupons
      .filter((coupon) => coupon.status === "publish")
      .map((coupon) => ({
        id: coupon.id,
        code: coupon.code,
        amount: coupon.amount,
        status: coupon.status,
        discount_type: coupon.discount_type,
        date_expires: coupon.date_expires,
        meta_data: coupon.meta_data,
        product_categories: coupon.product_categories,
      }));
    return filterCoupon;
  } catch (error) {
    console.error("Error fetching coupons:", error);
    throw error;
  }
};
