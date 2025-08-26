import Link from "next/link";
import Image from "next/image";
import Text from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { getPlaceholderImageURL } from "@/lib/utils/placeholder-image";

interface Props {
  variant?: "default" | "modern" | "trendy";
  collection: {
    id: number;
    slug: string;
    image: string;
  };
}

const CollectionCard: React.FC<Props> = ({
  collection,
  variant = "default",
}) => {
  const { slug, image, id } = collection;
  return (
    <Link
      href={slug}
      className={cn(
        "group text-center flex flex-col w-full h-full relative aspect-[10/11.5] sm:last:hidden lg:last:flex border sm:border-0 border-gray-300 overflow-hidden pb-4 sm:pb-0",
        {
          "justify-between sm:even:flex-col-reverse": variant === "default",
          "!pb-0": variant === "trendy",
        }
      )}
    >
      <Image
        src={
          image ??
          "https://images.harrietshopping.com/front-web/images/placeholder/collection.svg"
        }
        alt={slug}
        fill
        style={{ objectFit: "cover" }}
        className="object-cover transition duration-200 ease-in-out bg-gray-300  group-hover:opacity-90"
        placeholder="blur"
        blurDataURL={getPlaceholderImageURL(
          image ??
            "https://images.harrietshopping.com/front-web/images/placeholder/collection.svg"
        )}
      />
      <div
        className={cn(
          "overflow-hidden absolute bottom-3.5 lg:bottom-5 ltr:right-3.5 rtl:left-3.5 ltr:lg:right-5 rtl:lg:left-5 p-2",
          {
            "!bottom-[-8px] !right-[-10px]": variant === "trendy",
          }
        )}
      >
        <span
          className={cn(
            "inline-block text-xs md:text-sm leading-4 cursor-pointer transition ease-in-out duration-300 font-semibold text-center  bg-white text-heading shadow-navigation py-3 lg:py-4 px-4 lg:px-6 hover:bg-heading hover:text-gray-400 transform lg:translate-y-full lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:translate-y-0",
            {
              "bg-heading text-[#fff] hover:bg-white hover:text-heading lg:px-12 lg:py-3":
                variant === "trendy",
            }
          )}
        >
          View Collection
        </span>
      </div>
    </Link>
  );
};

export default CollectionCard;
