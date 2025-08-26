import axios from "axios";
import { Meta } from "@/framework/basic-rest/types";
import { useQuery } from "@tanstack/react-query";

const WOOCOMMERCE_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL!;
// const WOOCOMMERCE_CONSUMER_KEY = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY!;
// const WOOCOMMERCE_CONSUMER_SECRET = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET!;

const WooCommerce = axios.create({
  baseURL: WOOCOMMERCE_API_URL,
  //   auth: {
  //     username: WOOCOMMERCE_CONSUMER_KEY,
  //     password: WOOCOMMERCE_CONSUMER_SECRET,
  //   },
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const getCategorySeo = async ({
  slug,
}: {
  slug: string;
}): Promise<Meta> => {
  try {
    const url = `wp-json/wc/v3/product-info/${slug}`;
    const { data } = await WooCommerce.get(url);
    const categorySeo: Meta = data;
    // console.log(categorySeo);
    return categorySeo;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Response Error:", error);
    }
    throw new Error("No category found with this slug");
  }
};

export const useSEO = (slug: string) => {
  return useQuery<Meta, Error>({
    queryKey: [slug],
    queryFn: () => getCategorySeo({ slug }),
    staleTime: 1000 * 60 * 5,
  });
};
