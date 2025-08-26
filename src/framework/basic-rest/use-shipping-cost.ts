import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { ShippingTotal } from "@/framework/basic-rest/types";
import { fetchAllShipping } from "@/framework/basic-rest/product/get-all-shipping-total";
import { CartItem } from "@/lib/utils/generate-cart-item";
import { useShallowCartStore } from "@/store/use-cart-store";

interface UseShippingCostProps {
  items: CartItem[];
  selectedShippingOption: string;
}

export const useShippingCost = ({
  items,
  selectedShippingOption,
}: UseShippingCostProps) => {
  const {
    data: shippingMethods,
    isLoading,
    error,
  } = useQuery<ShippingTotal>({
    queryKey: ["shippingMethods"],
    queryFn: fetchAllShipping,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const setOverallShippingCost = useShallowCartStore(
    (state) => state.setShippingTotal
  );

  const overallShippingCost = useMemo(() => {
    if (!shippingMethods?.length) return 0;
    localStorage.setItem("shippingMethod", JSON.stringify(shippingMethods));

    const uniqueVendors = new Set<string>();
    items.forEach((item) => {
      if (item.store?.id) {
        uniqueVendors.add(item.store.id.toString());
      }
    });

    const defaultShippingCost = parseFloat(
      shippingMethods[0].settings.cost.value.toString()
    );

    return selectedShippingOption === "pickup"
      ? 0
      : defaultShippingCost * uniqueVendors.size;
  }, [shippingMethods, items, selectedShippingOption]);

  useEffect(() => {
    setOverallShippingCost(overallShippingCost);
  }, [overallShippingCost, setOverallShippingCost]);

  return {
    shippingMethods,
    overallShippingCost,
    setOverallShippingCost,
    isLoading,
    error,
  };
};
