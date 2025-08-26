import { Product } from "@/framework/basic-rest/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";

export interface RecentProductsState {
  items: Product[];
  addItemToStore: (item: Product) => void;
  removeItemFromStore: (id: Product["id"]) => void;
  resetStore: () => void;
}

const initialState = {
  items: [],
};

const MAX_RECENT_PRODUCTS = 6;

export const useRecentProductsStore = create<RecentProductsState>()(
  persist(
    (set, get) => ({
      ...initialState,

      addItemToStore: (item) => {
        if (!item || !item.id) return;

        // Remove the item if it already exists (to avoid duplicates)
        const itemsWithoutCurrent = get().items.filter(
          (existingItem) => existingItem.id !== item.id
        );

        // Add the new item to the beginning of the array
        const updatedItems = [item, ...itemsWithoutCurrent];

        // Keep only the most recent products (MAX_RECENT_PRODUCTS)
        const recentItems = updatedItems.slice(0, MAX_RECENT_PRODUCTS);

        set({ items: recentItems });
      },

      removeItemFromStore: (id) => {
        const updatedItems = get().items.filter((item) => item.id !== id);
        set({ items: updatedItems });
      },

      resetStore: () => {
        set(initialState);
      },
    }),
    {
      name: "recently-viewed-products",
    }
  )
);

export const useShallowRecentProductsStore = <T>(
  selector: (state: RecentProductsState) => T
) => useRecentProductsStore(useShallow(selector));
