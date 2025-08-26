import { QueryOptionsType, Product } from "@/framework/basic-rest/types";
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

export const fetchProducts = async () => {
  try {
    let productsWithVariations: Product[] = [];
    let page = 1;
    let totalFetched = 0;

    let response = await WooCommerce.get(
      `wp-json/wc/v3/products?per_page=10&status=publish&page=${page}`
    );
    let products = response.data;

    // Process the initial batch of products
    let processedProducts = await Promise.all(
      products.map(async (product: Product) => {
        if (product.type === "variable") {
          const { data: variations } = await WooCommerce.get(
            `wp-json/wc/v3/products/${product.id}/variations`
          );
          return { ...product, variations };
        }
        return product;
      })
    );

    // Add processed products to the total list
    productsWithVariations = [...productsWithVariations, ...processedProducts];

    // Increment the page number and total fetched count
    page++;
    totalFetched += processedProducts.length;

    // Continue fetching in batches of 50 until 1000 products are fetched
    while (totalFetched < 400) {
      response = await WooCommerce.get(
        `wp-json/wc/v3/products?per_page=100&status=publish&page=${page}`
      );
      products = response.data;

      // If no more products are returned, break the loop
      if (products.length === 0) {
        break;
      }

      // Process each product to include variations if applicable
      processedProducts = await Promise.all(
        products.map(async (product: Product) => {
          if (product.type === "variable") {
            const { data: variations } = await WooCommerce.get(
              `wp-json/wc/v3/products/${product.id}/variations`
            );
            return { ...product, variations };
          }
          return product;
        })
      );

      // Add processed products to the total list
      productsWithVariations = [
        ...productsWithVariations,
        ...processedProducts,
      ];

      // Increment the page number and total fetched count
      page++;
      totalFetched += processedProducts.length;
    }

    return productsWithVariations;
  } catch (error) {
    throw new Error("Error fetching products");
  }
};

export const useProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey: [options],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  });
};
