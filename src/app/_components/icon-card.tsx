import Link from "next/link";
import { FaLink } from "react-icons/fa";
import { LinkProps } from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  category: {
    id: number;
    slug: string;
    image: string;
    name: string;
  };
  effectActive?: boolean;
  variant?: "default" | "modern" | "circle" | "list";
  href: LinkProps["href"];
}

const IconCard: React.FC<Props> = ({
  category,
  effectActive = false,
  variant = "default",
  href,
}) => {
  const { name, image } = category;
  const imageUrl =
    image ||
    "https://images.harrietshopping.com/front-web/images/placeholder/browse-category.png";

  // Base classes for all variants
  const baseClasses = "group flex rounded-lg";

  // Variant-specific classes
  const variantClasses = {
    default:
      "flex-col h-28 sm:h-34 md:h-40 xl:h-46 2xl:h-44 3xl:h-60 md:bg-gray-200",
    modern: "flex-col px-6 lg:px-8 pt-7 lg:pt-10 pb-5 lg:pb-8 bg-gray-200",
    circle: "flex-col items-center",
    list: "gap-6 xl:gap-8 2xl:gap-10 items-center px-3 lg:px-4 py-5 md:bg-gray-200",
  };

  // Image container classes
  const imageContainerClasses = {
    default: "relative mb-4 md:mb-3 lg:mb-2 2xl:mb-6 3xl:mb-8 h-24 mx-auto",
    modern: "relative mr-auto h-16",
    circle:
      "bg-gray-200 rounded-full mb-3.5 md:mb-4 lg:mb-5 h-32 md:h-32 lg:h-35 xl:h-44 w-full flex justify-center",
    list: "",
  };

  // Title classes
  const titleClasses = {
    default:
      "absolute bottom-1 sm:bottom-5 md:bottom-6 xl:bottom-8 inset-x-0 text-center text-black text-xs sm:truncate",
    modern: "mt-1",
    circle: "",
    list: "text-black font-semibold",
  };

  return (
    <Link href={href} className={cn(baseClasses, variantClasses[variant])}>
      <div
        className={cn(
          "relative flex items-center",
          imageContainerClasses[variant]
        )}
      >
        <Image
          src={imageUrl}
          alt={name || "Category Image"}
          className={cn("object-cover", {
            "rounded-full": variant === "circle",
            "rounded-lg": variant !== "circle",
          })}
          width={variant === "circle" ? 140 : 70}
          height={variant === "circle" ? 140 : 70}
        />

        {effectActive && variant === "circle" && (
          <>
            <div className="absolute inset-0 transition-opacity duration-300 bg-black rounded-full opacity-0 group-hover:opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center rounded-full">
              <FaLink className="text-xl text-white transition-all duration-300 transform scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100" />
            </div>
          </>
        )}
      </div>

      {variant !== "list" && (
        <h2 className={cn("capitalize", titleClasses[variant])}>{name}</h2>
      )}

      {effectActive && variant !== "circle" && (
        <div className="absolute inset-0 duration-300 rounded-lg opacity-0 hover:opacity-25 hover:bg-slate-500" />
      )}
    </Link>
  );
};

export default IconCard;
