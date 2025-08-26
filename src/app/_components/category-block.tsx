import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import CategoryCard from "./category-card-v2";

interface CategoriesProps {
  className?: string;
  categories: {
    id: number;
    slug: string;
    name: string;
    image: string;
  }[];
}

const CategoryBlockIcon: React.FC<CategoriesProps> = ({
  className = "mb-auto md:mb-5 px-[3px] xl:mb-5",
  categories,
}) => {
  return (
    <div className={cn("w-full", className)}>
      <Carousel autoplay opts={{ loop: true, align: "start" }}>
        <CarouselContent className="">
          {categories.map((category) => (
            <CarouselItem
              key={`category--icon-key-${category.id}`}
              className={
                "basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 3xl:basis-1/8"
              }
            >
              <CategoryCard {...category} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CategoryBlockIcon;
