import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { useShallowCartStore } from "@/store/use-cart-store";

export const useCheckoutBtn = ({
  onOpenChange,
}: {
  onOpenChange?: (open: boolean) => void;
}) => {
  const router = useRouter();
  const { isEmpty } = useShallowCartStore((state) => ({
    isEmpty: state.isEmpty,
  }));

  const handleCheckoutClick = useCallback(() => {
    if (isEmpty) return;
    try {
      router.push(ROUTES.CHECKOUT);
      if (onOpenChange) onOpenChange(false);
    } catch (error) {
      console.error("Facebook Pixel tracking failed:", error);
    }
  }, []);

  return { handleCheckoutClick };
};
