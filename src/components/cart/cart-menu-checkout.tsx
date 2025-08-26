"use client";
import { cn } from "@/lib/utils";
import { CartItem } from "@/lib/utils/generate-cart-item";
import { useShallowCartStore } from "@/store/use-cart-store";
import { useCheckoutBtn } from "./use-checkout-btn";
import { formatPrice } from "@/framework/basic-rest/product/use-price";

interface CartMenuCheckoutProps {
  onOpenChange: (open: boolean) => void;
  isEmpty: boolean;
  items: CartItem[];
}

const CartMenuCheckout = ({ onOpenChange, isEmpty }: CartMenuCheckoutProps) => {
  const { handleCheckoutClick } = useCheckoutBtn({
    onOpenChange,
  });
  const { total, shippingTotal } = useShallowCartStore((state) => ({
    total: state.total,
    shippingTotal: state.shipping_total,
    discount: state.discount,
  }));

  return (
    <div className="flex flex-col">
      <button
        onClick={handleCheckoutClick}
        disabled={isEmpty}
        className={cn(
          "w-full px-5 py-3 md:py-4 cursor-pointer flex items-center justify-center rounded-md text-sm 3xl:text-base text-white focus:outline-none transition duration-300",
          isEmpty
            ? "cursor-not-allowed bg-gray-400"
            : "bg-heading hover:bg-gray-600"
        )}
        aria-disabled={isEmpty}
      >
        <span className="ltr:pr-5 rtl:pl-5 -mt-0.5 py-0.5">
          Proceed to Checkout
        </span>
        <span className="rtl:mr-auto ltr:ml-auto flex-shrink-0 -mt-0.5 py-0.5 flex">
          <span className="ltr:border-l rtl:border-r border-white ltr:pr-5 rtl:pl-5 py-0.5" />
          {formatPrice({
            amount: (total + shippingTotal).toFixed(2),
            currencyCode: "LKR",
            locale: "en-LK",
          })}
        </span>
      </button>
    </div>
  );
};

export default CartMenuCheckout;
