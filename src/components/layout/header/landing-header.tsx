import HeaderMenu from "@/components/layout/header/header-menu";
import Logo from "@/components/ui/logo";
import { siteSettings } from "@/settings/site-settings";
import React from "react";
import Link from "next/link";
import MobileMenu from "./mobile-menu";
import CartMenu from "@/components/cart/cart-menu";
import SearchInput from "@/components/search/search-input";
import { Button } from "@/components/ui/button";
import { SiBloglovin } from "react-icons/si";

const { site_header } = siteSettings;

export default function LandingHeader() {
  return (
    <header
      id="siteHeader"
      className="sticky top-0 z-20 w-full headerThree shadow-header"
    >
      <div className="z-20 w-full px-4 md:px-6 text-gray-700 transition duration-200 ease-in-out bg-white innerSticky body-font">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 mx-auto max-w-[1920px] py-3 lg:py-4.5 w-full relative before:absolute before:w-full before:h-px before:bg-[#F1F1F1] before:bottom-0">
          <MobileMenu />
          <div className="flex items-center gap-10 place-content-start md:place-content-center lg:place-content-start">
            <Logo />
            <div className="gap-4 md:gap-8 hidden transition-all duration-100 ease-in-out lg:flex">
              {site_header.pagesMenu?.map((item: any) => (
                <Link
                  href={item.path}
                  className="relative flex items-center text-sm font-normal xl:text-base text-heading hover:text-black"
                  key={`pages-menu-${item.id}`}
                >
                  {item.label}
                  {item.icon && <span>{item.icon}</span>}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 flex-shrink-0">
            <div className="relative hidden w-full mx-auto lg:block">
              <SearchInput />
            </div>
            <div className="flex items-center transition-all wishlistShopping gap-x-7 lg:gap-x-6 xl:gap-x-8 2xl:gap-x-10 ltr:pl-3 rtl:pr-3">
              <Link
                href="/deals"
                className="flex items-center px-4 py-2 space-x-2 transition duration-300 transform bg-white border border-gray-300 rounded-md hover:scale-105 hover:bg-gray-100 lg:hidden"
              >
                <img
                  src="https://images.harrietshopping.com/front-web/gif/energy-deals.gif"
                  alt="deals"
                  className="w-6 h-auto transition-transform duration-300"
                />
                <span className="text-sm font-semibold transition-opacity duration-300">
                  Deals
                </span>
              </Link>

              <div className="items-end hidden lg:flex md:gap-x-8">
                <CartMenu />
              </div>
            </div>
          </div>
        </div>

        <div className="items-center hidden lg:flex lg:h-16 headerBottom mx-auto max-w-[1920px]">
          <HeaderMenu data={site_header.menu} className="hidden lg:flex" />

          <div className="flex items-center flex-shrink-0 ltr:ml-auto rtl:mr-auto ">
            <Link
              href="https://blog.harrietshopping.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="rounded-none py-5" variant={"ghost"}>
                <SiBloglovin />
                Read Our Blog
              </Button>
            </Link>
            <Link href="/tracking">
              <Button className="rounded-none py-5" variant={"ghost"}>
                <img
                  className="border-b border-black"
                  src="https://images.harrietshopping.com/front-web/icons/tracking-truck.svg"
                  alt="Track Your Order"
                  width={20}
                  height={20}
                  loading="lazy"
                />
                Track Your Order
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
