import React from "react";
import Counter from "@/components/common/counter";
import { cn } from "@/lib/utils";
import { ImageSkeleton, Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { DeliveryInfo } from "./delivery-info";
import { SocialSharing } from "./social-sharing";
import { SpecialSection } from "./special-section";
import Breadcrumbs from "@/components/common/breadcrumbs";

export const ProductCardImageSkeleton = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div className={cn("grid grid-cols-2 w-full gap-2", className)}>
      <Skeleton className="w-full aspect-[10/16]" />
      <Skeleton className="w-full aspect-[10/16]" />
      <Skeleton className="w-full aspect-[10/16]" />
      <Skeleton className="w-full aspect-[10/16]" />
    </div>
  );
};

export const ProductCardImageSkeletonMobile = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row-reverse gap-2 md:gap-4 w-full",
        className
      )}
    >
      <ImageSkeleton className="flex-1 aspect-[10/14]" />
      <div className="grid grid-cols-6 md:grid-cols-1 gap-2 md:gap-6 md:w-[18%]">
        {Array.from({ length: 6 }).map((_, index) => (
          <ImageSkeleton key={index} className="h-full aspect-square" />
        ))}
      </div>
    </div>
  );
};

export const ProductTitleSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("", className)}>
      <Skeleton className="w-full sm:w-3/5 h-5 sm:h-7 mb-3.5" />
      <Skeleton className="w-2/5 h-6 mb-4 sm:w-1/5 sm:h-9" />
      <div className="flex gap-2">
        <Skeleton className="h-10 w-28" />
        <div>
          <Skeleton className="w-48 h-4 mb-2" />
          <Skeleton className="w-48 h-4" />
        </div>
      </div>
    </div>
  );
};

export const ProductTitleSkeletonNew = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div className={cn("", className)}>
      <Skeleton className="w-full sm:w-3/5 h-5 sm:h-7 mb-3.5" />
      <Skeleton className="w-40 h-6 sm:h-8" />
      <DeliveryInfo />
    </div>
  );
};

export const ProductAttributesSkeleton = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div className={cn("space-y-4", className)}>
      <Skeleton className="w-20 h-6 mb-3" />
      <div className="flex gap-2">
        <Skeleton className="size-10" />
        <Skeleton className="size-10" />
        <Skeleton className="size-10" />
        <Skeleton className="size-10" />
      </div>
      <Skeleton className="w-20 h-6 mb-3" />
      <div className="flex gap-2">
        <Skeleton className="h-10 w-28" />
        <Skeleton className="w-24 h-10" />
        <Skeleton className="w-24 h-10" />
        <Skeleton className="h-10 w-28" />
      </div>
    </div>
  );
};

export const AddToCartSkeleton = () => {
  return (
    <div className="flex items-center py-8 border-b border-gray-300 gap-x-4 ltr:md:pr-32 rtl:md:pl-32 ltr:lg:pr-12 rtl:lg:pl-12 ltr:2xl:pr-32 rtl:2xl:pl-32 ltr:3xl:pr-48 rtl:3xl:pl-48">
      <Counter
        quantity={0}
        onDecrement={() => {}}
        onIncrement={() => {}}
        disableDecrement
        disableIncrement
      />
      <Button
        className="h-11 md:h-12 px-5 bg-heading text-white flex-1 max-w-[200px] py-2 transform-none normal-case hover:text-white hover:bg-gray-600 hover:shadow-cart"
        disabled
      >
        Add to Cart
      </Button>
    </div>
  );
};

export const ProductMetaSkeleton = () => {
  return (
    <div className="pt-6">
      <ul className="pb-1 space-y-3 text-sm pb">
        <span className="flex items-center">
          <span className="inline-block font-semibold text-heading ltr:pr-2 rtl:pl-2">
            Status:
          </span>
          <Skeleton className="w-20 h-4" />
        </span>

        {/* Category */}
        <li className="flex items-center productCategory">
          <span className="inline-block font-semibold text-heading ltr:pr-2 rtl:pl-2">
            Category:
          </span>
          <Skeleton className="w-20 h-4" />
        </li>

        {/* Tags */}
        {/* <li className="flex items-center productTags">
          <span className="inline-block font-semibold text-heading ltr:pr-2 rtl:pl-2">
            Tags:
          </span>
          <div className="flex flex-wrap gap-1">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-20 h-4" />
          </div>
        </li> */}

        {/* Store */}
        <li className="flex items-center productStore">
          <span className="inline-block font-semibold text-heading ltr:pr-2 rtl:pl-2">
            Store:
          </span>
          <Skeleton className="w-20 h-4" />
        </li>

        <li className="flex items-center productStore">
          <span className="inline-block font-semibold text-heading ltr:pr-2 rtl:pl-2">
            View Product Description
          </span>
          <Skeleton className="w-20 h-4" />
        </li>
      </ul>
    </div>
  );
};

export const ProductInfoSkeleton = () => {
  return (
    <>
      <div className="pt-8">
        <Breadcrumbs />
      </div>
      <div className="flex flex-col justify-center pb-10 lg:flex-row gap-x-10 pt-7 lg:pb-14 2xl:pb-20">
        <div className="w-full lg:w-1/2">
          <ProductCardImageSkeletonMobile />
        </div>
        <div className="w-full pt-8 lg:w-1/2 lg:pt-0">
          <ProductTitleSkeletonNew />
          <ProductMetaSkeleton />
          <ProductAttributesSkeleton className="my-5" />
          <Skeleton className="h-6 mb-5 w-28" />
          <AddToCartSkeleton />
          <SpecialSection />
          <SocialSharing isLoading />
        </div>
      </div>
    </>
  );
};
