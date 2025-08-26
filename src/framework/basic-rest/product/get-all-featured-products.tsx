// import { QueryOptionsType, Product } from '@framework/types';
// import { useQuery } from '@tanstack/react-query';
// import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// const WooCommerce = new WooCommerceRestApi({
//   url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL!,
//   consumerKey: process.env.WC_CONSUMER_KEY! || 'ck_2e2b1d0ba96080d73670341025b596e2e7100b95',
//   consumerSecret: process.env.WC_CONSUMER_SECRET || 'cs_2774bec9ceffc6678d92b518463ecaaafb57137f',
//   version: "wc/v3"
// });

// export const fetchFeaturedProducts = async () => {
//   try {
//     const { data } = await WooCommerce.get('products?per_page=100&featured=true');
//     // console.log(data);
//     return data as Product[];
//   } catch (error) {
//     throw new Error("Error fetching featured products");
//   }
// };

// export const useFeaturedProductsQuery = (options: QueryOptionsType) => {
//   if (options.demoVariant === 'ancient') {
//     return useQuery<Product[], Error>({
//       queryKey: [ options],
//       queryFn: fetchFeaturedProducts
//     });
//   }

//   return useQuery<Product[], Error>({
//     queryKey: [ options],
//     queryFn: fetchFeaturedProducts
//   });
// };

import axios from "axios";
import { QueryOptionsType, Product } from "@/framework/basic-rest/types";
import { useQuery } from "@tanstack/react-query";

// Assuming you have a .env file or similar setup for your environment variables
const WOOCOMMERCE_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL!;
const WOOCOMMERCE_CONSUMER_KEY = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY!;
const WOOCOMMERCE_CONSUMER_SECRET = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET!;

// export const fetchFeaturedProducts = async () => {
//  try {
//     const response = await axios.get(`${WOOCOMMERCE_API_URL}/wp-json/wc/v3/products?featured=true`, {
//       auth: {
//         username: WOOCOMMERCE_CONSUMER_KEY,
//         password: WOOCOMMERCE_CONSUMER_SECRET,
//       },
//     });
//     return response.data as Product[];
//  } catch (error) {
//     throw new Error("Error fetching featured products");
//  }
// };

export const fetchFeaturedProducts = async () => {
  try {
    const response = await axios.get(
      `${WOOCOMMERCE_API_URL}/wp-json/wc/v3/products`,
      {
        auth: {
          username: WOOCOMMERCE_CONSUMER_KEY,
          password: WOOCOMMERCE_CONSUMER_SECRET,
        },
        params: {
          featured: true,
          per_page: 20,
        },
      }
    );
    return response.data as Product[];
  } catch (error) {
    throw new Error("Error fetching featured products");
  }
};

export const useFeaturedProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey: [options],
    queryFn: fetchFeaturedProducts,
    staleTime:
      options.demoVariant === "ancient" ? undefined : 1000 * 60 * 60 * 24 * 7,
  });
};
