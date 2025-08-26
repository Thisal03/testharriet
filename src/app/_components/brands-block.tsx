import SectionHeader from "@/components/common/section-header";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Brands } from "@/framework/basic-rest/static/brands";
import { getPlaceholderImageURL } from "@/lib/utils/placeholder-image";
import Image from "next/image";
import Link from "next/link";

interface BrandProps {
  sectionHeading: string;
  className?: string;
  brands: Brands;
}

const BrandsBlock = ({
  className = "mb-12 lg:mb-14 xl:mb-16",
  sectionHeading,
  brands,
}: BrandProps) => {
  return (
    <div className={`p-1 ${className}`}>
      <SectionHeader
        sectionHeading={sectionHeading}
        textClassName="!text-black"
      />

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
          {brands?.map((brand, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 xl:basis-1/6 2xl:basis-1/7"
            >
              <Link href={brand.link}>
                <Image
                  src={brand.image.original}
                  alt=""
                  width={210}
                  height={300}
                  priority={true}
                  placeholder="blur"
                  blurDataURL={getPlaceholderImageURL(brand.image.original)}
                  className=" hover:scale-102 transition-all duration-500"
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default BrandsBlock;
