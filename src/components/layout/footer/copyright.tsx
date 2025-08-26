import Container from "@/components/common/container";
import { siteSettings } from "@/settings/site-settings";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ScrollToTop from "./scroll-to-top";

interface CopyrightProps {
  payment?: {
    id: string | number;
    path?: string;
    name: string;
    image: string;
    width: number;
    height: number;
  }[];
  variant?: "contemporary";
}
const year = new Date().getFullYear();
const Copyright: React.FC<CopyrightProps> = ({ payment, variant }) => {
  return (
    <div className="pt-5 pb-16 mb-2 border-t border-gray-300 sm:pb-20 md:pb-5 sm:mb-0">
      <Container
        className={cn(
          "flex flex-col-reverse md:flex-row text-center md:justify-between",
          {
            "items-center": variant === "contemporary",
          }
        )}
      >
        <p
          className={cn("text-body text-xs lg:text-sm leading-6", {
            "p-0 m-0": variant === "contemporary",
          })}
        >
          Copyright &copy; {year}&nbsp;
          <a
            className="font-semibold text-gray-700 transition-colors duration-200 ease-in-out hover:text-body"
            href={siteSettings.author.websiteUrl}
          >
            {siteSettings.author.name}
          </a>
          &nbsp; All rights reserved
        </p>

        {payment && (
          <ul className="flex-wrap items-center justify-center hidden mx-auto mb-1 md:flex gap-x-4 xs:gap-x-5 lg:gap-x-7 md:mb-0 md:mx-0">
            {payment?.map((item) => (
              <li
                className="mb-2 transition md:mb-0 hover:opacity-80"
                key={`payment-list--key${item.id}`}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  height={item.height}
                  width={item.width}
                />
              </li>
            ))}
          </ul>
        )}

        {variant === "contemporary" && <ScrollToTop />}
      </Container>
    </div>
  );
};

export default Copyright;
