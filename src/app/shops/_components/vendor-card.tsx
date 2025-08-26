import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Shop } from "@/framework/basic-rest/types";
import { Skeleton } from "@/components/ui/skeleton";

const VendorCard = ({ shop }: { shop: Shop }) => {
  return (
    <Link href={`/shops/${shop.id}`}>
      <div className="relative w-full aspect-[10/12] rounded-md">
        <Image
          src={
            shop.banner ||
            "https://images.harrietshopping.com/front-web/icons/store-vendor.png"
          }
          alt="Shop Image"
          fill
          className="bg-black rounded-md"
          style={{ objectFit: "contain" }}
        />
        {!shop.banner && (
          <h2 className="absolute inset-0 flex items-center justify-center w-full h-full text-sm font-medium text-white rounded-md bg-black/90 sm:text-sm md:text-base lg:text-lg">
            {shop.store_name}
          </h2>
        )}
      </div>
      <h2 className="text-sm font-medium text-heading sm:text-sm md:text-base">
        {shop.store_name}
      </h2>
    </Link>
  );
};

export default VendorCard;

export const VendorCardSkeleton = () => {
  return <Skeleton className="w-full h-[300px] " />;
};
