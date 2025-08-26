import Logo from "@/components/ui/logo";
import React from "react";
import CartMenu from "@/components/cart/cart-menu";

export default function CheckoutHeader() {
  return (
    <header
      id="siteHeader"
      className="sticky top-0 z-20 w-full headerThree shadow-header"
    >
      <div className="z-20 w-full px-4 text-gray-700 transition duration-200 ease-in-out bg-white innerSticky body-font md:px-10">
        <div className="flex items-center justify-center mx-auto max-w-[1920px]  w-full relative before:absolute before:w-full before:h-px before:bg-[#F1F1F1] before:bottom-0">
          <div className="flex items-center justify-center w-full py-7 lg:py-8 lg:justify-start ltr:2xl:mr-12 rtl:2xl:ml-12 ltr:3xl:mr-20 rtl:3xl:ml-20">
            <Logo />
          </div>
          <div className="items-center justify-end flex-shrink-0 hidden md:flex">
            <div className="flex items-center transition-all wishlistShopping gap-x-7 lg:gap-x-6 xl:gap-x-8 2xl:gap-x-10 ltr:pl-3 rtl:pr-3">
              <div className="items-end hidden lg:flex md:gap-x-8">
                <CartMenu />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
