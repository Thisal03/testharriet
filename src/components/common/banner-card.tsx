import Link, { LinkProps } from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getPlaceholderImageURL } from "@/lib/utils/placeholder-image";

interface BannerProps {
  banner: {
    id: number;
    title: string;
    slug: string;
    image: {
      mobile: {
        url: string;
        width: number;
        height: number;
      };
      desktop: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
  variant?: "rounded" | "default";
  effectActive?: boolean;
  className?: string;
  classNameInner?: string;
  href: LinkProps["href"];
  disableBorderRadius?: boolean;
  priority?: boolean;
  loading?: "eager" | "lazy";
}

export default function BannerCard({
  banner,
  className,
  variant = "default",
  effectActive = false,
  classNameInner,
  href,
  loading = "lazy",
  disableBorderRadius = false,
  priority = false,
}: BannerProps) {
  const { title } = banner;
  return (
    <div className={cn("mx-auto w-full ", className)}>
      <Link
        href={href}
        className={cn(
          "group flex justify-center relative overflow-hidden",
          classNameInner
        )}
      >
        <Image
          src={banner.image.desktop.url}
          width={banner.image.desktop.width}
          height={banner.image.desktop.height}
          alt={title}
          quality={85}
          placeholder="blur"
          blurDataURL={getPlaceholderImageURL(banner.image.desktop.url)}
          className={cn("hidden md:block bg-gray-300 object-cover w-full", {
            "rounded-md": variant === "rounded" && !disableBorderRadius,
          })}
          priority={priority}
          loading={loading}
        />
        <Image
          src={banner.image.mobile.url}
          width={banner.image.mobile.width}
          height={banner.image.mobile.height}
          alt={title}
          quality={85}
          placeholder="blur"
          blurDataURL={banner.image.mobile.url}
          className={cn("md:hidden bg-gray-300 object-cover w-full", {
            "rounded-md": variant === "rounded" && !disableBorderRadius,
          })}
          priority={priority}
          loading={loading}
        />
        {effectActive && (
          <div className="absolute top-0 ltr:-left-[100%] rtl:-right-[100%] h-full w-1/2 z-5 block transform ltr:-skew-x-12 rtl:skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 ltr:group-hover:animate-shine rtl:group-hover:animate-shineRTL" />
        )}
      </Link>
    </div>
  );
}
