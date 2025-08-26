"use client";
import Link from "next/link";
import Image from "next/image";
import usePrice from "@/framework/basic-rest/product/use-price";
import { ROUTES } from "@/lib/routes";
import { Product } from "@/framework/basic-rest/types";
import { Skeleton } from "../ui/skeleton";
import { extractStringFromName } from "@/lib/utils";

type SearchProductProps = {
  item: Product;
};

const SearchProduct = ({ item }: SearchProductProps) => {
  const { price, basePrice } = usePrice({
    price: item.sale_price ? item.sale_price : item.price,
    amount: item.sale_price ? item.sale_price : item.price, // get the product sale price
    baseAmount:
      item.variations && item.variations.length > 0
        ? item.variations[0].regular_price
        : item.regular_price, // get the product regular price
    currencyCode: "LKR",
  });

  // Check if the product is in stock
  const isInStock = item.stock_status === "instock" || item.stock_quantity > 0;

  // Render null if the product is out of stock
  // if (!isInStock) {
  //   return null;
  // }

  return (
    <Link
      href={`${ROUTES.PRODUCT}/${item?.slug}`}
      className="flex items-center justify-start w-full p-5 rounded-md group hover:bg-gray-200"
    >
      <div className="relative flex flex-shrink-0 w-16 h-20 mr-4 overflow-hidden bg-gray-200 rounded-md cursor-pointer">
        <Image
          src={
            item.images?.[0]?.src ??
            "https://images.harrietshopping.com/front-web/images/placeholder/placeholder-harriet.jpg"
          }
          width={96}
          height={100}
          loading="eager"
          style={{ objectFit: "contain" }}
          alt={item.name || "Product Image"}
          className="object-fill transition-all bg-gray-200 cursor-pointer group-hover:scale-110"
        />
      </div>
      <div className="flex flex-col w-full overflow-hidden">
        <h3 className="mb-2 text-sm transition-all text-heading group-hover:font-medium">
          {extractStringFromName(item.name)}
        </h3>
        <div
          className={`text-xs font-medium ${
            isInStock ? "text-green-500" : "text-red-500"
          }`}
        >
          <span className="mr-1">
            {isInStock ? "In Stock" : "Out of Stock"}
          </span>
          <div className="text-sm text-[#161616]">{price}</div>
        </div>
      </div>
    </Link>
  );
};

export default SearchProduct;

export const SearchProductSkeleton = () => {
  return (
    <div className="flex items-center justify-start w-full h-auto group animate-pulse">
      <div className="relative flex flex-shrink-0 w-16 h-20 overflow-hidden bg-gray-200 rounded-md cursor-pointer ltr:mr-4 rtl:ml-4">
        <Skeleton className="w-full h-full " />
      </div>
      <div className="flex flex-col w-full overflow-hidden">
        <h3 className="mb-2 text-sm truncate text-heading">
          <Skeleton className="w-3/4 h-4" />
        </h3>
        <div className="text-sm font-semibold text-gray-400">
          <Skeleton className="w-1/2 h-4" />
        </div>
      </div>
    </div>
  );
};
