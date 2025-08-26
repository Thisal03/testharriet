import usePrice from "@/framework/basic-rest/product/use-price";
import { Attribute, CartItem } from "@/lib/utils/generate-cart-item";
import React from "react";
import Image from "next/image";
import { extractStringFromName } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCheckoutBtn } from "@/components/cart/use-checkout-btn";
import { toast } from "sonner";
import { Check, X } from "lucide-react";

const ProductToast = ({ item }: { item: CartItem }) => {
  const totalAmount = parseFloat(item.price.toString()) * item.quantity;
  const { price: totalPrice } = usePrice({
    price: totalAmount.toString(),
    amount: totalAmount.toString(),
    currencyCode: "LKR",
  });

  const close = () => {
    toast.dismiss();
  };

  const { handleCheckoutClick } = useCheckoutBtn({
    onOpenChange: close,
  });

  return (
    <div className="w-full p-4">
      <div className="flex items-center mb-2">
        <div className="bg-green-600 mr-2 p-1 rounded-full">
          <Check className="size-2.5 text-white" />
        </div>
        <h1 className="text-base font-semibold text-heading">
          Product Added to Cart
        </h1>
        <X onClick={close} className="ml-auto cursor-pointer size-5" />
      </div>
      <div
        className={`group w-full flex justify-start items-center bg-white relative`}
        title={item?.name}
      >
        <div className="relative flex flex-shrink-0 size-20 overflow-hidden bg-gray-200 rounded-md cursor-pointer ltr:mr-4 rtl:ml-4">
          <Image
            src={
              item.images?.[0]?.src ??
              "https://images.harrietshopping.com/front-web/images/placeholder/order-product.svg"
            }
            fill
            style={{ objectFit: "cover" }}
            alt={item.name || "Product Image"}
            className="object-contain bg-gray-100"
          />
        </div>

        <div className="flex flex-col w-full overflow-hidden">
          <p className="text-ellipsis text-[13px] font-medium text-heading mb-1">
            {extractStringFromName(item.name)}
          </p>
          <div className="flex flex-col">
            {item.attributes?.map((attribute: Attribute) => (
              <div
                key={attribute?.slug}
                className="text-xs text-gray-800 font-normal capitalize"
              >
                {`${attribute?.name}: ${attribute?.options}`}
              </div>
            ))}
          </div>
          <div className="mb-2 text-xs font-normal text-gray-800">
            Store: {item.store?.store_name}
          </div>

          <div className="flex items-end justify-between">
            <span className="text-[13px] font-semibold leading-5  text-heading">
              {totalPrice}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          className="font-medium tracking-wide text-xs uppercase rounded-sm p-4"
          onClick={handleCheckoutClick}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default ProductToast;
