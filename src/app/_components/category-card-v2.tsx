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
  const placeholderImage =
    "https://images.harrietshopping.com/front-web/images/placeholder/browse-category.png";

  return (
    <Link
      href={`${ROUTES.CATEGORY}/${slug}`}
      className="group block aspect-[10/12]"
    >
      <div className="relative h-full overflow-hidden shadow-sm transition-all duration-300 ease-in-out group-hover:shadow-md ">
        {/* Background Image */}
        <div className="relative aspect-square w-full h-full">
          <Image
            src={image || placeholderImage}
            alt={name || "Category Image"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            placeholder="blur"
            blurDataURL={getPlaceholderImageURL(image || placeholderImage)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

          {/* Category Name */}
          <div className="absolute bottom-0 left-0 right-0 p-2 text-center sm:p-3 lg:p-6">
            <h3 className="text-white text-xs sm:text-sm font-medium lg:text-base">
              {name}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
