import { Product } from "@/framework/basic-rest/types";
import { useQuery } from "@tanstack/react-query";
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

const onsellingfetchProducts = async () => {
  try {
    const { data } = await WooCommerce.get("wp-json/wc/v3/actual-sales");
    // console.log("Products on sale:", data);
    const productsWithVariations = await Promise.all(
      data.map(async (product: Product) => {
        if (product.type === "variable") {
          const { data: variations } = await WooCommerce.get(
            `wp-json/wc/v3/products/${product.id}/variations`
          );
          return { ...product, variations };
        }
        return product;
      })
    );
    return productsWithVariations;
  } catch (error) {
    console.error("Error fetching products on sale:", error);
    throw new Error("Error fetching products on sale");
  }
};

const useOnSaleProductsQuery = () => {
  return useQuery<Product[], Error>({
    queryKey: ["On Selling Products"],
    queryFn: onsellingfetchProducts,
    staleTime: 1000 * 60 * 5,
  });
};

export { useOnSaleProductsQuery, onsellingfetchProducts };
