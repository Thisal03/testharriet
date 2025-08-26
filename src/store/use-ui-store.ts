import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

interface UIState {
  displayCart: boolean;
  toggleCart: (state?: boolean) => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  displayCart: false,
  toggleCart: (toggle?: boolean) =>
    set((state) => ({ displayCart: toggle ?? !state.displayCart })),
}));

export const useShallowUIStore = <T>(selector: (state: UIState) => T) =>
  useUIStore(useShallow(selector));
