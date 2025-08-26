"use client";

import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface CheckoutHeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const CheckoutHeader = ({
  currentTab,
  setCurrentTab,
}: CheckoutHeaderProps) => {
  const router = useRouter();

  const handleUndo = useCallback(() => {
    if (currentTab === "payment") {
      setCurrentTab("information");
    } else if (currentTab === "confirmation") {
      setCurrentTab("payment");
    } else {
      router.back();
    }
  }, [currentTab, setCurrentTab, router]);

  return (
    <div className="flex items-center pb-3 text-lg font-bold border-b border-gray-300 md:text-xl xl:text-2xl text-heading xl:mb-6">
      <Button
        onClick={handleUndo}
        size="icon"
        type="button"
        variant="ghost"
        className="p-0 mr-2"
      >
        <Undo2 className="md:size-6" />
        <span className="sr-only">Go Back</span>
      </Button>
      <p className="self-center pl-4 uppercase">Checkout</p>
    </div>
  );
};
