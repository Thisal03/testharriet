import BannerCard from "@/components/common/banner-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { contemporaryBanner12 } from "@/framework/basic-rest/static/banner";

interface BrandProps {
  className?: string;
}

const HighlightBanners = ({
  className = "mb-12 lg:mb-14 xl:mb-16",
}: BrandProps) => {
  return (
    <div className={className}>
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
          {contemporaryBanner12.map((banner, index) => (
            <CarouselItem key={index}>
              <BannerCard
                banner={banner}
                href={`${banner.slug}`}
                classNameInner="relative w-full aspect-[16/10] md:aspect-[16/5.5]"
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default HighlightBanners;
