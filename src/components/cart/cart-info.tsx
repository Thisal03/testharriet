import React, { useState } from "react";
import { useShallowCartStore } from "@/store/use-cart-store";
import { useShippingCost } from "@/framework/basic-rest/use-shipping-cost";
import { formatPrice } from "@/framework/basic-rest/product/use-price";

const CartInfo = () => {
  const { total, savings, items } = useShallowCartStore((state) => ({
    total: state.total,
    savings: state.savings,
    items: state.items,
  }));

  const [selectedShippingOption] = useState("standard");

  const {
    shippingMethods,
    overallShippingCost,
    isLoading: isShippingLoading,
    error: shippingError,
  } = useShippingCost({ items, selectedShippingOption });

  return (
    <div className="text-sm 3xl:text-base space-y-3 divide-heading/20">
      <p className="flex justify-between">
        <span>Item (s) Total:</span>{" "}
        <span className="font-medium">
          {" "}
          {formatPrice({
            amount: total.toFixed(2),
            currencyCode: "LKR",
            locale: "en-LK",
          })}
        </span>
      </p>
      {savings.amount > 0 && (
        <p className="flex justify-between">
          <span>Discount:</span>{" "}
          <span className="font-medium">
            {formatPrice({
              amount: savings.amount.toFixed(2),
              currencyCode: "LKR",
              locale: "en-LK",
            })}
          </span>
        </p>
      )}
      {savings.percentage > 0 && (
        <p className="flex justify-between items-center">
          <span>Savings:</span>{" "}
          <span className="font-medium bg-green-600 text-white px-2">
            {savings.percentage.toFixed(2)}%
          </span>
        </p>
      )}
      <div>
        <p className="flex justify-between">
          <span>Estimated Shipping Cost:</span>{" "}
          <span className="font-medium">
            {isShippingLoading ? (
              <>...</>
            ) : overallShippingCost === 0 ? (
              "Free"
            ) : (
              formatPrice({
                amount: overallShippingCost.toFixed(2),
                currencyCode: "LKR",
                locale: "en-LK",
              })
            )}
          </span>
        </p>
        <p className="text-xs text-muted-foreground mb-1">
          Multiple delivery fees may apply for items from different locations
        </p>
      </div>
    </div>
  );
};

export default CartInfo;
