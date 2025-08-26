"use client";

import Image from "next/image";
import { PaymentMethod } from "./checkout-data";
import { cn } from "@/lib/utils";

interface PaymentMethodProps {
  method: PaymentMethod;
  isSelected: boolean;
  onSelect: () => void;
}

export const PaymentMethodCard = ({
  method,
  isSelected,
  onSelect,
}: PaymentMethodProps) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`${
        isSelected ? "bg-slate-200" : "bg-white"
      } rounded-md px-2 md:px-5 py-1 border border-gray-300 w-full`}
    >
      <div className="flex items-center p-3 text-base font-semibold text-heading">
        <input
          type="radio"
          name="paymentMethod"
          checked={isSelected}
          onChange={onSelect}
          className="mr-2"
        />
        <Image
          src={method.icon}
          alt={`${method.title} Icon`}
          width={22}
          height={20}
        />
        <p
          className={cn(
            "pl-2 text-sm tracking-normal md:text-base",
            method.id === "card" && "hidden lg:block"
          )}
        >
          {method.title}
        </p>

        <div
          className={cn(
            "flex items-center flex-1 space-x-4",
            method.id === "card" && "justify-start pl-6 lg:pl-0 lg:justify-end",
            method.id === "mintpay" && "justify-start pl-6 lg:pl-0 lg:justify-end"
          )}
        >
          {method.extraIcons?.map((icon, index) => (
            <Image
              key={index}
              src={icon.src}
              alt={icon.alt}
              width={icon.width}
              height={icon.height}
            />
          ))}
        </div>
      </div>
    </button>
  );
};
