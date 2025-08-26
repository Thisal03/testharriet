import { ROUTES } from "@/lib/routes";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { getPlaceholderImageURL } from "@/lib/utils/placeholder-image";

const CategoryCard = ({
  id,
  slug,
  name,
  image,
}: {
  id: number;
  slug: string;
  name: string;
  image: string;
}) => {
  return (
    <Link href={`${ROUTES.CATEGORY}/${slug}`}>
      <div className="flex flex-col items-center justify-center w-full gap-4 lg:gap-10 transition-all lg:justify-between rounded-md lg:pl-4 lg:pr-10 lg:aspect-[16/7] lg:bg-gray-100 lg:flex-row aspect-square hover:bg-gray-300">
        <Image
          src={
            image ||
            "https://images.harrietshopping.com/front-web/images/placeholder/browse-category.png"
          }
          alt={name || "Category Image"}
          className="object-cover rounded-full"
          placeholder="blur"
          blurDataURL={getPlaceholderImageURL(
            image ||
              "https://images.harrietshopping.com/front-web/images/placeholder/browse-category.png"
          )}
          width={70}
          height={70}
        />
        <h3 className="text-xs text-center text-black lg:self-center lg:text-start md:text-sm lg:text-base lg:text-black md:font-semibold">
          {name}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
