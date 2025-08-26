import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

function ImageSkeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="image-skeleton"
      className={cn("relative bg-accent animate-pulse", className)}
      {...props}
    >
      <Image
        src={PLACEHOLDER_IMAGE}
        alt="Product Placeholder Image"
        fill
        className="object-cover"
      />
    </div>
  );
}

export { Skeleton, ImageSkeleton };
