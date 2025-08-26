import HeaderMenu from "@/components/layout/header/header-menu";
import Logo from "@/components/ui/logo";
import { siteSettings } from "@/settings/site-settings";
import React from "react";
import MobileMenu from "./mobile-menu";
import CartMenu from "@/components/cart/cart-menu";
import SearchPopup from "@/components/search/search-popup";

const { site_header } = siteSettings;

export default function InnerHeader() {
  return (
    <header
      id="siteHeader"
      className="sticky top-0 z-20 w-full headerThree shadow-header"
    >
      <div className="z-20 w-full px-4 text-gray-700 transition duration-200 ease-in-out bg-white body-font md:px-10">
        <div className="flex items-center justify-center mx-auto max-w-[1920px] w-full relative before:absolute before:w-full before:h-px before:bg-[#F1F1F1] before:bottom-0">
          <MobileMenu />
          <div className="flex items-center justify-center w-full py-7 lg:py-0 lg:justify-start">
            <Logo />
            <div className="hidden transition-all duration-100 ease-in-out lg:flex ltr:ml-7 rtl:mr-7 ltr:xl:ml-9 rtl:xl:mr-9 ltr:pr-2 rtl:pl-2 headerTopMenu">
              <HeaderMenu
                data={site_header.menu}
                className="hidden py-3 lg:flex"
              />
            </div>
          </div>
          <div className="items-center justify-end flex-shrink-0 hidden md:flex">
            <div className="flex items-center transition-all wishlistShopping gap-x-7 lg:gap-x-6 xl:gap-x-8 2xl:gap-x-10 ltr:pl-3 rtl:pr-3">
              <div className="items-end hidden lg:flex md:gap-x-8">
                <SearchPopup />
                <CartMenu />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
