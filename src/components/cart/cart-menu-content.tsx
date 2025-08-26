"use client";
import { fadeInOut } from "@/lib/motion/fade-in-out";
import { motion } from "motion/react";
import { IoClose } from "react-icons/io5";
import { SheetTitle, SheetFooter } from "../ui/sheet";
import CartMenuItem from "./cart-menu-item";
import CartMenuCheckout from "./cart-menu-checkout";
import EmptyCart from "./empty-cart";
import { useShallowCartStore } from "@/store/use-cart-store";
import { ScrollArea } from "../ui/scroll-area";
import CartInfo from "./cart-info";
import { cn } from "@/lib/utils";

interface CartMenuContentProps {
  onOpenChange: (open: boolean) => void;
}

const CartMenuContent = ({ onOpenChange }: CartMenuContentProps) => {
  const { isEmpty, items, savings } = useShallowCartStore((state) => ({
    isEmpty: state.isEmpty,
    items: state.items,
    savings: state.savings,
  }));

  return (
    <>
      <SheetTitle>
        <div className="relative flex items-center justify-between w-full py-2 pl-4 border-b border-gray-100">
          <h2 className="text-lg font-bold md:text-xl text-heading">
            Shopping Cart
          </h2>
          <button
            className="flex items-center justify-center p-4 text-2xl text-gray-500 transition-opacity cursor-pointer focus:outline-none hover:opacity-60"
            onClick={() => onOpenChange(false)}
            aria-label="close"
          >
            <IoClose className="text-black" />
          </button>
        </div>
      </SheetTitle>
      <div className="flex flex-col justify-between w-full h-full">
        {items.length ? (
          <ScrollArea
            className={cn(
              " w-full px-4",
              savings.amount > 0
                ? "h-[calc(100vh_-_21.5rem)]"
                : "h-[calc(100vh_-_17rem)]"
            )}
          >
            <div className="space-y-2">
              {items.map((item) => (
                <CartMenuItem
                  item={item}
                  key={`${item.id}-${item.sku || ""}`}
                />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <>
            <motion.div
              layout
              initial="from"
              animate="to"
              exit="from"
              variants={fadeInOut(0.25)}
              className="flex flex-col items-center justify-center pt-8"
            >
              <EmptyCart width="100%" height="40vh" />
              <h3 className="pt-8 text-lg font-semibold text-heading">
                Your cart is empty.
              </h3>
            </motion.div>
            <SheetFooter className="border-t">
              <button
                className={cn(
                  "w-full bg-heading hover:bg-gray-600 px-5 py-3 md:py-4 cursor-pointer flex items-center justify-center rounded-md text-sm sm:text-base text-white focus:outline-none transition duration-300"
                )}
                onClick={() => onOpenChange(false)}
              >
                Continue Shopping
              </button>
            </SheetFooter>
          </>
        )}
        {Boolean(items.length) && (
          <SheetFooter className="border-t">
            <CartInfo />
            <CartMenuCheckout
              onOpenChange={onOpenChange}
              isEmpty={isEmpty}
              items={items}
            />
          </SheetFooter>
        )}
      </div>
    </>
  );
};

export default CartMenuContent;
