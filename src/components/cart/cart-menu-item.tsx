"use client";
import Link from "next/link";
import Image from "next/image";
import { IoIosCloseCircle } from "react-icons/io";
import Counter from "@/components/common/counter";
import usePrice from "@/framework/basic-rest/product/use-price";
import { ROUTES } from "@/lib/routes";
import { Attribute } from "@/lib/utils/generate-cart-item";
import { useShallowCartStore } from "@/store/use-cart-store";
import type { CartItem } from "@/lib/utils/generate-cart-item";
import { extractStringFromName } from "@/lib/utils";

interface CartItemProps {
  item: CartItem;
}

const CartMenuItem: React.FC<CartItemProps> = ({ item }) => {
  const { addItemToCart, removeItemFromCart, clearItemFromCart } =
    useShallowCartStore((state) => ({
      addItemToCart: state.addItemToCart,
      removeItemFromCart: state.removeItemFromCart,
      clearItemFromCart: state.clearItemFromCart,
    }));

  const totalAmount = parseFloat(item.price.toString()) * item.quantity;
  const totalBasePrice =
    parseFloat(item.regular_price || "0".toString()) * item.quantity;
  const { price: totalPrice, discount } = usePrice({
    price: totalAmount.toString(),
    amount: totalAmount.toString(),
    baseAmount: totalBasePrice.toString(),
    currencyCode: "LKR",
  });

  return (
    <div
      className={`group w-full h-auto flex justify-start items-center bg-white relative`}
      title={item?.name}
    >
      <div className="relative flex flex-shrink-0 size-20 overflow-hidden bg-gray-200 rounded-md cursor-pointer md:size-24 ltr:mr-4 rtl:ml-4">
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

        <div
          className="absolute top-0 flex items-center justify-center w-full h-full transition duration-200 ease-in-out group-hover:bg-black/5 ltr:left-0 rtl:right-0 bg-opacity-30 md:bg-opacity-0 md:group-hover:bg-opacity-30"
          onClick={() => clearItemFromCart(item.id)}
          role="button"
        >
          <IoIosCloseCircle className="relative text-2xl text-white transition duration-300 ease-in-out transform md:scale-0 md:opacity-0 md:group-hover:scale-100 md:group-hover:opacity-100" />
        </div>
      </div>

      <div className="flex flex-col w-full  h-full overflow-hidden">
        <Link
          href={`${ROUTES.PRODUCT}/${item?.slug}`}
          className="text-ellipsis text-[12px] font-medium text-heading mb-1"
        >
          {extractStringFromName(item.name)}
        </Link>
        <div className="flex">
          {item.attributes?.map((attribute: Attribute) => (
            <div
              key={attribute?.slug}
              className="pr-2 text-[11px] text-gray-800 capitalize"
            >
              {`${attribute?.name}: ${attribute?.options}`}
            </div>
          ))}
        </div>
        <div className="mb-2 text-[11px] text-gray-800">
          Store: {item.store?.store_name}
        </div>

        <div className="flex mt-auto items-end justify-between">
          <Counter
            quantity={item.quantity}
            onIncrement={() =>
              addItemToCart(
                { ...item, price: parseFloat(item.price.toString()) },
                1,
                item.sku || ""
              )
            }
            onDecrement={() => removeItemFromCart(item.id)}
            variant="dark"
          />
          <div className="flex flex-col items-end">
            {discount && (
              <span className="text-xs font-semibold  bg-green-600 text-white px-1 mb-1">
                {discount} OFF
              </span>
            )}
            <span className="text-[12px] font-medium leading-5 md:text-[13px] xl:text-[14px] text-heading">
              {totalPrice}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartMenuItem;
