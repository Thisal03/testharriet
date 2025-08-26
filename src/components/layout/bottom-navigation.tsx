"use client";
import { HomeIcon } from "@/components/icons/home-icon";
import MenuIcon from "@/components/icons/menu-icon";
import Link from "next/link";
import { ChatIcon } from "@/components/icons/chat-icon";
import CartMenu from "../cart/cart-menu";
import MobileMenu from "./header/mobile-menu";
import SearchPopup from "../search/search-popup";

const BottomNavigation = () => {
  return (
    <>
      <div className="fixed bottom-0 z-10 flex items-center justify-between w-full h-20 px-5 text-gray-700 bg-white lg:hidden shadow-bottomNavigation body-font sm:h-20 md:px-8">
        <MobileMenu>
          <button
            className="relative flex flex-col items-center justify-center flex-shrink-0 h-auto outline-none menuBtn focus:outline-none md:hidden"
            aria-label="Menu"
          >
            <MenuIcon />
            <span className="mt-1 text-xs font-semibold">Menu</span>
          </button>
        </MobileMenu>
        <SearchPopup />
        <div className="items-center justify-between">
          <Link href="/" className="flex flex-col items-center flex-shrink-0">
            <HomeIcon />
            <span className="items-center mt-1 text-xs font-semibold text-balance ">
              Home
            </span>
          </Link>
        </div>

        <div className="flex flex-col items-center">
          <CartMenu />
        </div>
        <Link
          href="/contact-us"
          className="flex flex-col items-center flex-shrink-0"
        >
          <ChatIcon />
          <span className="items-center mt-1 text-xs font-semibold text-balance ">
            Contact
          </span>
        </Link>
      </div>
    </>
  );
};

export default BottomNavigation;
