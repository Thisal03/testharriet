// import { useQuery } from "@tanstack/react-query";
// import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
// import { Category, Product } from "@framework/types";

// const WooCommerce = new WooCommerceRestApi({
//     url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL!,
//     consumerKey: process.env.WC_CONSUMER_KEY || "ck_ceffbac96af210764d282a044e5b24c628640898",
//     consumerSecret: process.env.WC_CONSUMER_SECRET || "cs_62cf1dc67bb1f1a8314ddbc5bf766f3fa3ef1376",
//     version: "wc/v3",
// });


// interface FetchProductsResponse {
//     products: Product[];
// }
  

// export const fetchProductBaseCategory = async ({ queryKey }: { queryKey: [string, Category] }): Promise<FetchProductsResponse[]> => {
//     const [, option] = queryKey; // Destructure the queryKey to get the second element which is our options
//     try {
//         const { data } = await WooCommerce.get(`wp-json/wc/v3/products/by-category/${option.slug}`);
//         return data.map((category: any) => ({
//             id: category.id,
//             name: category.name,
//             slug: category.slug,
//         }));
//     } catch (error) {
//         console.error("Error fetching categories:", error);
//         throw new Error("Failed to fetch categories");
//     }
// };

// // Adjusting the return type to match what useQuery returns
// export const useCategoriesQuery = (options: Category) => {
//     return useQuery({
//         queryFn: fetchProductBaseCategory,
//        queryKey: ["categories", options],
//     });
// };



