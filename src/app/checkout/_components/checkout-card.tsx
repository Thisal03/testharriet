"use client";
import EmptyCart from "@/components/cart/empty-cart";
import { CheckoutItem } from "./checkout-card-item";
import { fetchAllCoupons } from "@/framework/basic-rest/coupon/get-all-coupons";
import usePrice from "@/framework/basic-rest/product/use-price";
import { Coupon } from "@/framework/basic-rest/types";
import { useShallowCartStore } from "@/store/use-cart-store";
import { useEffect, useState } from "react";
import { useShippingCost } from "@/framework/basic-rest/use-shipping-cost";
import { useCheckout } from "./use-checkout";
import { Skeleton } from "@/components/ui/skeleton";

interface CheckoutCardProps {
  className?: string;
}

const CheckoutCard: React.FC<CheckoutCardProps> = ({ className = "" }) => {
  const { items, total, isEmpty } = useShallowCartStore((state) => ({
    items: state.items,
    total: state.total,
    isEmpty: state.isEmpty,
  }));

  const { price: subtotal } = usePrice({
    price: total.toString(),
    amount: total.toString(),
    currencyCode: "LKR",
  });

  const [couponCode, setCouponCode] = useState("");
  const [appliedCouponCode, setAppliedCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const { discount, setDiscount } = useCheckout({
    items,
    total,
  });
  const [coupons, setCoupons] = useState<Coupon>([]);
  const [selectedShippingOption, setSelectedShippingOption] =
    useState("standard");

  const { overallShippingCost, isLoading: isShippingLoading } = useShippingCost(
    {
      items,
      selectedShippingOption,
    }
  );

  const finalTotal = overallShippingCost + total - discount;

  useEffect(() => {
    const loadCoupons = async () => {
      try {
        const couponsData = await fetchAllCoupons();
        setCoupons(couponsData);
      } catch (error) {
        console.error("Error loading coupons:", error);
      }
    };

    loadCoupons();
  }, []);

  const handleCouponCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value);
    setCouponError("");
  };

  const validateCoupon = (code: string) => {
    const coupon = coupons.find(
      (c) => c.code.toUpperCase() === code.toUpperCase()
    );
    if (!coupon) return "Invalid coupon code";

    // Check expiration
    if (coupon.date_expires && new Date() > new Date(coupon.date_expires)) {
      return "Coupon has expired";
    }

    // Check vendor restrictions
    const vendorMeta =
      coupon.meta_data.key === "coupons_vendors_ids"
        ? coupon.meta_data
        : undefined;

    if (vendorMeta?.value) {
      const couponVendorIds = vendorMeta.value
        .split(",")
        .map((id) => id.trim());
      const storedVendorIds = localStorage.getItem("Harriet-vendor-ids");

      if (storedVendorIds) {
        const isValidVendor = couponVendorIds.some((id) =>
          JSON.parse(storedVendorIds).includes(id)
        );
        if (!isValidVendor) return "Coupon not valid for items in cart";
      }
    }

    // Check category restrictions
    if (coupon.product_categories?.length) {
      const storedCategories = localStorage.getItem("Harriet-cart-categories");
      if (storedCategories) {
        const isValidCategory = coupon.product_categories.some((categoryId) =>
          JSON.parse(storedCategories).includes(categoryId.toString())
        );
        if (!isValidCategory) return "Coupon not valid for items in cart";
      }
    }

    return null;
  };

  const handleApplyCoupon = () => {
    const error = validateCoupon(couponCode);
    if (error) {
      setCouponError(error);
      setAppliedCouponCode("");
      setDiscount(0);
      return;
    }

    setCouponError("");
    setAppliedCouponCode(couponCode);

    const coupon = coupons.find(
      (c) => c.code.toUpperCase() === couponCode.toUpperCase()
    );
    if (!coupon) return;

    let discountValue = 0;
    if (coupon.discount_type === "percent") {
      discountValue = (total * parseFloat(coupon.amount)) / 100;
    } else if (coupon.discount_type === "fixed_cart") {
      discountValue = parseFloat(coupon.amount);
    }
    setDiscount(discountValue);
  };

  const handleShippingOptionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedShippingOption(e.target.value);
  };

  const allItemsFromHarriet = items.every(
    (item) => item.store.store_name === "Harriet Store"
  );

  return (
    <div
      className={`pt-5 pb-3 mt-8 md:mt-0 mb-4 px-2.5 rounded-md bg-white border border-[#EEEDED] md:rounded-lg md:p-6 ${className}`}
    >
      <h2 className="mb-6 text-lg font-semibold md:text-xl xl:text-2xl text-heading xl:mb-8">
        Your Order
      </h2>

      <div className="flex p-4 mt-6 text-sm font-semibold bg-gray-200 rounded-md md:mt-7 xl:mt-9 text-heading">
        <span>Product</span>
        <span className="flex-shrink-0 ml-auto">Subtotal</span>
      </div>

      <div className="pb-2 border-b border-gray-300 mb-7">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center gap-4 py-10">
            <EmptyCart width="100" height="auto" />
            <span className="text-lg font-semibold text-heading">
              Your cart is empty.
            </span>
          </div>
        ) : (
          items.map((item) => <CheckoutItem key={item.id} item={item} />)
        )}
      </div>

      <div className="border-b border-gray-300 pb-7">
        <div className="flex justify-start">
          <label className="block text-sm font-semibold text-[#161616] pb-2">
            Promo Code
          </label>
          {appliedCouponCode && (
            <span className="block text-[13px] font-normal text-gray-400 pb-1 pl-3">
              #{appliedCouponCode}
            </span>
          )}
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            id="promo-code"
            className="flex-1 min-w-0 px-3 py-3 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:border-[#161616] text-sm"
            placeholder="Enter Coupon/ Harriet Code"
            value={couponCode}
            onChange={handleCouponCodeChange}
          />
          <button
            type="button"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#161616] hover:bg-[#161616]/90"
            onClick={handleApplyCoupon}
          >
            Apply
          </button>
        </div>

        {couponError && (
          <p className="mt-1 text-sm text-red-500">{couponError}</p>
        )}
        {appliedCouponCode && !couponError && (
          <p className="mt-1 text-sm text-green-500">Applied</p>
        )}
      </div>

      <div className="flex items-center w-full py-4 text-sm font-semibold lg:py-3 lg:px-3 text-heading">
        Subtotal
        <span className="flex-shrink-0 ml-auto text-gray-600">{subtotal}</span>
      </div>

      <div className="flex items-center w-full py-4 text-sm font-semibold lg:py-3 lg:px-3 text-heading">
        Discount
        <span className="flex-shrink-0 ml-auto text-gray-600">
          LKR {discount ? `- ${discount.toFixed(2)}` : "0.00"}
        </span>
      </div>

      <div className="relative flex items-center w-full py-4 text-sm font-semibold lg:py-3 lg:px-3 text-heading group">
        Shipping
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="ml-1 size-3 opacity-80 hover:scale-110"
          width="14"
          height="14"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
          />
        </svg>
        <span className="flex-shrink-0 ml-auto text-gray-800">
          {isShippingLoading ? (
            <Skeleton className="h-5 w-20" />
          ) : overallShippingCost === 0 ? (
            "Free"
          ) : (
            `LKR ${overallShippingCost.toLocaleString("en-LK", {
              minimumFractionDigits: 2,
            })}`
          )}
        </span>
        <span className="absolute left-5 invisible group-hover:visible z-10 bg-[#161616] border-2 border-gray-200 py-1 px-2 rounded shadow-lg text-xs text-white whitespace-nowrap">
          Multiple delivery fees may apply for items from different locations
        </span>
      </div>

      {!isShippingLoading && (
        <div className="flex flex-col w-full gap-2 text-sm font-semibold lg:pb-2 lg:px-3 text-heading">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="shippingOption"
              value="standard"
              className="w-3 h-3 text-blue-600 border-gray-300 focus:ring-blue-500"
              checked={selectedShippingOption === "standard"}
              onChange={handleShippingOptionChange}
            />
            Standard Shipping
          </label>
          {allItemsFromHarriet && (
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="shippingOption"
                value="pickup"
                className="w-3 h-3 text-blue-600 border-gray-300 focus:ring-blue-500"
                checked={selectedShippingOption === "pickup"}
                onChange={handleShippingOptionChange}
              />
              Pick up from Harriet
            </label>
          )}
        </div>
      )}

      <div className="flex items-center w-full py-4 text-sm font-semibold lg:py-3 lg:px-3 text-heading">
        Total
        <span className="flex-shrink-0 ml-auto text-black">
          LKR {finalTotal.toLocaleString("en-LK", { minimumFractionDigits: 2 })}
        </span>
      </div>
    </div>
  );
};

export default CheckoutCard;
