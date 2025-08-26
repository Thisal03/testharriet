import { extractStringFromName } from "@/lib/utils";
import { Attribute, CartItem } from "@/lib/utils/generate-cart-item";
import Image from "next/image";

export const CheckoutItem: React.FC<{ item: CartItem }> = ({ item }) => {
  const totalAmount = item.price * (item.quantity || 0);

  return (
    <div className="flex items-center py-4 lg:px-3 ">
      <div className="flex flex-shrink-0 w-16 h-16">
        <Image
          src={
            item.images?.[0]?.src ??
            "https://images.harrietshopping.com/front-web/images/placeholder/order-product.svg"
          }
          alt={item.name}
          width={60}
          height={80}
          className="object-contain rounded-md bg-gray-50"
        />
      </div>
      <div className="flex flex-col justify-between flex-grow ltr:pl-3 rtl:pr-3">
        <div className="flex flex-row items-end justify-between">
          <h6 className="text-[12px] md:text-[12px] font-regular text-heading ">
            {extractStringFromName(item.name)}
          </h6>
          <span className="flex-none text-heading text-[12px] md:text-[12px] md:font-semibold text-right">
            LKR {totalAmount.toFixed(2)}
          </span>
        </div>
        <div className="flex flex-row ">
          <span className="text-sm md:text-[12px]  text-heading">
            Qty x{item.quantity}
          </span>
        </div>
        <div className="flex justify-between">
          {/* variations */}
          <span>
            <div className="flex">
              {item.attributes?.map((attribute: Attribute, index) => (
                <div
                  key={index}
                  className="attributes-sizes text-[12px] md:text-[12px] md:font-normal text-heading capitalize pr-1.5"
                >
                  {attribute.name}: {attribute.options}
                </div>
              ))}
            </div>
          </span>
          <span className="flex justify-center items-center text-[12px] md:text-[12px] justify-self-end">
            <Image
              width="17"
              height="17"
              src="https://images.harrietshopping.com/front-web/gif/store.gif"
              alt="online-store"
              className="opacity-60"
            />
            <span className="ml-1 text-black">{item.store?.store_name}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
