"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { notFound, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Counter from "@/components/common/counter";
import { Button } from "@/components/ui/button";
import { useProductQuery } from "@/framework/basic-rest/product/get-product";
import usePrice from "@/framework/basic-rest/product/use-price";
import { ProductAttributes } from "./product-attributes";
import { SHOW_MINTPAY_VENDORS } from "@/framework/basic-rest/static/no-shipping-products";
import { ProductInfoSkeleton } from "./product-page-skeletons";
import { useCartStore } from "@/store/use-cart-store";
import ImageCarousel, { CarouselImages } from "@/components/ui/image-carousel";
import { fadeInOut } from "@/lib/motion/fade-in-out";
import { CartItem, generateCartItem } from "@/lib/utils/generate-cart-item";
import { SocialSharing } from "./social-sharing";
import { DeliveryInfo } from "./delivery-info";
import { SpecialSection } from "./special-section";
import SizeChart from "./size-chart";
import { useMedia } from "react-use";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import Breadcrumbs from "@/components/common/breadcrumbs";
import { toast } from "sonner";
import { sendGTMEvent } from "@next/third-parties/google";
import type { Variation, Product } from "@/framework/basic-rest/types";
import { extractStringFromName } from "@/lib/utils";
import { useShallowRecentProductsStore } from "@/store/use-recent-products";
import { getCookie } from "cookies-next";
import ProductToast from "./product-toast";
import { NotFoundItem } from "@/components/not-found-section";

interface ProductInfoProps {
  slug: string;
}

interface SelectedOptions {
  [key: string]: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ slug }) => {
  const isMobile = useMedia("(max-width: 769px)");
  const addItemToCart = useCartStore((state) => state.addItemToCart);
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);
  const [addToCartLoader, setAddToCartLoader] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(
    null
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const addProductToStore = useShallowRecentProductsStore(
    (state) => state.addItemToStore
  );

  const { data: product, isLoading } = useProductQuery(slug);

  // Memoized derived values
  const hasVariations = useMemo(
    () => product?.variations && product.variations.length > 0,
    [product]
  );

  // Price calculation
  const priceData = useMemo(() => {
    if (selectedVariation) {
      return {
        price: selectedVariation.sale_price || selectedVariation.price,
        amount: selectedVariation.sale_price || selectedVariation.price,
        baseAmount: selectedVariation.regular_price,
        currencyCode: "LKR",
      };
    }
    return product
      ? {
          price: product.sale_price || product.price,
          amount: product.sale_price || product.price,
          baseAmount: product.regular_price,
          currencyCode: "LKR",
        }
      : undefined;
  }, [selectedVariation, product]);

  const { price, basePrice, discount, regular_amount } = usePrice(priceData);

  // Variations and stock quantities
  const variations = useMemo(() => product?.variations || [], [product]);

  // Attributes data
  const attributesData = useMemo(
    () =>
      product?.attributes?.reduce<Record<string, string[]>>((acc, attr) => {
        acc[attr.name] = attr.options;
        return acc;
      }, {}) || {},
    [product]
  );



  // Check if an option is available for selection
  const isOptionAvailable = useCallback((attributeName: string, option: string) => {
    if (!variations.length) return true;
    
    return variations.some((variation) => {
      // Check if this variation matches all currently selected options except the current attribute
      const matchesCurrentSelection = Object.entries(selectedOptions).every(([name, value]) => {
        if (name === attributeName) return true;
        const variationAttr = variation.attributes?.find(attr => attr.name === name);
        return variationAttr?.option === value;
      });

      if (!matchesCurrentSelection) return false;

      const currentAttr = variation.attributes?.find(attr => attr.name === attributeName);
      return currentAttr?.option === option && 
             variation.stock_status !== "outofstock" && 
             variation.stock_status !== "onbackorder";
    });
  }, [variations, selectedOptions]);

  // Price range for variations
  const [minPrice, maxPrice] = useMemo(() => {
    if (!variations.length) return [0, 0];

    const prices = variations.map((v) => {
      return v.sale_price
        ? parseInt(v.sale_price)
        : v.price
        ? parseInt(v.price)
        : 0;
    });
    return [Math.min(...prices), Math.max(...prices)];
  }, [variations]);

  // Product description
  const description = useMemo(
    () => product?.description || "",
    [product]
  );

  // Carousel images
  const carouselImages: CarouselImages = useMemo(() => {
    const images = new Map<string, { url: string; title: string }>();

    // Add variation image first (if it exists)
    if (selectedVariation?.image?.src) {
      images.set(selectedVariation.image.src, {
        url: selectedVariation.image.src,
        title: selectedVariation.image.name || "Variation Image",
      });
    }

    // Add product images (avoiding duplicates)
    product?.images?.forEach((image) => {
      if (image.src && !images.has(image.src)) {
        images.set(image.src, {
          url: image.src || PLACEHOLDER_IMAGE,
          title: image.url || "Product Image",
        });
      }
    });

    return Array.from(images.values());
  }, [selectedVariation, product?.images]);

  // Helper function to clean strings

  // Breadcrumbs
  const crumbs = useMemo(
    () => [
      ...(product?.categories?.length
        ? [
            {
              label: extractStringFromName(product.categories[0].name),
              href: `/product-category/${product.categories[0].slug}`,
            },
          ]
        : []),
      {
        label: extractStringFromName(product?.name || ""),
        href: `/product/${slug}`,
      },
    ],
    [product, slug]
  );

  // Check if product is new arrival
  const isNewArrival = useCallback(() => {
    if (!product?.date_created) return false;
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
    const productDate = new Date(product.date_created);
    return productDate >= fourteenDaysAgo && productDate <= new Date();
  }, [product]);

  // Check if product is on sale
  const isOnSale = useCallback((prod: Product | Variation | null) => {
    if (!prod) return false;
    const currentDate = new Date();
    const startDate = prod.date_on_sale_from
      ? new Date(prod.date_on_sale_from)
      : null;
    const endDate = prod.date_on_sale_to
      ? new Date(prod.date_on_sale_to)
      : null;

    if (!startDate && !endDate) return false;
    if (!startDate && endDate) return currentDate <= endDate;
    if (startDate)
      return currentDate >= startDate && (!endDate || currentDate <= endDate);
    return false;
  }, []);

  // Handle attribute selection
  const handleAttributeClick = useCallback(
    (option: string, attributeName: string) => {
      const newOptions = { ...selectedOptions, [attributeName]: option };
      setSelectedOptions(newOptions);

      const selectedVariationName = Object.values(newOptions).sort().join(", ");
      const variation = variations.find(
        (v) => v.name.split(", ").sort().join(", ") === selectedVariationName
      );

      setSelectedVariation(variation || null);
    },
    [selectedOptions, variations]
  );

  const stockQty = useMemo(() => {
    if (!variations.length) return {};

    const stockMap: Record<string, number> = {};

    variations.forEach((variation) => {
      variation.attributes?.forEach((attribute) => {
        const option = attribute.option;

        if (variation.manage_stock) {
          if (variation.stock_status === "instock") {
            stockMap[option] = variation.stock_quantity || 0;
          } else {
            stockMap[option] = 0;
          }
        } else if (variation.stock_status === "instock") {
          stockMap[option] = 9999;
        } else {
          stockMap[option] = 0;
        }
      });
    });

    return stockMap;
  }, [variations]);

  // Replace the isOutOfStock calculation with this:
  const isOutOfStock = useMemo(() => {
    if (!product) return true;

    // If we have a selected variation, check its stock status
    if (selectedVariation) {
      return (
        selectedVariation.stock_quantity === 0 || 
        selectedVariation.stock_status === "outofstock" ||
        selectedVariation.stock_status === "onbackorder"
      );
    }

    // Otherwise check the main product
    return (
      product.stock_quantity === 0 || product.stock_status === "outofstock" || product.stock_status === "onbackorder"
    );
  }, [product, selectedVariation]);

  // Replace the selectedVariationStock calculation with this:
  const selectedVariationStock = useMemo(() => {
    if (!selectedVariation) return 0;

    if (selectedVariation.manage_stock) {
      return selectedVariation.stock_quantity || 0;
    }

    return selectedVariation.stock_status === "instock" ? 9999 : 0;
  }, [selectedVariation]);

  // Add to cart function
  const addToCart = useCallback(async () => {
    if (!product) return;

    setAddToCartLoader(true);

    try {
      const variation = variations.find(
        (v) =>
          v.name.split(", ").sort().join(", ") ===
          Object.values(selectedOptions).sort().join(", ")
      );

      const attributesArray = Object.entries(selectedOptions).map(
        ([name, option]) => ({
          name,
          slug:
            product.attributes.find((attr) => attr.name === name)?.slug ?? "",
          options: option,
        })
      );

      const VattributesArray = variation
        ? [
            {
              id: Number(variation?.id) ?? 0,
              parent_id: Number(variation?.parent_id) ?? 0,
              name: Object.values(selectedOptions).join(", "),
              price: parseFloat(variation?.price ?? "0"),
            },
          ]
        : [
            {
              id: 0,
              parent_id: 0,
              name: Object.values(selectedOptions).join(", "),
              price: parseFloat(product?.price ?? "0"),
            },
          ];

      const item = generateCartItem(
        product,
        attributesArray,
        VattributesArray,
        selectedVariation ?? undefined
      );

      if (selectedVariation?.id) {
        item.id = selectedVariation.id;
      }

      const clickId = searchParams.get("fbclid");

      const eventId = "_" + Math.random().toString(36).substr(2, 9);
      const fbp = getCookie("_fbp");
      const fbc = getCookie("_fbc");
      sendGTMEvent({
        event: "addToCart",
        content_id: item.id,
        content_name: item?.name ?? "",
        content_category: item?.categories?.[0]?.name ?? "",
        content_price: item.price,
        content_quantity: quantity || 1,
        vendor_id: item?.store.id ?? "",
        browser_id: fbp,
        click_id: clickId,
        event_id: eventId,
        fbp,
        fbc,
      });

      addItemToCart(item as CartItem, quantity, product?.sku ?? "");
      toast(<ProductToast item={item} />, {
        position: "bottom-right",
        closeButton: false,
        unstyled: true,
        classNames: {
          toast:
            "w-[400px] bg-white shadow-xl rounded-lg mb-20 lg:mb-0 border bg-slate-100",
        },
      });
    } finally {
      setAddToCartLoader(false);
    }
  }, [
    product,
    selectedOptions,
    variations,
    searchParams,
    price,
    quantity,
    addItemToCart,
  ]);

  // Track view content
  useEffect(() => {
    const shouldSkip = !product || !price;

    if (shouldSkip) return;

    const contentId = product.id;

    const contentPrice = parseFloat(
      (isOnSale(product) ? price : regular_amount || "0").replace(
        /[^0-9.]/g,
        ""
      )
    );

    if (isNaN(contentPrice) || contentPrice <= 0) {
      return;
    }

    const contentCategory = product.categories?.[0]?.name || "";

    const eventIdVC = "_" + Math.random().toString(36).substr(2, 9);
    const fbpVC = getCookie("_fbp");
    const fbcVC = getCookie("_fbc");

    sendGTMEvent({
      event: "viewContent",
      content_id: contentId,
      content_name: product.name,
      content_category: contentCategory,
      content_price: contentPrice,
      vendor_id: product.store.id,
      browser_id: fbpVC,
      click_id: searchParams.get("fbclid"),
      event_id: eventIdVC,
      fbp: fbpVC,
      fbc: fbcVC,
    });
  }, [product, price, regular_amount, searchParams]);

  // Set default variation on load
  useEffect(() => {
    if (product?.variations?.length) {
      const defaultVariation =
        product.variations.find(
          (v) => v.stock_status !== "outofstock" && v.attributes.length
        ) ||
        (product.variations[0] && product.variations[0].attributes.length
          ? product.variations[0]
          : null);

      if (defaultVariation) {
        setSelectedVariation(defaultVariation);
        const defaultAttributes = Array.isArray(defaultVariation.attributes)
          ? defaultVariation.attributes.reduce(
              (acc: Record<string, string>, attr: any) => {
                acc[attr.name] = attr.option;
                return acc;
              },
              {}
            )
          : {};
        setSelectedOptions(defaultAttributes);
      }
    }
  }, [product]);

  // Reset image index when variation changes
  useEffect(() => {
    if (selectedVariation?.image?.src) {
      setCurrentImageIndex(0);
    }
  }, [selectedVariation]);

  // Handle not found state
  useEffect(() => {
    if (!isLoading && !product) {
      // Trigger 404 monitoring before calling notFound
      const url = `${window.location.origin}/product/${slug}`;
      fetch("/api/404-monitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          referer: document.referrer || null,
          userAgent: navigator.userAgent || null,
          pathname: `/product/${slug}`,
          slug,
          errorType: "product",
          httpStatus: 404,
        }),
      }).catch(err => {
        console.error("Error sending 404 notification:", err);
      });
      
      notFound();
    } else if (product) {
      addProductToStore(product);
    }
  }, [isLoading, product, slug, addProductToStore]);

  if (isLoading || !product) {
    return <ProductInfoSkeleton />;
  }

  if (!product?.store.enabled) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full pt-8 gap-10 pb-16 lg:pb-20">
        <NotFoundItem
          title="This shop is currently disabled."
          subtitle="The shop you are looking for does not exist or is currently unavailable."
        />
      </div>
    );
  }

  return (
    <>
      <div className="pt-8">
        <Breadcrumbs breadcrumbs={crumbs} />
      </div>

      <div className="flex flex-col justify-center pb-10 lg:flex-row gap-x-10 pt-7 lg:pb-14 2xl:pb-20">
        {/* Product Gallery */}
        <div className="w-full lg:w-1/2">
          <ImageCarousel
            images={carouselImages}
            aspectRatio="auto"
            aspectRatioClass="aspect-[10/14]"
            thumbPosition={isMobile ? "bottom" : "left"}
            imageFit="cover"
            selectedIndex={currentImageIndex}
            onSlideChange={setCurrentImageIndex}
          />
        </div>

        {/* Product Details */}
        <div className="w-full pt-8 lg:pt-0 lg:w-1/2">
          {/* Product Header */}
          <div className="">
            <div className="flex gap-1">
              {discount && isOnSale(product) && (
                <span className="bg-heading font-semibold text-[#ffff] text-xs mb-2 md:text-xs rounded-md inline-flex items-center justify-center px-1.5 sm:px-1.5 xl:px-2 py-0.5 sm:py-[3px]">
                  {discount} <span className="hidden sm:inline">OFF</span>
                </span>
              )}
              {isNewArrival() && (
                <span className="bg-[#FCD200] font-semibold text-[#161616] text-10px md:text-xs leading-5 rounded-l-xl rounded-br-2xl inline-flex items-center justify-center px-1.5 sm:px-1.5 mb-1 xl:px-2 py-0.5 sm:py-[3px]">
                  New Arrival
                </span>
              )}
              {product.featured && (
                <span className="bg-[#FFDD55] font-semibold text-[#161616] text-xs md:text-xs rounded-md inline-flex items-center justify-center px-1.5 sm:px-1.5 xl:px-2 py-0.5">
                  Featured
                </span>
              )}
            </div>

            <h2 className="text-heading text-lg md:text-base lg:text-lg 2xl:text-xl font-bold hover:text-black mb-3.5">
              {extractStringFromName(product.name)}
            </h2>

            {variations.length > 0 &&
              minPrice > 0 &&
              maxPrice > 0 &&
              minPrice !== maxPrice && (
                <div className="font-semibold text-gray-400 md:text-base ltr:pr-2 rtl:pl-2 ltr:md:pr-0 rtl:md:pl-0 ltr:lg:pr-2 rtl:lg:pl-2 ltr:2xl:pr-0 rtl:2xl:pl-0">
                  From LKR {minPrice.toFixed(2)} - LKR {maxPrice.toFixed(2)}
                </div>
              )}

            <div className="flex items-center">
              <div className="space-x-2 text-base font-bold text-heading md:text-xl lg:text-xl 2xl:text-2xl ltr:pr-2 rtl:pl-2 ltr:md:pr-0 rtl:md:pl-0 ltr:lg:pr-2 rtl:lg:pl-2 ltr:2xl:pr-0 rtl:2xl:pl-0">
                <span>{isOnSale(product) ? price : regular_amount}</span>
                {(!price || !regular_amount) && !selectedVariation && (
                  <span className="text-red-500">
                    {product.stock_status === "onbackorder" ? "On Backorder" : "Out of Stock"}
                  </span>
                )}
              </div>
              {isOnSale(product) && discount && (
                <span className="text-sm text-gray-400 line-through font-segoe md:text-base lg:text-base xl:text-lg ltr:pl-2 rtl:pr-2">
                  {basePrice}
                </span>
              )}
            </div>

            {product.store?.shop_name &&
              SHOW_MINTPAY_VENDORS.includes(product.store.shop_name) && (
                <div className="flex items-center mt-3 mb-3">
                  <span className="text-sm text-gray-600 md:text-base">
                    or 3 installments of{" "}
                    <b>
                      Rs{" "}
                      {(parseFloat(price.replace(/[^0-9.]/g, "")) / 3).toFixed(
                        2
                      )}{" "}
                    </b>
                    with
                  </span>
                  <div className="relative ml-2">
                    <Image
                      src="https://images.harrietshopping.com/front-web/images/logos/mintpay logo.png"
                      alt="Card Payment"
                      width={80}
                      height={28}
                      priority
                    />
                  </div>
                </div>
              )}

            <DeliveryInfo />
            <div className="pt-4">
              <ul className="space-y-3 text-sm">
                <span className="flex items-center">
                  <span className="inline-block font-semibold text-heading ltr:pr-2 rtl:pl-2">
                    Status:
                  </span>
                  {isOutOfStock ? (
                    <span className="text-red-500">
                      {selectedVariation?.stock_status === "onbackorder" || product.stock_status === "onbackorder" 
                        ? "On Backorder" 
                        : "Sold Out"
                      }
                    </span>
                  ) : (
                    <span>
                      {selectedVariation 
                        ? (selectedVariation.stock_status === "instock" ? "In Stock" : "Out of Stock")
                        : (product.stock_status === "instock" ? "In Stock" : "Out of Stock")
                      }
                    </span>
                  )}
                </span>

                <li>
                  <span className="inline-block font-semibold text-heading ltr:pr-2 rtl:pl-2">
                    Category:
                  </span>
                  {product.categories?.[0] && (
                    <Link
                      href={`/product-category/${product.categories[0].slug}`}
                      className="transition hover:underline hover:text-heading"
                      prefetch={false}
                    >
                      {extractStringFromName(product.categories[0].name)}
                    </Link>
                  )}
                </li>

                <li>
                  <span className="inline-block font-semibold text-heading ltr:pr-2 rtl:pl-2">
                    Store:
                  </span>
                  {product.store && (
                    <Link
                      href={`/shops/${product.store.id}`}
                      className="transition hover:underline hover:text-heading"
                      prefetch={false}
                    >
                      {extractStringFromName(product.store.shop_name)}
                    </Link>
                  )}
                </li>
              </ul>
            </div>

            {description && (
              <Accordion type="single" collapsible>
                <AccordionItem value="product-description">
                  <AccordionTrigger className="py-3 font-semibold rounded-none text-heading">
                    View Product Description
                  </AccordionTrigger>
                  <AccordionContent className="">
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </div>

          {/* Product Attributes */}
          <div className="mt-3 border-t border-gray-300">
            <div className="flex">
              <div className="py-auto">
                <div className="flex">
                  <div className="flex-row justify-between pt-4">
                    {product.type !== "simple" &&
                      Object.entries(attributesData).map(
                        ([name, options], id) => (
                          <ProductAttributes
                            key={id}
                            title={name}
                            attributes={options}
                            onClick={handleAttributeClick}
                            active={selectedOptions[name]}
                            stockQty={stockQty}
                            isOutStock={isOutOfStock}
                            isOptionAvailable={(option: string) => isOptionAvailable(name, option)}
                          />
                        )
                      )}
                  </div>
                </div>

                {product.id && <SizeChart productId={product.id} />}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center py-6 mb-4 border-b border-gray-300 gap-x-4">
            <Counter
              quantity={quantity}
              onIncrement={() => setQuantity((prev) => Math.min(prev + 1, 99))}
              onDecrement={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              disableDecrement={
                quantity === 1 ||
                isOutOfStock ||
                addToCartLoader ||
                (hasVariations && !selectedVariation) ||
                !price ||
                !regular_amount
              }
              disableIncrement={
                (selectedVariation &&
                  quantity >= (selectedVariationStock ?? 0)) ||
                isOutOfStock ||
                addToCartLoader ||
                (hasVariations && !selectedVariation) ||
                !price ||
                !regular_amount
              }
            />

            <Button
              onClick={addToCart}
              className="h-11 md:h-12 px-5 bg-heading text-white flex-1 max-w-[200px] py-2 transform-none normal-case hover:text-white hover:bg-gray-600 hover:shadow-cart"
              disabled={
                isOutOfStock ||
                addToCartLoader ||
                (hasVariations && !selectedVariation) ||
                !price ||
                !regular_amount
              }
            >
              {addToCartLoader ? (
                <motion.span
                  className="flex items-center justify-center"
                  initial="from"
                  animate="to"
                  variants={fadeInOut(0.25)}
                  transition={{ duration: 0.25 }}
                >
                  Processing...
                </motion.span>
              ) : (
                <span className="add-to-cart-trigger">Add to Cart</span>
              )}
            </Button>
            {selectedVariation && selectedVariationStock !== 9999 && (
              <span className="text-sm">
                {selectedVariationStock} items left
              </span>
            )}
          </div>
          <SpecialSection data={product} />

          <SocialSharing data={product} />
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
