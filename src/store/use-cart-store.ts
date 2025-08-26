import { CartItem } from "@/lib/utils/generate-cart-item";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";

export interface CartState {
  items: CartItem[];
  isEmpty: boolean;
  totalItems: number;
  totalUniqueItems: number;
  total: number;
  savings: {
    amount: number;
    percentage: number;
  };
  shipping_total: number;
  discount: number;
  meta?: Metadata | null;
  shipping_lines?: {
    id: number;
    method_title: string;
    method_id: string;
    total: number;
    total_tax: number;
  };
  vendors: string[];
  productNames: string[];
  categoryIds: string[];
  vendorIds: string[];

  // Actions
  addItemToCart: (item: CartItem, quantity: number, sku: string) => void;
  removeItemFromCart: (id: CartItem["id"]) => void;
  clearItemFromCart: (id: CartItem["id"]) => void;
  getItemFromCart: (id: CartItem["id"]) => CartItem | undefined;
  isInCart: (id: CartItem["id"]) => boolean;
  setShippingTotal: (shipping_total: number) => void;
  setDiscount: (discount: number) => void;
  resetCart: () => void;
}

const initialState = {
  items: [],
  isEmpty: true,
  totalItems: 0,
  totalUniqueItems: 0,
  shipping_total: 0,
  discount: 0,
  total: 0,
  savings: {
    amount: 0,
    percentage: 0,
  },
  meta: null,
  vendors: [],
  productNames: [],
  categoryIds: [],
  vendorIds: [],
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      ...initialState,

      addItemToCart: (item, quantity, sku) => {
        if (quantity <= 0) return;

        const existingItemIndex = get().items.findIndex(
          (existingItem) => existingItem.id === item.id
        );

        let newItems: CartItem[];

        if (existingItemIndex > -1) {
          newItems = [...get().items];
          newItems[existingItemIndex].quantity += quantity;
          if (sku) {
            newItems[existingItemIndex].sku = sku;
          }
        } else {
          newItems = [...get().items, { ...item, quantity, sku }];
        }

        set(calculateCartState(newItems));
      },

      removeItemFromCart: (id) => {
        const newItems = get().items.reduce((acc: CartItem[], item) => {
          if (item.id === id) {
            const newQuantity = item.quantity - 1;
            return newQuantity > 0
              ? [...acc, { ...item, quantity: newQuantity }]
              : [...acc];
          }
          return [...acc, item];
        }, []);

        set(calculateCartState(newItems));
      },

      clearItemFromCart: (id) => {
        const newItems = get().items.filter((item) => item.id !== id);
        set(calculateCartState(newItems));
      },

      getItemFromCart: (id) => {
        return get().items.find((item) => item.id === id);
      },

      isInCart: (id) => {
        return get().items.some((item) => item.id === id);
      },
      setShippingTotal: (shipping_total) => {
        set({ shipping_total });
      },
      setDiscount: (discount) => {
        set({ discount });
      },

      resetCart: () => {
        set(initialState);
      },
    }),
    {
      name: "harriet-cart",
      partialize: (state) => ({
        items: state.items,
        total: state.total,
        savings: state.savings,
        totalItems: state.totalItems,
        totalUniqueItems: state.totalUniqueItems,
        isEmpty: state.isEmpty,
      }),
    }
  )
);

export const useShallowCartStore = <T>(selector: (state: CartState) => T) =>
  useCartStore(useShallow(selector));

// Helper functions
const calculateCartState = (items: CartItem[]) => {
  const totalUniqueItems = items.length;
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const total = items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const regular_price = items.reduce(
    (total, item) =>
      total + item.quantity * parseInt(item.regular_price ?? "0"),
    0
  );

  const savings = {
    amount: regular_price - total,
    percentage: ((regular_price - total) / regular_price) * 100 || 0,
  };

  const itemsWithTotals = items.map((item) => ({
    ...item,
    itemTotal: item.price * item.quantity,
  }));

  return {
    items: itemsWithTotals,
    totalItems,
    totalUniqueItems,
    total,
    savings,
    isEmpty: totalUniqueItems === 0,
    vendors: items
      .map((item) => item.store?.store_name)
      .filter(Boolean) as string[],
    productNames: items.map((item) => item.name).filter(Boolean) as string[],
    categoryIds: items
      .flatMap((item) => item.categories?.map((c) => c.id.toString()))
      .filter(Boolean) as string[],
    vendorIds: items
      .map((item) => item.store?.id?.toString())
      .filter(Boolean) as string[],
  };
};

type Metadata = {
  [key: string]: any;
};
