"use client";

import { TABS } from "./checkout-data";
import { cn } from "@/lib/utils";

interface CheckoutTabsProps {
  currentTab: string;
}

export const CheckoutTabs = ({ currentTab }: CheckoutTabsProps) => {
  return (
    <div className="h-auto gap-3 p-0 mt-4 mb-3 bg-transparent 2xl:mt-0 lg:mb-4">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          type="button"
          // onClick={() => setCurrentTab(tab.value)}
          className={cn(
            "border border-transparent px-4 py-1 rounded-full",
            currentTab === tab.value && "bg-[#FFF0CF] text-[#161616]"
          )}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};
