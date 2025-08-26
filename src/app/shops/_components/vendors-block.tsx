import SectionHeader from "@/components/common/section-header";
import { Shop } from "@/framework/basic-rest/types";
import { cn } from "@/lib/utils";
import VendorCard, { VendorCardSkeleton } from "./vendor-card";

interface ProductsBlockProps {
  sectionHeading: string;
  className?: string;
  categorySlug?: string;
  shops?: Shop[];
  loading: boolean;
  error?: string;
  uniqueKey?: string;
  skeletonLimit?: number;
  productsLimit?: number;
  gridClassName?: string;
}

const VendorsBlock = ({
  sectionHeading,
  className = "",
  shops,
  loading,
  skeletonLimit = 10,
  productsLimit = 10,
  gridClassName,
}: ProductsBlockProps) => {
  return (
    <div
      className={cn(
        `heightFull relative mb-10 md:mb-12 xl:mb-14 md:pb-1 xl:pb-0`,
        className
      )}
    >
      <SectionHeader sectionHeading={sectionHeading} />
      <div
        className={cn(
          "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-6 3xl:grid-cols-7 gap-4",
          gridClassName
        )}
      >
        {loading
          ? Array.from({ length: skeletonLimit }).map((_, id) => (
              <VendorCardSkeleton key={id} />
            ))
          : shops?.slice(0, productsLimit).map((shop, id) => {
              if (!shop.store_name && !shop.banner) return null;
              return <VendorCard key={shop.id} shop={shop} />;
            })}
      </div>
    </div>
  );
};

export default VendorsBlock;
