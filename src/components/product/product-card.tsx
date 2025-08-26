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
  contactClassName?: string;
  imageContentClassName?: string;
  variant?:
    | "grid"
    | "gridSlim"
    | "list"
    | "listSmall"
    | "gridModern"
    | "gridModernWide"
    | "gridTrendy"
    | "gridNewArrival"
    | "rounded"
    | "circle";
  imgLoading?: "eager" | "lazy";
  showCategory?: boolean;
  showRating?: boolean;
  bgTransparent?: boolean;
  bgGray?: boolean;
  demoVariant?: "ancient";
  disableBorderRadius?: boolean;
  id?: string | number;
  showHotTag?: boolean;
  showFeaturedTag?: boolean;
  showNewTag?: boolean;
  showDiscount?: boolean;
  showStockStatus?: boolean; // <-- add this
}

const PLACEHOLDER_IMAGE =
  "https://images.harrietshopping.com/front-web/images/placeholder/placeholder-harriet.jpg";

const ProductCard = ({
  product,
  className = "",
  contactClassName = "",
  imageContentClassName = "",
  variant = "list",
  imgLoading = "lazy",
  showCategory = false,
  showRating = false,
  bgTransparent = false,
  bgGray = false,
  demoVariant,
  disableBorderRadius = false,
  id,
  showHotTag = false,
  showFeaturedTag = false,
  showNewTag = false,
  showDiscount = false,
  showStockStatus = true, // <-- default true
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

  const hasSecondImage = (product.images?.length ?? 0) > 1;
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

  const shouldShowSecondImage = isHovering && hasSecondImage;
  const imageSrc = shouldShowSecondImage
    ? product.images?.[1]?.src ?? product.images?.[0]?.src ?? PLACEHOLDER_IMAGE
    : product.images?.[0]?.src ?? PLACEHOLDER_IMAGE;

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
      id={id?.toString()}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn(
        `group box-border relative overflow-hidden w-full flex ${
          !disableBorderRadius && "rounded-md"
        } cursor-pointer`,
        {
          "ltr:pr-0 rtl:pl-0 pb-1 flex-col items-start transition duration-700 ease-in-out transform hover:-translate-y-1 md:hover:-translate-y-1 hover:shadow-product":
            [
              "grid",
              "gridModern",
              "gridModernWide",
              "gridTrendy",
              "gridNewArrival",
            ].includes(variant),
          "bg-white":
            !bgGray &&
            [
              "grid",
              "gridSlim",
              "gridModern",
              "gridModernWide",
              "gridTrendy",
              "gridNewArrival",
            ].includes(variant),
          "bg-gray-200": variant === "list" || bgGray,
          "ltr:pr-0 rtl:pl-0 md:pb-1 flex-col items-start":
            variant === "gridSlim",
          "items-center border border-gray-100 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-listProduct":
            variant === "listSmall",
          "flex-row items-center transition-transform ease-linear ltr:pr-2 rtl:pl-2 ltr:lg:pr-3 rtl:lg:pl-3 ltr:2xl:pr-4 rtl:2xl:pl-4":
            variant === "list",
          "!bg-transparent": variant === "grid" && bgTransparent,
        },
        className
      )}
      role="button"
      title={product?.name}
    >
      <div
        className={cn(
          "flex w-full",
          {
            "mb-1 md:mb-1": variant === "grid",
            "mb-1 md:mb-1 pb-0": variant === "gridSlim",
            "flex-shrink-0 w-32 sm:w-44 md:w-36 lg:w-44":
              variant === "listSmall",
            "mb-1 md:mb-1 relative": [
              "gridModern",
              "gridModernWide",
              "gridTrendy",
              "gridNewArrival",
            ].includes(variant),
          },
          imageContentClassName
        )}
      >
        <div className="relative group aspect-[10/14] w-full  rounded-md">
          <Image
            src={imageSrc}
            fill
            alt={product?.name || "Product Image"}
            loading={imgLoading}
            placeholder="blur"
            blurDataURL={getPlaceholderImageURL(imageSrc)}
            style={{ objectFit: "cover" }}
            className={cn(
              `bg-gray-300 transition-all ${
                !disableBorderRadius && "rounded-s-md"
              }`,
              {
                "w-full ": [
                  "grid",
                  "gridModern",
                  "gridModernWide",
                  "gridTrendy",
                  "gridNewArrival",
                ].includes(variant),
                "rounded-md":
                  !disableBorderRadius &&
                  [
                    "grid",
                    "gridModern",
                    "gridModernWide",
                    "gridTrendy",
                  ].includes(variant),
                "rounded-md transition duration-150 ease-linear transform group-hover:scale-105":
                  variant === "gridSlim",
                "rounded-s-md transition duration-200 ease-linear transform group-hover:scale-105":
                  variant === "list",
              }
            )}
          />
        </div>

        <div className="absolute flex flex-col items-start top-2 left-2 gap-y-1">
          {_showDiscount && (
            <span className="bg-[#161616] text-white leading-5 rounded-md inline-block px-1 sm:px-1.5 xl:px-2 py-0.5 sm:py-1 font-semibold text-xs">
              <p>
                <span className="sm:hidden">-</span>
                {discount} <span className="hidden sm:inline">OFF</span>
              </p>
            </span>
          )}

          {_showNewTag && (
            <span className="bg-[#FEE271] text-[#161616] leading-5 rounded-md inline-block px-1 sm:px-1.5 xl:px-2 py-0.5 sm:py-1 font-semibold text-xs">
              New
            </span>
          )}

          {_showFeaturedTag && (
            <span className="bg-[#FEE271]  text-[#161616] leading-5 rounded-md inline-block px-1 sm:px-1.5 xl:px-2 py-0.5 sm:py-1 font-semibold text-xs">
              Featured
            </span>
          )}

          {_showHotTag && (
            <span className="bg-[#F18383]  text-[#161616] leading-5 rounded-md inline-block px-1 sm:px-1.5 xl:px-2 py-0.5 sm:py-1 font-semibold text-xs">
              Hot
            </span>
          )}
        </div>

        {variant === "gridModernWide" && (
          <div className="absolute ltr:right-2 rtl:left-2 ltr:sm:right-3 rtl:sm:left-3 bottom-6 space-y-2 w-[32px] sm:w-[42px] lg:w-[52px]">
            <ProductViewIcon className="w-full transition duration-300 ease-in delay-100 bg-white rounded-md sm:opacity-0 group-hover:opacity-100" />
            <ProductWishIcon className="w-full transition duration-300 ease-in delay-200 bg-white rounded-md sm:opacity-0 group-hover:opacity-100" />
            <ProductCompareIcon className="w-full transition duration-300 ease-in delay-300 bg-white rounded-md sm:opacity-0 group-hover:opacity-100" />
          </div>
        )}
      </div>

      <div
        className={cn(
          "w-full overflow-hidden p-2",
          {
            "md:px-2.5 xl:px-4": variant === "grid",
            "px-2 md:px-2.5 xl:px-4 h-full flex flex-col": [
              "gridModern",
              "gridModernWide",
              "gridTrendy",
              "gridNewArrival",
            ].includes(variant),
            "ltr:pl-0 rtl:pr-0": variant === "gridSlim",
            "px-4 lg:px-5 2xl:px-4": variant === "listSmall",
          },
          contactClassName
        )}
      >
        <div className="items-center mb-1 md:flex md:space-x-2 md:justify-between">
          <p className="text-xs font-medium ">
            {extractStringFromName(
              product.categories?.[0]?.name ?? "No Category"
            )}
          </p>
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

        {!!(showCategory || showRating) && (
          <div className="flex flex-col md:flex-row md:items-center lg:flex-row xl:flex-row 2xl:flex-row mb-0.5 items-start">
            {!!showCategory && (
              <h3
                className={cn(
                  "font-semibold text-sm mb-1 md:mb-0 ltr:mr-2 rtl:ml-2 ltr:md:mr-3 rtl:md:ml-3",
                  {
                    "text-white": bgTransparent,
                    "text-black/70": !bgTransparent,
                  }
                )}
              >
                Category
              </h3>
            )}
            {!!showRating && <RatingDisplay rating={2.5} />}
          </div>
        )}

        <h2
          className={cn("truncate mb-1", {
            "text-sm md:text-sm": variant === "grid",
            "font-semibold": demoVariant !== "ancient",
            "font-bold": demoVariant === "ancient",
            "text-xs sm:text-sm md:text-sm": [
              "gridModern",
              "gridModernWide",
              "gridTrendy",
              "gridNewArrival",
            ].includes(variant),
            "md:mb-1.5 text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm":
              variant === "gridSlim",
            "text-sm sm:text-base md:mb-1.5 pb-0": variant === "listSmall",
            "text-sm sm:text-base md:text-sm lg:text-sm xl:text-sm md:mb-1.5":
              variant === "list",
            "text-white": bgTransparent,
            "text-heading": !bgTransparent,
          })}
        >
          {extractStringFromName(product?.name)}
        </h2>

        <div
          className={`font-semibold text-sm sm:text-base mt-1.4 flex flex-wrap gap-x-2 ${
            variant === "grid"
              ? "lg:text-lg lg:mt-1.5"
              : "sm:text-sm md:text-base lg:text-lg lg:mt-2"
          } ${
            [
              "gridModern",
              "gridModernWide",
              "gridTrendy",
              "gridNewArrival",
            ].includes(variant)
              ? "flex flex-col !gap-x-0"
              : ""
          } ${bgTransparent ? "text-white" : "text-heading"}`}
        >
          <div className="flex items-center">
            <span
              className={`inline-block ${
                demoVariant === "ancient"
                  ? "font-bold text-gray-900 text-[12px] md:text-[13px]"
                  : "text-[13px] md:text-[15px]"
              }`}
            >
              {isOnSale(product) ? (
                <>
                  <span>{price}</span>
                  <del
                    className={`truncate text-[11px] md:text-[12px] pl-1 font-normal line-through ${
                      bgTransparent ? "text-white/70" : "text-gray-800"
                    }`}
                  >
                    {basePrice}
                  </del>
                </>
              ) : (
                <span>{regular_amount || price}</span>
              )}
            </span>
          </div>

          {product?.store?.shop_name &&
            SHOW_MINTPAY_VENDORS.includes(product.store.shop_name) && (
              <div className="flex items-center gap-1 mt-1">
                <span className="text-sm font-light text-gray-400 md:text-sm">
                  or 3 X{" "}
                  <b className="font-semibold">
                    Rs{" "}
                    {(parseFloat(price.replace(/[^0-9.]/g, "")) / 3).toFixed(2)}{" "}
                  </b>
                  with
                </span>
                <Link
                  href="https://www.mintpay.lk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="z-10"
                >
                  <Image
                    src="https://images.harrietshopping.com/front-web/images/logos/mintpay logo.png"
                    alt="Mintpay"
                    width={55}
                    height={20}
                    className="ml-2 cursor-pointer hover:cursor-help"
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
        <Skeleton className="w-full h-2 md:h-4" />
        <Skeleton className="w-1/2 h-2 md:h-4" />
      </div>
    </div>
  );
};
