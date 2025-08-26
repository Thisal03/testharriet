import SectionHeader from "@/components/common/section-header";
import { Product } from "@/framework/basic-rest/types";
import ProductCard, {
  ProductCardSkeleton,
} from "@/components/product/product-card-v2";
import { cn } from "@/lib/utils";

interface ProductsBlockProps {
  sectionHeading: string;
  className?: string;
  categorySlug?: string;
  products?: Product[];
  loading: boolean;
  error?: string;
  uniqueKey?: string;
  skeletonLimit?: number;
  productsLimit?: number;
  gridClassName?: string;
  type?:
    | "rounded"
    | "circle"
    | "gridTrendy"
    | "grid"
    | "gridSlim"
    | "list"
    | "listSmall";
  showHotTag?: boolean;
  showFeaturedTag?: boolean;
  showNewTag?: boolean;
  showDiscount?: boolean;
  showStockStatus?: boolean;
}

const ProductsBlock = ({
  sectionHeading,
  className = "",
  type,
  products,
  loading,
  skeletonLimit = 10,
  productsLimit = 10,
  gridClassName,
  showHotTag = false,
  showFeaturedTag = false,
  showNewTag = false,
  showDiscount = false,
  showStockStatus = true,
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
          "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 3xl:grid-cols-6 gap-4",
          gridClassName
        )}
      >
        {loading
          ? Array.from({ length: skeletonLimit }).map((_, id) => (
              <ProductCardSkeleton key={id} />
            ))
          : products
              ?.slice(0, productsLimit)
              .map((product, id) => (
                <ProductCard
                  key={`testimonial--key-${id}`}
                  product={product}
                  showHotTag={showHotTag}
                  showFeaturedTag={showFeaturedTag}
                  showNewTag={showNewTag}
                  showDiscount={showDiscount}
                  showStockStatus={showStockStatus}
                />
              ))}
      </div>
    </div>
  );
};

export default ProductsBlock;
