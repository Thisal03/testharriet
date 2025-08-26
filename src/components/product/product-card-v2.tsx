"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import RatingDisplay from "@/components/common/rating-display";
import ProductCompareIcon from "@/components/icons/product-compare-icon";
import ProductViewIcon from "@/components/icons/product-view-icon";
import ProductWishIcon from "@/components/icons/product-wish-icon";
import usePrice from "@/framework/basic-rest/product/use-price";
import { Product, Variation } from "@/framework/basic-rest/types";
import { SHOW_MINTPAY_VENDORS } from "@/framework/basic-rest/static/no-shipping-products";
import { useProductVariationQuery } from "@/framework/basic-rest/product/get-product";
import { cn, extractStringFromName } from "@/lib/utils";
import { ImageSkeleton, Skeleton } from "../ui/skeleton";
import { getPlaceholderImageURL } from "@/lib/utils/placeholder-image";

interface ProductProps {
  product: Product;
  className?: string;
  imgLoading?: "eager" | "lazy";
  showCategory?: boolean;
  showRating?: boolean;
  showHotTag?: boolean;
  showFeaturedTag?: boolean;
  showNewTag?: boolean;
  showDiscount?: boolean;
  showStockStatus?: boolean;
}

const PLACEHOLDER_IMAGE =
  "https://images.harrietshopping.com/front-web/images/placeholder/placeholder-harriet.jpg";

const ProductCard = ({
  product,
  className = "",
  imgLoading = "lazy",
  showCategory = false,
  showRating = false,
  showHotTag = false,
  showFeaturedTag = false,
  showNewTag = false,
  showDiscount = false,
  showStockStatus = true,
}: ProductProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const firstVariationId = product.variations?.[0]?.id
    ? undefined
    : (product.variations?.[0] as number | undefined);

  const variationRes = useProductVariationQuery(product.id, firstVariationId);

  const selectedVariation = useMemo(() => {
    if (product.variations?.[0]?.id) {
      return product.variations[0];
    }
    return variationRes
      ? (variationRes?.data?.data as Variation | undefined)
      : undefined;
  }, [product.variations, variationRes?.data?.data]);

  // Price calculation
  const { price, basePrice, discount, regular_amount } = usePrice(
    selectedVariation
      ? {
          price: selectedVariation?.sale_price || selectedVariation?.price,
          amount: selectedVariation?.sale_price || selectedVariation?.price,
          baseAmount: selectedVariation?.regular_price,
          currencyCode: "LKR",
        }
      : product && {
          price: product.sale_price || product.price,
          amount: product.sale_price || product.price,
          baseAmount: product.regular_price,
          currencyCode: "LKR",
        }
  );

  const productUrl = `/product/${product.slug}`;

  const isOnSale = (product: Product): boolean => {
    try {
      const currentDate = new Date();
      const startDate = product.date_on_sale_from
        ? new Date(product.date_on_sale_from)
        : null;
      const endDate = product.date_on_sale_to
        ? new Date(product.date_on_sale_to)
        : null;

      if (startDate && isNaN(startDate.getTime())) return false;
      if (endDate && isNaN(endDate.getTime())) return false;

      if (!startDate && !endDate) return false;
      if (!startDate && endDate) return currentDate <= endDate;

      return (
        currentDate >= startDate! &&
        (endDate === null || currentDate <= endDate)
      );
    } catch {
      return false;
    }
  };

  const isNewArrival = () => {
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
    const productDate = new Date(product.date_created ?? new Date());
    return productDate >= fourteenDaysAgo && productDate <= new Date();
  };

  const hasSecondImage = (product.images?.length ?? 0) > 1;
  const primaryImageSrc = product.images?.[0]?.src ?? PLACEHOLDER_IMAGE;
  const secondaryImageSrc = product.images?.[1]?.src ?? primaryImageSrc;

  const _showDiscount = discount && isOnSale(product) && showDiscount;
  const _showNewTag = isNewArrival() && showNewTag;
  const _showFeaturedTag = product.featured === true && showFeaturedTag;
  const _showHotTag = product.name && showHotTag;

  const stockStatus =
    product.stock_status === "instock"
      ? { text: "In Stock", color: "#0C642D" }
      : product.stock_status === "outofstock" || product.stock_quantity === 0
      ? { text: "Sold Out", color: "#B21010" }
      : null;

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn(
        "group box-border relative w-full flex cursor-pointer bg-white flex-col items-start transition duration-700 ease-in-out transform hover:-translate-y-1",
        className
      )}
      role="button"
      title={product?.name}
    >
      <div className="flex w-full mb-1 relative">
        <div className="relative group aspect-[10/14] w-full">
          {/* Primary Image */}
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              isHovering && hasSecondImage ? "opacity-0" : "opacity-100"
            }`}
          >
            <Image
              src={primaryImageSrc}
              fill
              alt={product?.name || "Product Image"}
              loading={imgLoading}
              placeholder="blur"
              blurDataURL={getPlaceholderImageURL(primaryImageSrc)}
              style={{ objectFit: "cover" }}
              className="bg-gray-300"
            />
          </div>

          {/* Secondary Image - only shown if exists */}
          {hasSecondImage && (
            <div
              className={`absolute inset-0 transition-opacity duration-300 ${
                isHovering ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={secondaryImageSrc}
                fill
                alt={product?.name || "Product Image"}
                loading={imgLoading}
                placeholder="blur"
                blurDataURL={getPlaceholderImageURL(secondaryImageSrc)}
                style={{ objectFit: "cover" }}
                className="bg-gray-300"
              />
            </div>
          )}
        </div>

        <div className="absolute flex flex-col items-start top-2 left-2 gap-y-1">
          {_showDiscount && (
            <span className="bg-[#161616] text-white leading-5 rounded-xs inline-block px-1 sm:px-1.5 xl:px-2 py-0.5  font-semibold text-xs">
              <p>
                <span className="sm:hidden">-</span>
                {discount} <span className="hidden sm:inline">OFF</span>
              </p>
            </span>
          )}

          {_showNewTag && (
            <span className="bg-[#FEE271] text-[#161616] leading-5 rounded-xs inline-block px-1 sm:px-1.5 xl:px-2 py-0.5  font-semibold text-xs">
              New
            </span>
          )}

          {_showFeaturedTag && (
            <span className="bg-[#FEE271] text-[#161616] leading-5 rounded-xs inline-block px-1 sm:px-1.5 xl:px-2 py-0.5  font-semibold text-xs">
              Featured
            </span>
          )}

          {_showHotTag && (
            <span className="bg-[#F18383] text-[#161616] leading-5 rounded-xs inline-block px-1 sm:px-1.5 xl:px-2 py-0.5  font-semibold text-xs">
              Hot
            </span>
          )}
        </div>
      </div>

      <div className="w-full pb-2">
        <div className="items-center mb-1 md:flex md:space-x-2 md:justify-between">
          {showCategory && (
            <p className="text-xs font-medium">
              {extractStringFromName(
                product.categories?.[0]?.name ?? "No Category"
              )}
            </p>
          )}
          {showStockStatus && stockStatus && (
            <div className="items-center flex-none inline-block">
              <span
                className="text-xs font-semibold"
                style={{ color: stockStatus.color }}
              >
                {stockStatus.text}
              </span>
            </div>
          )}
        </div>

        <h2 className="line-clamp-1 mb-1 text-sm font-semibold">
          {extractStringFromName(product?.name)}
        </h2>

        {showRating && <RatingDisplay rating={2.5} />}

        <div className="font-semibold text-sm sm:text-base mt-1.4 flex flex-wrap gap-x-2">
          <div className="flex flex-wrap items-center">
            <span className="inline-flex flex-wrap items-center text-[13px] md:text-[15px]">
              {isOnSale(product) ? (
                <>
                  <span>{price}</span>
                  <del className="truncate text-[11px] md:text-[12px] pl-1 font-normal line-through text-gray-800">
                    {basePrice}
                  </del>
                </>
              ) : (
                <span className="text-sm">{regular_amount || price}</span>
              )}
            </span>
          </div>

          {product?.store?.shop_name &&
            SHOW_MINTPAY_VENDORS.includes(product.store.shop_name) && (
              <div className="inline-flex flex-wrap items-center gap-1 mt-1">
                <span className="text-[12px] md:text-[13px] font-light text-neutral-500">
                  or 3 X{" "}
                  <b className="font-semibold">
                    Rs{" "}
                    {(parseFloat(price.replace(/[^0-9.]/g, "")) / 3).toFixed(2)}{" "}
                  </b>
                  with{" "}
                </span>
                <Link
                  href="https://www.mintpay.lk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" z-10"
                >
                  <Image
                    src="https://images.harrietshopping.com/front-web/images/logos/mintpay logo.png"
                    alt="Mintpay"
                    width={55}
                    height={20}
                    className="cursor-pointer hover:cursor-help"
                  />
                </Link>
              </div>
            )}
        </div>
      </div>
      <Link href={productUrl} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default ProductCard;

export const ProductCardSkeleton = () => {
  return (
    <div>
      <ImageSkeleton className="w-full aspect-[10/14]" />
      <div className="flex flex-col gap-2 mt-2">
        <Skeleton className="w-3/4 h-1 md:h-3" />
        <Skeleton className="w-full h-2 md:h-3" />
        <Skeleton className="w-1/2 h-2 md:h-3" />
      </div>
    </div>
  );
};
