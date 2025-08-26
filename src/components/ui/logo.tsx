import Image from "next/image";
import { siteSettings } from "@/settings/site-settings";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Logo = ({ className, ...props }: { className?: string }) => {
  return (
    <Link
      href={siteSettings.logo.href}
      className={cn("inline-flex focus:outline-none cursor-pointer", className)}
      {...props}
    >
      <Image
        src={siteSettings.logo.url}
        alt={siteSettings.logo.alt}
        height={siteSettings.logo.height}
        width={siteSettings.logo.width}
        loading="eager"
      />
    </Link>
  );
};

export default Logo;
