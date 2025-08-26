import SectionHeader from "@/components/common/section-header";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Product } from "@/framework/basic-rest/types";
import ProductCard, {
  ProductCardSkeleton,
} from "@/components/product/product-card-v2";

interface ProductsBlockProps {
  sectionHeading: string;
  className?: string;
  categorySlug?: string;
  products?: Product[];
  loading: boolean;
  error?: string;
  uniqueKey?: string;
  type?:
    | "rounded"
    | "circle"
    | "gridTrendy"
    | "grid"
    | "gridSlim"
    | "list"
    | "listSmall";
}

const ProductsBlockCarousel = ({
  sectionHeading,
  className = "mb-10 md:mb-12 xl:mb-14 md:pb-1 xl:pb-0",
  type,
  products,
  loading,
}: ProductsBlockProps) => {
  return (
    <div className={`heightFull relative ${className}`}>
      <SectionHeader sectionHeading={sectionHeading} />
      <Carousel
        autoplay={{
          delay: 4000,
        }}
        opts={{
          loop: true,
          align: "start",
        }}
      >
        <CarouselContent>
          {loading
            ? Array.from({ length: 6 }).map((_, id) => (
                <CarouselItem
                  key={`skeleton--key-${id}`}
                  className="pt-2 basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 3xl:basis-1/6"
                >
                  <ProductCardSkeleton />
                </CarouselItem>
              ))
            : products?.map((product, id) => (
                <CarouselItem
                  key={`testimonial--key-${id}`}
                  className="pt-2 basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 3xl:basis-1/6"
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ProductsBlockCarousel;
