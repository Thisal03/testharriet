import BannerCard from "@/components/common/banner-card";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { BannerData } from "@/framework/basic-rest/static/banner";

interface BannerProps {
  className?: string;
  limit?: number;
  data: BannerData[];
}

const SaleBannerGrid: React.FC<BannerProps> = ({
  className = "mb-12 lg:mb-14 xl:mb-16 lg:pb-1 xl:pb-0",
  limit = 5,
  data,
}) => {
  const renderBanner = (banner: BannerData) => (
    <BannerCard
      key={banner.id}
      banner={banner}
      href={banner.slug}
      effectActive={true}
    />
  );

  return (
    <div className={cn("w-full", className)}>
      <div className="md:hidden">
        <Carousel autoplay opts={{ loop: true }}>
          <CarouselContent>
            {data.slice(0, limit).map((banner: any) => (
              <CarouselItem key={banner.id}>
                {renderBanner(banner)}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="relative hidden gap-4 md:grid md:grid-cols-3 ">
        {data.slice(0, 3).map(renderBanner)}
      </div>
      <div className="relative hidden gap-4 mt-4 md:grid md:grid-cols-2">
        {data.slice(3, limit).map(renderBanner, "large")}
      </div>
    </div>
  );
};

export default SaleBannerGrid;
