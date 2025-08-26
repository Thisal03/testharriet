import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoHomeSharp } from "react-icons/io5";
import Text from "@/components/ui/text";
import InnerHeader from "@/components/layout/header/inner-header";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const NotFoundSection = ({
  title = "Looks like you are lost",
  subtitle = "We can't find the page you are looking for",
  imageUrl = "https://images.harrietshopping.com/front-web/images/cover/404.svg",
  buttonText = "Go Home",
  buttonLink = "/",
}: {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  buttonText?: string;
  buttonLink?: string;
}) => {
  return (
    <>
      <InnerHeader />
      <div className="flex items-center justify-center px-16 py-16 text-center border-t border-b border-gray-300 sm:py-20 lg:py-24">
        <div>
          <Image src={imageUrl} alt={title} width={800} height={492} />

          <Text variant="mediumHeading">{title}</Text>
          <p className="text-sm md:text-base leading-7 pt-2 md:pt-3.5 pb-4 md:pb-7">
            {subtitle}
          </p>
          <Link href={buttonLink} passHref>
            <Button className="p-6 rounded-sm lg:text-base">
              <IoHomeSharp />
              {buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundSection;

export const NotFoundItem = ({
  title = "Looks like you are lost",
  subtitle = "We can't find the page you are looking for",
  imageUrl = "https://images.harrietshopping.com/front-web/images/cover/404.svg",
  className = "",
}: {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-5",
        className
      )}
    >
      <Image
        src={imageUrl}
        alt={title}
        width={500}
        height={500}
        style={{ objectFit: "contain" }}
      />
      <Text variant="mediumHeading">{title}</Text>
      <p className="text-sm md:text-base leading-7 pt-2 md:pt-3.5 pb-7 md:pb-9">
        {subtitle}
      </p>
    </div>
  );
};
