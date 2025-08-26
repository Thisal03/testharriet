import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import BannerCard from "@/components/common/banner-card";
import { homeContemporaryHeroSlider } from "@/framework/basic-rest/static/banner";

interface Props {
  className?: string;
  buttonGroupClassName?: string;
  variant?: "box" | "fullWidth";
  variantRounded?: "rounded" | "default";
}
const HeroSlider: React.FC<Props> = ({
  className = "mb-12 md:mb-14 xl:mb-[60px]",
  variant = "box",
  variantRounded = "rounded",
}) => {
  return (
    <div
      className={cn(
        "relative mb-5 md:mb-8",
        {
          "mx-auto max-w-[1920px]": variant === "fullWidth",
        },
        className
      )}
    >
      <Carousel
        opts={{
          loop: true,
        }}
        autoplay
      >
        <CarouselContent>
          {homeContemporaryHeroSlider.map((banner: any, index) => (
            <CarouselItem key={`banner--key-${banner?.id}`}>
              <BannerCard
                banner={banner}
                href={`${banner.slug}`}
                variant={variantRounded}
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

export default HeroSlider;
