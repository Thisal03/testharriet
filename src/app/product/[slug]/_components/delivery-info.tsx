"use client";
import { WordRotate } from "@/components/ui/word-rotate";
import Image from "next/image";

export const DeliveryInfo = () => {
  return (
    <div className="flex items-center pt-4">
      <Image
        src="https://images.harrietshopping.com/front-web/gif/delivery.gif"
        alt="Delivery"
        width={90}
        height={45}
        priority
        placeholder="empty"
        className="h-6 md:h-7"
      />
      <div className="ml-3">
        <div className="text-[#161616] md:text-sm text-xs font-semibold">
          Get it within 2 - 4 working days
        </div>
        <WordRotate
          className="text-[#595959] md:text-sm text-xs"
          words={["Order & get it fast", "Shipping duration based on location"]}
        />
      </div>
    </div>
  );
};
