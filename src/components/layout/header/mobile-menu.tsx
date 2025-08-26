"use client";
import Link from "next/link";
import Logo from "@/components/ui/logo";
import { contemporaryBanner12 } from "@/framework/basic-rest/static/banner";
import { siteSettings } from "@/settings/site-settings";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import {
  IoClose,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTiktok,
  IoLogoYoutube,
} from "react-icons/io5";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { getPlaceholderImageURL } from "@/lib/utils/placeholder-image";

type MenuItem = {
  label: string;
  path: string;
  subMenu?: MenuItem[];
};

type SocialItem = {
  id: number;
  link: string;
  icon: React.ReactNode;
  className: string;
  title: string;
};

const social: SocialItem[] = [
  {
    id: 0,
    link: "https://www.facebook.com/shop.harriet/",
    icon: <IoLogoFacebook />,
    className: "facebook",
    title: "text-facebook",
  },
  {
    id: 1,
    link: "https://www.tiktok.com/@harrietshopping",
    icon: <IoLogoTiktok />,
    className: "twitter",
    title: "text-twitter",
  },
  {
    id: 2,
    link: "https://www.youtube.com/@HarrietShopping",
    icon: <IoLogoYoutube />,
    className: "youtube",
    title: "text-youtube",
  },
  {
    id: 3,
    link: "https://www.instagram.com/harrietshopping/",
    icon: <IoLogoInstagram />,
    className: "instagram",
    title: "text-instagram",
  },
];

export default function MobileMenu({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [activeMenus, setActiveMenus] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { site_header } = siteSettings;

  const handleArrowClick = (menuName: string) => {
    setActiveMenus((prev) =>
      prev.includes(menuName)
        ? prev.filter((name) => name !== menuName)
        : [...prev, menuName]
    );
  };

  const closeSidebar = () => {
    setOpen(false);
    setActiveMenus([]);
  };

  const ListMenu = ({
    dept,
    data,
    hasSubMenu,
    menuName,
    menuIndex,
    className = "",
  }: {
    dept: number;
    data: MenuItem;
    hasSubMenu: boolean;
    menuName: string;
    menuIndex: number;
    className?: string;
  }) => (
    <li className={`mb-0.5 ${className}`}>
      <div className="relative flex items-center justify-between">
        <Link
          href={data.path}
          className="w-full text-[13px] relative py-3 pl-5 md:pl-6 pr-4 transition duration-300 ease-in-out"
        >
          <span className="block w-full" onClick={closeSidebar}>
            {data.label}
          </span>
        </Link>
        {hasSubMenu && (
          <div
            className="absolute top-0 left-0 flex items-center justify-end w-full h-full pr-5 text-lg cursor-pointer"
            onClick={() => handleArrowClick(menuName)}
          >
            <IoIosArrowDown
              className={`transition duration-200 ease-in-out transform text-heading ${
                activeMenus.includes(menuName) ? "-rotate-180" : "rotate-0"
              }`}
            />
          </div>
        )}
      </div>
      {hasSubMenu && (
        <SubMenu
          dept={dept}
          data={data.subMenu || []}
          toggle={activeMenus.includes(menuName)}
          menuIndex={menuIndex}
        />
      )}
    </li>
  );

  const SubMenu = ({
    dept,
    data,
    toggle,
    menuIndex,
  }: {
    dept: number;
    data: MenuItem[];
    toggle: boolean;
    menuIndex: number;
  }) => {
    if (!toggle) return null;

    return (
      <ul className="pt-0.5">
        {data.map((menu, index) => {
          const menuName = `sidebar-submenu-${dept + 1}-${menuIndex}-${index}`;
          return (
            <ListMenu
              dept={dept + 1}
              data={menu}
              hasSubMenu={!!menu.subMenu}
              menuName={menuName}
              key={menuName}
              menuIndex={index}
              className={dept > 0 ? "pl-4" : ""}
            />
          );
        })}
      </ul>
    );
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children ? (
          children
        ) : (
          <button
            aria-label="Menu"
            className="flex-col justify-center flex-shrink-0 hidden h-full px-5 outline-none menuBtn md:flex lg:hidden 2xl:px-7 focus:outline-none"
          >
            <span className="menuIcon">
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </span>
          </button>
        )}
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col p-0">
        <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <Logo />
          <button
            className="text-2xl text-gray-500 transition-opacity hover:opacity-60"
            onClick={closeSidebar}
            aria-label="close"
          >
            <IoClose className="text-black" />
          </button>
        </div>

        <ScrollArea className="h-[calc(100dvh-13em)]">
          <div className="flex flex-col">
            <ul className="mobileMenu">
              {site_header.mobileMenu.map((menu, index) => {
                const dept = 1;
                const menuName = `sidebar-menu-${dept}-${index}`;
                return (
                  <ListMenu
                    dept={dept}
                    data={menu}
                    hasSubMenu={!!menu.subMenu}
                    menuName={menuName}
                    key={menuName}
                    menuIndex={index}
                  />
                );
              })}
            </ul>

            <div className="px-4 mt-4">
              <Carousel autoplay opts={{ loop: true }}>
                <CarouselContent>
                  {contemporaryBanner12.map((banner) => (
                    <CarouselItem key={banner.id}>
                      <Link href={banner.slug}>
                        <div
                          onClick={closeSidebar}
                          className="relative w-full aspect-[16/9]"
                        >
                          <Image
                            className="rounded-lg"
                            src={banner.image.mobile.url}
                            alt={banner.title}
                            fill
                            placeholder="blur"
                            blurDataURL={getPlaceholderImageURL(
                              banner.image.mobile.url
                            )}
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </ScrollArea>

        <div className="grid grid-cols-2 gap-2 px-4">
          <button
            className="p-2 text-sm font-semibold text-black bg-gray-100 border border-black rounded hover:bg-black hover:text-white"
            onClick={() => {
              router.push("/new-arrivals");
              closeSidebar();
            }}
          >
            New Arrivals
          </button>
          <button
            className="flex items-center justify-center p-2 space-x-2 text-sm font-semibold text-black bg-gray-100 border border-black rounded group hover:bg-black hover:text-white"
            onClick={() => {
              router.push("/tracking");
              closeSidebar();
            }}
          >
            <Image
              className="border-b border-black mr-3 transition-all duration-300 group-hover:invert group-hover:sepia-[26%] group-hover:saturate-[288%] group-hover:hue-rotate-[232deg] group-hover:brightness-[116%] group-hover:contrast-100"
              src="https://images.harrietshopping.com/front-web/icons/tracking-truck.svg"
              width={20}
              height={20}
              alt="Order Tracking"
            />
            <span>Order Tracking</span>
          </button>
        </div>

        <div className="flex items-center justify-center p-3 border-t border-gray-100 gap-x-6">
          {social.map((item) => (
            <Link
              href={item.link}
              className={cn(
                "text-heading p-1 text-xl opacity-60 transition duration-300 ease-in hover:opacity-100",
                item.className
              )}
              target="_blank"
              rel="noopener noreferrer"
              key={item.id}
            >
              <span className="sr-only">{item.title}</span>
              {item.icon}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
