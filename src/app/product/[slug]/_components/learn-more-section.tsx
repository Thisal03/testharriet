import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

export default function LearnMoreSection({
  data,
}: {
  data?: {
    categories?: { name: string }[];
  };
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <p className="text-sm underline cursor-pointer">Learn More</p>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogTitle className="sr-only">Learn More Section</DialogTitle>
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] md:text-lg font-semibold text-black">
            What makes Harriet special
          </h2>
          <DialogClose className="text-muted-foreground hover:text-foreground cursor-pointer">
            <X />
          </DialogClose>
        </div>

        <div>
          <div className="flex items-start p-2 space-x-4">
            <div className="flex-shrink-0 ">
              <Image
                src="https://images.harrietshopping.com/front-web/icons/orginal-product.svg"
                width={30}
                height={30}
                className="w-8 h-8"
                alt="100% Original Products"
              />
            </div>

            <div>
              <h3 className="font-semibold text-md text-zinc-900">
                100% Original Products
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Harriet partners exclusively with authentic sellers, rigorously
                vetted for top-notch product quality. Rest assured, your
                purchases are always 100% genuine, no counterfeits.
              </p>
            </div>
          </div>

          {/* Conditionally render the 7 Day Return/Exchange section */}
          {!data?.categories?.some(
            (category) => category.name === "Avurudu Collection"
          ) && (
            <div className="flex items-start p-2 space-x-4">
              <div className="flex-shrink-0 ">
                <Image
                  src="https://images.harrietshopping.com/front-web/icons/7-day-return-exchange.svg"
                  className="w-8 h-8"
                  width={30}
                  height={30}
                  alt="7 Day Return/Exchange"
                />
              </div>
              <div>
                <h3 className="font-semibold text-md text-zinc-900">
                  7 Day Return/Exchange
                  <span className="text-red-500 ml-1">*</span>
                </h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Enjoy hassle-free returns within 7 days of receiving your
                  order for any reason, including change of mind. Free exchanges
                  for damaged or wrong-sized items. Conditions apply.
                </p>
              </div>
            </div>
          )}

          <div className="flex items-start p-2 space-x-4">
            <div className="flex-shrink-0 ">
              <Image
                src="https://images.harrietshopping.com/front-web/icons/safe-payment.svg"
                className="w-8 h-8 "
                width={30}
                height={30}
                alt="Secured Payment"
              />
            </div>
            <div>
              <h3 className="font-semibold text-md text-zinc-900 ">
                Secured Payment
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Harriet aims to deliver your items in the fastest time possible!
                Shop with confidence! Our secure payment system ensures your
                transactions are safe and protected, providing peace of mind
                with every purchase.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
