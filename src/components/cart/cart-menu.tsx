"use client";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { CartIcon } from "../icons/cart-icon";
import { useShallowCartStore } from "@/store/use-cart-store";
import CartMenuContent from "./cart-menu-content";
import { useShallowUIStore } from "@/store/use-ui-store";

const CartMenu = () => {
  const { displayCart, toggleCart } = useShallowUIStore((state) => ({
    displayCart: state.displayCart,
    toggleCart: state.toggleCart,
  }));
  const totalItems = useShallowCartStore((state) => state.totalItems);

  return (
    <Sheet open={displayCart} onOpenChange={toggleCart}>
      <SheetTrigger asChild>
        <button
          className="relative flex flex-col items-center justify-center flex-shrink-0 h-auto transform focus:outline-none"
          aria-label="cart-button"
        >
          <CartIcon />
          <span className="mt-1 text-xs font-semibold text-balance lg:mt-0 lg:font-normal">
            Cart
          </span>
          <span className="text-xs flex items-center justify-center lg:bg-black lg:text-white bg-[#FEE271] text-black border border-[#FCC513] md:border-none absolute -top-2.5 xl:-top-3 rounded-full size-5 ltr:-right-2.5 ltr:xl:-right-3 rtl:-left-2.5 rtl:xl:-left-3 font-bold">
            {totalItems}
          </span>
        </button>
      </SheetTrigger>
      <SheetContent>
        <CartMenuContent onOpenChange={toggleCart} />
      </SheetContent>
    </Sheet>
  );
};

export default CartMenu;
